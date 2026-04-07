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
  const address = appUserStore.addressList.find(
    (item) => item.id === detail?.id,
  );
  return (
    <>
      <BasePage
        wapperProps={{
          className: "py-[24px] pb-[180px]",
        }}
      >
        <View className="px-[24px] ">
          <EditAddressContent
            defaultValues={address}
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
