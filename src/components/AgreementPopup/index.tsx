import { AppButton, AppPopup } from "@/components";
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
        <Text className="font-bold text-center block">深圳市龙华中心医院患者服务包患者须知</Text>
        {"\n\n"}
        <Text className="text-red-500">
          温馨提示：本须知及免责声明旨在明确相关权责，凡购买使用本项目、服务及相关活动者，即默认自愿认可本声明全部内容，请认真阅读知悉。
        </Text>
        {"\n\n"}
        <Text className="font-bold">一. 医院服务权责说明</Text>
        {"\n\n"}
        <Text>（1）医院将严格按照展示与公示的项目内容、服务标准，为患者提供对应增值服务，保障服务规范、有序开展；</Text>
        {"\n\n"}
        <Text>（2）服务过程中由具备资质的医护及配套工作人员提供服务，全程遵守医院规章制度及医疗服务规范；</Text>
        {"\n\n"}
        <Text>（3）若因医院原因无法按约定提供服务，将根据未服务项目办理退费或顺延服务周期。</Text>
        {"\n\n"}
        <Text className="font-bold">二. 第三方平台（腾讯健康及国瞳智能）权责说明</Text>
        {"\n\n"}
        <Text>（1）第三方合作平台为本次服务包的合规合作渠道，具备合法运营资质，仅负责服务包线上展示、预约对接、费用代收、信息同步及售后协助等配套辅助工作，不参与任何临床诊疗、护理操作等医疗行为。</Text>
        {"\n\n"}
        <Text>（2）第三方平台将严格遵守隐私保护相关法律法规，对患者个人信息、就诊信息、缴费信息等涉密资料严格保密，不得私自泄露、篡改、倒卖非法使用患者信息，保障患者信息安全。</Text>
        {"\n\n"}
        <Text>（3）第三方平台将如实公示服务包名称、服务内容、收费标准、服务周期等信息，不虚假宣传、夸大服务效果、误导患者选购，禁止强制捆绑销售、变相加价等违规行为。</Text>
        {"\n\n"}
        <Text>（4）第三方平台不干预医院诊疗决策、服务标准与服务质量，不对疾病治疗效果、康复预后作出任何承诺与保证。</Text>
        {"\n\n"}
        <Text className="font-bold">三、风险与特殊情况告知</Text>
        {"\n\n"}
        <Text>1. 本服务包为配套辅助增值服务，不替代正规医疗诊疗行为，无法规避疾病本身的病情变化、并发症、复发等医疗风险，患者仍需遵从医嘱完成常规治疗与复查；</Text>
        {"\n\n"}
        <Text>2. 服务期间若患者出现病情突发变化、转科、转院、出院、手术等特殊情况，医院可根据实际情况暂停、终止或调整服务内容，剩余未服务费用按照实际项目结算；</Text>
        {"\n\n"}
        <Text>3. 因不可抗力（自然灾害、公共卫生事件、设备检修、科室紧急救治等）导致服务临时中断的，医院将优先顺延服务周期，不承担额外赔偿责任；</Text>
        {"\n\n"}
        <Text>4. 患者确认：无任何工作人员以服务包对疾病治疗效果、预后情况作出绝对承诺。</Text>
        {"\n\n"}
        <Text className="font-bold">四、退款申明</Text>
        {"\n\n"}
        <Text>为明确服务包退费规则，保障患者合法权益，各方均自愿遵守：</Text>
        {"\n\n"}
        <Text className="font-bold">1. 可退费情形</Text>
        {"\n\n"}
        <Text>（1）因医院服务调整、停诊、无法按约定标准提供对应服务包项目，导致服务无法正常开展的，患者可申请剩余未服务项目全额退费；</Text>
        {"\n\n"}
        <Text>（2）患者因病情突发加重、紧急转院、终止治疗或遇到不可抗力因素等客观医疗原因无法继续享受服务，经员确认后，可申请剩余未服务部分费用退费；</Text>
        {"\n\n"}
        <Text className="font-bold">2. 不予退费情形</Text>
        {"\n\n"}
        <Text>（1）服务包项目已经开展，患者已进行预约成功并享受对应服务的，不予退费；</Text>
        {"\n\n"}
        <Text>（2）患者因个人主观原因，在服务包开展期间主动放弃服务、无故不配合服务开展、单方面终止服务的，不予退费；</Text>
        {"\n\n"}
        <Text>（3）服务周期正常届满、服务全部履约完毕，不予退费；</Text>
        {"\n\n"}
        <Text>（4）因不可抗力因素导致服务顺延、短暂中断，医院已提供后续补服务、顺延服务周期的，不予退费。</Text>
        {"\n\n"}
        <Text className="font-bold">五、自愿知情声明</Text>
        {"\n\n"}
        <Text>
          本人已年满18周岁（或为患者法定监护人），具备完全民事行为能力。我已完全知晓服务内容、收费标准、权责义务、潜在风险及退费规则，所有疑问均已得到清晰解答。
        </Text>
        {"\n\n"}
        <Text>
          本人系自愿、自主、无胁迫选择购买上述服务包项目，自愿承担对应费用及相关后果，绝不以此为由向医院提出不合理诉求。
        </Text>
      </View>
    </AppPopup>
  );
};
