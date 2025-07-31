// path: @/app/(back)/api/permissions/route.js

import {
  getPermissions,
  createPermission,
} from "@/services/permissions-service";
import { buildApiResponse } from "@/utils/api-util";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await getPermissions(searchParams);
    return buildApiResponse(200, true, "Lấy danh sách quyền thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function POST(request) {
  try {
    const { permission_key, permission_desc } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!permission_key || !permission_desc)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const data = {
      permission_key,
      permission_desc,
    };

    const result = await createPermission(data);

    if (!result || !result.length)
      return buildApiResponse(500, false, "Không thể thực hiện thao tác.");

    return buildApiResponse(201, true, "Tạo quyền thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
