// path: @/component/common/table.js

import { useCallback, cloneElement } from "react";
import { message, Modal, Drawer } from "antd";
import { ProTable } from "@ant-design/pro-components";
import { TABLE_CONFIG, DRAWER_CONFIG, MODAL_CONFIG } from "@/component/config";

export function AntTable({
  // Table variant configuration
  variant = "page", // "page" | "modal" | "drawer"

  // Data handling props
  onRequest = undefined,
  onRequestSuccess = undefined,
  onRequestError = undefined,
  requestParams = undefined,

  // Row selection props
  onRowsSelect = undefined,
  onRowsSelectError = undefined,
  selectType = "checkbox",

  // Column configuration
  columns = [],
  leftColumns = [],
  rightColumns = [],

  // Display configuration
  showSearch = true,
  showOptions = false,
  showPagination = true,
  syncToUrl = true,

  // Header configuration
  title = undefined,
  extra = undefined,

  // Modal/Drawer specific props
  tableHook = {},
  modalProps = {},
  drawerProps = {},
  trigger = undefined,

  // Other props
  ...props
}) {
  // ========== Hooks and State ==========
  const { tableRef, visible, open, close } = tableHook;
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

  // Row selection handler with error handling
  const handleRowsSelect = useCallback(
    (_, selectedRowsData) => {
      if (!onRowsSelect) return true;

      try {
        onRowsSelect(selectedRowsData);
        return true;
      } catch (error) {
        const errorMessage = error?.message || "An error occurred";
        messageApi.error(errorMessage);
        onRowsSelectError?.(error);
        return false;
      }
    },
    [onRowsSelect, onRowsSelectError, messageApi]
  );

  // ========== Configuration Setup ==========
  // Column configuration
  const allColumns = [...leftColumns, ...columns, ...rightColumns];

  // Row selection configuration
  const rowSelectionConfig = onRowsSelect
    ? { type: selectType, onChange: handleRowsSelect }
    : undefined;

  // Feature configurations
  const searchConfig = showSearch ? TABLE_CONFIG.search : false;
  const paginationConfig = showPagination ? TABLE_CONFIG.pagination : false;
  const optionsConfig = showOptions ? TABLE_CONFIG.options : false;
  const formConfig = syncToUrl
    ? { syncToUrl: (values, _) => values }
    : undefined;

  // ========== Base Table Props ==========
  const baseTableProps = {
    ...props,
    actionRef: tableRef,
    columns: allColumns,
    request: onRequest ? handleDataRequest : undefined,
    params: requestParams,
    headerTitle: title,
    toolBarRender: extra ? () => extra : undefined,
    rowSelection: rowSelectionConfig,
    form: formConfig,
    search: searchConfig,
    pagination: paginationConfig,
    options: optionsConfig,
    tableAlertRender: false,
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
        <Drawer
          {...DRAWER_CONFIG}
          {...drawerProps}
          open={visible}
          onClose={close}
        >
          <ProTable {...baseTableProps} />
        </Drawer>
      </>
    );
  }

  // If variant is "modal", render ModalForm
  if (variant === "modal") {
    return (
      <>
        {contextHolder}
        {trigger && cloneElement(trigger, { onClick: open })}
        <Modal
          {...MODAL_CONFIG}
          {...modalProps}
          open={visible}
          onCancel={close}
          footer={null} // No footer buttons in modal
        >
          <ProTable {...baseTableProps} />
        </Modal>
      </>
    );
  }

  // Default: page variant
  return (
    <>
      {contextHolder}
      <ProTable {...baseTableProps} />
    </>
  );
}
