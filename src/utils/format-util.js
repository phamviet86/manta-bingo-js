// path: @/lib/utils/format-util.js

/**
 * Formats a date into an ISO-like string (YYYY-MM-DDT00:00:00).
 *
 * @param {number} year - The year of the event.
 * @param {number} month - The zero-based month of the event (0 = January, 11 = December).
 * @param {number} [day=1] - The day of the event (defaults to 1).
 * @returns {string} The formatted date string in the format "YYYY-MM-DDT00:00:00".
 *
 * @example
 * formatEventDate(2024, 5, 15); // Returns: "2024-06-15T00:00:00"
 * formatEventDate(2024, 0);     // Returns: "2024-01-01T00:00:00"
 */
export function formatEventDate(year, month, day = 1) {
  const monthStr = String(month + 1).padStart(2, "0");
  const dayStr = String(day).padStart(2, "0");
  return `${year}-${monthStr}-${dayStr}T00:00:00`;
}

/**
 * Formats an event time by combining an ISO date string and a time string into a single ISO-like datetime string.
 *
 * @param {string} isoDateString - The ISO date string (e.g., "2024-06-01T00:00:00Z").
 * @param {string} timeString - The time string in "HH:mm" format (e.g., "14:30").
 * @returns {string|null} The formatted datetime string in "YYYY-MM-DDTHH:mm:00" format, or null if input is invalid.
 *
 * @example
 * formatEventTime("2024-06-01T00:00:00Z", "14:30"); // Returns: "2024-06-01T14:30:00"
 * formatEventTime("2023-12-25T00:00:00Z", "09:15"); // Returns: "2023-12-25T09:15:00"
 * formatEventTime("", "10:00"); // Returns: null
 * formatEventTime("2024-06-01T00:00:00Z", ""); // Returns: null
 */
export function formatEventTime(isoDateString, timeString) {
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
 * Formats a time string to "HH:MM" format.
 *
 * If the input is falsy, returns "...".
 * If the input contains at least two colon-separated parts, returns the first two parts joined by a colon.
 * Otherwise, returns the original string.
 *
 * @param {string} timeString - The time string to format (e.g., "14:30:45", "09:15", "7").
 * @returns {string} The formatted time string in "HH:MM" format, or "..." if input is falsy.
 *
 * @example
 * formatTimeHHMM("14:30:45"); // "14:30"
 * formatTimeHHMM("09:15");    // "09:15"
 * formatTimeHHMM("7");        // "7"
 * formatTimeHHMM("");         // "..."
 * formatTimeHHMM(null);       // "..."
 * formatTimeHHMM("23:59:59"); // "23:59"
 */
export function formatTimeHHMM(timeString) {
  if (!timeString) return "...";
  const timeParts = timeString.split(":");
  if (timeParts.length >= 2) {
    return `${timeParts[0]}:${timeParts[1]}`;
  }
  return timeString;
}

/**
 * Formats a given date input as an ISO date string (YYYY-MM-DD), optionally adding days.
 *
 * Handles input as a Date object, ISO/local date string, or Unix timestamp.
 * Returns null for invalid input.
 *
 * @param {Date|string|number} startDate - The starting date, can be a Date object, ISO/local date string, or Unix timestamp.
 * @param {number} [addDays=0] - Number of days to add to the startDate.
 * @returns {string|null} ISO date string in 'YYYY-MM-DD' format, or null if input is invalid.
 *
 * @example
 * formatIsoDate(new Date('2024-06-01'), 2); // Returns: '2024-06-03'
 * formatIsoDate('2024-06-01', 1); // Returns: '2024-06-02'
 * formatIsoDate(1717200000000, 0); // Returns: '2024-06-01'
 * formatIsoDate('invalid-date'); // Returns: null
 */
export function formatIsoDate(startDate, addDays = 0) {
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

  date.setDate(date.getDate() + addDays);
  return date.toISOString().split("T")[0];
}
