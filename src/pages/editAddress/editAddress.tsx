import { AppButton, BasePage } from "@/components";
import { AppFixedBottom } from "@/components/AppFixedBottom";
import { EditAddressContent } from "@/components/EditAddressContent";
import { usePageParams } from "@/hooks";
import { useAppUserStore } from "@/stores";
import { View } from "@tarojs/components";
import { navigateBack } from "@tarojs/taro";

const EditeAddress = () => {
  const { detail } = usePageParams<"editAddress">();
  const appUserStore = useAppUserStore();
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
              appUserStore.updateAddressList();
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
