import { AppButton, BasePage, LucideIcon } from "@/components";
import { AddressList } from "@/components/AddressList";
import { isIOS } from "@/utils";
import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
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
          round
          onClick={() => {
            Taro.chooseAddress({
              success: function (res) {
                console.log(res.userName);
                console.log(res.postalCode);
                console.log(res.provinceName);
                console.log(res.cityName);
                console.log(res.countyName);
                console.log(res.detailInfo);
                console.log(res.nationalCode);
                console.log(res.telNumber);
              },
            });
          }}
        >
          新增地址
        </AppButton>
      </View>
    </>
  );
};

export default AddressManage;
