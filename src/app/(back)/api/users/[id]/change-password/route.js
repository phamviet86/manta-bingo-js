// path: @/app/(back)/api/users/[id]/change-password/route.js

import { changeUserPassword, getUserPassword } from "@/services/users-service";
import { buildApiResponse } from "@/utils/api-util";
import { hashPassword, comparePassword } from "@/utils/bcrypt-util";

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    if (!id) {
      return buildApiResponse(400, false, "Thiếu ID người dùng.");
    }

    // Get request body data
    const { currentPassword, newPassword, confirmPassword } =
      await request.json();

    // Validate required fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      return buildApiResponse(
        400,
        false,
        "Thiếu thông tin mật khẩu cũ, mật khẩu mới hoặc xác nhận mật khẩu."
      );
    }

    // Validate new password confirmation
    if (newPassword !== confirmPassword) {
      return buildApiResponse(
        400,
        false,
        "Mật khẩu mới và xác nhận mật khẩu không khớp."
      );
    }

    // Get current user password
    const currentPasswordResult = await getUserPassword(id);
    if (!currentPasswordResult || !currentPasswordResult.length) {
      return buildApiResponse(404, false, "Không tìm thấy người dùng.");
    }

    const currentHashedPassword = currentPasswordResult[0].user_password;

    // Verify old password
    const isCurrentPasswordValid = await comparePassword(
      currentPassword,
      currentHashedPassword
    );
    if (!isCurrentPasswordValid) {
      return buildApiResponse(400, false, "Mật khẩu cũ không đúng.");
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword);

    // Update password
    const result = await changeUserPassword(id, hashedNewPassword);
    if (!result || !result.length) {
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy người dùng hoặc đã bị xóa."
      );
    }

    return buildApiResponse(200, true, "Đổi mật khẩu thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
