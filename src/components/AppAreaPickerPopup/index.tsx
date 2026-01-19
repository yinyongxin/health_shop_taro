import { AreaPicker, Popup } from "@taroify/core";
import { ReactNode, useState } from "react";
import { areaList } from "@vant/area-data";
import { AreaPickerProps } from "@taroify/core/area-picker/area-picker";

type AppAreaPickerPopupProps = {
  children?: (options: { handleOpen: () => void }) => ReactNode;
  areaPickerProps?: AreaPickerProps;
};
const AppAreaPickerPopup = (props: AppAreaPickerPopupProps) => {
  const { children, areaPickerProps } = props;
  const { onConfirm, onCancel, ...otherAreaPickerProps } =
    areaPickerProps || {};
  const [open, setOpen] = useState(false);

  return (
    <>
      {children?.({
        handleOpen: () => {
          setOpen(true);
        },
      })}
      <Popup open={open} rounded placement="bottom" onClose={setOpen}>
        <Popup.Backdrop />
        <AreaPicker
          onCancel={() => {
            setOpen(false);
          }}
          onConfirm={(val, option) => {
            console.log("AreaPicker onConfirm:", val, option);
            onConfirm?.(val, option);
            setOpen(false);
          }}
          {...otherAreaPickerProps}
        >
          <AreaPicker.Toolbar>
            <AreaPicker.Button>取消</AreaPicker.Button>
            <AreaPicker.Title>地区选择</AreaPicker.Title>
            <AreaPicker.Button>确认</AreaPicker.Button>
          </AreaPicker.Toolbar>
          <AreaPicker.Columns>{areaList}</AreaPicker.Columns>
        </AreaPicker>
      </Popup>
    </>
  );
};
export default AppAreaPickerPopup;
