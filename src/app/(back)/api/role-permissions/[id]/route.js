// path: @/app/(back)/api/role-permissions/[id]/route.js

import {
  getRolePermission,
  updateRolePermission,
  deleteRolePermission,
} from "@/services/role-permissions-service";
import { buildApiResponse } from "@/utils/api-util";

export async function GET(_, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID phân quyền.");

    const result = await getRolePermission(id);
    if (!result || !result.length)
      return buildApiResponse(404, false, "Không tìm thấy phân quyền.");

    return buildApiResponse(200, true, "Lấy thông tin phân quyền thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID phân quyền.");

    const { role_id, permission_id } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!role_id || !permission_id)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const data = {
      role_id,
      permission_id,
    };

    const result = await updateRolePermission(id, data);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy phân quyền hoặc phân quyền đã bị xóa."
      );

    return buildApiResponse(200, true, "Cập nhật phân quyền thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function DELETE(_, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID phân quyền.");

    const result = await deleteRolePermission(id);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy phân quyền hoặc phân quyền đã bị xóa."
      );

    return buildApiResponse(200, true, "Xóa phân quyền thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
