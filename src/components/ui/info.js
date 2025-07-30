// path: @/components/ui/description.js

import { useCallback, cloneElement } from "react";
import { message, Modal, Drawer } from "antd";
import { ProDescriptions } from "@ant-design/pro-components";
import { DRAWER_CONFIG, MODAL_CONFIG } from "@/configs";

export function AntInfo({
  // Descriptions variant configuration
  variant = "page", // "page" | "modal" | "drawer"

  // Data handling props
  onRequest = undefined,
  onRequestSuccess = undefined,
  onRequestError = undefined,
  requestParams = undefined,

  // Column configuration
  column = { xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 },

  // Header configuration
  title = undefined,
  extra = undefined,

  // Info reference hook
  infoHook = {},

  // Modal/Drawer specific props
  modalProps = {},
  drawerProps = {},
  trigger = undefined,

  // Other props
  ...props
}) {
  // ========== Hooks and State ==========
  const { infoRef, visible, open, close } = infoHook;
  const [messageApi, contextHolder] = message.useMessage();

  // ========== Event Handlers ==========
  // Data request handler with error handling
  const handleDataRequest = useCallback(
    async (params) => {
      if (!onRequest) {
        messageApi.error("Data request handler not provided");
        return false;
      }

      try {
        const result = await onRequest(params);
        // result: { success, message, data: array }
        onRequestSuccess?.(result);
        return { success: true, data: result?.data?.[0] || {} };
      } catch (error) {
        const errorMessage = error?.message || "An error occurred";
        messageApi.error(errorMessage);
        onRequestError?.(error);
        return false;
      }
    },
    [onRequest, onRequestSuccess, onRequestError, messageApi]
  );

  // ========== Base Descriptions Props ==========
  const baseDescriptionsProps = {
    ...props,
    actionRef: infoRef,
    request: onRequest ? handleDataRequest : undefined,
    params: requestParams,
    column: column,
    extra: extra,
  };

  // ========== Render Logic ==========
  // If variant is "drawer", render DrawerForm
  if (variant === "drawer") {
    return (
      <>
        {contextHolder}
        {trigger && cloneElement(trigger, { onClick: open })}
        {visible === false ? null : (
          <Drawer
            {...DRAWER_CONFIG}
            {...drawerProps}
            open={visible}
            onClose={close}
            title={title}
          >
            <ProDescriptions {...baseDescriptionsProps} />
          </Drawer>
        )}
      </>
    );
  }

  // If variant is "modal", render ModalForm
  if (variant === "modal") {
    return (
      <>
        {contextHolder}
        {trigger && cloneElement(trigger, { onClick: open })}
        {visible === false ? null : (
          <Modal
            {...MODAL_CONFIG}
            {...modalProps}
            open={visible}
            onCancel={close}
            title={title}
            footer={null} // No footer buttons in modal
          >
            <ProDescriptions {...baseDescriptionsProps} />
          </Modal>
        )}
      </>
    );
  }

  // Default: page variant
  return (
    <>
      {contextHolder}
      <ProDescriptions {...baseDescriptionsProps} title={title} />
    </>
  );
}
