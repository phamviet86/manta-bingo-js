// path: @/app/(back)/api/schedules/duplicate/route.js

import {
  duplicateSchedules,
  deleteSchedulesBySource,
} from "@/services/schedules-service";
import { buildApiResponse } from "@/utils/api-util";

export async function POST(request) {
  try {
    const { ids, days = 7 } = await request.json();

    // Validate required fields
    if (!Array.isArray(ids) || ids.length === 0)
      return buildApiResponse(400, false, "Thiếu danh sách ID lịch học");

    const result = await duplicateSchedules(ids, days);

    if (!result || !result.length)
      return buildApiResponse(404, false, "Không thể sao chép lịch học.");

    return buildApiResponse(201, true, "Sao chép lịch học thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function DELETE(request) {
  try {
    const { sourceIds } = await request.json();

    // Validate required fields
    if (!Array.isArray(sourceIds) || sourceIds.length === 0)
      return buildApiResponse(400, false, "Thiếu danh sách source ID lịch học");

    const result = await deleteSchedulesBySource(sourceIds);

    if (!result || !result.length)
      return buildApiResponse(404, false, "Không tìm thấy lịch học để xóa");

    return buildApiResponse(200, true, "Xóa lịch học thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
