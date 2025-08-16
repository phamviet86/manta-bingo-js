// path: @/components/ui/confirm.js

import { useCallback } from "react";
import { Popconfirm, message } from "antd";

export function AntConfirm({
  // Action handling props
  onConfirm = undefined,
  onConfirmError = undefined,
  onConfirmSuccess = undefined,
  onCancel = undefined,
  onCancelError = undefined,
  onCancelSuccess = undefined,

  // Message configuration
  showConfirmMessage = false,
  showCancelMessage = false,

  // Popconfirm trigger
  children = undefined,

  // Other props
  ...props
}) {
  // ========== Hooks and State ==========
  const [messageApi, contextHolder] = message.useMessage();

  // ========== Event Handlers ==========
  // Confirm button handler with error handling
  const handleConfirm = useCallback(async () => {
    if (!onConfirm) {
      messageApi.error("Data confirm handler not provided");
      return false;
    }

    try {
      const result = await onConfirm();
      if (showConfirmMessage && result?.message) {
        messageApi.success(result.message);
      }
      onConfirmSuccess?.(result);
      return result || true;
    } catch (error) {
      messageApi.error(error.message || "Đã xảy ra lỗi");
      onConfirmError?.(error);
      return false;
    }
  }, [
    onConfirm,
    onConfirmSuccess,
    onConfirmError,
    showConfirmMessage,
    messageApi,
  ]);

  // Cancel button handler with error handling
  const handleCancel = useCallback(async () => {
    if (!onCancel) {
      messageApi.error("Data cancel handler not provided");
      return false;
    }

    try {
      const result = await onCancel();
      if (showCancelMessage && result?.message) {
        messageApi.warning(result.message);
      }
      onCancelSuccess?.(result);
      return result || false;
    } catch (error) {
      messageApi.error(error.message || "Đã xảy ra lỗi");
      onCancelError?.(error);
      return false;
    }
  }, [onCancel, onCancelSuccess, onCancelError, showCancelMessage, messageApi]);

  // ========== Render Logic ==========
  return (
    <>
      {contextHolder}
      <Popconfirm
        {...props}
        onConfirm={onConfirm ? handleConfirm : undefined}
        onCancel={onCancel ? handleCancel : undefined}
      >
        {children}
      </Popconfirm>
    </>
  );
}
