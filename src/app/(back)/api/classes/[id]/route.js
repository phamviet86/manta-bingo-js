// path: @/app/(back)/api/classes/[id]/route.js

import { getClass, updateClass, deleteClass } from "@/services/classes-service";
import { buildApiResponse } from "@/utils/api-util";
import { compareDates } from "@/utils/compare-util";

export async function GET(_, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID lớp học.");

    const result = await getClass(id);
    if (!result || !result.length)
      return buildApiResponse(404, false, "Không tìm thấy lớp học.");

    return buildApiResponse(200, true, "Lấy thông tin lớp học thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID lớp học.");

    const {
      course_id,
      module_id,
      class_fee,
      class_total_fee,
      class_start_date = null,
      class_end_date = null,
    } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!course_id || !module_id)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    // Validate date range if both dates are provided
    if (class_start_date && class_end_date) {
      if (!compareDates(class_start_date, class_end_date))
        return buildApiResponse(
          400,
          false,
          "Ngày bắt đầu không được lớn hơn ngày kết thúc"
        );
    }

    const data = {
      course_id,
      module_id,
      class_fee,
      class_total_fee,
      class_start_date,
      class_end_date,
    };

    const result = await updateClass(id, data);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy lớp học hoặc lớp học đã bị xóa."
      );

    return buildApiResponse(200, true, "Cập nhật lớp học thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function DELETE(_, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID lớp học.");

    const result = await deleteClass(id);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy lớp học hoặc lớp học đã bị xóa."
      );

    return buildApiResponse(200, true, "Xóa lớp học thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
