import { Text, View } from "@tarojs/components";
import { useAppEnvStore } from "@/stores";
import { appRouter } from "@/router";
import { LucideIcon } from "../LucideIcon";

export type HospitalListProps = {
  className?: string;
};

export const HospitalList = (props: HospitalListProps) => {
  const { hospitalList = [] } = useAppEnvStore();
  const { className } = props;

  const handleClick = (orgId: string) => {
    appRouter.navigateTo("wareList", {
      query: { orgId },
    });
  };

  return (
    <View className={`px-4 ${className || ""}`}>
      <View className="flex flex-col gap-3 pb-4">
        {hospitalList.map((item) => (
          <View
            key={item.orgId}
            className="p-4 rounded-2xl overflow-hidden cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 2px 12px 0 rgba(0,0,0,0.04)",
            }}
            onClick={() => handleClick(item.orgId)}
          >
            <View className="flex items-center gap-3">
              <View className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)",
                }}>
                <LucideIcon className="text-sky-600" name="hospital" size={24} />
              </View>
              <View className="flex-1">
                <Text className="text-[28px] font-semibold text-slate-800">
                  {item.orgName}
                </Text>
                <Text className="text-[22px] text-slate-400 block mt-1">
                  {item.orgId}
                </Text>
              </View>
              <View className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                <LucideIcon className="text-slate-400" name="chevron-right" size={18} />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};