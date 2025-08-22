// path: @/utils/selection-util.js
/**
 * Creates valueEnum and options from an array of objects, with optional filtering
 *
 * @param {Array<Object>} data - Array of data to process
 * @param {Object} columnMapping - Column configuration
 * @param {string} columnMapping.value - Property name to use as key/value
 * @param {string} columnMapping.label - Property name to use as display text
 * @param {string} [columnMapping.color] - Optional property name for color/status information
 * @param {string} [columnMapping.group] - Optional property name for grouping options
 * @param {Object} [filterParams={}] - Optional filter parameters (field:value pairs)
 * @returns {Object} { valueEnum, options }
 */
export function buildSelection(
  data = [],
  columnMapping = {},
  filterParams = {}
) {
  const {
    value: valueKey,
    label: labelKey,
    color: colorKey,
    group: groupKey,
  } = columnMapping;
  if (!Array.isArray(data) || !valueKey || !labelKey)
    return { valueEnum: {}, options: [] };

  const filterEntries = Object.entries(filterParams);
  const valueEnum = {};
  const filteredItems = [];

  // Single pass: build valueEnum and collect filtered items
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

    // Build valueEnum (single place)
    valueEnum[key] = {
      text: label,
      ...(colorValue && { color: colorValue, status: colorValue }),
    };

    // Collect filtered items for options building
    filteredItems.push({
      value: key,
      label,
      ...(groupKey && { group: item[groupKey] || "Ungrouped" }),
    });
  });

  // Build options based on grouping
  let options = [];
  if (!groupKey) {
    // No grouping - simple options array
    options = filteredItems.map(({ value, label }) => ({ label, value }));
  } else {
    // Group data by specified field
    const groupedData = filteredItems.reduce((acc, { value, label, group }) => {
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push({ value, label });
      return acc;
    }, {});

    // Convert to Ant Design grouped options format
    options = Object.keys(groupedData).map((key) => ({
      label: key,
      key: key,
      options: groupedData[key],
    }));
  }

  // Sort valueEnum by keys
  const sortedValueEnum = Object.keys(valueEnum)
    .sort()
    .reduce((acc, key) => {
      acc[key] = valueEnum[key];
      return acc;
    }, {});

  return { valueEnum: sortedValueEnum, options };
}
