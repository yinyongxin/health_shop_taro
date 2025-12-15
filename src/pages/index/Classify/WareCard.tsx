import { getGetWare } from "@/client";
import { AppImage } from "@/components";
import Box from "@/components/Box";
import { useRequest } from "@/hooks";
import { View, Text, Image } from "@tarojs/components";

export const WareCard = () => {
  const dataRequest = useRequest(async () => {
    const res = await getGetWare();
    return res.data;
  });
  return (
    <Box
      bgProps={{
        className: "rounded app-shadow-sm bg-white",
      }}
    >
      <View className="px-[24px] py-[24px] flex gap-2">
        <AppImage
          className="size-[140px] rounded shrink-0 bg-gray-200"
          src={dataRequest.data?.mainPicture || ""}
        />
        <View className="flex-1 flex flex-col justify-between">
          <View>
            <Text className="text-[28px] font-bold">
              {dataRequest.data?.name}
            </Text>
          </View>
          <View></View>
          <View></View>
        </View>
      </View>
    </Box>
  );
};
