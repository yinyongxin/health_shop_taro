import { AppButton, AppImage, AppPopup, BasePage } from "@/components";
import { usePageParams, usePopupControl, useRequest } from "@/hooks";
import { Swiper } from "@taroify/core";
import { View } from "@tarojs/components";
import { APP_ENV_CONFIG } from "@/common";
import {
  AddressInfo,
  getWxShopCartDelete,
  getWxShopProductDetail,
  postWxShopOrderPay,
  SkuInfo,
} from "@/client";
import { appToast, safeJson } from "@/utils";
import { SkuSelectContent } from "@/components/SkuSelect/SkuSelectContent";
import { useAppUserStore } from "@/stores";
import { useState } from "react";
import Box from "@/components/Box";
import { orderPayByWx } from "@/utils/order";
import { add, multiply, subtract } from "lodash-es";
import { DetailInfo } from "./DetailInfo";
import { Actions } from "./Actions";
import { BaseInfo } from "./BaseInfo";
import { Delivery } from "./Delivery";
import { ModeEnum } from "./enum";
import AddressSelect from "./AddressSelect";

const WareDetail = () => {
  const appUserStore = useAppUserStore();
  const [mode, setMode] = useState<ModeEnum>(ModeEnum.BUY);

  const pageParams = usePageParams<"wareDetail">();
  const control = usePopupControl();
  const [quantity, setQuantity] = useState(1);
  const [currentSku, setCurrentSku] = useState<SkuInfo>();

  // 默认地址
  const [currentAddress, setCurrentAddress] = useState<AddressInfo | undefined>(
    appUserStore.defaultAddress,
  );

  // 商品详情
  const { data } = useRequest(async () => {
    const res = await getWxShopProductDetail({
      query: { productId: pageParams.id, orgId: APP_ENV_CONFIG.ORG_ID },
    });
    setCurrentSku(res.data?.data?.skuList[0]);
    return res.data?.data;
  });

  // 添加购物车
  // const addCartRequest = useRequest(
  //   async (sky: SkuInfo) => {
  //     const res = await postWxShopCartAdd({
  //       body: {
  //         productId: data?.id!,
  //         skuId: sky.id,
  //         quantity,
  //         cartId: appUserStore.cartInfo.id,
  //         orgId: APP_ENV_CONFIG.ORG_ID,
  //         productName: data?.name!,
  //         skuName: sky.specs,
  //       },
  //     });
  //     if (res.data?.code === 0) {
  //       Toast.success("添加成功");
  //       control.setOpen(false);
  //     }
  //   },
  //   {
  //     manual: true,
  //   },
  // );

  // const clearCart = async () => {
  //   const { itemList } = appUserStore.cartInfo;
  //   if (itemList.length === 0) {
  //     return;
  //   }
  //   await Promise.all(
  //     itemList.map(async (item) => {
  //       await getWxShopCartDelete({
  //         query: {
  //           cartItemId: item.id?.toString(),
  //         },
  //       });
  //     }),
  //   );
  //   await appUserStore.updateCartInfo();
  // };

  // const handlePay = useRequest(
  //   async (sky: SkuInfo) => {
  //     try {
  //       appLoading.show("创建订单中...");
  //       await clearCart();
  //       const res = await postWxShopCartAdd({
  //         body: {
  //           productId: data?.id!,
  //           skuId: sky.id,
  //           quantity,
  //           cartId: appUserStore.cartInfo.id,
  //           orgId: APP_ENV_CONFIG.ORG_ID,
  //           productName: data?.name!,
  //           skuName: sky.specs,
  //         },
  //       });
  //       if (res.data?.code !== 0) {
  //         throw new Error("添加失败");
  //       }
  //       const updateCartInfoRes = await appUserStore.updateCartInfo();

  //       const createOrderRes = await createOrder({
  //         cartId: updateCartInfoRes.cartInfo.id,
  //         itemList: updateCartInfoRes.cartInfo.itemList,
  //       });
  //       appLoading.hide();
  //       appRouter.navigateTo("orderPay", {
  //         query: {
  //           orderNo: createOrderRes.orderNo,
  //         },
  //       });
  //     } catch {
  //       appToast.error("创建失败");
  //     } finally {
  //       appUserStore.updateCartInfo();
  //       control.setOpen(false);
  //     }
  //   },
  //   {
  //     manual: true,
  //   },
  // );

  const handlePay = useRequest(
    async (sku: SkuInfo) => {
      if (!data) {
        return;
      }
      if (!currentAddress?.id) {
        appToast.error("请选择收货地址");
        return;
      }
      try {
        const freightAmount = 0;
        const totalAmount = multiply(quantity, sku.price);
        const discountAmount = multiply(
          quantity,
          subtract(sku.price, sku.originalPrice),
        );
        const paymentAmount = subtract(totalAmount, discountAmount);
        const postWxShopOrderPayRes = await postWxShopOrderPay({
          body: {
            orgId: APP_ENV_CONFIG.ORG_ID,
            addressId: currentAddress.id,
            payType: 1,
            totalAmount,
            freightAmount,
            paymentAmount,
            discountAmount,
            productList: [
              {
                productId: data.id,
                productName: data.name,
                skuList: [
                  {
                    skuId: sku.id,
                    skuName: sku.specs,
                    num: quantity,
                    price: sku.price,
                  },
                ],
              },
            ],
          },
        });
        if (postWxShopOrderPayRes.data?.code !== 0) {
          throw new Error("添加失败");
        }
        orderPayByWx(postWxShopOrderPayRes.data.data, {
          success: () => {
            appToast.success("支付成功");
          },
        });
      } catch {
        appToast.error("支付失败");
      } finally {
        control.setOpen(false);
      }
    },
    {
      manual: true,
    },
  );
  return (
    <BasePage>
      {data && currentSku && (
        <>
          <View className="pb-[200px]">
            <Swiper className="h-[600px]" autoplay={4000}>
              <Swiper.Indicator />
              {safeJson.parse(data?.detailImages, [])?.map((item, index) => (
                <Swiper.Item key={index}>
                  <AppImage
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
              {/* {data?.type === "FW" ? (
                <ServiceBlock />
              ) : ( */}
              <Delivery
                info={data}
                currentSku={currentSku}
                handleSelctSku={() => {
                  setMode(ModeEnum.ALL);
                  control.setOpen(true);
                }}
              />
              <Box
                className="mt-[16px]"
                bgProps={{
                  className: "bg-white rounded-lg",
                }}
              >
                <View className="px-[24px] py-[12px]">
                  <AddressSelect
                    address={currentAddress}
                    handleSelectAddress={(val) => {
                      setCurrentAddress(val);
                    }}
                  />
                </View>
              </Box>
              {/* )} */}
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
                quantity={quantity}
                quantityChange={setQuantity}
                currentSku={currentSku}
                setCurrentSku={setCurrentSku}
                data={data}
                btns={(sku) => (
                  <View className="flex gap-[24px]">
                    {/* {(mode === ModeEnum.ALL || mode === ModeEnum.ADD_CART) && (
                      <AppButton
                        className="flex-1"
                        status="warning"
                        round
                        disabled={addCartRequest.loading}
                        loading={addCartRequest.loading}
                        onClick={() => addCartRequest.run(sku)}
                      >
                        {mode === ModeEnum.ADD_CART ? "确定" : "加入购物车"}
                      </AppButton>
                    )} */}
                    {(mode === ModeEnum.ALL || mode === ModeEnum.BUY) && (
                      <AppButton
                        className="flex-1"
                        status="error"
                        round
                        onClick={() => {
                          handlePay.run(sku);
                        }}
                      >
                        {mode === ModeEnum.BUY ? "确定" : "立即购买"}
                      </AppButton>
                    )}
                  </View>
                )}
              />
            )}
          </AppPopup>
        </>
      )}
    </BasePage>
  );
};
export default WareDetail;
