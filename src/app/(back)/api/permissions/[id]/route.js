// path: @/app/(back)/api/permissions/[id]/route.js

import {
  getPermission,
  updatePermission,
  deletePermission,
} from "@/services/permissions-service";
import { buildApiResponse } from "@/utils/api-util";

export async function GET(_, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID quyền.");

    const result = await getPermission(id);
    if (!result || !result.length)
      return buildApiResponse(404, false, "Không tìm thấy quyền.");

    return buildApiResponse(200, true, "Lấy thông tin quyền thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID quyền.");

    const { permission_key, permission_desc } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!permission_key || !permission_desc)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const data = {
      permission_key,
      permission_desc,
    };

    const result = await updatePermission(id, data);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy quyền hoặc quyền đã bị xóa."
      );

    return buildApiResponse(200, true, "Cập nhật quyền thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function DELETE(_, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID quyền.");

    const result = await deletePermission(id);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy quyền hoặc quyền đã bị xóa."
      );

    return buildApiResponse(200, true, "Xóa quyền thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
