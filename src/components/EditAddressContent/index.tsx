import { View } from "@tarojs/components";
import classNames from "classnames";
import { ReactNode, useEffect, useRef } from "react";
import { Field, Form, Input, Textarea } from "@taroify/core";
import { FormController, FormInstance } from "@taroify/core/form";
import { NAME_REGEXP_STR, PHONE_REGEXP_STR } from "@/common";
import { AddressInfo, postWxShopAddrAdd, postWxShopAddrEdit } from "@/client";
import { useAppUserStore } from "@/stores";
import { appLoading, appToast, getAreaChinese, getAreaCode } from "@/utils";
import { pick } from "lodash-es";
import AppAreaPickerPopup from "../AppAreaPickerPopup";
import { AppTag } from "../AppTag";

type EditAddressContentProps = {
  className?: string;
  btn: ReactNode;
  success?: () => void;
  defaultValues?: AddressInfo;
};
export const EditAddressContent = (props: EditAddressContentProps) => {
  const { addressList = [] } = useAppUserStore();
  const { className, btn, success, defaultValues } = props;
  const formRef = useRef<FormInstance>(null);
  const getDefaultValues = () => {
    return {
      ...defaultValues,
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
    try {
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
    } finally {
      appLoading.hide();
    }
  };

  const tagsRender = () => {
    const list = ["家", "公司", "学校", "父母", "朋友"];
    return (
      <View className="w-full flex gap-[24px] ">
        {list.map((tag) => (
          <AppTag
            key={tag}
            onClick={() => {
              formRef.current?.setFieldsValue({ tag });
            }}
          >
            {tag}
          </AppTag>
        ))}
      </View>
    );
  };

  return (
    <>
      <View className="text-orange-500 text-[24px] mt-[16px]">
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
            <View className="flex flex-col gap-[16px]">
              <View className="text-gray-500">标签（ 用于区分地址 ）</View>
              <Field required name="tag" className="rounded-xl">
                <Input maxlength={10} placeholder="请输入内容" />
              </Field>
              {tagsRender()}
            </View>

            <View className="flex flex-col gap-[16px]">
              <View className="text-gray-500">姓名</View>
              <Field
                className="rounded-xl"
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

            <View className="flex flex-col gap-[16px]">
              <View className="text-gray-500">手机号</View>
              <Field
                className="rounded-xl"
                required
                label="手机号"
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

            <View className="flex flex-col gap-[16px]">
              <View className="text-gray-500">地区</View>
              <Field
                className="rounded-xl"
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

            <View className="flex flex-col gap-[16px]">
              <View className="text-gray-500">街道</View>
              <Field
                className="rounded-xl"
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
            </View>

            <View className="flex flex-col gap-[16px]">
              <View className="text-gray-500">详细地址</View>
              <Field
                className="rounded-xl"
                required
                name="detailAddress"
                align="start"
                label="详细地址"
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
