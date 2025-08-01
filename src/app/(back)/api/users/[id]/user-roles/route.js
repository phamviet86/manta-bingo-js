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
