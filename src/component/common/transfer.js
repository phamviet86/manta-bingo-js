// path: @/component/common/transfer.js

import { useState, useEffect, useCallback, useRef, cloneElement } from "react";
import { Transfer, message, Spin, Modal, Drawer } from "antd";
import { convertTransferItems } from "@/lib/util/convert-util";
import { DRAWER_CONFIG, MODAL_CONFIG } from "@/component/config";
import styles from "../style/transfer.module.css";

const buildSearchParams = (columns, value) => {
  if (!columns.length || !value?.trim()) {
    return {};
  }

  if (columns.length === 1) {
    return { [columns[0]]: value.trim() };
  } else {
    const or = {};
    columns.forEach((key) => {
      or[key] = value.trim();
    });
    return { or };
  }
};

export function AntTransfer({
  // Transfer variant configuration
  variant = "page", // "page" | "modal" | "drawer"

  // Data handling props
  onSourceRequest = undefined,
  sourceParams = undefined,
  sourceItem = undefined,
  onTargetRequest = undefined,
  targetParams = undefined,
  targetItem = undefined,
  onAddItem = undefined,
  onRemoveItem = undefined,
  afterClose = undefined, // used in modal/drawer variants

  // Search configuration
  showSearch = false,
  searchSourceColumns = [],
  searchTargetColumns = [],

  // Display configuration
  listStyle = { width: "100%", height: "100%", minHeight: "300px" },
  rowKey = (record) => record.key,
  render = (record) => record.key,
  responsiveBreakpoint = "md",

  // Modal/Drawer specific props
  transferHook = {},
  modalProps = {},
  drawerProps = {},
  trigger = undefined,

  // Other props
  ...props
}) {
  // ========== Hooks and State ==========
  const { reloadRef, visible, open, close } = transferHook;
  const [messageApi, contextHolder] = message.useMessage();
  const [dataSource, setDataSource] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  // Dữ liệu request từ server
  const [sourceRequestData, setSourceRequestData] = useState([]);
  const [targetRequestData, setTargetRequestData] = useState([]);
  const [sourceSearchKeys, setSourceSearchKeys] = useState([]);
  const [targetSearchKeys, setTargetSearchKeys] = useState([]);
  // Loading state
  const [loading, setLoading] = useState(true);

  // ========== Event Handlers ==========
  // Data handling
  const handleData = useCallback(() => {
    // Lấy key theo thứ tự
    const sourceKeys = sourceRequestData.map((item) => item.key);
    const targetKeys = targetRequestData.map((item) => item.key);

    setTargetKeys(targetKeys);

    // Tạo lookup map
    const targetMap = new Map(
      targetRequestData.map((item) => [item.key, item])
    );
    const sourceMap = new Map(
      sourceRequestData.map((item) => [item.key, item])
    );

    // Duyệt theo thứ tự source, ưu tiên dữ liệu ở target
    const mergedData = sourceKeys.map((key) =>
      targetMap.has(key) ? targetMap.get(key) : sourceMap.get(key)
    );

    setDataSource(mergedData);
  }, [sourceRequestData, targetRequestData]);

  useEffect(() => {
    handleData();
  }, [handleData]);

  // Data request handlers with error handling
  const handleSourceRequest = useCallback(async () => {
    setLoading(true);
    if (!onSourceRequest) {
      messageApi.error("Source data request handler not provided");
      setLoading(false);
      return;
    }

    try {
      const sourceResult = await onSourceRequest(sourceParams);
      const sourceData = sourceItem
        ? convertTransferItems(sourceResult.data || [], sourceItem)
        : sourceResult.data || [];

      setSourceRequestData(sourceData);
      setLoading(false);
      return;
    } catch (error) {
      messageApi.error(error.message || "Đã xảy ra lỗi khi tải dữ liệu source");
      setLoading(false);
      return;
    }
  }, [onSourceRequest, sourceParams, sourceItem, messageApi]);

  const handleTargetRequest = useCallback(async () => {
    setLoading(true);
    if (!onTargetRequest) {
      messageApi.error("Target data request handler not provided");
      setLoading(false);
      return;
    }

    try {
      const targetResult = await onTargetRequest(targetParams);
      const targetData = targetItem
        ? convertTransferItems(targetResult.data || [], targetItem)
        : targetResult.data || [];

      setTargetRequestData(targetData);
      setLoading(false);
      return;
    } catch (error) {
      messageApi.error(error.message || "Đã xảy ra lỗi khi tải dữ liệu target");
      setLoading(false);
      return;
    }
  }, [onTargetRequest, targetParams, targetItem, messageApi]);

  // Data reload functionality
  const reloadDataRef = useRef();

  const reloadData = useCallback(async () => {
    // Tải lại target trước
    await handleTargetRequest();
    // Sau khi target đã xong, tải lại source
    await handleSourceRequest();
  }, [handleTargetRequest, handleSourceRequest]);

  // Đảm bảo luôn cập nhật ref tới hàm reloadData mới nhất
  reloadDataRef.current = reloadData;

  // Expose reload function cho external hook
  if (reloadRef) {
    reloadRef.current = reloadData;
  }

  // Khi mount: tải lại dữ liệu (chỉ cho variant "page")
  useEffect(() => {
    if (variant === "page") {
      setLoading(true);
      reloadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Khi modal/drawer mở: tải lại dữ liệu
  useEffect(() => {
    if ((variant === "modal" || variant === "drawer") && visible) {
      setLoading(true);
      reloadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, variant]);

  // Target add/remove handlers with error handling
  const handleTargetAdd = useCallback(
    async (keys) => {
      if (!onAddItem) {
        messageApi.error("Data add handler not provided");
        return;
      }
      try {
        const result = await onAddItem(keys);
        if (result?.success) {
          messageApi.success(result?.message || "Thêm thành công");
          await reloadDataRef.current();
        }
      } catch (error) {
        messageApi.error(error.message || "Đã xảy ra lỗi");
        return;
      }
    },
    [onAddItem, messageApi]
  );

  const handleTargetRemove = useCallback(
    async (keys) => {
      if (!onRemoveItem) {
        messageApi.error("Data remove handler not provided");
        return;
      }
      try {
        const result = await onRemoveItem(keys);
        if (result?.success) {
          messageApi.success(result?.message || "Xóa thành công");
          await reloadDataRef.current();
        }
      } catch (error) {
        messageApi.error(error.message || "Đã xảy ra lỗi");
        return;
      }
    },
    [onRemoveItem, messageApi]
  );

  // Khi chuyển record (sang phải/trái)
  const handleChange = useCallback(
    async (_, direction, moveKeys) => {
      if (direction === "right") {
        await handleTargetAdd(moveKeys);
      } else {
        await handleTargetRemove(moveKeys);
      }
    },
    [handleTargetAdd, handleTargetRemove]
  );

  // Search handlers with debouncing
  const handleSourceSearch = useCallback(
    async (searchValue) => {
      if (!searchValue?.trim()) {
        setSourceSearchKeys([]);
        return;
      }
      if (!onSourceRequest) {
        messageApi.error("Source data request handler not provided");
        return;
      }

      setLoading(true);
      const searchParams = buildSearchParams(searchSourceColumns, searchValue);

      try {
        const searchResult = await onSourceRequest({
          ...sourceParams,
          ...searchParams,
        });
        const sourceData = sourceItem
          ? convertTransferItems(searchResult.data || [], sourceItem)
          : searchResult.data || [];

        setSourceSearchKeys(sourceData.map((item) => item.key));
        setLoading(false);
        return;
      } catch (error) {
        messageApi.error(
          error.message || "Đã xảy ra lỗi khi tải dữ liệu source"
        );
        setLoading(false);
        return;
      }
    },
    [onSourceRequest, sourceParams, sourceItem, messageApi, searchSourceColumns]
  );

  const handleTargetSearch = useCallback(
    async (searchValue) => {
      if (!searchValue?.trim()) {
        setTargetSearchKeys([]);
        return;
      }

      if (!onTargetRequest) {
        messageApi.error("Target data request handler not provided");
        return;
      }

      setLoading(true);
      const searchParams = buildSearchParams(searchTargetColumns, searchValue);

      try {
        const searchResult = await onTargetRequest({
          ...targetParams,
          ...searchParams,
        });
        const targetData = targetItem
          ? convertTransferItems(searchResult.data || [], targetItem)
          : searchResult.data || [];

        setTargetSearchKeys(targetData.map((item) => item.key));
        setLoading(false);
        return;
      } catch (error) {
        messageApi.error(
          error.message || "Đã xảy ra lỗi khi tải dữ liệu target"
        );
        setLoading(false);
        return;
      }
    },
    [onTargetRequest, targetParams, targetItem, messageApi, searchTargetColumns]
  );

  // Search timeout ref for debouncing
  const searchTimeoutRef = useRef();

  const handleSearch = useCallback(
    (direction, value) => {
      // Clear previous timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      // Set new timeout with 300ms delay
      searchTimeoutRef.current = setTimeout(() => {
        if (direction === "left") {
          handleSourceSearch(value);
        } else {
          handleTargetSearch(value);
        }
      }, 300);
    },
    [handleSourceSearch, handleTargetSearch]
  );

  const handleFilter = useCallback(
    (_, option, direction) => {
      if (direction === "left") {
        return sourceSearchKeys.includes(option.key);
      }
      if (direction === "right") {
        return targetSearchKeys.includes(option.key);
      }
      return false;
    },
    [sourceSearchKeys, targetSearchKeys]
  );

  const handleClose = useCallback(() => {
    close();
    afterClose?.();
  }, [afterClose, close]);

  // ========== Base Transfer Props ==========
  const baseTransferProps = {
    ...props,
    direction: "vertical",
    dataSource,
    targetKeys,
    onChange: handleChange,
    onSearch: handleSearch,
    rowKey,
    render,
    listStyle,
    showSearch,
    filterOption: handleFilter,
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
          onClose={handleClose}
        >
          {visible ? (
            <Spin spinning={loading} tip="Đang tải dữ liệu..." delay={500}>
              <div
                className={`${styles.remoteTransfer} ${
                  styles[`responsive-${responsiveBreakpoint}`]
                }`}
              >
                <Transfer {...baseTransferProps} />
              </div>
            </Spin>
          ) : null}
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
          onCancel={handleClose}
          footer={null} // No footer buttons in modal
        >
          {visible ? (
            <Spin spinning={loading} tip="Đang tải dữ liệu..." delay={500}>
              <div
                className={`${styles.remoteTransfer} ${
                  styles[`responsive-${responsiveBreakpoint}`]
                }`}
              >
                <Transfer {...baseTransferProps} />
              </div>
            </Spin>
          ) : null}
        </Modal>
      </>
    );
  }

  // Default: page variant
  return (
    <>
      {contextHolder}
      <Spin spinning={loading} tip="Đang tải dữ liệu..." delay={500}>
        <div
          className={`${styles.remoteTransfer} ${
            styles[`responsive-${responsiveBreakpoint}`]
          }`}
        >
          <Transfer {...baseTransferProps} />
        </div>
      </Spin>
    </>
  );
}
