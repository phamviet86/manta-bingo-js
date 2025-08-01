// path: @/app/(back)/api/users/[id]/reset-password/route.js

import { changeUserPassword } from "@/services/users-service";
import { buildApiResponse } from "@/utils/api-util";
import { hashPassword } from "@/utils/bcrypt-util";

export async function PUT(_, context) {
  try {
    const { id } = await context.params;
    if (!id) {
      return buildApiResponse(400, false, "Thiếu ID người dùng.");
    }

    const userPassword = await hashPassword(
      process.env.DEFAULT_USER_PASSWORD || "12345678"
    );

    const result = await changeUserPassword(id, userPassword);
    if (!result || !result.length) {
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy người dùng hoặc đã bị xóa."
      );
    }

    return buildApiResponse(
      200,
      true,
      "Khôi phục mật khẩu mặc định thành công.",
      {
        data: result,
      }
    );
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
