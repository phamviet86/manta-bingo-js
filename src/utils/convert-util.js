// path: @/utils/convert-util.js

/**
 * Converts and maps columns from a schema based on a provided column mapping.
 *
 * If a valid columnMapping array is provided, it returns a new array where each item
 * is merged from the schema's column (matched by key) and the corresponding mapping config.
 * If no valid mapping is provided, it returns the original schema.
 *
 * @param {Array<Object>} schema - The array of column definitions, each with a `key` property.
 * @param {Array<Object>} columnMapping - The array of mapping objects, each with a `key` and optional config properties.
 * @returns {Array<Object>} The mapped and merged columns, or the original schema if no mapping is provided.
 */
export function convertColumns(schema, columnMapping) {
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

/**
 * Creates both enum data and options from an array of objects, with optional filtering
 *
 * @param {Array<Object>} data - Array of data to process
 * @param {Object} columnMapping - Column configuration
 * @param {string} columnMapping.value - Property name to use as key/value
 * @param {string} columnMapping.label - Property name to use as display text
 * @param {string} [columnMapping.color] - Optional property name for color/status information
 * @param {Object} [filterParams={}] - Optional filter parameters (field:value pairs)
 * @returns {Object} Object containing both enum and options { valueEnum: Object, options: Array }
 */
export function convertSelections(
  data = [],
  columnMapping = {},
  filterParams = {}
) {
  if (!Array.isArray(data) || data.length === 0) {
    return { valueEnum: {}, options: [] };
  }

  const { value: valueKey, label: labelKey, color: colorKey } = columnMapping;

  // Early return if required keys are missing
  if (!valueKey || !labelKey) {
    return { valueEnum: {}, options: [] };
  }

  const filterEntries = Object.entries(filterParams);
  const hasFilters = filterEntries.length > 0;

  const valueEnum = {};
  const options = [];

  for (const item of data) {
    // Skip invalid items or items that don't have the required value
    if (!item || item[valueKey] === undefined) continue;

    // Apply filters if provided
    if (
      hasFilters &&
      !filterEntries.every(([key, paramValue]) => item[key] === paramValue)
    ) {
      continue;
    }

    const value = item[valueKey];
    const label = item[labelKey];
    const colorValue = colorKey ? item[colorKey] ?? null : null;

    // Build valueEnum entry
    valueEnum[value] = {
      text: label,
      color: colorValue,
      status: colorValue,
    };

    // Build options entry
    options.push({
      value,
      label,
    });
  }

  return {
    valueEnum,
    options,
  };
}
