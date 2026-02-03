import {
  AppButton,
  AppImage,
  AppPopup,
  BasePage,
  ServiceBlock,
} from "@/components";
import { usePageParams, usePopupControl, useRequest } from "@/hooks";
import { Swiper } from "@taroify/core";
import { View, Text } from "@tarojs/components";
import { APP_ENV_CONFIG } from "@/common";
import {
  AddressInfo,
  getWxShopProductDetail,
  OrderListItem,
  postWxShopOrderPay,
  SkuListItem,
} from "@/client";
import { appToast, safeJson } from "@/utils";
import { SkuSelectContent } from "@/components/SkuSelect/SkuSelectContent";
import { useAppAuthStore, useAppUserStore } from "@/stores";
import { useState } from "react";
import Box from "@/components/Box";
import { orderPay } from "@/utils/order";
import { add, multiply, round, subtract } from "lodash-es";
import { DetailInfo } from "./DetailInfo";
import { Actions } from "./Actions";
import { BaseInfo } from "./BaseInfo";
import AddressSelect from "./AddressSelect";
import { ServiceTags } from "./ServiceTags";
import { Skeleton } from "./Skeleton";
import { Delivery } from "./Delivery";

const WareDetail = () => {
  const appUserStore = useAppUserStore();
  const useAuthStore = useAppAuthStore();

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
    if (!(res.data?.data?.type === "FW")) {
      const { skuList = [] } = res.data?.data || {};
      if (skuList && skuList.length > 0) {
        setCurrentSku(skuList[0]);
      }
    }
    return res.data?.data;
  });

  const getAmount = () => {
    /**
     * 运费金额
     */
    const freightAmount = 0;
    /**
     * 订单总金额
     * 规格现价 * 数量 + 运费
     */
    const totalAmount = round(
      add(multiply(quantity, currentSku?.price || 0), freightAmount),
      2,
    );
    /**
     * 优惠金额
     * 数量 * (规格原价 - 规格现价)
     */
    const discountAmount = round(
      multiply(
        quantity,
        subtract(currentSku?.originalPrice || 0, currentSku?.price || 0),
      ),
      2,
    );
    /**
     * 实际支付金额
     * 订单总金额-优惠金额
     */
    const paymentAmount = round(subtract(totalAmount, discountAmount), 2);
    return {
      freightAmount,
      totalAmount,
      paymentAmount,
      discountAmount,
    };
  };

  const handlePay = useRequest(
    async () => {
      if (useAuthStore.isMiniprogram) {
        appToast.info("暂不支持小程序购买");
        return;
      }
      if (!productInfo || !currentSku) {
        return;
      }
      if (!currentAddress?.id) {
        appToast.error("请选择收货地址");
        return;
      }
      try {
        const postWxShopOrderPayRes = await postWxShopOrderPay({
          body: {
            orgId: APP_ENV_CONFIG.ORG_ID,
            addressId: currentAddress.id,
            payType: 1,
            ...getAmount(),
            productList: [
              {
                productId: productInfo.id,
                productName: productInfo.name,
                skuList: [
                  {
                    itemId: currentSku.id,
                    itemName: currentSku.specs,
                    num: quantity,
                    price: currentSku.price,
                  },
                ],
              },
            ],
          },
        });
        if (
          postWxShopOrderPayRes.data?.code !== 0 ||
          !postWxShopOrderPayRes.data?.data
        ) {
          throw new Error("订单创建失败");
        }
        await orderPay(postWxShopOrderPayRes.data.data, {
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

  const getServiceAmount = () => {
    /**
     * 运费
     */
    const freightAmount = 0;
    /**
     * 总价
     * 商品现价 + 运费
     */
    const totalAmount = round(add(productInfo?.price || 0, freightAmount), 2);
    /**
     * 优惠金额
     * 商品原价 - 商品现价
     */
    const discountAmount = round(
      subtract(productInfo?.originalPrice || 0, productInfo?.price || 0),
      2,
    );
    /**
     * 实际支付金额
     * 总价 - 优惠金额
     */
    const paymentAmount = round(subtract(totalAmount, discountAmount), 2);
    return {
      freightAmount,
      totalAmount,
      paymentAmount,
      discountAmount,
    };
  };

  const handleServerPay = useRequest(
    async () => {
      if (useAuthStore.isMiniprogram) {
        appToast.info("暂不支持小程序购买");
        return;
      }
      if (!productInfo) {
        return;
      }
      if (!currentAddress?.id) {
        appToast.error("请选择收货地址");
        return;
      }
      try {
        const postWxShopOrderPayRes = await postWxShopOrderPay({
          body: {
            orgId: APP_ENV_CONFIG.ORG_ID,
            addressId: currentAddress.id,
            payType: 1,
            ...getServiceAmount()!,
            productList: [
              {
                productId: productInfo.id,
                productName: productInfo.name,
              },
            ],
          },
        });
        if (
          postWxShopOrderPayRes.data?.code !== 0 ||
          !postWxShopOrderPayRes.data?.data
        ) {
          throw new Error("订单创建失败");
        }
        await orderPay(postWxShopOrderPayRes.data.data, {
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

  if (!productInfo) {
    return;
  }

  const isFW = productInfo?.type === "FW";

  const getServiceBlock = () => {
    if (!isFW) {
      return;
    }
    const serviceList: OrderListItem["productList"][number]["services"] =
      productInfo.itemsList
        ? productInfo.itemsList?.map((item) => ({
            ...item,
            qty: item.num,
            qrCode: "",
            serviceDate: "",
          }))
        : [];
    return <ServiceBlock serviceList={serviceList} />;
  };

  const getPopup = () => {
    if (isFW) {
      return (
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
                loading={handleServerPay.loading}
                className="flex-1"
                status="error"
                onClick={() => {
                  handleServerPay.run();
                }}
              >
                <Text className="text-[24px]">￥</Text>
                <Text>{getServiceAmount().paymentAmount}</Text>
                <Text>付款</Text>
              </AppButton>
            </View>
          }
        >
          {getServiceBlock()}
        </AppPopup>
      );
    }
    return (
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
              loading={handlePay.loading}
              onClick={() => {
                if (!currentSku) {
                  appToast.error("请选择商品规格");
                  return;
                }
                handlePay.run();
              }}
            >
              <Text className="text-[24px]">￥</Text>
              <Text>{getAmount().paymentAmount}</Text>
              <Text>付款</Text>
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
    );
  };
  return (
    <BasePage>
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
          <View className="px-[24px] pt-[32px] flex flex-col gap-[24px]">
            <BaseInfo info={productInfo} />
            {!isFW && (
              <Delivery
                sku={currentSku}
                handleClick={() => {
                  control.setOpen(true);
                }}
              />
            )}
            {getServiceBlock()}
            <Box
              bgProps={{
                className: "bg-white rounded-xl",
              }}
            >
              <View className="px-[24px] py-[16px] flex flex-col">
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

        {getPopup()}
      </>
    </BasePage>
  );
};
export default WareDetail;
