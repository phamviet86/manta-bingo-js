// path: @/app/(back)/api/attendances/route.js

import {
  getAttendances,
  createAttendance,
} from "@/services/attendances-service";
import { buildApiResponse } from "@/utils/api-util";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await getAttendances(searchParams);
    return buildApiResponse(200, true, "Lấy danh sách điểm danh thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function POST(request) {
  try {
    const {
      schedule_id,
      enrollment_id,
      attendance_status_id,
      attendance_type_id,
      attendance_desc = null,
    } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (
      !schedule_id ||
      !enrollment_id ||
      !attendance_status_id ||
      !attendance_type_id
    )
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const data = {
      schedule_id,
      enrollment_id,
      attendance_status_id,
      attendance_type_id,
      attendance_desc,
    };

    const result = await createAttendance(data);

    if (!result || !result.length)
      return buildApiResponse(500, false, "Không thể thực hiện thao tác.");

    return buildApiResponse(201, true, "Tạo điểm danh thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
