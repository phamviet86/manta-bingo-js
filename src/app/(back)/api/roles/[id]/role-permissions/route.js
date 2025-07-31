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
