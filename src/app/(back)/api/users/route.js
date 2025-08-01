// path: @/app/(back)/api/users/route.js

import { getUsers, createUser, getUserByEmail } from "@/services/users-service";
import { buildApiResponse } from "@/utils/api-util";
import { hashPassword } from "@/utils/bcrypt-util";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await getUsers(searchParams);
    return buildApiResponse(200, true, "Lấy danh sách người dùng thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function POST(request) {
  try {
    const {
      user_name,
      user_status_id,
      user_email,
      user_phone = null,
      user_parent_phone = null,
      user_avatar = null,
      user_desc = null,
      user_notes = null,
    } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!user_name || !user_status_id || !user_email)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    // Check if email already exists
    const existingUser = await getUserByEmail(user_email);
    if (existingUser && existingUser.length > 0) {
      return buildApiResponse(409, false, "Email đã tồn tại trong hệ thống");
    }

    // Hash the default password
    const user_password = await hashPassword(
      process.env.DEFAULT_USER_PASSWORD || "12345678"
    );

    const data = {
      user_name,
      user_status_id,
      user_email,
      user_password,
      user_phone,
      user_parent_phone,
      user_avatar,
      user_desc,
      user_notes,
    };

    const result = await createUser(data);

    if (!result || !result.length)
      return buildApiResponse(500, false, "Không thể thực hiện thao tác.");

    return buildApiResponse(201, true, "Tạo người dùng thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
