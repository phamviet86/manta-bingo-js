// path: @/components/ui/list.js

import { useCallback, cloneElement } from "react";
import { message, Modal, Drawer } from "antd";
import { ProList } from "@ant-design/pro-components";
import { LIST_CONFIG, DRAWER_CONFIG, MODAL_CONFIG } from "@/configs";

export function AntList({
  // List variant configuration
  variant = "page", // "page" | "modal" | "drawer"

  // Data handling props
  onRequest = undefined,
  onRequestSuccess = undefined,
  onRequestError = undefined,
  requestParams = undefined,

  // List rendering props
  renderItem = undefined,
  metas = {},

  // Display configuration
  showSearch = true,
  showOptions = false,
  showPagination = true,
  showCard = true,
  grid = undefined,
  syncToUrl = true,

  // Header configuration
  title = undefined,
  extra = undefined,

  // List reference hook
  listHook = {},

  // Modal/Drawer specific props
  modalProps = {},
  drawerProps = {},
  trigger = undefined,

  // Other props
  ...props
}) {
  // ========== Hooks and State ==========
  const { listRef, visible, open, close } = listHook;
  const [messageApi, contextHolder] = message.useMessage();

  // ========== Event Handlers ==========
  // Data request handler with error handling
  const handleDataRequest = useCallback(
    async (params, sort, filter) => {
      if (!onRequest) {
        messageApi.error("Data request handler not provided");
        return false;
      }

      try {
        const result = await onRequest(params, sort, filter);
        onRequestSuccess?.(result);
        return result;
      } catch (error) {
        const errorMessage = error?.message || "An error occurred";
        messageApi.error(errorMessage);
        onRequestError?.(error);
        return false;
      }
    },
    [onRequest, onRequestSuccess, onRequestError, messageApi]
  );

  // ========== Configuration Setup ==========
  // List metas configuration
  const listMetas = metas;

  // Feature configurations
  const searchConfig = showSearch ? LIST_CONFIG.search : false;
  const paginationConfig = showPagination ? LIST_CONFIG.pagination : false;
  const optionsConfig = showOptions ? LIST_CONFIG.options : false;
  const gridConfig = grid || LIST_CONFIG.grid;
  const formConfig = syncToUrl
    ? { syncToUrl: (values, _) => values }
    : undefined;

  // ========== Base List Props ==========
  const baseListProps = {
    ...props,
    actionRef: listRef,
    metas: listMetas,
    renderItem: renderItem,
    request: onRequest ? handleDataRequest : undefined,
    params: requestParams,
    headerTitle: title,
    toolBarRender: extra ? () => extra : undefined,
    form: formConfig,
    search: searchConfig,
    pagination: paginationConfig,
    options: optionsConfig,
    grid: showCard ? gridConfig : undefined,
    rowKey: "id",
    bordered: true,
    ghost: true,
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
          >
            <ProList {...baseListProps} />
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
            footer={null} // No footer buttons in modal
          >
            <ProList {...baseListProps} />
          </Modal>
        )}
      </>
    );
  }

  // Default: page variant
  return (
    <>
      {contextHolder}
      <ProList {...baseListProps} />
    </>
  );
}
