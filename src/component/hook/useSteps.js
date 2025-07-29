// path: @/component/hook/useSteps.js

import { useState } from "react";

export function useSteps() {
  // State
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");

  // Actions
  const open = () => {
    setVisible(true);
  };

  const close = () => {
    setVisible(false);
    setTitle("");
  };

  // Expose API
  return {
    visible,
    setVisible,
    title,
    setTitle,
    open,
    close,
  };
}
