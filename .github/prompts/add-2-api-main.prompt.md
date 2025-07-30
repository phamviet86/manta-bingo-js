---
mode: "agent"
model: GPT-4.1
tools: ["changes","codebase","editFiles","githubRepo","problems","search","searchResults"]
description: "Generate API main route file from SQL table structure using template code"
---

# Generate API Main Route from SQL Table

## Instructions

Generate main API route file from SQL table structure using the template below.

## Template

Use this exact template code:

```javascript
// path: @/app/(back)/api/{table-name}/route.js

import { get{TableNamePlural}, create{TableNameSingular} } from "@/services/{table-name}-service";
import { buildApiResponse } from "@/utils/api-util";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const result = await get{TableNamePlural}(searchParams);
    return buildApiResponse(200, true, "Lấy danh sách {vnTableNamePlural} thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function POST(request) {
  try {
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

    const result = await create{TableNameSingular}(data);

    if (!result || !result.length)
      return buildApiResponse(500, false, "Không thể thực hiện thao tác.");

    return buildApiResponse(201, true, "Tạo {vnTableNameSingular} thành công.", {
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
- **{TableNamePlural}**: PascalCase plural (e.g., `Options`, `UserRoles`)
- **{TableNameSingular}**: PascalCase singular (e.g., `Option`, `UserRole`)
- **{vnTableNamePlural}**: Vietnamese plural label (e.g., `tùy chọn`, `vai trò người dùng`)
- **{vnTableNameSingular}**: Vietnamese singular label (e.g., `tùy chọn`, `vai trò người dùng`)

### Field Placeholders

- **{field1}, {field2}, {field3}**: Required JSON fields from NOT NULL columns in SQL
- **{optional1}, {optional2}**: Optional JSON fields from nullable columns in SQL
- Use **snake_case** for database field names (do NOT convert to camelCase)
- Skip system columns: `id`, `created_at`, `updated_at`, `deleted_at`

## Quick Steps

1. **File Path**: Create `src/app/(back)/api/{table-name}/route.js`
2. **Copy Template**: Use the exact template structure above
3. **Replace Names**: Fill in table naming placeholders
4. **Map Fields**: Replace field placeholders with your table's columns
5. **Validate**: Ensure both GET and POST functions are present

## Critical Rules

- ✅ **File naming**: kebab-case (e.g., `options/route.js`)
- ✅ **Functions**: 2 required (GET list, POST create)
- ✅ **Field validation**: Validate all NOT NULL fields before database operation
- ✅ **Error handling**: All functions wrapped in try-catch
- ✅ **Field naming**: Use snake_case for database fields
- ✅ **Response format**: Use `buildApiResponse` utility exactly as shown
- ✅ **Vietnamese messages**: Use Vietnamese table name for user-friendly messages

## HTTP Method Patterns

### GET Function MUST:

- Use `const { searchParams } = new URL(request.url);` exactly as shown
- Use `return buildApiResponse(200, true, "Lấy danh sách {vnTableNamePlural} thành công", { data: result, });` pattern
- Use 500 status code for server errors

### POST Function MUST:

- Destructure required and optional fields with `= null` defaults
- Use `if (!{field1} || !{field2} || !{field3}) return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");` validation
- Use `if (!result || !result.length) return buildApiResponse(500, false, "Không thể thực hiện thao tác.");` check
- Use `return buildApiResponse(201, true, "Tạo {vnTableNameSingular} thành công.", { data: result, });` success response

## Validation Checklist

- ✅ **File location**: `src/app/(back)/api/{table-name}/route.js`
- ✅ **File naming**: kebab-case convention
- ✅ **Functions**: GET list and POST create methods
- ✅ **Service imports**: Import corresponding service functions
- ✅ **Error handling**: try-catch blocks in all functions
- ✅ **Response format**: Uses `buildApiResponse` exactly as shown
- ✅ **Vietnamese messages**: Uses Vietnamese table name placeholders
- ✅ **Field validation**: Required field validation based on SQL NOT NULL constraints
- ✅ **Field naming**: snake_case for database fields (NOT camelCase)

## Output Location

Generated file: `src/app/(back)/api/{table-name}/route.js`
