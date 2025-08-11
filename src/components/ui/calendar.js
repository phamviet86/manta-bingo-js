// path: @/components/ui/calendar.js

import { useEffect, useCallback, useState, useRef } from "react";
import { message, Grid, Spin } from "antd";
import Calendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { CALENDAR_CONFIG, RESPONSIVE_CONFIG } from "@/configs/calendar-config";

const { useBreakpoint } = Grid;

// Calendar utility functions
function formatLocalDate(year, month, day = 1) {
  const monthStr = String(month + 1).padStart(2, "0");
  const dayStr = String(day).padStart(2, "0");
  return `${year}-${monthStr}-${dayStr}T00:00:00`;
}

function getBreakpoint(screens) {
  const breakpoints = ["xxl", "xl", "lg", "md", "sm", "xs"];
  return breakpoints.find((bp) => screens[bp]) || "xs";
}

function buildCalendarDateRange(dateInfo) {
  const isMonthView = dateInfo.view?.type?.includes("Month");

  if (isMonthView) {
    // For month view, get the middle date of the view range to determine the current month
    const viewStartTime = new Date(dateInfo.start).getTime();
    const viewEndTime = new Date(dateInfo.end).getTime();
    const middleDate = new Date(
      viewStartTime + (viewEndTime - viewStartTime) / 2
    );

    // Get year and month from middle date
    const year = middleDate.getFullYear();
    const month = middleDate.getMonth();

    return {
      startDate: formatLocalDate(year, month),
      endDate: formatLocalDate(year, month + 1),
    };
  } else {
    // For non-month views, use the original date range
    return {
      startDate: dateInfo.startStr,
      endDate: dateInfo.endStr,
    };
  }
}

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
export function buildEventItems(data = [], eventProps = {}) {
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

export function FullCalendar({
  onRequest = undefined,
  onRequestError = undefined,
  onRequestSuccess = undefined,
  requestParams = undefined,
  requestItem = undefined,
  plugins = [],
  height = "auto",
  responsive = RESPONSIVE_CONFIG,
  headerToolbar = {
    center: "title",
    left: "prev,next today",
    right: "dayGrid,dayGridWeek,dayGridMonth",
  },
  calendarHook = {},
  ...props
}) {
  const {
    calendarRef,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    loading,
    setLoading,
  } = calendarHook;

  const [messageApi, contextHolder] = message.useMessage();
  const screens = useBreakpoint();
  const allPlugins = [dayGridPlugin, ...plugins];

  // State management: tách biệt raw data và processed events
  const [processedEvents, setProcessedEvents] = useState([]);

  // Refs for reload pattern và debouncing
  const reloadDataRef = useRef();
  const datesSetTimeoutRef = useRef();

  // Debug logging for state changes
  useEffect(() => {
    console.log("🔄 Calendar state changed:", {
      loading,
      startDate,
      endDate,
      hasOnRequest: !!onRequest,
      hasRequestParams: !!requestParams,
      eventsCount: processedEvents.length
    });
  }, [loading, startDate, endDate, onRequest, requestParams, processedEvents.length]);

  // Debug component mount
  useEffect(() => {
    console.log("🎯 Calendar component mounted/props changed:", {
      onRequest: !!onRequest,
      requestParams,
      requestItem,
      calendarHook: Object.keys(calendarHook)
    });
  }, [onRequest, requestParams, requestItem, calendarHook]);

  // Handlers - merged data request and processing
  const handleDataRequest = useCallback(async () => {
    console.log("🔄 handleDataRequest called");
    console.log("📊 Request conditions:", {
      hasOnRequest: !!onRequest,
      startDate,
      endDate,
      requestParams,
      loading
    });

    if (!onRequest) {
      console.log("❌ No onRequest handler provided");
      messageApi.error("Data request handler not provided");
      return;
    }

    if (!startDate || !endDate) {
      console.log("❌ Missing dates:", { startDate, endDate });
      return;
    }

    console.log("🚀 Starting request...");
    try {
      const result = await onRequest(requestParams);
      const resultData = result.data || result || [];
      console.log("✅ Request successful:", { resultCount: resultData.length });

      // Process data into events immediately
      let finalEvents = [];
      if (requestItem) {
        finalEvents = buildEventItems(resultData, requestItem);
        console.log("🔄 Events processed with requestItem:", { finalEventsCount: finalEvents.length });
      } else {
        finalEvents = resultData;
        console.log("➡️ Using raw data as events:", { finalEventsCount: finalEvents.length });
      }
      setProcessedEvents(finalEvents);

      onRequestSuccess?.(result);
      console.log("🎉 Request completed successfully");
    } catch (error) {
      console.log("💥 Request error:", error);
      messageApi.error(error?.message || "Đã xảy ra lỗi");
      onRequestError?.(error);
      setProcessedEvents([]);
    } finally {
      console.log("🏁 Setting loading to false");
      setLoading(false);
    }
  }, [
    onRequest,
    onRequestSuccess,
    onRequestError,
    requestParams,
    requestItem,
    messageApi,
    setLoading,
    startDate,
    endDate,
    loading,
  ]);

  // Reload data pattern giống Transfer
  const reloadData = useCallback(async () => {
    console.log("🔄 reloadData called, setting loading to true");
    setLoading?.(true);
    await handleDataRequest();
  }, [handleDataRequest, setLoading]);

  // Đảm bảo luôn cập nhật ref tới hàm reloadData mới nhất
  reloadDataRef.current = reloadData;

  // Debounced handleDatesSet
  const handleDatesSet = useCallback(
    (dateInfo) => {
      console.log("📅 handleDatesSet called:", dateInfo);
      
      if (setStartDate && setEndDate) {
        // Clear previous timeout
        if (datesSetTimeoutRef.current) {
          console.log("⏰ Clearing previous timeout");
          clearTimeout(datesSetTimeoutRef.current);
        }

        // Set new timeout with 300ms delay để debounce
        datesSetTimeoutRef.current = setTimeout(() => {
          const { startDate, endDate } = buildCalendarDateRange(dateInfo);
          console.log("📅 Setting new dates:", { startDate, endDate });

          setStartDate(startDate);
          setEndDate(endDate);
          console.log("⏳ Setting loading to true from handleDatesSet");
          setLoading?.(true);
        }, 300);
      } else {
        console.log("❌ Missing setStartDate or setEndDate functions");
      }
    },
    [setStartDate, setEndDate, setLoading]
  );

  const handleView = useCallback(
    (viewName) => {
      const api = calendarRef.current && calendarRef.current.getApi();
      if (api && viewName) {
        const currentView = api.view.type;
        // Only change view if it's different from current view
        if (currentView !== viewName) {
          api.changeView(viewName);
        }
      }
    },
    [calendarRef]
  );

  // set view at components mounting base on screen size
  useEffect(() => {
    const breakpoint = getBreakpoint(screens);
    const viewName = responsive[breakpoint] || "dayGridMonth";

    // Defer view change to avoid flushSync error during render
    setTimeout(() => {
      handleView(viewName);
    }, 0);
  }, [screens, responsive, handleView]);

  // Handle data request khi dates thay đổi
  useEffect(() => {
    console.log("🔍 useEffect for data request triggered");
    console.log("📊 Effect conditions:", {
      hasOnRequest: !!onRequest,
      hasRequestParams: !!requestParams,
      loading,
      startDate,
      endDate
    });

    // Only trigger data request if not loading and both startDate/endDate are valid (not null/undefined/empty)
    if (onRequest && requestParams && loading) {
      console.log("✅ All conditions met, calling handleDataRequest");
      handleDataRequest();
    } else {
      console.log("❌ Conditions not met for data request");
    }
  }, [handleDataRequest, onRequest, requestParams, loading, startDate, endDate]);

  // Return the component
  return (
    <>
      {contextHolder}
      <Spin spinning={loading} tip="Đang tải dữ liệu..." delay={500}>
        <Calendar
          {...props}
          {...CALENDAR_CONFIG}
          ref={calendarRef}
          plugins={allPlugins}
          headerToolbar={headerToolbar}
          height={height}
          datesSet={handleDatesSet}
          events={processedEvents}
          weekNumbers={true}
          navLinks={true}
        />
      </Spin>
    </>
  );
}
