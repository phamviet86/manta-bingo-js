# Generate Transfer Code from SQL Table

## Service Sample Code

```javascript
// path: @/services/{tableName}-service.js

import bingoDB from "@/db/connections/neon-bingo";

// Database initialization
const sql = bingoDB();

// Create multiple user roles by user ID and role IDs
export async function createUserRolesByUser(userId, roleIds) {
  try {
    const queryValues = [];
    const valuePlaceholders = roleIds
      .map((roleId, index) => {
        queryValues.push(userId, roleId);
        return `($${index * 2 + 1}, $${index * 2 + 2})`;
      })
      .join(", ");

    const queryText = `
      INSERT INTO user_roles (user_id, role_id)
      VALUES ${valuePlaceholders}
      RETURNING *;
    `;

    return await sql.query(queryText, queryValues);
  } catch (error) {
    throw new Error(error.message);
  }
}

// Soft-delete multiple user roles by user ID and role IDs
export async function deleteUserRolesByUser(userId, roleIds) {
  try {
    const placeholders = roleIds.map((_, index) => `$${index + 2}`).join(", ");

    const queryText = `
      UPDATE user_roles
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL 
        AND user_id = $1 
        AND role_id IN (${placeholders})
      RETURNING *;
    `;

    const queryValues = [userId, ...roleIds];
    return await sql.query(queryText, queryValues);
  } catch (error) {
    throw new Error(error.message);
  }
}
```

## API Sample Code

```javascript
// path: @/app/(back)/api/users/[id]/user-roles/route.js

import {
  createUserRolesByUser,
  deleteUserRolesByUser,
} from "@/services/user-roles-service";
import { buildApiResponse } from "@/utils/api-util";

export async function POST(request, context) {
  try {
    const { id: userId } = await context.params;
    if (!userId) {
      return buildApiResponse(400, false, "Thiếu ID người dùng.");
    }

    const { roleIds } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!userId || !Array.isArray(roleIds) || roleIds.length === 0)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const result = await createUserRolesByUser(userId, roleIds);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không thể gán vai trò cho người dùng."
      );

    return buildApiResponse(
      201,
      true,
      "Gán vai trò cho người dùng thành công",
      {
        data: result,
      }
    );
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function DELETE(request, context) {
  try {
    const { id: userId } = await context.params;
    if (!userId) {
      return buildApiResponse(400, false, "Thiếu ID người dùng.");
    }

    const { roleIds } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!userId || !Array.isArray(roleIds) || roleIds.length === 0)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const result = await deleteUserRolesByUser(userId, roleIds);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy vai trò đã gán để xóa"
      );

    return buildApiResponse(200, true, "Loại bỏ vai trò đã gán", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
```

## Component Sample Code

```javascript
// path: @/components/feature/{tableName}-component.js

import { AntTransfer } from "@/components/ui";
import { fetchList, fetchPost, fetchDelete } from "@/utils/fetch-util";

export function RolePermissionsTransferByRole({ roleId, ...props }) {
  return (
    <AntTransfer
      {...props}
      onSourceRequest={(params) => fetchList(`/api/permissions`, params)}
      onTargetRequest={(params) => fetchList(`/api/role-permissions`, params)}
      targetParams={{ role_id: roleId }}
      onAddItem={(keys) =>
        fetchPost(`/api/roles/${roleId}/role-permissions`, {
          permissionIds: keys,
        })
      }
      onRemoveItem={(keys) =>
        fetchDelete(`/api/roles/${roleId}/role-permissions`, {
          permissionIds: keys,
        })
      }
      sourceItem={{ key: "id" }}
      targetItem={{ key: "permission_id" }}
      render={(record) => (
        <Space>
          <Typography.Text>{record?.permission_key}</Typography.Text>
          <Typography.Text type="secondary">
            ({record?.permission_desc})
          </Typography.Text>
        </Space>
      )}
      titles={["Quyền", "Đã gán"]}
      operations={["Gán quyền", "Gỡ quyền"]}
      // search functionality
      showSearch={true}
      searchSourceColumns={["permission_key_like", "permission_desc_like"]}
      searchTargetColumns={["permission_key_like", "permission_desc_like"]}
      locale={{
        searchPlaceholder: "Tìm kiếm...",
        itemsUnit: "quyền",
        itemUnit: "quyền",
        notFoundContent: "Không tìm thấy quyền",
      }}
    />
  );
}
```

## Page Sample Code

```javascript
// ... Import
import { UserRolesTransferByUser } from "@/components/feature";
import { useTransfer } from "@/hooks";
// ... Page hooks
const useUserRoles = {
  transfer: useTransfer(),
};
// ... Page actions
<AntButton
  key="edit-button"
  label="Chỉnh sửa"
  color="primary"
  variant="solid"
  onClick={() => useRoles.edit.open()}
/>,
// ... Transfer component
<UserRolesTransferByUser
  transferHook={useUserRoles.transfer}
  userId={userId}
  variant="modal"
  title="Điều chỉnh phân quyền"
  afterClose={() => useUserRoles.table.reload()}
/>;
// ...
```
