// path: @/utils/date-time-util.js

/**
 * Compare two date strings
 * @param {string} startDate - Start date in various formats
 * @param {string} endDate - End date in various formats
 * @returns {boolean} - true if start <= end, false otherwise
 */
export function compareDates(startDate, endDate) {
  if (!startDate || !endDate) {
    throw new Error("Both start date and end date are required");
  }

  // Check if dates are in YYYY-MM-DD format
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;

  if (datePattern.test(startDate) && datePattern.test(endDate)) {
    // Compare as strings for YYYY-MM-DD format
    return startDate.localeCompare(endDate) <= 0;
  }

  // Convert to Date objects for other formats
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);

  // Check if dates are valid
  if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
    throw new Error("Invalid date format");
  }

  return startDateObj.getTime() <= endDateObj.getTime();
}

/**
 * Compare two time strings
 * @param {string} startTime - Start time in various formats
 * @param {string} endTime - End time in various formats
 * @returns {boolean} - true if start <= end, false otherwise
 */
export function compareTimes(startTime, endTime) {
  if (!startTime || !endTime) {
    throw new Error("Both start time and end time are required");
  }

  // Check if times are in HH:mm:ss format
  const timePattern = /^\d{2}:\d{2}:\d{2}$/;

  if (timePattern.test(startTime) && timePattern.test(endTime)) {
    // Compare as strings for HH:mm:ss format
    return startTime.localeCompare(endTime) <= 0;
  }

  // Check if times are in HH:mm format
  const shortTimePattern = /^\d{2}:\d{2}$/;

  if (shortTimePattern.test(startTime) && shortTimePattern.test(endTime)) {
    // Add :00 seconds and compare as strings
    const normalizedStartTime = startTime + ":00";
    const normalizedEndTime = endTime + ":00";
    return normalizedStartTime.localeCompare(normalizedEndTime) <= 0;
  }

  // For other formats, convert to Date objects using a reference date
  const referenceDate = "2000-01-01";
  const startDateTime = new Date(`${referenceDate} ${startTime}`);
  const endDateTime = new Date(`${referenceDate} ${endTime}`);

  // Check if times are valid
  if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
    throw new Error("Invalid time format");
  }

  return startDateTime.getTime() <= endDateTime.getTime();
}
