import { AppButton, AppPopup } from "@/components";
import classNames from "classnames";
import { View, Text, RichText } from "@tarojs/components";
import { useState } from "react";
import { useAppEnvStore } from "@/stores";
import { useRequest } from "@/hooks";
import { getWxShopContentList } from "@/client";
import { AgreementDefaultContent } from "./AgreementDefaultContent";

export type AgreementPopupProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  orgId?: string;
};

export const AgreementPopup = (props: AgreementPopupProps) => {
  const { open, onClose, onConfirm, loading, orgId } = props;
  const [agreed, setAgreed] = useState(false);

  const { hospitalList } = useAppEnvStore();

  const { data: agreementData } = useRequest(
    async () => {
      let currentOrgId = orgId;
      if (!currentOrgId) {
        currentOrgId = hospitalList?.find((item) => item.main)?.orgId;
      }

      const getWxShopContentListRes = await getWxShopContentList({
        query: {
          orgId,
          category: "患者服务包知情同意书",
        },
      });
      return getWxShopContentListRes.data?.data?.[0];
    },
    {
      refreshDeps: [open],
    },
  );

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
      {agreementData?.content ? (
        <View className="px-4">
          <RichText nodes={agreementData?.content} />
        </View>
      ) : (
        <AgreementDefaultContent />
      )}
    </AppPopup>
  );
};
