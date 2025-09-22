import { getWxShopOrderDetail } from "@/client";
import { APP_ENV_CONFIG } from "@/common";
import { AppButton, BasePage, LucideIcon } from "@/components";
import { AddressCard } from "@/components/AddressList/AddressCard";
import { AppFixedBottom } from "@/components/AppFixedBottom";
import { usePageParams, useRequest } from "@/hooks";
import { useAppUserStore } from "@/stores";
import { waitTime } from "@/utils";
import { View } from "@tarojs/components";

const OrderPayPage = () => {
  const appUserStore = useAppUserStore();
  const pageParams = usePageParams<"orderPay">();
  const orderDetailRequest = useRequest(async () => {
    const res = await getWxShopOrderDetail({
      query: { orderNo: pageParams.orderNo, orgId: APP_ENV_CONFIG.ORG_ID },
    });
    return res?.data?.data;
  });
  const addressDetailRequest = useRequest(
    async () => {
      if (!orderDetailRequest.data?.order.addressId) {
        return;
      }
      return appUserStore.addressList.find(
        (item) => item.id === orderDetailRequest.data?.order.addressId,
      );
    },
    {
      refreshDeps: [orderDetailRequest.data?.order.addressId],
    },
  );

  const orderPayRequest = useRequest(async () => {
    await waitTime(1000 * 3);
  });

  return (
    <>
      <BasePage loading={orderPayRequest.loading}>
        <View className="px-[24px] pt-[24px]">
          {addressDetailRequest.data && (
            <AddressCard
              info={addressDetailRequest.data}
              showActions={false}
              rightAction={
                <View className="flex flex-col justify-center">
                  <LucideIcon
                    name="chevron-right text-gray-500 pr-[16px]"
                    size={24}
                  />
                </View>
              }
            />
          )}
        </View>
      </BasePage>
      <AppFixedBottom>
        <AppButton
          className="w-full"
          loading={orderPayRequest.loading}
          onClick={() => {
            orderPayRequest.run();
          }}
        >
          确认支付
        </AppButton>
      </AppFixedBottom>
    </>
  );
};
export default OrderPayPage;
