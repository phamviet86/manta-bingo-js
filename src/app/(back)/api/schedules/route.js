// path: @/app/(back)/api/schedules/route.js

import { getSchedules, createSchedule } from "@/services/schedules-service";
import { getClass } from "@/services/classes-service";
import { buildApiResponse } from "@/utils/api-util";
import { compareDateRange } from "@/utils/compare-util";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await getSchedules(searchParams);
    return buildApiResponse(200, true, "Lấy danh sách lịch học thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function POST(request) {
  try {
    const {
      class_id,
      shift_id,
      schedule_date,
      schedule_status_id,
      source_id = null,
      lecture_id = null,
      room_id = null,
      schedule_desc = null,
    } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!class_id || !shift_id || !schedule_date || !schedule_status_id)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    // Get class information to validate schedule_date
    const classResult = await getClass(class_id);

    if (!classResult || !classResult.length) {
      return buildApiResponse(404, false, "Không tìm thấy lớp học");
    }

    const classData = classResult[0];
    const { class_start_date, class_end_date } = classData;

    // Validate schedule_date against class date range
    if (class_start_date) {
      const isDateInRange = compareDateRange(
        schedule_date,
        class_start_date,
        class_end_date
      );

      if (!isDateInRange) {
        return buildApiResponse(
          400,
          false,
          "Lịch học không nằm trong khoảng thời gian của lớp học"
        );
      }
    }

    const data = {
      class_id,
      shift_id,
      schedule_date,
      schedule_status_id,
      source_id,
      lecture_id,
      room_id,
      schedule_desc,
    };

    const result = await createSchedule(data);

    if (!result || !result.length)
      return buildApiResponse(500, false, "Không thể thực hiện thao tác.");

    return buildApiResponse(201, true, "Tạo lịch học thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
