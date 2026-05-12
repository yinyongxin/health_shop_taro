import { AppButton, AppPopup } from "@/components";
import { agreementContent } from "@/common";
import classNames from "classnames";
import { View, Text } from "@tarojs/components";
import { useState } from "react";

export type AgreementPopupProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
};

export const AgreementPopup = (props: AgreementPopupProps) => {
  const { open, onClose, onConfirm, loading } = props;
  const [agreed, setAgreed] = useState(false);

  return (
    <AppPopup
      style={{ height: "80vh" }}
      open={open}
      title="患者服务包知情同意书"
      onClose={() => {
        onClose();
        setAgreed(false);
      }}
      showClose
      footer={
        <View className="flex flex-col gap-2 px-2 pb-2">
          <View
            className="flex items-center gap-2"
            onClick={() => setAgreed(!agreed)}
          >
            <View
              className={classNames(
                "w-[32px] h-[32px] rounded-full border-2 flex items-center justify-center",
                agreed ? "bg-sky-500 border-sky-500" : "border-gray-300",
              )}
            >
              {agreed && (
                <Text className="text-white text-[20px] font-bold">✓</Text>
              )}
            </View>
            <Text className="text-[26px] text-gray-600">
              我已阅读并同意《患者服务包知情同意书》
            </Text>
          </View>
          <AppButton
            status="error"
            disabled={!agreed}
            className="w-full"
            loading={loading}
            onClick={() => {
              onClose();
              setAgreed(false);
              onConfirm();
            }}
          >
            确认支付
          </AppButton>
        </View>
      }
    >
      <View className="px-4 py-2 text-[26px] leading-[1.8] text-gray-700 whitespace-pre-line">
        <Text className="text-red-500">
          温馨提示：本须知及免责声明旨在明确相关权责，凡购买使用本项目、服务及相关活动者，即默认自愿认可本声明全部内容，请认真阅读知悉。
        </Text>
        {"\n\n"}
        {agreementContent}
      </View>
    </AppPopup>
  );
};
