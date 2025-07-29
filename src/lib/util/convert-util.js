/**
 * Creates both enum data and options from an array of objects, with optional filtering
 *
 * @param {Array<Object>} data - Array of data to process
 * @param {Object} fieldMapping - Column configuration
 * @param {string} fieldMapping.value - Property name to use as key/value
 * @param {string} fieldMapping.label - Property name to use as display text
 * @param {string} [fieldMapping.color] - Optional property name for color/status information
 * @param {Object} [filters={}] - Optional filter parameters (field:value pairs)
 * @returns {Object} Object containing both enum and options { valueEnum: Object, options: Array }
 */
export function convertSelection(data, fieldMapping, filters = {}) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return { valueEnum: {}, options: [] };
  }

  // Filter data if parameters are provided
  let filteredData = data;
  if (filters && Object.keys(filters).length > 0) {
    filteredData = data.filter((item) => {
      // Check if all parameters match
      return Object.entries(filters).every(([key, paramValue]) => {
        return item[key] === paramValue;
      });
    });
  }

  // Create enum from filtered data
  const valueEnum = filteredData.reduce((accumulator, item) => {
    if (item && item[fieldMapping.value] !== undefined) {
      accumulator[item[fieldMapping.value]] = {
        text: item[fieldMapping.label],
        color: fieldMapping.color ? item[fieldMapping.color] ?? null : null,
        status: fieldMapping.color ? item[fieldMapping.color] ?? null : null,
      };
    }
    return accumulator;
  }, {});

  // Create options from filtered data
  const options = filteredData
    .filter((item) => item && item[fieldMapping.value] !== undefined)
    .map((item) => ({
      value: item[fieldMapping.value],
      label: item[fieldMapping.label],
    }));

  return {
    valueEnum,
    options,
  };
}

/**
 * Converts an array of objects into a format suitable for transfer components, adding key and disabled properties.
 *
 * @param {Array<Object>} data - The input array of items to convert.
 * @param {Object} transferProps - The mapping options for keys in the output.
 * @param {string} transferProps.key - The property name to use as the unique key for each item.
 * @param {string|Array} [transferProps.disabled] - The property name or array to determine if the item is disabled.
 *   - String: Field name to map directly (e.g., 'isDisabled')
 *   - Array [fieldName, inArray, notInArray]:
 *     - If both arrays are empty → treat as string mapping (!!fieldValue)
 *     - If inArray: disabled = true if field value is in inArray
 *     - If notInArray: disabled = true if field value is NOT in notInArray
 * @returns {Array<Object>} The converted array of items with all original properties, plus key and disabled.
 */
export function convertTransferItems(data = [], transferProps = {}) {
  if (!Array.isArray(data) || data.length === 0) return [];

  const keyProp = transferProps.key;
  const disabledProp = transferProps.disabled;

  return data.map((item) => {
    const result = { ...item };
    result.key =
      keyProp && item.hasOwnProperty(keyProp) ? item[keyProp] : undefined;

    // Handle disabled logic
    if (!disabledProp) {
      result.disabled = false;
    } else if (typeof disabledProp === "string") {
      result.disabled = item.hasOwnProperty(disabledProp)
        ? item[disabledProp]
        : false;
    } else if (Array.isArray(disabledProp) && disabledProp.length >= 2) {
      const [fieldName, inArray, notInArray = []] = disabledProp;
      if (fieldName && item.hasOwnProperty(fieldName)) {
        const fieldValue = item[fieldName];
        if (
          (!inArray || inArray.length === 0) &&
          (!notInArray || notInArray.length === 0)
        ) {
          result.disabled = !!fieldValue;
        } else {
          let isDisabled = false;
          if (inArray && Array.isArray(inArray) && inArray.length > 0) {
            if (inArray.includes(fieldValue)) {
              isDisabled = true;
            }
          }
          if (
            notInArray &&
            Array.isArray(notInArray) &&
            notInArray.length > 0
          ) {
            if (!notInArray.includes(fieldValue)) {
              isDisabled = true;
            }
          }
          result.disabled = isDisabled;
        }
      } else {
        result.disabled = false;
      }
    } else {
      result.disabled = false;
    }

    return result;
  });
}

/**
 * Helper function to generate ISO formatted event time
 * @param {string} isoDateString - ISO date string (e.g. "2025-04-25T00:00:00.000Z")
 * @param {string} timeString - Time string in format "HH:MM:SS" (e.g. "19:30:00")
 * @returns {string|null} ISO formatted datetime string or null if invalid
 */
function generateEventTime(isoDateString, timeString) {
  if (!isoDateString || !timeString) return null;

  try {
    // Parse hours and minutes from time string
    const timeParts = timeString.split(":");
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);

    // Create date from ISO string
    const baseDate = new Date(isoDateString);

    // Get date components
    const year = baseDate.getFullYear();
    const month = String(baseDate.getMonth() + 1).padStart(2, "0");
    const day = String(baseDate.getDate()).padStart(2, "0");

    // Format time components
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");

    // Build result string
    return `${year}-${month}-${day}T${formattedHours}:${formattedMinutes}:00`;
  } catch (error) {
    console.error("Error generating event time:", error);
    return null;
  }
}

/**
 * Converts an array of data items to event format using property mapping configuration
 * @param {Array} data - Array of data objects to convert
 * @param {Object} eventProps - Configuration object mapping target properties to source properties
 * @param {string} eventProps.id - Source property for event id
 * @param {string} eventProps.title - Source property for event title
 * @param {string} eventProps.startDate - Source property for event start date
 * @param {string} [eventProps.endDate] - Source property for event end date
 * @param {string} [eventProps.startTime] - Source property for start time (used with startDate)
 * @param {string} [eventProps.endTime] - Source property for end time (used with endDate)
 * @param {string} [eventProps.*] - Any other custom property mappings (applied directly to event item)
 * @param {Object} [eventProps.extendedProps] - Object mapping extended property keys to source properties
 * @returns {Array} - Array of converted event items with required format {id, title, start, end?, extendedProps, ...customProps}
 */
export function convertEventItems(data = [], eventProps = {}) {
  if (!Array.isArray(data) || data.length === 0) return [];

  // Reserved property names that have special handling
  const reservedProps = [
    "id",
    "title",
    "startDate",
    "endDate",
    "startTime",
    "endTime",
    "extendedProps",
  ];

  return data.map((sourceItem) => {
    const eventItem = {};

    // Required properties: id and title
    if (eventProps.id && sourceItem.hasOwnProperty(eventProps.id)) {
      eventItem.id = sourceItem[eventProps.id];
    }

    if (eventProps.title && sourceItem.hasOwnProperty(eventProps.title)) {
      eventItem.title = sourceItem[eventProps.title];
    }

    // Handle start property - combine startDate and startTime
    if (
      eventProps.startDate &&
      sourceItem.hasOwnProperty(eventProps.startDate)
    ) {
      const startDateValue = sourceItem[eventProps.startDate];
      const startTimeValue =
        eventProps.startTime && sourceItem.hasOwnProperty(eventProps.startTime)
          ? sourceItem[eventProps.startTime]
          : "00:00:00";

      const eventTime = generateEventTime(startDateValue, startTimeValue);
      if (eventTime) {
        eventItem.start = eventTime;
      }
    }

    // Handle end property - combine endDate and endTime
    // If only startDate is provided, use startDate as endDate
    const shouldUseStartDateAsEnd = eventProps.startDate && !eventProps.endDate;
    const endDateSource = shouldUseStartDateAsEnd
      ? eventProps.startDate
      : eventProps.endDate;

    if (endDateSource && sourceItem.hasOwnProperty(endDateSource)) {
      const endDateValue = sourceItem[endDateSource];
      const endTimeValue =
        eventProps.endTime && sourceItem.hasOwnProperty(eventProps.endTime)
          ? sourceItem[eventProps.endTime]
          : "23:59:59";

      const eventTime = generateEventTime(endDateValue, endTimeValue);
      if (eventTime) {
        eventItem.end = eventTime;
      }
    }

    // Handle custom properties (any property not in reservedProps)
    Object.entries(eventProps).forEach(([targetKey, sourceKey]) => {
      if (
        !reservedProps.includes(targetKey) &&
        sourceKey &&
        sourceItem.hasOwnProperty(sourceKey)
      ) {
        eventItem[targetKey] = sourceItem[sourceKey];
      }
    });

    // Handle extended properties
    if (
      eventProps.extendedProps &&
      typeof eventProps.extendedProps === "object" &&
      Object.keys(eventProps.extendedProps).length > 0
    ) {
      eventItem.extendedProps = {};

      Object.entries(eventProps.extendedProps).forEach(
        ([targetKey, sourceKey]) => {
          if (sourceKey && sourceItem.hasOwnProperty(sourceKey)) {
            eventItem.extendedProps[targetKey] = sourceItem[sourceKey];
          }
        }
      );
    }

    return eventItem;
  });
}

export function convertIsoDate(startDate, days = 0) {
  // Handle various input formats
  let date;

  if (startDate instanceof Date) {
    // Already a Date object
    date = new Date(startDate);
  } else if (typeof startDate === "string") {
    // Try to parse string - could be ISO, locale format, etc.
    date = new Date(startDate);
  } else if (typeof startDate === "number") {
    // Unix timestamp
    date = new Date(startDate);
  } else {
    // Invalid input
    console.error("Invalid startDate format:", startDate);
    return null;
  }

  // Check if date is valid
  if (isNaN(date.getTime())) {
    console.error("Invalid date created from:", startDate);
    return null;
  }

  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}
