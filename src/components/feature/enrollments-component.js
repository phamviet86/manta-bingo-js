// path: @/components/feature/enrollments-component.js

import { Space, Typography } from "antd";
import { AntTable, AntInfo, AntForm, AntTransfer } from "@/components/ui";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/utils/fetch-util";

export function EnrollmentsTable(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/enrollments", params, sort, filter)
      }
    />
  );
}

export function EnrollmentsInfo(props) {
  return (
    <AntInfo
      {...props}
      onRequest={(params) => fetchGet(`/api/enrollments/${params?.id}`)}
    />
  );
}

export function EnrollmentsCreate(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/enrollments", values)}
    />
  );
}

export function EnrollmentsEdit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/enrollments/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/enrollments/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/enrollments/${params?.id}`)}
    />
  );
}

export function EnrollmentsTransferByClass({
  classId,
  enrollmentTypeId,
  enrollmentPaymentTypeId,
  ...props
}) {
  return (
    <AntTransfer
      {...props}
      // Source: users
      onSourceRequest={(params) => fetchList(`/api/users`, params)}
      // Target: enrollments filtered by class
      onTargetRequest={(params) => fetchList(`/api/enrollments`, params)}
      targetParams={{ class_id: classId }}
      // Add/Remove via class enrollments route
      onAddItem={(keys) =>
        fetchPost(`/api/classes/${classId}/enrollments`, {
          userIds: keys,
          enrollmentTypeId: enrollmentTypeId,
          enrollmentPaymentTypeId: enrollmentPaymentTypeId,
        })
      }
      onRemoveItem={(keys) =>
        fetchDelete(`/api/classes/${classId}/enrollments`, {
          userIds: keys,
          enrollmentTypeId: enrollmentTypeId,
        })
      }
      // Key mapping
      sourceItem={{ key: "id" }}
      // targetItem={{ key: "user_id", disabled: [{ column: "enrollment_status_id", notIn: [20, 23] }] }}
      // Render user
      render={renderUser}
      // Search
      showSearch={true}
      searchSourceColumns={[
        "user_name_like",
        "user_email_like",
        "user_phone_like",
      ]}
      searchTargetColumns={[
        "user_name_like",
        "user_email_like",
        "user_phone_like",
      ]}
      // Locale
      locale={{
        searchPlaceholder: "Tìm theo tên, email, phone",
        itemsUnit: "người dùng",
        itemUnit: "người dùng",
        notFoundContent: "Không tìm thấy người dùng",
      }}
      titles={["Người dùng", "Đã gán"]}
      operations={["Xếp vào lớp", "Gỡ khỏi lớp"]}
    />
  );
}

export function EnrollmentsTransferByUser({
  userId,
  enrollmentTypeId,
  enrollmentPaymentTypeId,
  ...props
}) {
  return (
    <AntTransfer
      {...props}
      // Source: classes
      onSourceRequest={(params) => fetchList(`/api/classes`, params)}
      // Target: enrollments filtered by user
      onTargetRequest={(params) => fetchList(`/api/enrollments`, params)}
      targetParams={{ user_id: userId }}
      // Add/Remove via user enrollments route
      onAddItem={(keys) =>
        fetchPost(`/api/users/${userId}/enrollments`, {
          classIds: keys,
          enrollmentTypeId: enrollmentTypeId,
          enrollmentPaymentTypeId: enrollmentPaymentTypeId,
        })
      }
      onRemoveItem={(keys) =>
        fetchDelete(`/api/users/${userId}/enrollments`, {
          classIds: keys,
          enrollmentTypeId: enrollmentTypeId,
        })
      }
      // Key mapping
      sourceItem={{
        key: "id",
        disabled: [{ column: "class_status_id", notIn: [16, 19] }],
      }}
      targetItem={{
        key: "class_id",
        disabled: [{ column: "enrollment_status_id", notIn: [20, 23] }],
      }}
      // Render class
      render={renderClass}
      // Search
      showSearch={true}
      searchSourceColumns={["course_name_like", "module_name_like"]}
      searchTargetColumns={["course_name_like", "module_name_like"]}
      // Locale
      locale={{
        searchPlaceholder: "Tìm theo tên khóa học, module",
        itemsUnit: "lớp học",
        itemUnit: "lớp học",
        notFoundContent: "Không tìm thấy lớp học",
      }}
      titles={["Lớp học", "Đã xếp lớp"]}
      operations={["Đăng ký", "Hủy đăng ký"]}
    />
  );
}

function renderClass(record) {
  return (
    <Space wrap>
      <Typography.Text>{record?.course_name}</Typography.Text>
      <Typography.Text type="secondary">{record?.module_name}</Typography.Text>
    </Space>
  );
}

function renderUser(record) {
  return (
    <Space wrap>
      <Typography.Text>{record?.user_name}</Typography.Text>
      <Typography.Text type="secondary">{record?.user_desc}</Typography.Text>
    </Space>
  );
}
