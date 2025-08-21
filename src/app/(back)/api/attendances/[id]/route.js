// path: @/app/(back)/api/attendances/[id]/route.js

import {
  getAttendance,
  updateAttendance,
  deleteAttendance,
} from "@/services/attendances-service";
import { buildApiResponse } from "@/utils/api-util";

export async function GET(_, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID điểm danh.");

    const result = await getAttendance(id);
    if (!result || !result.length)
      return buildApiResponse(404, false, "Không tìm thấy điểm danh.");

    return buildApiResponse(200, true, "Lấy thông tin điểm danh thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID điểm danh.");

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

    const result = await updateAttendance(id, data);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy điểm danh hoặc điểm danh đã bị xóa."
      );

    return buildApiResponse(200, true, "Cập nhật điểm danh thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function DELETE(_, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID điểm danh.");

    const result = await deleteAttendance(id);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy điểm danh hoặc điểm danh đã bị xóa."
      );

    return buildApiResponse(200, true, "Xóa điểm danh thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
