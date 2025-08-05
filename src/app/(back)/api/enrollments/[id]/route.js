// path: @/app/(back)/api/enrollments/[id]/route.js

import {
  getEnrollment,
  updateEnrollment,
  deleteEnrollment,
} from "@/services/enrollments-service";
import { buildApiResponse } from "@/utils/api-util";

export async function GET(_, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID đăng ký.");

    const result = await getEnrollment(id);
    if (!result || !result.length)
      return buildApiResponse(404, false, "Không tìm thấy đăng ký.");

    return buildApiResponse(200, true, "Lấy thông tin đăng ký thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID đăng ký.");

    const {
      user_id,
      enrollment_type_id,
      // Required fields above
      module_id = null,
      class_id = null,
      enrollment_payment_type_id = null,
      enrollment_payment_amount = null,
      enrollment_start_date = null,
      enrollment_end_date = null,
      enrollment_desc = null,
    } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!user_id || !enrollment_type_id)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const data = {
      user_id,
      enrollment_type_id,
      module_id,
      class_id,
      enrollment_payment_type_id,
      enrollment_payment_amount,
      enrollment_start_date,
      enrollment_end_date,
      enrollment_desc,
    };

    const result = await updateEnrollment(id, data);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy đăng ký hoặc đăng ký đã bị xóa."
      );

    return buildApiResponse(200, true, "Cập nhật đăng ký thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function DELETE(_, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID đăng ký.");

    const result = await deleteEnrollment(id);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy đăng ký hoặc đăng ký đã bị xóa."
      );

    return buildApiResponse(200, true, "Xóa đăng ký thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
