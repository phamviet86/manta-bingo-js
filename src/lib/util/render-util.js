// path: @/lib/util/render-util.js

import { Tag, Badge, Typography } from "antd";
import { presetPrimaryColors } from "@ant-design/colors";
import { COLOR_ENUM } from "@/component/config/enum-config";

// Helper function to map columns with display configuration
export function renderColumns(columns, columnMapping) {
  if (Array.isArray(columnMapping) && columnMapping.length > 0) {
    return columnMapping
      .map((item) => {
        const col = columns.find((c) => c.key === item.key);
        if (!col) return null;
        const { key, ...configProps } = item;
        return { ...col, ...configProps };
      })
      .filter(Boolean);
  }
  return columns;
}

export function renderTextArea(text) {
  return (
    <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
      {text}
    </div>
  );
}

export function renderEnum(
  enumData,
  key,
  label = null,
  variant = undefined,
  props = {}
) {
  // Early return if no key or enumData
  if (!key || !enumData || typeof enumData !== "object") {
    return label || key || null;
  }

  const enumItem = enumData[key] || {};
  const { text = "", status, color } = enumItem;
  const displayText = label || text || key;

  // Get processed color and status
  const textColor = color ? COLOR_ENUM[color]?.color || color : undefined;

  // Render component based on variant
  switch (variant) {
    case "tag":
      return (
        <Tag {...props} color={status || color}>
          {displayText}
        </Tag>
      );

    case "badge":
      return (
        <Badge
          {...props}
          status={status}
          color={status || color}
          text={displayText}
        />
      );

    default:
      return (
        <Typography.Text
          {...props}
          style={{
            color: textColor ? presetPrimaryColors[textColor] : undefined,
          }}
        >
          {displayText}
        </Typography.Text>
      );
  }
}
