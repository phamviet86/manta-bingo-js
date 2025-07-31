// path: @/app/(back)/api/rooms/route.js

import { getRooms, createRoom } from "@/services/rooms-service";
import { buildApiResponse } from "@/utils/api-util";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await getRooms(searchParams);
    return buildApiResponse(200, true, "Lấy danh sách phòng học thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function POST(request) {
  try {
    const {
      room_name,
      room_status_id,
      room_desc = null,
    } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!room_name || !room_status_id)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const data = {
      room_name,
      room_status_id,
      room_desc,
    };

    const result = await createRoom(data);

    if (!result || !result.length)
      return buildApiResponse(500, false, "Không thể thực hiện thao tác.");

    return buildApiResponse(201, true, "Tạo phòng học thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
