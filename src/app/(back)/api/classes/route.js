// path: @/app/(back)/api/classes/route.js

import { getClasses, createClass } from "@/services/classes-service";
import { buildApiResponse } from "@/utils/api-util";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await getClasses(searchParams);
    return buildApiResponse(200, true, "Lấy danh sách lớp học thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function POST(request) {
  try {
    const {
      course_id,
      module_id,
      class_fee,
      class_total_fee,
      class_start_date = null,
      class_end_date = null,
    } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!course_id || !module_id || class_fee || class_total_fee)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    // Validate date range if both dates are provided
    if (class_start_date && class_end_date) {
      const startDate = new Date(class_start_date);
      const endDate = new Date(class_end_date);

      if (startDate > endDate) {
        return buildApiResponse(
          400,
          false,
          "Ngày bắt đầu không được lớn hơn ngày kết thúc"
        );
      }
    }

    const data = {
      course_id,
      module_id,
      class_fee,
      class_total_fee,
      class_start_date,
      class_end_date,
    };

    const result = await createClass(data);

    if (!result || !result.length)
      return buildApiResponse(500, false, "Không thể thực hiện thao tác.");

    return buildApiResponse(201, true, "Tạo lớp học thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
