// path: @/utils/build-util.js
/**
 * Creates valueEnum and options from an array of objects, with optional filtering
 *
 * @param {Array<Object>} data - Array of data to process
 * @param {Object} columnMapping - Column configuration
 * @param {string} columnMapping.value - Property name to use as key/value
 * @param {string} columnMapping.label - Property name to use as display text
 * @param {string} [columnMapping.color] - Optional property name for color/status information
 * @param {Object} [filterParams={}] - Optional filter parameters (field:value pairs)
 * @returns {Object} { valueEnum, options }
 */
export function buildEnum(data = [], columnMapping = {}, filterParams = {}) {
  const { value: valueKey, label: labelKey, color: colorKey } = columnMapping;
  if (!Array.isArray(data) || !valueKey || !labelKey)
    return { valueEnum: {}, options: [] };

  const filterEntries = Object.entries(filterParams);

  const valueEnum = {};
  const options = [];

  data.forEach((item) => {
    if (!item || item[valueKey] === undefined) return;

    // Filter items
    if (
      filterEntries.length > 0 &&
      !filterEntries.every(([key, paramValue]) => item[key] === paramValue)
    ) {
      return;
    }

    const colorValue = colorKey ? item[colorKey] ?? undefined : undefined;
    const key = item[valueKey];
    const label = item[labelKey];

    // valueEnum giữ nguyên đủ field
    valueEnum[key] = {
      text: label,
      ...(colorValue && { color: colorValue, status: colorValue }),
    };

    // options chỉ lấy label, value
    options.push({ label, value: key });
  });

  return { valueEnum, options };
}
