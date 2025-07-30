// path: @/utils/column-util.js

export function buildColumns(schema, columnMapping) {
  if (Array.isArray(columnMapping) && columnMapping.length > 0) {
    return columnMapping
      .map((item) => {
        const col = schema.find((c) => c.key === item.key);
        if (!col) return null;
        const { key, ...configProps } = item;
        return { ...col, ...configProps };
      })
      .filter(Boolean);
  }
  return schema;
}
