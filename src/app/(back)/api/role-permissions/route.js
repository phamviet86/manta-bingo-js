// path: @/app/(back)/api/role-permissions/route.js

import {
  getRolePermissions,
  createRolePermission,
} from "@/services/role-permissions-service";
import { buildApiResponse } from "@/utils/api-util";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await getRolePermissions(searchParams);
    return buildApiResponse(200, true, "Lấy danh sách phân quyền thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function POST(request) {
  try {
    const { role_id, permission_id } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!role_id || !permission_id)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const data = {
      role_id,
      permission_id,
    };

    const result = await createRolePermission(data);

    if (!result || !result.length)
      return buildApiResponse(500, false, "Không thể thực hiện thao tác.");

    return buildApiResponse(201, true, "Tạo phân quyền thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
