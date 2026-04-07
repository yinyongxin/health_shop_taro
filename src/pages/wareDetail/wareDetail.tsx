import {
  AppButton,
  AppImage,
  AppPopup,
  BasePage,
  NewServiceBlock,
  Title,
} from "@/components";
import { usePageParams, usePopupControl, useRequest } from "@/hooks";
import { Dialog, Swiper } from "@taroify/core";
import { View, Text } from "@tarojs/components";
import {
  getWxShopProductDetail,
  postWxShopOrderPay,
  SkuListItem,
} from "@/client";
import { appToast, safeJson } from "@/utils";
import { SkuSelectContent } from "@/components/SkuSelect/SkuSelectContent";
import { useAppAuthStore, useAppEnvStore, useAppUserStore } from "@/stores";
import { useState } from "react";
import { orderPay } from "@/utils/order";
import { appRouter } from "@/router";
import { add, multiply, round, subtract } from "lodash-es";
import { DetailInfo } from "./DetailInfo";
import { Actions } from "./Actions";
import { BaseInfo } from "./BaseInfo";
import AddressSelect from "./AddressSelect";
import { Skeleton } from "./Skeleton";
import { Delivery } from "./Delivery";

const WareDetail = () => {
  const appUserStore = useAppUserStore();
  const authStore = useAppAuthStore();
  const appEnvStore = useAppEnvStore();

  const pageParams = usePageParams<"wareDetail">();
  const control = usePopupControl();
  const [quantity, setQuantity] = useState(1);
  const [currentSku, setCurrentSku] = useState<SkuListItem>();
  const { currentAddress, updateCurrentAddress } = appUserStore;

  // 商品详情
  const { data: productInfo, loading } = useRequest(async () => {
    const res = await getWxShopProductDetail({
      query: {
        productId: pageParams.id,
      },
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
    const paymentAmount = totalAmount;
    return {
      freightAmount,
      totalAmount,
      paymentAmount,
      discountAmount,
    };
  };

  const handlePay = useRequest(
    async () => {
      if (!productInfo || !currentSku) {
        return;
      }
      if (!currentAddress) {
        appToast.error("请选择收货地址");
        return;
      }
      try {
        const postWxShopOrderPayRes = await postWxShopOrderPay({
          body: {
            orgId: appEnvStore.orgId,
            addressId: currentAddress?.id,
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
    const totalAmount = round(productInfo?.price || 0, 2);
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
    const paymentAmount = totalAmount;

    return {
      freightAmount,
      totalAmount,
      paymentAmount,
      discountAmount,
    };
  };

  const handleServerPay = useRequest(
    async () => {
      if (!productInfo) {
        return;
      }

      if (!currentAddress) {
        appToast.error("请选择收货地址");
        return;
      }

      if (!currentAddress?.idNo) {
        Dialog.confirm({
          theme: "rounded",
          title: "提示",
          message:
            "当前地址没有身份证信息，需要身份证信息才能购买服务，是否去完善地址？",
          onConfirm: () => {
            appRouter.navigateTo("editAddress", {
              query: {
                detail: currentAddress,
              },
            });
          },
        });
        return;
      }

      const postWxShopOrderPayRes = await postWxShopOrderPay({
        body: {
          payType: 1,
          orgId: appEnvStore.orgId,
          ...getServiceAmount(),
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
        appToast.error("订单创建失败");
        return;
      }
      try {
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

  const isFW = productInfo.type === "FW";

  const amountInfo = isFW ? getServiceAmount() : getAmount();

  const getServiceBlock = () => {
    if (!isFW) {
      return;
    }
    return <NewServiceBlock serviceList={productInfo?.itemsList} />;
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
                  updateCurrentAddress(val);
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
                <Text>{amountInfo.paymentAmount}</Text>
                <Text>付款</Text>
              </AppButton>
            </View>
          }
        >
          <View className="px-2">{getServiceBlock()}</View>
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
                updateCurrentAddress(val);
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
              <Text>{amountInfo.paymentAmount}</Text>
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

  // const serviceTagsRender = () => {
  //   const serviceTags = safeJson.parse(productInfo.serviceTags, []);
  //   if (serviceTags.length === 0) {
  //     return null;
  //   }
  //   return (
  //     <ServiceTags
  //       className="border-t border-gray-100"
  //       serviceTags={serviceTags}
  //     />
  //   );
  // };

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
          <BaseInfo info={productInfo} />
          {!isFW && (
            <AddressSelect
              className="px-[24px] py-2 bg-white border-t border-gray-100"
              address={currentAddress}
              handleSelectAddress={(val) => {
                updateCurrentAddress(val);
              }}
            />
          )}
          {/* {serviceTagsRender()} */}

          {!isFW && (
            <Delivery
              className="border-t border-gray-100"
              sku={currentSku}
              handleClick={() => {
                control.setOpen(true);
              }}
            />
          )}

          <Title className="px-[24px] mt-[24px]">医院</Title>
          <View className="p-2 pb-0">
            <View className="p-2 bg-white rounded-md ">
              <View className="text-[28px] font-bold">
                {productInfo.orgName}
              </View>
              <View className="color-gray-500 mt-2">{productInfo.orgId}</View>
            </View>
          </View>
          {/* 
          <Title className="px-[24px] mt-[24px]">服务内容</Title> */}
          <View className="px-2 mt-3">{getServiceBlock()}</View>

          <DetailInfo info={productInfo} />
        </View>

        <Actions
          info={productInfo}
          handleBuy={() => {
            if (authStore.isMiniprogram) {
              appToast.info("暂不支持小程序购买");
              return;
            }
            control.setOpen(true);
          }}
        />

        {getPopup()}
      </>
    </BasePage>
  );
};
export default WareDetail;
