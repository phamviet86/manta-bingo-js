// path: @/utils/build-util.js

/**
 * Creates enum data from an array of objects, with optional filtering
 *
 * @param {Array<Object>} data - Array of data to process
 * @param {Object} columnMapping - Column configuration
 * @param {string} columnMapping.value - Property name to use as key/value
 * @param {string} columnMapping.label - Property name to use as display text
 * @param {string} [columnMapping.color] - Optional property name for color/status information
 * @param {Object} [filterParams={}] - Optional filter parameters (field:value pairs)
 * @returns {Object} valueEnum object
 */
export function buildEnum(data = [], columnMapping = {}, filterParams = {}) {
  const { value: valueKey, label: labelKey, color: colorKey } = columnMapping;

  if (!Array.isArray(data) || !valueKey || !labelKey) {
    return {};
  }

  const filterEntries = Object.entries(filterParams);

  return data.reduce((valueEnum, item) => {
    // Skip invalid items or items that don't match filters
    if (!item || item[valueKey] === undefined) return valueEnum;

    if (
      filterEntries.length > 0 &&
      !filterEntries.every(([key, paramValue]) => item[key] === paramValue)
    ) {
      return valueEnum;
    }

    const colorValue = colorKey ? item[colorKey] ?? null : null;

    valueEnum[item[valueKey]] = {
      text: item[labelKey],
      color: colorValue,
      status: colorValue,
    };

    return valueEnum;
  }, {});
}
