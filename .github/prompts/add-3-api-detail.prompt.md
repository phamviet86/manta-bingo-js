---
mode: "agent"
model: GPT-4.1
tools: ["changes","codebase","editFiles","githubRepo","problems","search","searchResults"]
description: "Generate API detail route file from SQL table structure using template code"
---

# Generate API Detail Route from SQL Table

## Instructions

Generate detail API route file from SQL table structure using the template below.

## Template

Use this exact template code:

```javascript
// path: @/app/(back)/api/{table-name}/[id]/route.js

import {
  get{TableNameSingular},
  update{TableNameSingular},
  delete{TableNameSingular},
} from "@/services/{table-name}-service";
import { buildApiResponse } from "@/utils/api-util";

export async function GET(_, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID {vnTableNameSingular}.");

    const result = await get{TableNameSingular}(id);
    if (!result || !result.length)
      return buildApiResponse(404, false, "Không tìm thấy {vnTableNameSingular}.");

    return buildApiResponse(200, true, "Lấy thông tin {vnTableNameSingular} thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID {vnTableNameSingular}.");

    const {
      {field1},
      {field2},
      {field3},
      {optional1} = null,
      {optional2} = null,
    } = await request.json();

    // Validate required fields (based on NOT NULL constraints in SQL)
    if (!{field1} || !{field2} || !{field3})
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const data = {
      {field1},
      {field2},
      {field3},
      {optional1},
      {optional2},
    };

    const result = await update{TableNameSingular}(id, data);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy {vnTableNameSingular} hoặc {vnTableNameSingular} đã bị xóa."
      );

    return buildApiResponse(200, true, "Cập nhật {vnTableNameSingular} thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function DELETE(_, context) {
  try {
    const { id } = await context.params;
    if (!id) return buildApiResponse(400, false, "Thiếu ID {vnTableNameSingular}.");

    const result = await delete{TableNameSingular}(id);

    if (!result || !result.length)
      return buildApiResponse(
        404,
        false,
        "Không tìm thấy {vnTableNameSingular} hoặc {vnTableNameSingular} đã bị xóa."
      );

    return buildApiResponse(200, true, "Xóa {vnTableNameSingular} thành công.", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
```

## Placeholder Mapping

Replace template placeholders with your table data:

### Naming Placeholders

- **{table-name}**: kebab-case table name (e.g., `options`, `user-roles`)
- **{TableNameSingular}**: PascalCase singular (e.g., `Option`, `UserRole`)
- **{vnTableNameSingular}**: Vietnamese singular label (e.g., `tùy chọn`, `vai trò người dùng`)

### Field Placeholders

- **{field1}, {field2}, {field3}**: Required JSON fields from NOT NULL columns in SQL
- **{optional1}, {optional2}**: Optional JSON fields from nullable columns in SQL
- Use **snake_case** for database field names (do NOT convert to camelCase)
- Skip system columns: `id`, `created_at`, `updated_at`, `deleted_at`

## Quick Steps

1. **File Path**: Create `src/app/(back)/api/{table-name}/[id]/route.js`
2. **Copy Template**: Use the exact template structure above
3. **Replace Names**: Fill in table naming placeholders
4. **Map Fields**: Replace field placeholders with your table's columns
5. **Validate**: Ensure all 3 functions (GET, PUT, DELETE) are present

## Critical Rules

- ✅ **File naming**: kebab-case with `[id]` folder (e.g., `options/[id]/route.js`)
- ✅ **Functions**: 3 required (GET by id, PUT update, DELETE)
- ✅ **Parameter handling**: Use `const { id } = await context.params;` exactly as shown
- ✅ **Field validation**: Validate all NOT NULL fields before database operation
- ✅ **Error handling**: All functions wrapped in try-catch
- ✅ **Field naming**: Use snake_case for database fields
- ✅ **Response format**: Use `buildApiResponse` utility exactly as shown
- ✅ **Vietnamese messages**: Use Vietnamese table name for user-friendly messages

## HTTP Method Patterns

### GET Function MUST:

- Use parameter format: `(_, context)`
- Use `const { id } = await context.params;` exactly as shown
- Use `if (!id) return buildApiResponse(400, false, "Thiếu ID {vnTableNameSingular}.");` validation
- Use `if (!result || !result.length) return buildApiResponse(404, false, "Không tìm thấy {vnTableNameSingular}.");` check
- Use 200 status code for success

### PUT Function MUST:

- Use parameter format: `(request, context)`
- Destructure required and optional fields with `= null` defaults
- Use `if (!{field1} || !{field2} || !{field3}) return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");` validation
- Use `if (!result || !result.length) return buildApiResponse(404, false, "Không tìm thấy {vnTableNameSingular} hoặc {vnTableNameSingular} đã bị xóa.");` check
- Use 200 status code for successful update

### DELETE Function MUST:

- Use parameter format: `(_, context)`
- Use `const { id } = await context.params;` exactly as shown
- Use `if (!id) return buildApiResponse(400, false, "Thiếu ID {vnTableNameSingular}.");` validation
- Use `if (!result || !result.length) return buildApiResponse(404, false, "Không tìm thấy {vnTableNameSingular} hoặc {vnTableNameSingular} đã bị xóa.");` check
- Use 200 status code for successful deletion

## Validation Checklist

- ✅ **File location**: `src/app/(back)/api/{table-name}/[id]/route.js`
- ✅ **File naming**: kebab-case convention with [id] dynamic route
- ✅ **Functions**: GET by id, PUT update, and DELETE methods
- ✅ **Service imports**: Import corresponding service functions
- ✅ **Error handling**: try-catch blocks in all functions
- ✅ **Parameter handling**: Correct context.params usage
- ✅ **Response format**: Uses `buildApiResponse` exactly as shown
- ✅ **Vietnamese messages**: Uses Vietnamese table name placeholders
- ✅ **Field validation**: Required field validation based on SQL NOT NULL constraints
- ✅ **Field naming**: snake_case for database fields (NOT camelCase)
- ✅ **Status codes**: 200 for success, 400 for bad request, 404 for not found, 500 for server error

## Output Location

Generated file: `src/app/(back)/api/{table-name}/[id]/route.js`
