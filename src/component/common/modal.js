// path: @/component/common/modal.js

import { useCallback, cloneElement } from "react";
import { Modal as AntModal, message } from "antd";
import { MODAL_CONFIG } from "@/component/config";

export function Modal({
  // Action handling props
  onOk = undefined,
  onOkError = undefined,
  onOkSuccess = undefined,
  onCancel = undefined,
  onCancelError = undefined,
  onCancelSuccess = undefined,

  // Message configuration
  showOkMessage = false,
  showCancelMessage = false,

  // Modal trigger
  trigger = undefined,

  // Modal reference hook
  modalHook = {},

  // Other props
  ...props
}) {
  // ========== Hooks and State ==========
  const { visible, open, close } = modalHook;
  const [messageApi, contextHolder] = message.useMessage();

  // ========== Event Handlers ==========
  // OK button handler with error handling
  const handleOk = useCallback(async () => {
    if (!onOk) {
      messageApi.error("OK handler not provided");
      return false;
    }

    try {
      const result = await onOk();
      close();
      if (showOkMessage && result?.message) {
        messageApi.success(result.message);
      }
      onOkSuccess?.(result);
      return result || true;
    } catch (error) {
      messageApi.error(error.message || "Đã xảy ra lỗi");
      onOkError?.(error);
      return false;
    }
  }, [onOk, onOkSuccess, onOkError, showOkMessage, messageApi, close]);

  // Cancel button handler with error handling
  const handleCancel = useCallback(async () => {
    if (!onCancel) {
      close();
      return false;
    }

    try {
      const result = await onCancel();
      close();
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
  }, [
    onCancel,
    onCancelSuccess,
    onCancelError,
    showCancelMessage,
    messageApi,
    close,
  ]);

  // ========== Render Logic ==========
  return (
    <>
      {contextHolder}
      {trigger ? cloneElement(trigger, { onClick: open }) : null}
      <AntModal
        {...props}
        {...MODAL_CONFIG}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </>
  );
}
