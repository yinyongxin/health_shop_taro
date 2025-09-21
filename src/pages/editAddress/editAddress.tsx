import { AppButton, BasePage } from "@/components";
import { AppFixedBottom } from "@/components/AppFixedBottom";
import { EditAddressContent } from "@/components/EditAddressContent";
import { usePageParams } from "@/hooks";
import { View } from "@tarojs/components";
import { navigateBack } from "@tarojs/taro";

const EditeAddress = () => {
  const { detail } = usePageParams<"editAddress">();
  return (
    <>
      <BasePage
        wapperProps={{
          className: "py-[24px] pb-[160px]",
        }}
      >
        <View className="px-[24px] ">
          <EditAddressContent
            className="rounded-lg overflow-hiddenn bg-white"
            defaultValues={detail}
            success={() => {
              navigateBack({
                delta: 1,
              });
            }}
            btn={
              <AppFixedBottom>
                <AppButton className="w-full" status="primary">
                  保存
                </AppButton>
              </AppFixedBottom>
            }
          />
        </View>
      </BasePage>
    </>
  );
};

export default EditeAddress;
