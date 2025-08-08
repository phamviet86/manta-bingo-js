// path: @/app/(back)/api/classes/[id]/enrollments/route.js

import {
  createEnrollmentsByClass,
  deleteEnrollmentsByClass,
} from "@/services/enrollments-service";
import { buildApiResponse } from "@/utils/api-util";

// Tạo nhiều đăng ký cho lớp theo danh sách userIds
export async function POST(request, context) {
  try {
    const { id: classId } = await context.params;
    if (!classId) {
      return buildApiResponse(400, false, "Thiếu ID lớp học.");
    }

    const {
      userIds,
      enrollmentTypeId,
      paymentTypeId = 30,
      paymentAmount = 0,
    } = await request.json();

    // Validate required fields
    if (
      !classId ||
      !Array.isArray(userIds) ||
      userIds.length === 0 ||
      !enrollmentTypeId
    ) {
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");
    }

    const result = await createEnrollmentsByClass(
      classId,
      userIds,
      enrollmentTypeId,
      paymentTypeId,
      paymentAmount
    );

    if (!result || !result.length)
      return buildApiResponse(404, false, "Không thể tạo đăng ký cho lớp.");

    return buildApiResponse(201, true, "Tạo đăng ký cho lớp thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

// Xóa mềm nhiều đăng ký theo lớp và danh sách userIds
export async function DELETE(request, context) {
  try {
    const { id: classId } = await context.params;
    if (!classId) {
      return buildApiResponse(400, false, "Thiếu ID lớp học.");
    }

    const { userIds } = await request.json();

    // Validate required fields
    if (!classId || !Array.isArray(userIds) || userIds.length === 0)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const result = await deleteEnrollmentsByClass(classId, userIds);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy đăng ký đã gán để xóa"
      );

    return buildApiResponse(200, true, "Loại bỏ đăng ký đã gán", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
