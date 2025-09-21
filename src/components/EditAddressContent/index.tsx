import { View } from "@tarojs/components";
import classNames from "classnames";
import { ReactNode, useEffect, useRef } from "react";
import { Field, Form, Input, Textarea } from "@taroify/core";
import { FormController, FormInstance } from "@taroify/core/form";
import { NAME_REGEXP_STR, PHONE_REGEXP_STR } from "@/common";
import { AddressInfo } from "@/client";
import { getAreaChinese } from "@/utils";
import AppAreaPickerPopup from "../AppAreaPickerPopup";

type EditAddressContentProps = {
  className?: string;
  btn: (form: FormInstance) => ReactNode;
  success?: () => void;
  defaultValues?: AddressInfo;
};
export const EditAddressContent = (props: EditAddressContentProps) => {
  const { className, btn, success, defaultValues } = props;
  const formRef = useRef<FormInstance>(null);
  const getDefaultValues = () => {
    return {
      receiverName: defaultValues?.receiverName,
      receiverPhone: defaultValues?.receiverPhone,
      picker: [
        defaultValues?.province,
        defaultValues?.city,
        defaultValues?.district,
      ].filter((item) => !!item), // 默认选中
    };
  };
  useEffect(() => {
    formRef.current?.setValues(getDefaultValues());
  }, [defaultValues]);

  const onSubmit = (values: AddressInfo) => {
    console.log("values", values);
    success?.();
  };
  return (
    <>
      <View className={classNames(className)}>
        <Form
          ref={formRef}
          onSubmit={(e) => {
            onSubmit(e.detail.value as AddressInfo);
          }}
        >
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
                required: true,
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
          <Field required name="detailAddress" align="start" label="详细地址">
            <Textarea
              style={{ height: "48px" }}
              limit={100}
              maxlength={100}
              placeholder="详细地址"
            />
          </Field>
        </Form>
      </View>
      {btn(formRef.current!)}
    </>
  );
};
