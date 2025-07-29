// path: @/component/common/drawer.js

import { useCallback, cloneElement } from "react";
import { Drawer as AntDrawer, message, Space } from "antd";
import { AntButton } from "@/component/common";
import { DRAWER_CONFIG } from "@/component/config";

export function Drawer({
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

  // Drawer trigger
  trigger = undefined,

  // Button text configuration
  okText = "OK",
  cancelText = "Cancel",

  // Drawer reference hook
  drawerHook = {},

  // Other props
  ...props
}) {
  // ========== Hooks and State ==========
  const { visible, open, close } = drawerHook;
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
      <AntDrawer
        {...props}
        {...DRAWER_CONFIG}
        open={visible}
        onClose={close}
        extra={
          <Space>
            <AntButton
              label={cancelText}
              onClick={handleCancel}
              color="default"
              variant="outlined"
              key="cancel-button"
            />
            <AntButton
              label={okText}
              onClick={handleOk}
              color="primary"
              variant="solid"
              key="ok-button"
            />
          </Space>
        }
      />
    </>
  );
}
