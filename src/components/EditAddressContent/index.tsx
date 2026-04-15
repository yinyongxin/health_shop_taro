import { View, Text } from "@tarojs/components";
import classNames from "classnames";
import { ReactNode, useEffect, useRef, useState } from "react";
import { Field, Form, Input, Textarea } from "@taroify/core";
import { FormController, FormInstance } from "@taroify/core/form";
import { CARDNO_REGEXP_STR, NAME_REGEXP_STR, PHONE_REGEXP_STR } from "@/common";
import { AddressInfo, postWxShopAddrAdd, postWxShopAddrEdit } from "@/client";
import { useAppEnvStore, useAppUserStore } from "@/stores";
import { appLoading, appToast, getAreaChinese, getAreaCode } from "@/utils";
import { pick } from "lodash-es";
import AppAreaPickerPopup from "../AppAreaPickerPopup";
import { RadioPopup } from "../AppPopup/RadioPopup";

type EditAddressContentProps = {
  className?: string;
  btn: ReactNode;
  success?: () => void;
  defaultValues?: AddressInfo;
};
export const EditAddressContent = (props: EditAddressContentProps) => {
  const { addressList = [] } = useAppUserStore();
  const { cardTypeDictList } = useAppEnvStore();
  const { className, btn, success, defaultValues } = props;

  const [cardTypeOpen, setCardTypeOpen] = useState(false);
  const formRef = useRef<FormInstance>(null);
  const getDefaultValues = () => {
    return {
      ...defaultValues,
      idType: defaultValues?.idType || cardTypeDictList?.[0]?.dictValue || "",
      idNo: defaultValues?.idNo || "",
      area: getAreaCode({
        province: defaultValues?.province!,
        city: defaultValues?.city!,
        district: defaultValues?.district!,
      }).filter((item) => !!item), // 默认选中
    };
  };
  useEffect(() => {
    formRef.current?.setValues(getDefaultValues());
  }, [defaultValues]);

  const add = async (values: Required<AddressInfo>) => {
    const res = await postWxShopAddrAdd({
      body: {
        ...values,
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
    const res = await postWxShopAddrEdit({
      body: pick(values, [
        "id",
        "receiverName",
        "tag",
        "receiverPhone",
        "province",
        "city",
        "district",
        "detailAddress",
        "postalCode",
        "isDefault",
        "idNo",
        "idType",
      ]),
    });
    if (res.data?.code === 0) {
      appToast.success("修改成功");
      success?.();
      return;
    }
    appToast.error(res.data?.msg ?? "修改失败");
  };

  const onSubmit = async (values: AddressInfo & { area: string[] }) => {
    appLoading.show();
    const { area, ...rest } = values;
    const [province, city, district] = getAreaChinese(area);
    const lastValues = {
      ...rest,
      province,
      city,
      district,
    } as Required<AddressInfo>;
    if (defaultValues) {
      await update({
        ...defaultValues,
        ...lastValues,
      });
    } else {
      await add(lastValues);
    }
  };

  // const tagsRender = () => {
  //   const list = ["家", "公司", "学校", "父母", "朋友"];
  //   return (
  //     <View className="w-full flex gap-[24px] ">
  //       {list.map((tag) => (
  //         <AppTag
  //           key={tag}
  //           onClick={() => {
  //             formRef.current?.setFieldsValue({ tag });
  //           }}
  //         >
  //           {tag}
  //         </AppTag>
  //       ))}
  //     </View>
  //   );
  // };

  return (
    <>
      <View className="text-orange-500 text-[24px] mt-2">
        温馨提示：为了确保您能顺利收到商品，请务必填写真实有效的收货地址信息。
      </View>
      <View className={classNames("mt-[32px]", className)}>
        <Form
          ref={formRef}
          onSubmit={(e) => {
            onSubmit(e.detail.value as any);
          }}
        >
          <View className="flex flex-col gap-[24px]">
            {/* <View className="flex flex-col gap-2">
              <View className="text-gray-500">
                标签（ 用于区分地址 ）
                <Text className="text-[18px] text-orange-500 ml-1">选填</Text>
              </View>
              <Field name="tag" className="rounded-lg">
                <Input maxlength={10} placeholder="请输入内容" />
              </Field>
              {tagsRender()}
            </View> */}

            <View className="flex flex-col gap-2">
              <View className="text-gray-500">
                姓名<Text className="text-[18px] text-rose-500 ml-1">必填</Text>
              </View>
              <Field
                className="rounded-lg"
                required
                name="receiverName"
                rules={[
                  {
                    pattern: new RegExp(NAME_REGEXP_STR),
                    message: "请输入内容",
                  },
                ]}
              >
                <Input placeholder="请输入内容" />
              </Field>
            </View>

            <View className="flex flex-col gap-2">
              <View className="text-gray-500">
                手机号
                <Text className="text-[18px] text-rose-500 ml-1">必填</Text>
              </View>
              <Field
                className="rounded-lg"
                required
                name="receiverPhone"
                rules={[
                  {
                    pattern: new RegExp(PHONE_REGEXP_STR),
                    message: "请输入正确手机号",
                  },
                ]}
              >
                <Input type="digit" maxlength={11} placeholder="请输入内容" />
              </Field>
            </View>

            <View className="flex flex-col gap-2">
              <View className="text-gray-500">
                证件类型
                <Text className="text-[18px] text-rose-500 ml-1">必填</Text>
              </View>
              <Field className="rounded-lg" required name="idType" isLink>
                {(fieldController: FormController<string>) => {
                  const value = fieldController?.value;
                  console.log("idType value:", fieldController);
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

            <View className="flex flex-col gap-2">
              <View className="text-gray-500">
                证件号
                <Text className="text-[18px] text-rose-500 ml-1">必填</Text>
              </View>
              <Field
                className="rounded-lg"
                name="idNo"
                required
                rules={[
                  {
                    message: "请输入正确的证件号",
                    validator: (value) => {
                      if (!value) {
                        return false;
                      }
                      return new RegExp(CARDNO_REGEXP_STR).test(value);
                    },
                  },
                ]}
              >
                <Input placeholder="请输入内容" />
              </Field>
            </View>

            <View className="flex flex-col gap-2">
              <View className="text-gray-500">
                地区<Text className="text-[18px] text-rose-500 ml-1">必填</Text>
              </View>
              <Field
                className="rounded-lg"
                required
                name="area"
                isLink
                rules={[
                  {
                    validator: (value) => {
                      return value.length === 3;
                    },
                    message: "请选择地区",
                  },
                ]}
              >
                {(fieldController: FormController<string[]>) => {
                  const value = fieldController?.value || [];
                  console.log("area value:", fieldController);
                  return (
                    <AppAreaPickerPopup
                      areaPickerProps={{
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

            {/* <View className="flex flex-col gap-2">
              <View className="text-gray-500">
                街道<Text className="text-[18px] text-rose-500 ml-1">必填</Text>
              </View>
              <Field
                className="rounded-lg"
                required
                name="street"
                rules={[
                  {
                    pattern: new RegExp(NAME_REGEXP_STR),
                    message: "请输入正确街道",
                  },
                ]}
              >
                <Input placeholder="请输入内容" />
              </Field>
            </View> */}

            <View className="flex flex-col gap-2">
              <View className="text-gray-500">
                详细地址
                <Text className="text-[18px] text-rose-500 ml-1">必填</Text>
              </View>
              <Field
                className="rounded-lg"
                required
                name="detailAddress"
                align="start"
                rules={[
                  {
                    validator: (value) => {
                      return value.length > 0;
                    },
                    message: "请输入详细地址",
                  },
                ]}
              >
                <Textarea
                  limit={100}
                  maxlength={100}
                  placeholder="请输入内容"
                  className="w-full"
                />
              </Field>
            </View>

            {/* <Field label="邮政编码" name="postalCode">
            <Input maxlength={10} placeholder="邮政编码" />
          </Field> */}
          </View>
        </Form>
      </View>
      <View onClick={() => formRef.current?.submit()}>{btn}</View>
    </>
  );
};
