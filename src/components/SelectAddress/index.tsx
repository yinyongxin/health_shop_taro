import { appRouter } from "@/router";
import { usePopupControl } from "@/hooks";
import { Text } from "@tarojs/components";
import { AddressInfo } from "@/client";
import { AddressList } from "../AddressList";
import { AppButton } from "../AppButton";
import { AppPopup } from "../AppPopup";

type SelectAddressProps = {
  selectId?: number;
  onChange?: (id: number, addressInfo: AddressInfo) => void;
  children?: (control: ReturnType<typeof usePopupControl>) => React.ReactNode;
};
export const SelectAddress = (props: SelectAddressProps) => {
  const { selectId, onChange, children } = props;
  const selectAddressControl = usePopupControl();
  return (
    <>
      {children?.(selectAddressControl)}
      <AppPopup
        style={{
          height: "60vh",
        }}
        {...selectAddressControl}
        title="选择地址"
        leftAction={
          <Text
            onClick={() => {
              appRouter.navigateTo("addAddress");
            }}
            className="text-sky-500 font-bold"
          >
            新增地址
          </Text>
        }
        footer={
          <AppButton
            className="w-full"
            onClick={() => selectAddressControl.setOpen(false)}
          >
            确定
          </AppButton>
        }
        showClose
      >
        <AddressList
          selectId={selectId}
          addressCardProps={{
            showActions: false,
            handleClick: (info) => {
              onChange?.(info?.id!, info);
            },
          }}
        />
      </AppPopup>
    </>
  );
};
