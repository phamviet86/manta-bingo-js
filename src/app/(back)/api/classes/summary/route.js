// path: @/app/(back)/api/classes/route.js

import { getClassesByDate } from "@/services/classes-service";
import { buildApiResponse } from "@/utils/api-util";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Lấy startDate và endDate từ searchParams; format: YYYY-MM-DD
    const startDate =
      searchParams.get("start_date_e") || searchParams.get("start_date");
    const endDate =
      searchParams.get("end_date_e") || searchParams.get("end_date");

    const result = await getClassesByDate(searchParams, startDate, endDate);
    return buildApiResponse(200, true, "Lấy danh sách lớp học thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
