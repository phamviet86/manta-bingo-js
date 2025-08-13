// path: @/components/feature/schedules-component.js

import { Space, Card, Flex, Badge, Typography } from "antd";
import {
  AntTable,
  AntInfo,
  AntForm,
  AntTransfer,
  FullCalendar,
} from "@/components/ui";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/utils/fetch-util";
import { formatTimeHHMM, formatDateShort } from "@/utils/format-util";
import { VIEWS_CONFIG, COLOR_ENUM } from "@/configs";

export function SchedulesTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/schedules", params, sort, filter)
      }
    />
  );
}

export function SchedulesInfo(props) {
  return (
    <AntInfo
      {...props}
      onRequest={(params) => fetchGet(`/api/schedules/${params?.id}`)}
    />
  );
}

export function SchedulesCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/schedules", values)}
    />
  );
}

export function SchedulesEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/schedules/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/schedules/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/schedules/${params?.id}`)}
    />
  );
}

export function SchedulesCalendar(props) {
  return (
    <FullCalendar
      {...props}
      onRequest={(params) => fetchList("/api/schedules", params)}
      requestItem={{
        id: "id",
        title: "course_name",
        startDate: "schedule_date",
        startTime: "shift_start_time",
        endDate: "schedule_date",
        endTime: "shift_end_time",
        extendedProps: {
          id: "id",
          shift_start_time: "shift_start_time",
          course_name: "course_name",
          course_code: "course_code",
          module_name: "module_name",
          schedule_status_color: "schedule_status_color",
        },
      }}
      views={{
        dayGrid: {
          eventContent: renderScheduleShort,
          ...VIEWS_CONFIG.dayGrid,
        },
        dayGridWeek: {
          eventContent: renderScheduleShort,
          ...VIEWS_CONFIG.dayGridWeek,
        },
        dayGridMonth: {
          eventContent: renderScheduleShort,
          ...VIEWS_CONFIG.dayGridMonth,
        },
      }}
    />
  );
}

function renderScheduleShort(info) {
  const { shift_start_time, course_code, module_name, schedule_status_color } =
    info.event.extendedProps;
  const { status, color } = COLOR_ENUM[schedule_status_color];

  const styles = {
    text: {
      fontSize: "1em",
    },
    time: {
      fontSize: "1em",
      fontWeight: 700,
    },
  };

  // return the information in a row in order time, class_name, module_name
  return (
    <Space size={4} wrap>
      <Badge status={status ? status : color} />
      <Typography.Text style={styles.time} strong>
        {formatTimeHHMM(shift_start_time)}
      </Typography.Text>
      <Typography.Text style={styles.text}>{course_code}</Typography.Text>
      <Typography.Text style={styles.text} type="secondary">
        {module_name}
      </Typography.Text>
    </Space>
  );
}

function renderEventCard(info) {
  const {
    shift_start_time,
    room_name,
    class_name,
    module_name,
    lesson_name,
    schedule_status_color,
  } = info.event.extendedProps;

  const { color, bgColor } = COLOR_ENUM[schedule_status_color];

  const styles = {
    title: {
      fontSize: "0.8em",
      fontWeight: 1000,
      color: color,
    },
    text: {
      fontSize: "0.8em",
      color: color,
    },
    card: {
      borderRadius: 2,
      backgroundColor: bgColor,
      borderColor: color,
      border: `0.8px solid ${color}`,
      width: "100%",
    },
  };
  return (
    <Card size="small" style={styles.card}>
      <Space direction="vertical" size={0} wrap style={{ width: "100%" }}>
        <Flex justify="space-between" wrap style={{ width: "100%" }}>
          <Typography.Text style={styles.title}>
            {formatTimeHHMM(shift_start_time)}
          </Typography.Text>
          <Typography.Text strong style={styles.text}>
            {room_name}
          </Typography.Text>
        </Flex>
        <Space wrap size={[4, 0]}>
          <Typography.Text strong style={styles.text}>
            {class_name}
          </Typography.Text>
          <Typography.Text style={styles.text}>{module_name}</Typography.Text>
        </Space>
        <Typography.Text italic style={styles.text}>
          {lesson_name}
        </Typography.Text>
      </Space>
    </Card>
  );
}

export function SchedulesTransfer(props) {
  return (
    <AntTransfer
      {...props}
      onSourceRequest={(params) => fetchList(`/api/schedules`, params)}
      onTargetRequest={(params) => fetchList(`/api/schedules`, params)}
      onAddItem={(keys) => fetchPost("/api/schedules/duplicate", { ids: keys })}
      onRemoveItem={(keys) =>
        fetchDelete(`/api/schedules/duplicate`, { sourceIds: keys })
      }
      sourceItem={{ key: "id", disabled: "disable_duplicate" }}
      targetItem={{
        key: "source_id",
        disabled: ["schedule_status_id", [], [31]],
      }}
      titles={["Lịch", "Đã sao chép"]}
      operations={["Sao chép", "Loại bỏ"]}
      // render schedule
      render={renderSchedule}
      // search functionality
      showSearch={true}
      searchSourceColumns={["course_name_like", "module_name_like"]}
      searchTargetColumns={["course_name_like", "module_name_like"]}
      locale={{
        searchPlaceholder: "Tìm kiếm...",
        itemsUnit: "lịch",
        itemUnit: "lịch",
        notFoundContent: "Không tìm thấy lịch",
      }}
    />
  );
}

function renderSchedule(record) {
  return (
    <Space direction="vertical" size={0} style={{ width: "100%" }}>
      <Space wrap split="-">
        <Typography.Text strong style={{ color: "#1677ff" }}>
          {record?.course_name}
        </Typography.Text>
        <Typography.Text type="secondary">
          {record?.module_name}
        </Typography.Text>
      </Space>
      <Space wrap>
        <Typography.Text style={{ fontSize: "0.9em" }}>
          {formatDateShort(record?.schedule_date)}
        </Typography.Text>
        <Typography.Text strong style={{ fontSize: "0.9em", color: "#52c41a" }}>
          {formatTimeHHMM(record?.shift_start_time)}
        </Typography.Text>
      </Space>
    </Space>
  );
}
