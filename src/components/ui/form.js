// path: @/components/ui/form.js

import { useCallback, cloneElement } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { message, Popconfirm, Flex, Modal, Drawer } from "antd";
import { BetaSchemaForm } from "@ant-design/pro-components";
import { AntButton } from "@/components/ui";
import { FORM_CONFIG, MODAL_CONFIG, DRAWER_CONFIG } from "@/configs";

export function AntForm({
  // Form variant configuration
  variant = "page", // "page" | "modal" | "drawer"

  // Data handling props
  onRequest = undefined,
  onRequestSuccess = undefined,
  onRequestError = undefined,
  requestParams = undefined,

  // Data submit handlers
  onSubmit = undefined,
  onSubmitSuccess = undefined,
  onSubmitError = undefined,

  // Data delete handlers
  onDelete = undefined,
  onDeleteSuccess = undefined,
  onDeleteError = undefined,
  deleteParams = undefined,

  // Form configuration
  fields = [],
  extra = [],
  title = undefined,
  showDeleteBtn = true,

  // Form reference hook
  formHook = {},

  // Modal/Drawer specific props
  modalProps = {},
  drawerProps = {},
  trigger = undefined,

  // Other props
  ...props
}) {
  // ========== Hooks and State ==========
  const { formRef, visible, open, close, reset } = formHook;
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
        return result.data[0] || {};
      } catch (error) {
        const errorMessage = error?.message || "Đã xảy ra lỗi";
        messageApi.error(errorMessage);
        onRequestError?.(error);
        return false;
      }
    },
    [onRequest, onRequestSuccess, onRequestError, messageApi]
  );

  // Data submit handler with error handling
  const handleDataSubmit = useCallback(
    async (values) => {
      if (!onSubmit) {
        messageApi.error("Data submit handler not provided");
        return false;
      }
      if (!values) return false;

      try {
        const result = await onSubmit(values);
        // result: { success, message, data: array }
        messageApi.success(result.message);
        if (variant === "modal" || variant === "drawer") close(); // Close drawer/modal if variant is set
        onSubmitSuccess?.(result);
        return true;
      } catch (error) {
        const errorMessage = error?.message || "Đã xảy ra lỗi";
        messageApi.error(errorMessage);
        onSubmitError?.(error);
        return false;
      }
    },
    [onSubmit, onSubmitSuccess, onSubmitError, variant, messageApi, close]
  );

  // Data delete handler with error handling
  const handleDataDelete = useCallback(async () => {
    if (!onDelete) {
      messageApi.error("Data delete handler not provided");
      return false;
    }

    try {
      const result = await onDelete(deleteParams);
      // result: { success, message, data: array }
      messageApi.warning(result.message);
      if (variant === "modal" || variant === "drawer") close(); // Close drawer/modal if variant is set
      onDeleteSuccess?.(result);
      return true;
    } catch (error) {
      const errorMessage = error?.message || "Đã xảy ra lỗi";
      messageApi.error(errorMessage);
      onDeleteError?.(error);
      return false;
    }
  }, [
    onDelete,
    onDeleteSuccess,
    onDeleteError,
    deleteParams,
    variant,
    messageApi,
    close,
  ]);

  // ========== Configuration Setup ==========
  // Configure submitter buttons based on available handlers
  const renderFormButtons = (_, defaultDoms) => (
    <Flex
      justify="space-between"
      align="middle"
      style={{ width: "100%" }}
      gap="small"
      wrap
    >
      {/* Left: delete */}
      {showDeleteBtn && onDelete ? (
        <Popconfirm
          key="delete-button"
          title="Xác nhận xóa?"
          description="Bạn có chắc chắn muốn xóa?"
          onConfirm={handleDataDelete}
          okText="Xóa"
          cancelText="Hủy"
        >
          <AntButton
            color="danger"
            variant="outlined"
            label="Xoá"
            icon={<DeleteOutlined />}
          />
        </Popconfirm>
      ) : (
        <div />
      )}

      {/* Right: reset + submit */}
      <Flex justify="flex-end" gap="small" wrap>
        {extra}
        <AntButton
          key="reset-button"
          label="Khôi phục"
          onClick={() => reset()}
        />
        {defaultDoms}
      </Flex>
    </Flex>
  );

  // Submitter config for page variant
  const submitterConfig = {
    searchConfig: { resetText: "Khôi phục", submitText: "Lưu" },
    resetButtonProps: {
      style: {
        display: "none",
      },
    },
    render: renderFormButtons,
  };

  // Submitter config for modal/drawer variants (no buttons in form)
  const submitterConfigModalDrawer = {
    render: () => null,
  };

  // ========== Base Form Props ==========
  const baseFormProps = {
    ...props,
    ...FORM_CONFIG,
    formRef,
    columns: fields ? fields : undefined,
    request: onRequest ? handleDataRequest : undefined,
    params: requestParams,
    onFinish: onSubmit ? handleDataSubmit : undefined,
    submitter:
      variant === "modal" || variant === "drawer"
        ? submitterConfigModalDrawer
        : submitterConfig,
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
            footer={renderFormButtons({ form: formRef?.current }, [
              <AntButton
                key="submit-button"
                type="primary"
                label="Lưu"
                onClick={() => formRef?.current?.submit()}
              />,
            ])}
          >
            <BetaSchemaForm {...baseFormProps} />
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
            footer={renderFormButtons({ form: formRef?.current }, [
              <AntButton
                key="submit-button"
                type="primary"
                label="Lưu"
                onClick={() => formRef?.current?.submit()}
              />,
            ])}
            title={title}
          >
            <BetaSchemaForm {...baseFormProps} />
          </Modal>
        )}
      </>
    );
  }

  // Default: page variant
  return (
    <>
      {contextHolder}
      <BetaSchemaForm title={title} {...baseFormProps} />
    </>
  );
}
