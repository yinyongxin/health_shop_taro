import { SafeInfo } from "@/client";
import { SaleStatusEnum } from "@/enums";
import { Steps } from "@taroify/core";
import { View } from "@tarojs/components";

export type AfterSaleStepProps = {
  info: SafeInfo;
};

export const AfterSaleStep = (props: AfterSaleStepProps) => {
  const { info } = props;
  if (info.refundStatus === SaleStatusEnum.PENDING_AUDIT.value) {
    return (
      <Steps className="py-[24px] rounded-xl" value={1} direction="vertical">
        <Steps.Step>
          <View>提交申请</View>
        </Steps.Step>
        <Steps.Step>
          <View>待审核</View>
        </Steps.Step>
        <Steps.Step>
          <View>审核通过/审核拒绝</View>
        </Steps.Step>
      </Steps>
    );
  } else if (info.refundStatus === SaleStatusEnum.AUDIT_PASS.value) {
    return (
      <Steps className="py-[24px] rounded-xl" value={2} direction="vertical">
        <Steps.Step>
          <View>提交申请</View>
        </Steps.Step>
        <Steps.Step>
          <View>待审核</View>
        </Steps.Step>
        <Steps.Step>
          <View>审核通过</View>
        </Steps.Step>
        <Steps.Step>
          <View>退款中</View>
        </Steps.Step>
      </Steps>
    );
  } else if (info.refundStatus === SaleStatusEnum.REFUNDING.value) {
    return (
      <Steps className="py-[24px] rounded-xl" value={3} direction="vertical">
        <Steps.Step>
          <View>提交申请</View>
        </Steps.Step>
        <Steps.Step>
          <View>待审核</View>
        </Steps.Step>
        <Steps.Step>
          <View>审核通过</View>
        </Steps.Step>
        <Steps.Step>
          <View>退款中</View>
        </Steps.Step>
        <Steps.Step>
          <View>退款成功/退款失败</View>
        </Steps.Step>
      </Steps>
    );
  } else if (info.refundStatus === SaleStatusEnum.REFUND_FAILED.value) {
    return (
      <Steps className="py-[24px] rounded-xl" value={4} direction="vertical">
        <Steps.Step>
          <View>提交申请</View>
        </Steps.Step>
        <Steps.Step>
          <View>待审核</View>
        </Steps.Step>
        <Steps.Step>
          <View>审核通过</View>
        </Steps.Step>
        <Steps.Step>
          <View>退款中</View>
        </Steps.Step>
        <Steps.Step>
          <View className="text-red-500">退款失败</View>
        </Steps.Step>
      </Steps>
    );
  } else if (info.refundStatus === SaleStatusEnum.REFUND_SUCCESS.value) {
    return (
      <Steps className="py-[24px] rounded-xl" value={5} direction="vertical">
        <Steps.Step>
          <View>提交申请</View>
        </Steps.Step>
        <Steps.Step>
          <View>待审核</View>
        </Steps.Step>
        <Steps.Step>
          <View>审核通过</View>
        </Steps.Step>
        <Steps.Step>
          <View>退款中</View>
        </Steps.Step>
        <Steps.Step>
          <View>退款成功</View>
        </Steps.Step>
      </Steps>
    );
  } else if (info.refundStatus === SaleStatusEnum.AUDIT_REJECT.value) {
    return (
      <Steps className="py-[24px] rounded-xl" value={3} direction="vertical">
        <Steps.Step>
          <View>提交申请</View>
        </Steps.Step>
        <Steps.Step>
          <View>待审核</View>
        </Steps.Step>
        <Steps.Step>
          <View className="text-red-500">拒绝</View>
        </Steps.Step>
      </Steps>
    );
  }
};
