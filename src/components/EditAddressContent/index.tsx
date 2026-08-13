import { View, Text } from "@tarojs/components";
import classNames from "classnames";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Field, Form, Input, Textarea } from "@taroify/core";
import { FormController, FormInstance } from "@taroify/core/form";
import { CARDNO_REGEXP_STR, NAME_REGEXP_STR, PHONE_REGEXP_STR } from "@/common";
import { AddressInfo, postWxShopAddrAdd, postWxShopAddrEdit } from "@/client";
import { useAppEnvStore, useAppUserStore } from "@/stores";
import { appLoading, appToast, getAreaChinese, getAreaCode } from "@/utils";
import { omit, pick } from "lodash-es";
import AppAreaPickerPopup from "../AppAreaPickerPopup";
import { RadioPopup } from "../AppPopup/RadioPopup";

export type AddressFieldConfig = {
  visible?: boolean;
  required?: boolean;
};

type FormFieldName = keyof AddressInfo | "area";

export type EditAddressContentProps = {
  className?: string;
  btn: ReactNode;
  success?: () => void;
  defaultValues?: AddressInfo;
  fieldConfig?: Partial<Record<FormFieldName, AddressFieldConfig>>;
};
export const EditAddressContent = (props: EditAddressContentProps) => {
  const { addressList = [] } = useAppUserStore();
  const { cardTypeDictList } = useAppEnvStore();
  const { className, btn, success, defaultValues, fieldConfig = {} } = props;

  const defaultFieldConfig: Record<FormFieldName, AddressFieldConfig> = {
    receiverName: { visible: true, required: true },
    receiverPhone: { visible: true, required: true },
    idType: { visible: true, required: false },
    idNo: { visible: true, required: false },
    area: { visible: true, required: false },
    detailAddress: { visible: true, required: false },
    id: { visible: false, required: false },
    userId: { visible: false, required: false },
    province: { visible: false, required: false },
    city: { visible: false, required: false },
    district: { visible: false, required: false },
    street: { visible: false, required: false },
    postalCode: { visible: false, required: false },
    isDefault: { visible: false, required: false },
    tag: { visible: false, required: false },
    createdAt: { visible: false, required: false },
    updatedAt: { visible: false, required: false },
  };

  const mergedFieldConfig = { ...defaultFieldConfig, ...fieldConfig };

  const [cardTypeOpen, setCardTypeOpen] = useState(false);
  const formRef = useRef<FormInstance>(null);
  const submittingRef = useRef(false);
  const getDefaultValues = () => {
    return {
      ...defaultValues,
      idType: defaultValues?.idType || cardTypeDictList?.[0]?.dictValue || "",
      idNo: defaultValues?.idNo || "",
      area: getAreaCode({
        province: defaultValues?.province ?? "",
        city: defaultValues?.city ?? "",
        district: defaultValues?.district ?? "",
      }).filter((item) => !!item),
    };
  };

  const getVisibleFieldValues = (values: Required<AddressInfo>) => {
    const visibleFields: string[] = [];
    Object.entries(mergedFieldConfig).forEach(([key, config]) => {
      if (config.visible !== false) {
        visibleFields.push(key);
      }
    });
    visibleFields.push(
      "isDefault",
      "province",
      "city",
      "district",
      "detailAddress",
      "idType",
      "idNo",
    );
    return pick(values, visibleFields as (keyof Required<AddressInfo>)[]);
  };

  useEffect(() => {
    formRef.current?.setValues(getDefaultValues());
  }, [defaultValues]);

  const add = async (values: Required<AddressInfo>) => {
    const filteredValues = getVisibleFieldValues(values);
    const res = await postWxShopAddrAdd({
      body: {
        ...filteredValues,
        isDefault: addressList?.length === 0 ? 1 : 0,
      },
    });
    if (res.data?.code === 0) {
      appToast.success("添加成功");
      success?.();
      return;
    }
    appToast.error(res.data?.msg ?? "添加失败");
  };

  const update = async (values: Required<AddressInfo>) => {
    const filteredValues = getVisibleFieldValues(values);
    const res = await postWxShopAddrEdit({
      body: {
        id: defaultValues?.id,
        ...omit(filteredValues, "id"),
      },
    });
    if (res.data?.code === 0) {
      appToast.success("修改成功");
      success?.();
      return;
    }
    appToast.error(res.data?.msg ?? "修改失败");
  };

  const onSubmit = async (values: AddressInfo & { area?: string[] }) => {
    if (submittingRef.current) {
      return;
    }
    submittingRef.current = true;
    appLoading.show();
    try {
      const { area = [], ...rest } = values;
      const [province, city, district] = area.length
        ? getAreaChinese(area)
        : ["", "", ""];
      const hasFormKey = (key: keyof AddressInfo) => key in rest;
      const lastValues = {
        ...rest,
        province: province || defaultValues?.province || "",
        city: city || defaultValues?.city || "",
        district: district || defaultValues?.district || "",
        detailAddress: hasFormKey("detailAddress")
          ? (rest.detailAddress ?? "")
          : defaultValues?.detailAddress || "",
        idType: hasFormKey("idType")
          ? (rest.idType ?? "")
          : defaultValues?.idType || "",
        idNo: hasFormKey("idNo")
          ? (rest.idNo ?? "")
          : defaultValues?.idNo || "",
      } as Required<AddressInfo>;
      if (defaultValues) {
        await update({
          ...defaultValues,
          ...lastValues,
        });
      } else {
        await add(lastValues);
      }
    } catch (error) {
      console.error("保存地址失败:", error);
      appToast.error("网络错误");
    } finally {
      appLoading.hide();
      submittingRef.current = false;
    }
  };

  return (
    <>
      <View className="text-orange-500 text-[24px] mt-2">
        温馨提示：为了更好的为您服务，请务必填写准确真实有效信息，感谢您的配合。
      </View>
      <View className={classNames("mt-[32px]", className)}>
        <Form
          ref={formRef}
          onSubmit={(e) => {
            onSubmit(e.detail.value as any);
          }}
        >
          <View className="flex flex-col gap-[24px]">
            {mergedFieldConfig.receiverName?.visible !== false && (
              <View className="flex flex-col gap-2">
                <View className="text-gray-500">
                  姓名
                  {mergedFieldConfig.receiverName?.required !== false && (
                    <Text className="text-[18px] text-rose-500 ml-1">必填</Text>
                  )}
                </View>
                <Field
                  className="rounded-lg"
                  required={mergedFieldConfig.receiverName?.required !== false}
                  name="receiverName"
                  rules={
                    mergedFieldConfig.receiverName?.required !== false
                      ? [
                          {
                            pattern: new RegExp(NAME_REGEXP_STR),
                            message: "请输入内容",
                          },
                        ]
                      : []
                  }
                >
                  <Input placeholder="请输入内容" />
                </Field>
              </View>
            )}

            {mergedFieldConfig.receiverPhone?.visible !== false && (
              <View className="flex flex-col gap-2">
                <View className="text-gray-500">
                  手机号
                  {mergedFieldConfig.receiverPhone?.required !== false && (
                    <Text className="text-[18px] text-rose-500 ml-1">必填</Text>
                  )}
                </View>
                <Field
                  className="rounded-lg"
                  required={mergedFieldConfig.receiverPhone?.required !== false}
                  name="receiverPhone"
                  rules={
                    mergedFieldConfig.receiverPhone?.required !== false
                      ? [
                          {
                            pattern: new RegExp(PHONE_REGEXP_STR),
                            message: "请输入正确手机号",
                          },
                        ]
                      : []
                  }
                >
                  <Input type="digit" maxlength={11} placeholder="请输入内容" />
                </Field>
              </View>
            )}

            {mergedFieldConfig.idType?.visible !== false && (
              <View className="flex flex-col gap-2">
                <View className="text-gray-500">
                  证件类型
                  {mergedFieldConfig.idType?.required && (
                    <Text className="text-[18px] text-rose-500 ml-1">必填</Text>
                  )}
                </View>
                <Field
                  className="rounded-lg"
                  required={mergedFieldConfig.idType?.required}
                  name="idType"
                  isLink
                >
                  {(fieldController: FormController<string>) => {
                    const value = fieldController?.value;
                    return (
                      <>
                        <Input
                          value={
                            cardTypeDictList.find(
                              (item) => item.dictValue === value,
                            )?.dictLabel
                          }
                          readonly
                          placeholder="请选择证件类型"
                          onClick={() => setCardTypeOpen(true)}
                        />
                        <RadioPopup
                          defaultValue={value}
                          title="证件类型"
                          open={cardTypeOpen}
                          setOpen={setCardTypeOpen}
                          list={cardTypeDictList.map((item) => {
                            return {
                              title: item.dictLabel,
                              value: item.dictValue,
                            };
                          })}
                          onSubmit={(val) => {
                            formRef.current?.setFieldsValue({
                              idType: val,
                            });
                          }}
                        />
                      </>
                    );
                  }}
                </Field>
              </View>
            )}

            {mergedFieldConfig.idNo?.visible !== false && (
              <View className="flex flex-col gap-2">
                <View className="text-gray-500">
                  证件号
                  {mergedFieldConfig.idNo?.required && (
                    <Text className="text-[18px] text-rose-500 ml-1">必填</Text>
                  )}
                </View>
                <Field
                  className="rounded-lg"
                  name="idNo"
                  required={mergedFieldConfig.idNo?.required}
                  rules={
                    mergedFieldConfig.idNo?.required
                      ? [
                          {
                            message: "请输入正确的证件号",
                            validator: (value) => {
                              if (!value) {
                                return false;
                              }
                              return new RegExp(CARDNO_REGEXP_STR).test(value);
                            },
                          },
                        ]
                      : []
                  }
                >
                  <Input placeholder="请输入内容" />
                </Field>
              </View>
            )}

            {mergedFieldConfig.area?.visible !== false && (
              <View className="flex flex-col gap-2">
                <View className="text-gray-500">
                  地区
                  {mergedFieldConfig.area?.required && (
                    <Text className="text-[18px] text-rose-500 ml-1">必填</Text>
                  )}
                </View>
                <Field
                  className="rounded-lg"
                  required={mergedFieldConfig.area?.required}
                  name="area"
                  isLink
                  rules={
                    mergedFieldConfig.area?.required
                      ? [
                          {
                            validator: (value) => {
                              return value.length === 3;
                            },
                            message: "请选择地区",
                          },
                        ]
                      : []
                  }
                >
                  {(fieldController: FormController<string[]>) => {
                    const value = fieldController?.value || [];
                    return (
                      <AppAreaPickerPopup
                        areaPickerProps={{
                          value,
                          onConfirm: (val) => {
                            formRef.current?.setFieldsValue({
                              area: val,
                            });
                          },
                          defaultValue: ["110000", "110100", "110101"],
                        }}
                      >
                        {({ handleOpen }) => {
                          return (
                            <Input
                              value={getAreaChinese(value).join("-")}
                              readonly
                              placeholder="请选择所在地区"
                              onClick={() => handleOpen()}
                            />
                          );
                        }}
                      </AppAreaPickerPopup>
                    );
                  }}
                </Field>
              </View>
            )}

            {mergedFieldConfig.detailAddress?.visible !== false && (
              <View className="flex flex-col gap-2">
                <View className="text-gray-500">
                  详细地址
                  {mergedFieldConfig.detailAddress?.required && (
                    <Text className="text-[18px] text-rose-500 ml-1">必填</Text>
                  )}
                </View>
                <Field
                  className="rounded-lg"
                  required={mergedFieldConfig.detailAddress?.required}
                  name="detailAddress"
                  align="start"
                  rules={
                    mergedFieldConfig.detailAddress?.required
                      ? [
                          {
                            validator: (value) => {
                              return value.length > 0;
                            },
                            message: "请输入详细地址",
                          },
                        ]
                      : []
                  }
                >
                  <Textarea
                    limit={100}
                    maxlength={100}
                    placeholder="请输入内容"
                    className="w-full"
                  />
                </Field>
              </View>
            )}
          </View>
        </Form>
      </View>
      <View onClick={() => formRef.current?.submit()}>{btn}</View>
    </>
  );
};
