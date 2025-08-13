// path: @/app/(back)/api/users/[id]/enrollments/route.js

import {
  createEnrollmentsByUser,
  deleteEnrollmentsByUser,
} from "@/services/enrollments-service";
import { getClassesFees } from "@/services/classes-service";
import { buildApiResponse } from "@/utils/api-util";

// Tạo nhiều đăng ký cho người dùng theo danh sách classIds
export async function POST(request, context) {
  try {
    const { id: userId } = await context.params;
    if (!userId) {
      return buildApiResponse(400, false, "Thiếu ID người dùng.");
    }

    const {
      classIds,
      enrollmentTypeId,
      enrollmentPaymentTypeId = 30,
    } = await request.json();

    // Validate required fields
    if (
      !Array.isArray(classIds) ||
      classIds.length === 0 ||
      !enrollmentTypeId
    ) {
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");
    }

    // Get class data with fees based on enrollmentTypeId
    let classesData;
    if (enrollmentTypeId === 28) {
      // If enrollmentTypeId = 28, get actual class fees
      classesData = await getClassesFees(classIds);
    } else {
      // If not enrollmentTypeId = 28, set class_fee = 0 for all classes
      classesData = classIds.map((id) => ({
        id,
        class_fee: 0,
      }));
    }

    const result = await createEnrollmentsByUser(
      userId,
      classesData,
      enrollmentTypeId,
      enrollmentPaymentTypeId
    );

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không thể tạo đăng ký cho người dùng."
      );

    return buildApiResponse(
      201,
      true,
      "Tạo đăng ký cho người dùng thành công",
      {
        data: result,
      }
    );
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

// Xóa mềm nhiều đăng ký theo người dùng và danh sách classIds
export async function DELETE(request, context) {
  try {
    const { id: userId } = await context.params;
    if (!userId) {
      return buildApiResponse(400, false, "Thiếu ID người dùng.");
    }

    const { classIds, enrollmentTypeId } = await request.json();

    // Validate required fields
    if (!Array.isArray(classIds) || classIds.length === 0 || !enrollmentTypeId)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const result = await deleteEnrollmentsByUser(
      userId,
      classIds,
      enrollmentTypeId
    );

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
