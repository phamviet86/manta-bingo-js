// path: @/component/common/steps.js

import React, { useState, useCallback, cloneElement } from "react";
import { message, Steps, Button, Space, Modal, Drawer, Flex } from "antd";
import { DRAWER_CONFIG, MODAL_CONFIG } from "@/component/config";

export function AntSteps({
  // Steps variant configuration
  variant = "page", // "page" | "modal" | "drawer"

  // Steps configuration
  steps = [],

  // Completion handler
  onComplete = undefined,
  onCompleteError = undefined,
  onCompleteSuccess = undefined,
  showCompleteMessage = true,

  // Modal/Drawer specific props
  stepsHook = {},
  modalProps = {},
  drawerProps = {},
  trigger = undefined,

  // Other props
  ...props
}) {
  // ========== Hooks and State ==========
  const [current, setCurrent] = useState(0);
  const { visible, open, close } = stepsHook;
  const [messageApi, contextHolder] = message.useMessage();

  // ========== Event Handlers ==========
  const goToNextStep = useCallback(() => {
    setCurrent((c) => c + 1);
  }, []);

  const goToPrevStep = useCallback(() => {
    setCurrent((c) => c - 1);
  }, []);

  const handleCancel = useCallback(() => {
    setCurrent(0);
    close?.();
  }, [close]);

  // Complete button handler with error handling
  const handleComplete = useCallback(async () => {
    if (!onComplete) {
      if (showCompleteMessage) {
        messageApi.error("Complete handler not provided");
      }
      return false;
    }

    try {
      const result = await onComplete();
      if (showCompleteMessage) {
        messageApi.success(result?.message || "Hoàn thành");
      }
      onCompleteSuccess?.(result);
      setCurrent(0);
      close?.();
      return result || true;
    } catch (error) {
      const errorMessage = error?.message || "Đã xảy ra lỗi";
      messageApi.error(errorMessage);
      onCompleteError?.(error);
      return false;
    }
  }, [
    onComplete,
    onCompleteSuccess,
    onCompleteError,
    showCompleteMessage,
    messageApi,
    close,
  ]);

  // ========== Configuration Setup ==========
  const defaultButtons = [
    current > 0 && (
      <Button key="back" onClick={goToPrevStep}>
        Quay lại
      </Button>
    ),
    current < steps.length - 1 && (
      <Button key="next" type="primary" onClick={goToNextStep}>
        Tiếp theo
      </Button>
    ),
    current === steps.length - 1 && (
      <Button key="submit" type="primary" onClick={handleComplete}>
        Hoàn tất
      </Button>
    ),
  ].filter(Boolean);

  // Base Step Buttons Component - to avoid duplication
  const baseStepButtons = (
    <Flex
      justify="space-between"
      align="middle"
      style={{ width: "100%" }}
      gap="small"
      wrap
    >
      {/* Left: Cancel button */}
      <Button key="cancel" onClick={handleCancel}>
        Huỷ
      </Button>

      {/* Right: navigation buttons */}
      <Flex justify="flex-end" gap="small" wrap>
        {defaultButtons}
      </Flex>
    </Flex>
  );

  // ========== Base Steps Content ==========
  const baseStepsContent = (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Steps current={current} items={steps} {...props} />
      {steps[current]?.content}
      {variant === "page" && (
        <div style={{ marginTop: 16 }}>{baseStepButtons}</div>
      )}
    </Space>
  );

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
          onClose={() => {
            setCurrent(0);
            close?.();
          }}
          footer={baseStepButtons}
        >
          {baseStepsContent}
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
          onCancel={() => {
            setCurrent(0);
            close?.();
          }}
          footer={baseStepButtons}
        >
          {baseStepsContent}
        </Modal>
      </>
    );
  }

  // Default: page variant
  return (
    <>
      {contextHolder}
      {baseStepsContent}
    </>
  );
}
