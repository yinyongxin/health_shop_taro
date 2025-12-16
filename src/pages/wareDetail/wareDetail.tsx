import {
  AppButton,
  AppImage,
  AppPopup,
  BasePage,
  ServiceBlock,
} from "@/components";
import { usePageParams, usePopupControl, useRequest } from "@/hooks";
import { Swiper } from "@taroify/core";
import { View } from "@tarojs/components";
import { APP_ENV_CONFIG } from "@/common";
import {
  AddressInfo,
  getWxShopProductDetail,
  postWxShopOrderPay,
  SkuListItem,
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
import AddressSelect from "./AddressSelect";
import { ServiceTags } from "./ServiceTags";
import { Skeleton } from "./Skeleton";

const WareDetail = () => {
  const appUserStore = useAppUserStore();

  const pageParams = usePageParams<"wareDetail">();
  const control = usePopupControl();
  const [quantity, setQuantity] = useState(1);
  const [currentSku, setCurrentSku] = useState<SkuListItem>();

  // 默认地址
  const [currentAddress, setCurrentAddress] = useState<AddressInfo | undefined>(
    appUserStore.defaultAddress,
  );

  // 商品详情
  const { data: productInfo, loading } = useRequest(async () => {
    const res = await getWxShopProductDetail({
      query: { productId: pageParams.id, orgId: APP_ENV_CONFIG.ORG_ID },
    });
    const { skuList = [] } = res?.data?.data || {};
    if (skuList && skuList.length > 0) {
      setCurrentSku(skuList[0]);
    }
    return res.data?.data;
  });

  const handlePay = useRequest(
    async (sku: SkuListItem) => {
      if (!productInfo) {
        return;
      }
      if (!currentAddress?.id) {
        appToast.error("请选择收货地址");
        return;
      }
      try {
        /**
         * 运费金额
         */
        const freightAmount = 0;
        /**
         * 订单总金额
         * 规格现价 * 数量 + 运费
         */
        const totalAmount = add(multiply(quantity, sku.price), freightAmount);
        /**
         * 优惠金额
         * 数量 * (规格原价 - 规格现价)
         */
        const discountAmount = multiply(
          quantity,
          subtract(sku.originalPrice, sku.price),
        );
        /**
         * 实际支付金额
         * 订单总金额-优惠金额
         */
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
                productId: productInfo.id,
                productName: productInfo.name,
                skuList: [
                  {
                    itemId: sku.id,
                    itemName: sku.specs,
                    num: quantity,
                    price: sku.price,
                  },
                ],
              },
            ],
          },
        });
        if (postWxShopOrderPayRes.data?.code !== 0) {
          throw new Error("订单创建失败");
        }
        await orderPayByWx(postWxShopOrderPayRes.data.data, {
          success: () => {
            appToast.success("支付成功");
            control.setOpen(false);
          },
        });
      } catch {
        appToast.error("支付失败");
      }
    },
    {
      manual: true,
    },
  );

  const handleServerPay = useRequest(
    async () => {
      if (!productInfo) {
        return;
      }
      if (!currentAddress?.id) {
        appToast.error("请选择收货地址");
        return;
      }
      try {
        /**
         * 运费
         */
        const freightAmount = 0;
        /**
         * 总价
         * 商品现价 + 运费
         */
        const totalAmount = add(productInfo.price, freightAmount);
        /**
         * 优惠金额
         * 商品原价 - 商品现价
         */
        const discountAmount = subtract(
          productInfo.originalPrice,
          productInfo.price,
        );
        /**
         * 实际支付金额
         * 总价 - 优惠金额
         */
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
                productId: productInfo.id,
                productName: productInfo.name,
              },
            ],
          },
        });
        if (postWxShopOrderPayRes.data?.code !== 0) {
          throw new Error("订单创建失败");
        }
        await orderPayByWx(postWxShopOrderPayRes.data.data, {
          success: () => {
            appToast.success("支付成功");
            control.setOpen(false);
          },
        });
      } catch {
        appToast.error("支付失败");
      }
    },
    {
      manual: true,
    },
  );

  if (loading && !productInfo) {
    return <Skeleton />;
  }

  const isFW = productInfo?.type === "FW";
  return (
    <BasePage>
      {productInfo && (
        <>
          <View className="pb-[200px]">
            <Swiper className="h-[600px]" autoplay={4000}>
              <Swiper.Indicator />
              {safeJson
                .parse(productInfo?.detailImages, [])
                ?.map((item, index) => (
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
              <BaseInfo info={productInfo} />
            </View>
            <View className="px-[24px] pt-[32px] flex flex-col gap-[16px]">
              {isFW && <ServiceBlock serviceList={productInfo.itemsList} />}
              <Box
                bgProps={{
                  className: "bg-white rounded-lg",
                }}
              >
                <View className="px-[24px] py-[12px] flex flex-col">
                  <AddressSelect
                    address={currentAddress}
                    handleSelectAddress={(val) => {
                      setCurrentAddress(val);
                    }}
                  />
                </View>
              </Box>

              {/* <Evaluate /> */}
              <ServiceTags productInfo={productInfo} />
            </View>
            <DetailInfo info={productInfo} />
          </View>

          <Actions
            info={productInfo}
            handleBuy={() => {
              control.setOpen(true);
            }}
          />

          {isFW ? (
            <AppPopup
              showClose
              {...control}
              title={productInfo.name}
              footer={
                <View>
                  <AddressSelect
                    className="py-[24px]"
                    address={currentAddress}
                    handleSelectAddress={(val) => {
                      setCurrentAddress(val);
                    }}
                  />
                  <AppButton
                    className="flex-1"
                    status="error"
                    onClick={() => {
                      handleServerPay.run();
                    }}
                  >
                    付款
                  </AppButton>
                </View>
              }
            >
              <ServiceBlock serviceList={productInfo.itemsList} />
            </AppPopup>
          ) : (
            <AppPopup
              showClose
              {...control}
              title={productInfo.name}
              footer={
                <View>
                  <AddressSelect
                    className="py-[24px]"
                    address={currentAddress}
                    handleSelectAddress={(val) => {
                      setCurrentAddress(val);
                    }}
                  />
                  <AppButton
                    className="flex-1"
                    status="error"
                    onClick={() => {
                      if (!currentSku) {
                        appToast.error("请选择商品规格");
                        return;
                      }
                      handlePay.run(currentSku);
                    }}
                  >
                    付款
                  </AppButton>
                </View>
              }
            >
              {currentSku && (
                <SkuSelectContent
                  quantity={quantity}
                  quantityChange={setQuantity}
                  currentSku={currentSku}
                  setCurrentSku={setCurrentSku}
                  data={productInfo}
                />
              )}
            </AppPopup>
          )}
        </>
      )}
    </BasePage>
  );
};
export default WareDetail;
