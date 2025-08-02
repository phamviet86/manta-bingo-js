// path: @/app/(back)/api/modules/[id]/route.js

import {
  getModule,
  updateModule,
  deleteModule,
} from "@/services/modules-service";
import { buildApiResponse } from "@/utils/api-util";

export async function GET(_, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID học phần.");

    const result = await getModule(id);
    if (!result || !result.length)
      return buildApiResponse(404, false, "Không tìm thấy học phần.");

    return buildApiResponse(200, true, "Lấy thông tin học phần thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID học phần.");

    const {
      syllabus_id,
      module_name,
      module_status_id,
      module_desc = null,
    } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!syllabus_id || !module_name || !module_status_id)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const data = {
      syllabus_id,
      module_name,
      module_status_id,
      module_desc,
    };

    const result = await updateModule(id, data);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy học phần hoặc học phần đã bị xóa."
      );

    return buildApiResponse(200, true, "Cập nhật học phần thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function DELETE(_, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID học phần.");

    const result = await deleteModule(id);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy học phần hoặc học phần đã bị xóa."
      );

    return buildApiResponse(200, true, "Xóa học phần thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
