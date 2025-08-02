// path: @/app/(back)/api/syllabuses/route.js

import { getSyllabuses, createSyllabus } from "@/services/syllabuses-service";
import { buildApiResponse } from "@/utils/api-util";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await getSyllabuses(searchParams);
    return buildApiResponse(200, true, "Lấy danh sách giáo trình thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function POST(request) {
  try {
    const { syllabus_name, syllabus_status_id } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!syllabus_name || !syllabus_status_id)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const data = {
      syllabus_name,
      syllabus_status_id,
    };

    const result = await createSyllabus(data);

    if (!result || !result.length)
      return buildApiResponse(500, false, "Không thể thực hiện thao tác.");

    return buildApiResponse(201, true, "Tạo giáo trình thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
