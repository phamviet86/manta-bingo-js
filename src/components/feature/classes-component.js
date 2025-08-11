// path: @/components/feature/classes-component.js

import { AntTable, AntInfo, AntForm, AntTransfer } from "@/components/ui";
import { Space, Typography } from "antd";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/utils/fetch-util";

export function ClassesTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/classes", params, sort, filter)
      }
    />
  );
}

export function ClassesInfo(props) {
  return (
    <AntInfo
      {...props}
      onRequest={(params) => fetchGet(`/api/classes/${params?.id}`)}
    />
  );
}

export function ClassesCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/classes", values)}
    />
  );
}

export function ClassesEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/classes/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/classes/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/classes/${params?.id}`)}
    />
  );
}

export function ClassesTransferByCourse({ courseId, ...props }) {
  return (
    <AntTransfer
      {...props}
      onSourceRequest={(params) => fetchList(`/api/modules`, params)}
      onTargetRequest={(params) => fetchList(`/api/classes`, params)}
      targetParams={{ course_id: courseId }}
      onAddItem={(keys) =>
        fetchPost(`/api/courses/${courseId}/classes`, {
          moduleIds: keys,
        })
      }
      onRemoveItem={(keys) =>
        fetchDelete(`/api/courses/${courseId}/classes`, {
          moduleIds: keys,
        })
      }
      sourceItem={{ key: "id", disabled: ["module_status_id", [12], []] }}
      targetItem={{
        key: "module_id",
        disabled: ["class_status_id", [], [15, 16]],
      }}
      render={(record) => (
        <Space>
          <Typography.Text>{record?.module_name}</Typography.Text>
          <Typography.Text type="secondary">
            ({record?.syllabus_name})
          </Typography.Text>
        </Space>
      )}
      titles={["Module", "Đã tạo lớp"]}
      operations={["Tạo lớp học", "Xóa lớp học"]}
      // search functionality
      showSearch={true}
      searchSourceColumns={["syllabus_name_like", "module_name_like"]}
      searchTargetColumns={["syllabus_name_like", "module_name_like"]}
      locale={{
        searchPlaceholder: "Tìm kiếm...",
        itemsUnit: "học phần",
        itemUnit: "học phần",
        notFoundContent: "Không tìm thấy học phần",
      }}
    />
  );
}

export function ClassesSummaryTable({ startDate, endDate, ...props }) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList(
          "/api/classes/summary",
          { start_date_e: startDate, end_date_e: endDate, ...params },
          sort,
          filter
        )
      }
    />
  );
}
