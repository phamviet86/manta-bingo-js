# Template code for transfer

## Sql code

```sql
-- table: phân quyền

DROP TABLE IF EXISTS role_permissions CASCADE;
CREATE TABLE role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,
  role_id INTEGER NOT NULL,
  permission_id INTEGER NOT NULL
);
CREATE TRIGGER update_record BEFORE
UPDATE ON role_permissions FOR EACH ROW EXECUTE FUNCTION set_updated_at();
```

## Service code

```javascript
// path: @/services/role-permissions-service.js

import bingoDB from "@/db/connections/neon-bingo";

// Database initialization
const sql = bingoDB();

// Create multiple role permissions by role ID and permissions IDs
export async function createRolePermissionsByRole(roleId, permissionIds) {
  try {
    const queryValues = [];
    const valuePlaceholders = permissionIds
      .map((permissionId, index) => {
        queryValues.push(roleId, permissionId);
        return `($${index * 2 + 1}, $${index * 2 + 2})`;
      })
      .join(", ");

    const queryText = `
      INSERT INTO role_permissions (role_id, permission_id)
      VALUES ${valuePlaceholders}
      RETURNING *;
    `;

    return await sql.query(queryText, queryValues);
  } catch (error) {
    throw new Error(error.message);
  }
}

// Soft-delete multiple role permissions by role ID and permission IDs
export async function deleteRolePermissionsByRole(roleId, permissionIds) {
  try {
    const placeholders = permissionIds
      .map((_, index) => `$${index + 2}`)
      .join(", ");

    const queryText = `
      UPDATE role_permissions
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL 
        AND role_id = $1 
        AND permission_id IN (${placeholders})
      RETURNING *;
    `;

    const queryValues = [roleId, ...permissionIds];
    return await sql.query(queryText, queryValues);
  } catch (error) {
    throw new Error(error.message);
  }
}
```

## Api code

```javascript
// path: @/app/(back)/api/roles/[id]/role-permissions/route.js

import {
  createRolePermissionsByRole,
  deleteRolePermissionsByRole,
} from "@/services/role-permissions-service";
import { buildApiResponse } from "@/utils/api-util";

export async function POST(request, context) {
  try {
    const { id: roleId } = await context.params;
    if (!roleId) {
      return buildApiResponse(400, false, "Thiếu ID vai trò.");
    }

    const { permissionIds } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!roleId || !Array.isArray(permissionIds) || permissionIds.length === 0)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const result = await createRolePermissionsByRole(roleId, permissionIds);

    if (!result || !result.length)
      return buildApiResponse(404, false, "Không thể gán quyền cho vai trò.");

    return buildApiResponse(201, true, "Gán quyền cho vai trò thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function DELETE(request, context) {
  try {
    const { id: roleId } = await context.params;
    if (!roleId) {
      return buildApiResponse(400, false, "Thiếu ID vai trò.");
    }

    const { permissionIds } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!roleId || !Array.isArray(permissionIds) || permissionIds.length === 0)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const result = await deleteRolePermissionsByRole(roleId, permissionIds);

    if (!result || !result.length)
      return buildApiResponse(404, false, "Không tìm thấy quyền đã gán để xóa");

    return buildApiResponse(200, true, "Loại bỏ quyền đã gán", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
```

## Component code

```javascript
// path: @/components/feature/role-permissions-component.js

import { AntTransfer } from "@/components/ui";
import { fetchList, fetchPost, fetchDelete } from "@/utils/fetch-util";

export function RolePermissionsTransferByRole({ roleId, ...props }) {
  return (
    <AntTransfer
      {...props}
      onSourceRequest={(params) => fetchList(`/api/permissions`, params)}
      onTargetRequest={(params) => fetchList(`/api/role-permissions`, params)}
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
      render={(record) =>
        `${record?.permission_key} - ${record?.permission_desc}`
      }
      titles={["Quyền", "Đã gán"]}
      operations={["Gán quyền", "Xóa quyền"]}
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

## Page code

```javascript
// ...
import { RolePermissionsTransferByRole } from "@/components/feature";
import { useTransfer } from "@/hooks";
// ...
const useRolePermissions = {
  transfer: useTransfer(),
};
// ...
<RolePermissionsTransferByRole
  transferHook={useRolePermissions.transfer}
  roleId={roleId}
  targetParams={{ role_id: roleId }}
/>;
// ...
```
