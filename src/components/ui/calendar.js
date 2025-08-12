// path: @/component/common/calendar.js

import { useEffect, useCallback, useState, useRef, cloneElement } from "react";
import { message, Grid, Spin, Modal, Drawer } from "antd";
import Calendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { CALENDAR_CONFIG, RESPONSIVE_CONFIG } from "@/configs/calendar-config";
import { DRAWER_CONFIG, MODAL_CONFIG } from "@/configs";
import { formatEventTime, formatEventDate } from "@/utils/format-util";

const { useBreakpoint } = Grid;

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
      startDate: formatEventDate(year, month),
      endDate: formatEventDate(year, month + 1),
    };
  } else {
    // For non-month views, use the original date range
    return {
      startDate: dateInfo.startStr,
      endDate: dateInfo.endStr,
    };
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
function buildEventItems(data = [], eventProps = {}) {
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

      const eventTime = formatEventTime(startDateValue, startTimeValue);
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

      const eventTime = formatEventTime(endDateValue, endTimeValue);
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
  // Calendar variant configuration
  variant = "page", // "page" | "modal" | "drawer"

  // Data handling props
  onRequest = undefined,
  onRequestError = undefined,
  onRequestSuccess = undefined,
  requestParams = undefined,
  requestItem = undefined,
  afterClose = undefined, // used in modal/drawer variants

  // Display configuration
  plugins = [],
  height = "auto",
  responsive = RESPONSIVE_CONFIG,
  headerToolbar = {
    center: "title",
    left: "prev,next today",
    right: "dayGrid,dayGridWeek,dayGridMonth",
  },
  title = undefined,

  // Calendar event config
  weekNumbers = true,
  navLinks = true,
  onDayClick = undefined,
  onWeekClick = undefined,
  onEventClick = undefined,

  // Modal/Drawer specific props
  calendarHook = {},
  modalProps = {},
  drawerProps = {},
  trigger = undefined,

  // Other props
  ...props
}) {
  const {
    calendarRef,
    reloadRef,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    visible,
    open,
    close,
  } = calendarHook;

  const [messageApi, contextHolder] = message.useMessage();
  const screens = useBreakpoint();
  const allPlugins = [dayGridPlugin, ...plugins];

  // State management: only need processed events and local loading
  const [processedEvents, setProcessedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Refs for reload pattern và debouncing
  const reloadDataRef = useRef();
  const datesSetTimeoutRef = useRef();

  // Handlers
  const handleDataRequest = useCallback(async () => {
    if (!onRequest) {
      messageApi.error("Data request handler not provided");
      return;
    }

    if (!startDate || !endDate) {
      return;
    }

    try {
      const result = await onRequest(requestParams);
      const resultData = result.data || result || [];

      // Process events directly here instead of separate handler
      let finalEvents = [];
      if (requestItem) {
        finalEvents = buildEventItems(resultData, requestItem);
      } else {
        finalEvents = resultData;
      }

      setProcessedEvents(finalEvents);
      onRequestSuccess?.(result);
    } catch (error) {
      messageApi.error(error?.message || "Đã xảy ra lỗi");
      onRequestError?.(error);
      setProcessedEvents([]);
    } finally {
      setLoading(false);
    }
  }, [
    onRequest,
    requestParams,
    requestItem,
    onRequestSuccess,
    onRequestError,
    messageApi,
    startDate,
    endDate,
  ]);

  // Data reload functionality
  const reloadData = useCallback(async () => {
    setLoading(true);
    await handleDataRequest();
  }, [handleDataRequest]);

  // Đảm bảo luôn cập nhật ref tới hàm reloadData mới nhất
  reloadDataRef.current = reloadData;

  // Expose reload function cho external hook
  if (reloadRef) {
    reloadRef.current = reloadData;
  }

  // Debounced handleDatesSet
  const handleDatesSet = useCallback(
    (dateInfo) => {
      if (setStartDate && setEndDate) {
        // Clear previous timeout
        if (datesSetTimeoutRef.current) {
          clearTimeout(datesSetTimeoutRef.current);
        }

        // Set new timeout with 300ms delay để debounce
        datesSetTimeoutRef.current = setTimeout(() => {
          const { startDate, endDate } = buildCalendarDateRange(dateInfo);

          setStartDate(startDate);
          setEndDate(endDate);
          setLoading(true);
        }, 300);
      }
    },
    [setStartDate, setEndDate]
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

  // Khi mount: tải lại dữ liệu (chỉ cho variant "page")
  useEffect(() => {
    if (variant === "page") {
      setLoading(true);
      reloadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle data request khi dates thay đổi (cho variant "page")
  useEffect(() => {
    if (variant === "page" && onRequest && startDate && endDate) {
      reloadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, requestParams]);

  // Khi modal/drawer mở: tải lại dữ liệu
  useEffect(() => {
    if ((variant === "modal" || variant === "drawer") && visible) {
      setLoading(true);
      reloadData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, variant]);

  const handleClose = useCallback(() => {
    close?.();
    afterClose?.();
  }, [afterClose, close]);

  // Return the component
  // ========== Base Calendar Props ==========
  const baseCalendarProps = {
    ...props,
    ...CALENDAR_CONFIG,
    ref: calendarRef,
    plugins: allPlugins,
    headerToolbar,
    height,
    datesSet: handleDatesSet,
    events: processedEvents,
    eventClick: onEventClick,
    weekNumbers: weekNumbers,
    navLinks: navLinks,
    navLinkDayClick: onDayClick,
    navLinkWeekClick: onWeekClick,
  };

  // ========== Render Logic ==========
  // If variant is "drawer", render DrawerForm
  if (variant === "drawer") {
    return (
      <>
        {contextHolder}
        {trigger && cloneElement(trigger, { onClick: open })}
        <Drawer
          {...DRAWER_CONFIG}
          {...drawerProps}
          open={visible}
          onClose={handleClose}
          title={title}
        >
          {visible ? (
            <Spin spinning={loading} tip="Đang tải dữ liệu..." delay={500}>
              <Calendar {...baseCalendarProps} />
            </Spin>
          ) : null}
        </Drawer>
      </>
    );
  }

  // If variant is "modal", render ModalForm
  if (variant === "modal") {
    return (
      <>
        {contextHolder}
        {trigger && cloneElement(trigger, { onClick: open })}
        <Modal
          {...MODAL_CONFIG}
          {...modalProps}
          open={visible}
          onCancel={handleClose}
          footer={null} // No footer buttons in modal
          title={title}
        >
          {visible ? (
            <Spin spinning={loading} tip="Đang tải dữ liệu..." delay={500}>
              <Calendar {...baseCalendarProps} />
            </Spin>
          ) : null}
        </Modal>
      </>
    );
  }

  // Default: page variant
  return (
    <>
      {contextHolder}
      <Spin spinning={loading} tip="Đang tải dữ liệu..." delay={500}>
        <Calendar {...baseCalendarProps} />
      </Spin>
    </>
  );
}
