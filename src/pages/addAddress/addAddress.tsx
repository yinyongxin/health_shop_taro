import { AppButton, BasePage } from "@/components";
import { AppFixedBottom } from "@/components/AppFixedBottom";
import { EditAddressContent } from "@/components/EditAddressContent";
import { View } from "@tarojs/components";

const AddAddress = () => {
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
            btn={
              <AppFixedBottom>
                <AppButton
                  className="w-full"
                  status="primary"
                  // onClick={() => {
                  //   form.submit();
                  // }}
                >
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

export default AddAddress;
