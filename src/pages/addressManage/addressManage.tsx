import { AppButton, BasePage, LucideIcon } from "@/components";
import { AddressList } from "@/components/AddressList";
import { appRouter } from "@/router";
import { isIOS } from "@/utils";
import { View } from "@tarojs/components";
import classNames from "classnames";

const AddressManage = () => {
  return (
    <>
      <BasePage
        wapperProps={{
          className: "py-[24px] pb-[160px]",
        }}
      >
        <AddressList />
      </BasePage>
      <View
        className={classNames("p-2 bg-blur fixed bottom-0 w-full", {
          "pb-[48px]": isIOS(),
        })}
      >
        <AppButton
          prefix={<LucideIcon name="plus" />}
          onClick={() => {
            appRouter.navigateTo("addAddress");
          }}
        >
          新增地址
        </AppButton>
      </View>
    </>
  );
};

export default AddressManage;
