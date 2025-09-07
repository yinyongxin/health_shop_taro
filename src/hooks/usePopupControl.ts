import { useState } from "react";

export const usePopupControl = () => {
  const [open, setOpen] = useState(false);
  return {
    open,
    setOpen,
    onClose: () => {
      setOpen(false);
    },
  };
};
