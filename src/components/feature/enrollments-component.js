// path: @/components/feature/enrollments-component.js

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
  enrollmentPaymentAmount = 0,
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
          enrollmentPaymentAmount: enrollmentPaymentAmount,
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
      targetItem={{
        key: "user_id",
        disabled: ["enrollment_status_id", [], [20, 23]],
      }}
      // Render
      render={(record) => record?.user_name}
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
