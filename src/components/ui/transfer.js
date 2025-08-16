// path: @/components/ui/transfer.js

import { useState, useEffect, useCallback, useRef, cloneElement } from "react";
import { Transfer, message, Spin, Modal, Drawer } from "antd";
import { DRAWER_CONFIG, MODAL_CONFIG } from "@/configs";
import styles from "./transfer.module.css";

function buildSearchParams(columns, value) {
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
}

/**
 * Transforms an array of data objects into transfer items with `key` and `disabled` properties
 * based on the provided item configuration.
 *
 * @param {Array<Object>} data - The array of data objects to transform.
 * @param {Object} itemConfig - Configuration for transforming object properties.
 * @param {string} [itemConfig.key] - The property name to use as the item's key.
 * @param {Array|boolean} [itemConfig.disabled] - Disabled configuration:
 *   - Array: Array of condition objects with OR logic
 *     - {column: "fieldName"} - Check truthiness of field
 *     - {column: "fieldName", in: [values]} - Check if field value is in array
 *     - {column: "fieldName", notIn: [values]} - Check if field value is not in array
 *   - Boolean: Direct truthy/falsy value for all items
 *
 * @returns {Array<Object>} Array of transformed items with `key` and `disabled` properties.
 *
 * @example
 * // Example 1: Single condition with 'in'
 * const data = [
 *   { id: 1, status: 'active', role: 'user' },
 *   { id: 2, status: 'banned', role: 'admin' }
 * ];
 * const itemConfig = {
 *   key: 'id',
 *   disabled: [{ column: 'status', in: ['banned'] }]
 * };
 * buildTransferItems(data, itemConfig);
 * // Returns:
 * // [
 * //   { id: 1, status: 'active', role: 'user', key: 1, disabled: false },
 * //   { id: 2, status: 'banned', role: 'admin', key: 2, disabled: true }
 * // ]
 *
 * @example
 * // Example 2: Single condition with 'notIn'
 * const data = [
 *   { id: 1, role: 'admin' },
 *   { id: 2, role: 'user' },
 *   { id: 3, role: 'guest' }
 * ];
 * const itemConfig = {
 *   key: 'id',
 *   disabled: [{ column: 'role', notIn: ['admin', 'user'] }]
 * };
 * buildTransferItems(data, itemConfig);
 * // Returns:
 * // [
 * //   { id: 1, role: 'admin', key: 1, disabled: false },  // admin is in notIn list
 * //   { id: 2, role: 'user', key: 2, disabled: false },   // user is in notIn list
 * //   { id: 3, role: 'guest', key: 3, disabled: true }    // guest is NOT in notIn list
 * // ]
 *
 * @example
 * // Example 3: Multiple conditions (OR logic)
 * const data = [
 *   { id: 1, status: 'active', role: 'user', isVerified: true },
 *   { id: 2, status: 'banned', role: 'admin', isVerified: true },
 *   { id: 3, status: 'active', role: 'guest', isVerified: false }
 * ];
 * const itemConfig = {
 *   key: 'id',
 *   disabled: [
 *     { column: 'status', in: ['banned'] },                    // Disable if banned
 *     { column: 'role', notIn: ['admin', 'user'] },           // Disable if not admin/user
 *     { column: 'isVerified', in: [false] }                   // Disable if not verified
 *   ]
 * };
 * buildTransferItems(data, itemConfig);
 * // Returns:
 * // [
 * //   { id: 1, ..., key: 1, disabled: false },  // active + user + verified
 * //   { id: 2, ..., key: 2, disabled: true },   // banned (condition 1 matches)
 * //   { id: 3, ..., key: 3, disabled: true }    // guest + not verified (conditions 2&3 match)
 * // ]
 *
 * @example
 * // Example 4: Column truthiness check (no conditions)
 * const data = [
 *   { id: 1, name: 'Item 1', isBlocked: false },
 *   { id: 2, name: 'Item 2', isBlocked: true },
 *   { id: 3, name: 'Item 3', isBlocked: null }
 * ];
 * const itemConfig = {
 *   key: 'id',
 *   disabled: [{ column: 'isBlocked' }]  // Check truthiness of isBlocked field
 * };
 * buildTransferItems(data, itemConfig);
 * // Returns:
 * // [
 * //   { id: 1, name: 'Item 1', isBlocked: false, key: 1, disabled: false },
 * //   { id: 2, name: 'Item 2', isBlocked: true, key: 2, disabled: true },
 * //   { id: 3, name: 'Item 3', isBlocked: null, key: 3, disabled: false }
 * // ]
 *
 * @example
 * // Example 5: Direct boolean value
 * const data = [
 *   { id: 1, name: 'Item 1' },
 *   { id: 2, name: 'Item 2' }
 * ];
 * const itemConfig = {
 *   key: 'id',
 *   disabled: true  // All items disabled
 * };
 * buildTransferItems(data, itemConfig);
 * // Returns:
 * // [
 * //   { id: 1, name: 'Item 1', key: 1, disabled: true },
 * //   { id: 2, name: 'Item 2', key: 2, disabled: true }
 * // ]
 */
function buildTransferItems(data = [], itemConfig = {}) {
  if (!Array.isArray(data) || data.length === 0) return [];

  const { key: keyProp, disabled: disabledProp } = itemConfig;

  // Pre-calculate disabled logic for better performance
  const hasDisabledConfig = disabledProp != null;
  const isDisabledArray = Array.isArray(disabledProp);
  const isDisabledBoolean =
    !isDisabledArray && typeof disabledProp === "boolean";

  // For array disabled config, pre-process conditions
  let disabledConditions = null;
  if (isDisabledArray && disabledProp.length > 0) {
    disabledConditions = disabledProp.map((condition) => ({
      column: condition.column,
      hasIn: condition.in != null,
      hasNotIn: condition.notIn != null,
      inArray: condition.in,
      notInArray: condition.notIn,
      isTruthinessCheck: !condition.in && !condition.notIn,
    }));
  }

  return data.map((item) => {
    // More efficient object creation - only add needed properties
    const result = { ...item };

    // Set key property
    if (keyProp && keyProp in item) {
      result.key = item[keyProp];
    }

    // Handle disabled logic with optimized conditions
    if (!hasDisabledConfig) {
      result.disabled = false;
    } else if (isDisabledBoolean) {
      result.disabled = disabledProp;
    } else if (isDisabledArray) {
      if (!disabledConditions) {
        result.disabled = false;
      } else {
        result.disabled = disabledConditions.some((condition) => {
          const {
            column,
            hasIn,
            hasNotIn,
            inArray,
            notInArray,
            isTruthinessCheck,
          } = condition;

          if (!(column in item)) return false;

          const fieldValue = item[column];

          // Truthiness check (fastest path)
          if (isTruthinessCheck) {
            return !!fieldValue;
          }

          // Condition checks
          if (hasIn) {
            return inArray.includes(fieldValue);
          }

          if (hasNotIn) {
            return !notInArray.includes(fieldValue);
          }

          return false;
        });
      }
    } else {
      result.disabled = !!disabledProp;
    }

    return result;
  });
}

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
  rowKey = (record) => record.key,
  render = (record) => record.key,
  listStyle = { width: "100%", height: "100%", minHeight: "300px" },
  responsiveBreakpoint = "md",
  title = undefined,

  // Modal/Drawer specific props
  transferHook = {},
  modalProps = {},
  drawerProps = {},
  trigger = undefined,

  // Other props
  ...props
}) {
  // ========== Hooks and State ==========
  const { transferRef, visible, open, close } = transferHook;
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
        ? buildTransferItems(sourceResult.data || [], sourceItem)
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
        ? buildTransferItems(targetResult.data || [], targetItem)
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
  if (transferRef) {
    transferRef.current = reloadData;
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
          messageApi.warning(result?.message || "Xóa thành công");
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
          ? buildTransferItems(searchResult.data || [], sourceItem)
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
          ? buildTransferItems(searchResult.data || [], targetItem)
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
          title={title}
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
          title={title}
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
