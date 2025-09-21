import { AppButton, AppPopup, BasePage } from "@/components";
import { usePageParams, usePopupControl, useRequest } from "@/hooks";
import { Swiper, Toast } from "@taroify/core";
import { Image, View } from "@tarojs/components";
import { APP_ENV_CONFIG } from "@/common";
import {
  AddressInfo,
  getWxShopProductDetail,
  postWxShopCartAdd,
  SkuInfo,
} from "@/client";
import { safeJson } from "@/utils";
import { SkuSelectContent } from "@/components/SkuSelect/SkuSelectContent";
import { useAppUserStore } from "@/stores";
import { AddressList } from "@/components/AddressList";
import { useState } from "react";
import { DetailInfo } from "./DetailInfo";
import { Actions } from "./Actions";
import { BaseInfo } from "./BaseInfo";
import { ServiceBlock } from "./ServiceBlock";
import { Delivery } from "./Delivery";
import { ModeEnum } from "./enum";

const WareDetail = () => {
  const appUserStore = useAppUserStore();
  const [mode, setMode] = useState<ModeEnum>(ModeEnum.ALL);

  const pageParams = usePageParams<"wareDetail">();
  const control = usePopupControl();
  const selectAddressControl = usePopupControl();
  const [currentSku, setCurrentSku] = useState<SkuInfo>();
  const [currentAddress, setCurrentAddress] = useState<AddressInfo | undefined>(
    appUserStore.defaultAddress,
  );
  const { data } = useRequest(async () => {
    const res = await getWxShopProductDetail({
      query: { productId: pageParams.id, orgId: APP_ENV_CONFIG.ORG_ID },
    });
    setCurrentSku(res.data?.data?.skuList[0]);
    return res.data?.data;
  });
  const addCart = async (sky: SkuInfo) => {
    const res = await postWxShopCartAdd({
      body: {
        productId: data?.id!,
        skuId: sky.id,
        quantity: 1,
        cartId: appUserStore.cartInfo.id,
        orgId: APP_ENV_CONFIG.ORG_ID,
        productName: data?.name!,
        skuName: sky.specs,
      },
    });
    if (res.data?.code === 0) {
      Toast.success("添加成功");
    }
  };
  return (
    <BasePage>
      {data && currentSku && (
        <>
          <View className="pb-[200px]">
            <Swiper className="h-[600px]" autoplay={4000}>
              <Swiper.Indicator />
              {safeJson.parse(data?.detailImages, [])?.map((item, index) => (
                <Swiper.Item key={index}>
                  <Image
                    src={item}
                    className="w-full h-full bg-gray-200"
                    mode="aspectFill"
                  />
                </Swiper.Item>
              ))}
            </Swiper>
            <View className="px-[24px] pt-[32px]">
              {data && <BaseInfo info={data} />}
            </View>
            <View className="px-[24px] pt-[32px]">
              {data?.type === "FW" ? (
                <ServiceBlock />
              ) : (
                <Delivery
                  info={data}
                  currentSku={currentSku}
                  currentAddress={currentAddress}
                  handleSelectAddress={() => {
                    selectAddressControl.setOpen(true);
                  }}
                  handleSelctSku={() => {
                    setMode(ModeEnum.ALL);
                    control.setOpen(true);
                  }}
                />
              )}
            </View>
            {/* <View className="px-[24px] pt-[32px]">
              <Evaluate />
            </View> */}
            <DetailInfo info={data} />
          </View>

          <Actions
            info={data}
            handleAddCart={() => {
              setMode(ModeEnum.ADD_CART);
              control.setOpen(true);
            }}
            handleBuy={() => {
              setMode(ModeEnum.BUY);
              control.setOpen(true);
            }}
          />
          <AppPopup showClose {...control} title={data.name}>
            {currentSku && (
              <SkuSelectContent
                currentSku={currentSku}
                setCurrentSku={setCurrentSku}
                data={data}
                btns={(sku) => (
                  <View className="flex gap-[24px] pt-[48px]">
                    {(mode === ModeEnum.ALL || mode === ModeEnum.ADD_CART) && (
                      <AppButton
                        className="flex-1"
                        status="warning"
                        onClick={() => addCart(sku)}
                      >
                        {mode === ModeEnum.ADD_CART ? "确定" : "加入购物车"}
                      </AppButton>
                    )}
                    {(mode === ModeEnum.ALL || mode === ModeEnum.BUY) && (
                      <AppButton className="flex-1" status="error">
                        {mode === ModeEnum.BUY ? "确定" : "立即购买"}
                      </AppButton>
                    )}
                  </View>
                )}
              />
            )}
          </AppPopup>
          <AppPopup
            style={{
              height: "60vh",
            }}
            showClose
            {...selectAddressControl}
            title="选择地址"
          >
            <AddressList
              selectId={currentAddress?.id}
              addressCardProps={{
                showActions: false,
                handleClick: (info) => {
                  setCurrentAddress(info);
                },
              }}
            />
          </AppPopup>
        </>
      )}
    </BasePage>
  );
};
export default WareDetail;
