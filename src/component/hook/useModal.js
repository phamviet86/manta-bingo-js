import { useState } from "react";

export function useModal() {
  // State
  const [visible, setVisible] = useState(false);

  // Actions
  const open = () => {
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
  };

  // Expose API
  return {
    visible,
    open,
    close,
  };
}
