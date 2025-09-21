import { View } from "@tarojs/components";
import classNames from "classnames";
import { ReactNode, useEffect, useRef } from "react";
import { Field, Form, Input, Textarea } from "@taroify/core";
import { FormController, FormInstance } from "@taroify/core/form";
import { NAME_REGEXP_STR, PHONE_REGEXP_STR } from "@/common";
import { AddressInfo, postWxShopAddrAdd, postWxShopAddrEdit } from "@/client";
import { useAppUserStore } from "@/stores";
import { appLoading, appToast, getAreaChinese, getAreaCode } from "@/utils";
import AppAreaPickerPopup from "../AppAreaPickerPopup";

type EditAddressContentProps = {
  className?: string;
  btn: ReactNode;
  success?: () => void;
  defaultValues?: AddressInfo;
};
export const EditAddressContent = (props: EditAddressContentProps) => {
  const appUserStore = useAppUserStore();
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
        isDefault: appUserStore.addressList.length === 0 ? 1 : 0,
      },
    });
    if (res.data?.code === 0) {
      appToast.success("添加成功");
      success?.();
    }
    appToast.error(res.data?.msg ?? "添加失败");
  };

  const update = async (values: Required<AddressInfo>) => {
    const res = await postWxShopAddrEdit({
      body: { ...values },
    });
    if (res.data?.code === 0) {
      appToast.success("修改成功");
      success?.();
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
        await update({ ...lastValues, id: defaultValues.id! });
      } else {
        await add(lastValues);
      }
    } finally {
      appLoading.hide();
    }
  };
  return (
    <>
      <View className={classNames(className)}>
        <Form
          ref={formRef}
          onSubmit={(e) => {
            onSubmit(e.detail.value as any);
          }}
        >
          <Field required label="标签" name="tag">
            <Input maxlength={10} placeholder="标签" />
          </Field>
          <Field
            required
            label="姓名"
            name="receiverName"
            rules={[
              {
                pattern: new RegExp(NAME_REGEXP_STR),
                message: "请输入正确姓名",
              },
            ]}
          >
            <Input placeholder="姓名" />
          </Field>
          <Field
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
            <Input type="digit" maxlength={11} placeholder="手机号" />
          </Field>

          <Field
            required
            label="地区"
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
              return (
                <AppAreaPickerPopup
                  areaPickerProps={{
                    onConfirm: (val) => {
                      formRef.current?.setFieldsValue({
                        area: val,
                      });
                    },
                    defaultValue: value,
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

          <Field
            required
            label="街道"
            name="street"
            rules={[
              {
                pattern: new RegExp(NAME_REGEXP_STR),
                message: "请输入正确街道",
              },
            ]}
          >
            <Input placeholder="街道" />
          </Field>
          <Field
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
              style={{ height: "48px" }}
              limit={100}
              maxlength={100}
              placeholder="详细地址"
            />
          </Field>
          <Field label="邮政编码" name="postalCode">
            <Input maxlength={10} placeholder="邮政编码" />
          </Field>
        </Form>
      </View>
      <View onClick={() => formRef.current?.submit()}>{btn}</View>
    </>
  );
};
