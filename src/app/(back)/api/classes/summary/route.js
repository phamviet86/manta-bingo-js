// path: @/app/(back)/api/classes/summary/route.js

import { getClassesSummary } from "@/services/classes-service";
import { buildApiResponse } from "@/utils/api-util";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Lấy startDate và endDate từ searchParams
    const startDate =
      searchParams.get("start_date_e") || searchParams.get("start_date");
    const endDate =
      searchParams.get("end_date_e") || searchParams.get("end_date");

    // Kiểm tra missing params
    if (!startDate || !endDate) {
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");
    }

    const result = await getClassesSummary(searchParams, startDate, endDate);
    return buildApiResponse(200, true, "Lấy danh sách lớp học thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
