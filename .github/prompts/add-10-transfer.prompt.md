---
mode: "agent"
model: GPT-4.1
tools: ["changes","codebase","editFiles","githubRepo","problems","search","searchResults"]
description: "Generate transfer CRUD code (service, API, component, page) from SQL table definition using template code"
---

# Generate Transfer CRUD Code from SQL Table

## Instructions

Generate transfer CRUD code (service, API, component, page) from SQL table structure using the template code.

## Template

Use these exact template codes:

### Service Code

```javascript
// path: @/services/{tableName}-service.js

import bingoDB from "@/db/connections/neon-bingo";

// Database initialization
const sql = bingoDB();

// Create multiple {vnTableName} by {transferOwnerField} and {transferKeyField}s
export async function create{TableName}ByOwner({transferOwnerField}, {transferKeyField}s) {
  try {
    const queryValues = [];
    const valuePlaceholders = {transferKeyField}s
      .map(({transferKeyField}, index) => {
        queryValues.push({transferOwnerField}, {transferKeyField});
        return `($${index * 2 + 1}, $${index * 2 + 2})`;
      })
      .join(", ");

    const queryText = `
      INSERT INTO {tableName} ({transferOwnerField}, {transferKeyField})
      VALUES ${valuePlaceholders}
      RETURNING *;
    `;

    return await sql.query(queryText, queryValues);
  } catch (error) {
    throw new Error(error.message);
  }
}

// Soft-delete multiple {vnTableName} by {transferOwnerField} and {transferKeyField}s
export async function delete{TableName}ByOwner({transferOwnerField}, {transferKeyField}s) {
  try {
    const placeholders = {transferKeyField}s
      .map((_, index) => `$${index + 2}`)
      .join(", ");

    const queryText = `
      UPDATE {tableName}
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL
        AND {transferOwnerField} = $1
        AND {transferKeyField} IN (${placeholders})
      RETURNING *;
    `;

    const queryValues = [{transferOwnerField}, ...{transferKeyField}s];
    return await sql.query(queryText, queryValues);
  } catch (error) {
    throw new Error(error.message);
  }
}
```

### API Code

```javascript
// path: @/app/(back)/api/{transferOwnerField}s/[id]/{tableName}/route.js

import {
  create{TableName}ByOwner,
  delete{TableName}ByOwner,
} from "@/services/{tableName}-service";
import { buildApiResponse } from "@/utils/api-util";

export async function POST(request, context) {
  try {
    const { id: {transferOwnerField} } = await context.params;
    if (!{transferOwnerField}) {
      return buildApiResponse(400, false, "Thiếu ID {transferOwnerName}.");
    }

    const { {transferKeyField}s } = await request.json();

    // Validate required fields
    if (!{transferOwnerField} || !Array.isArray({transferKeyField}s) || {transferKeyField}s.length === 0)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const result = await create{TableName}ByOwner({transferOwnerField}, {transferKeyField}s);

    if (!result || !result.length)
      return buildApiResponse(404, false, "Không thể gán {vnTableName} cho {transferOwnerName}.");

    return buildApiResponse(201, true, "Gán {vnTableName} cho {transferOwnerName} thành công", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}

export async function DELETE(request, context) {
  try {
    const { id: {transferOwnerField} } = await context.params;
    if (!{transferOwnerField}) {
      return buildApiResponse(400, false, "Thiếu ID {transferOwnerName}.");
    }

    const { {transferKeyField}s } = await request.json();

    // Validate required fields
    if (!{transferOwnerField} || !Array.isArray({transferKeyField}s) || {transferKeyField}s.length === 0)
      return buildApiResponse(400, false, "Thiếu thông tin bắt buộc");

    const result = await delete{TableName}ByOwner({transferOwnerField}, {transferKeyField}s);

    if (!result || !result.length)
      return buildApiResponse(404, false, "Không tìm thấy {vnTableName} đã gán để xóa");

    return buildApiResponse(200, true, "Loại bỏ {vnTableName} đã gán", {
      data: result,
    });
  } catch (error) {
    return buildApiResponse(500, false, error.message);
  }
}
```

### Component Code

```javascript
// path: @/components/feature/{tableName}-component.js

import { AntTransfer } from "@/components/ui";
import { fetchList, fetchPost, fetchDelete } from "@/utils/fetch-util";

export function {TableName}TransferByOwner({ {transferOwnerField}, ...props }) {
  return (
    <AntTransfer
      {...props}
      onSourceRequest={(params) => fetchList(`/api/{sourceTableName}`, params)}
      onTargetRequest={(params) => fetchList(`/api/{tableName}`, params)}
      onAddItem={(keys) =>
        fetchPost(`/api/{transferOwnerField}s/${{transferOwnerField}}/{tableName}`, {
          {transferKeyField}s: keys,
        })
      }
      onRemoveItem={(keys) =>
        fetchDelete(`/api/{transferOwnerField}s/${{transferOwnerField}}/{tableName}`, {
          {transferKeyField}s: keys,
        })
      }
      sourceItem={{ key: "{sourceKeyField}" }}
      targetItem={{ key: "{transferKeyField}" }}
      render={(record) =>
        `{record?.{sourceDisplayFields[0]}} - {record?.{sourceDisplayFields[1]}}`
      }
      titles={["{transferKeyField} nguồn", "Đã gán"]}
      operations={["Gán {vnTableName}", "Xóa {vnTableName}"]}
      showSearch={true}
      searchSourceColumns={["{sourceDisplayFields[0]}_like", "{sourceDisplayFields[1]}_like"]}
      searchTargetColumns={["{targetDisplayFields[0]}_like", "{targetDisplayFields[1]}_like"]}
      locale={{
        searchPlaceholder: "Tìm kiếm...",
        itemsUnit: "{vnTableName}",
        itemUnit: "{vnTableName}",
        notFoundContent: "Không tìm thấy {vnTableName}",
      }}
    />
  );
}
```

### Page Code

```javascript
// ...
import { {TableName}TransferByOwner } from "@/components/feature";
import { useTransfer } from "@/hooks";
// ...
const use{TableName} = {
  transfer: useTransfer(),
};
// ...
<{TableName}TransferByOwner
  transferHook={use{TableName}.transfer}
  {transferOwnerField}={transferOwnerId}
  targetParams={{ {transferOwnerField}: {transferOwnerId} }}
/>;
// ...
```

## Placeholder Mapping

Replace template placeholders with your table data:

### Naming Placeholders

- **{tableName}**: snake_case table name (e.g., `role_permissions`)
- **{TableName}**: PascalCase table name (e.g., `RolePermissions`)
- **{vnTableName}**: Vietnamese table description (e.g., `phân quyền`)
- **{transferKeyField}**: Transfer key field (e.g., `permission_id`)
- **{transferKeyField}s**: Array of transfer key fields (e.g., `permissionIds`)
- **{transferOwnerField}**: Transfer owner field (e.g., `role_id`)
- **{transferOwnerName}**: Vietnamese owner description (e.g., `vai trò`)
- **{sourceTableName}**: Source table name (e.g., `permissions`)
- **{sourceKeyField}**: Source table key field (e.g., `id`)
- **{sourceDisplayFields}**: Source table display fields (e.g., `permission_key`, `permission_desc`)
- **{targetDisplayFields}**: Target table display fields (e.g., `permission_key`, `permission_desc`)

### Template Structure

- Use **PascalCase** for component imports and usage
- Use **camelCase** for variable naming
- Use **Vietnamese** labels for all user-facing text
- Keep all component structure, imports, and hooks exactly as shown

## Quick Steps

1. **Service File**: Create `src/services/{tableName}-service.js`
2. **API File**: Create `src/app/(back)/api/{transferOwnerField}s/[id]/{tableName}/route.js`
3. **Component File**: Create `src/components/feature/{tableName}-component.js`
4. **Page Integration**: Add transfer component to existing page
5. **Validate**: Ensure all imports and component usage are correct

## Critical Rules

- ✅ **File naming**: snake_case for service files, kebab-case for API routes
- ✅ **Component structure**: Exact transfer pattern with all CRUD operations
- ✅ **Component imports**: Import all required components (AntTransfer, fetch utils)
- ✅ **Hook usage**: Use exact hook patterns (useTransfer)
- ✅ **Vietnamese text**: Use Vietnamese for all user-facing labels
- ✅ **Template structure**: Keep all component structure unchanged
- ✅ **Variable naming**: Follow exact naming patterns for variables

## Component Integration

### Required Components

- **AntTransfer**: For transfer functionality
- **fetchList**: For data fetching
- **fetchPost**: For adding items
- **fetchDelete**: For removing items

### Required Hooks

- **useTransfer()**: For transfer state management

### API Structure

- **POST**: For creating transfer relationships
- **DELETE**: For removing transfer relationships

## Transfer Structure

The transfer component uses a dual-list interface pattern:

- **Source list**: Available items to transfer
- **Target list**: Already transferred items
- **Transfer operations**: Add and remove items between lists
- **Search functionality**: Search both source and target lists
- **Vietnamese labels**: All user-facing text in Vietnamese

## Variable Naming Patterns

Follow exact naming patterns from template:

- **use{TableName}**: Object containing transfer hook
- **{TableName}TransferByOwner**: Transfer component name
- **create{TableName}ByOwner**: Service function for adding
- **delete{TableName}ByOwner**: Service function for removing

## API Configuration

### POST Endpoint

- Path: `/api/{transferOwnerField}s/[id]/{tableName}`
- Function: Create transfer relationships
- Body: `{ {transferKeyField}s: [] }`

### DELETE Endpoint

- Path: `/api/{transferOwnerField}s/[id]/{tableName}`
- Function: Remove transfer relationships
- Body: `{ {transferKeyField}s: [] }`

## Validation Checklist

- ✅ **Service file**: `src/services/{tableName}-service.js`
- ✅ **API file**: `src/app/(back)/api/{transferOwnerField}s/[id]/{tableName}/route.js`
- ✅ **Component file**: `src/components/feature/{tableName}-component.js`
- ✅ **Template structure**: Exact transfer pattern with all variables
- ✅ **Imports**: All required components, utils, and hooks imported
- ✅ **Component usage**: All required components properly integrated
- ✅ **Hook usage**: useTransfer properly used
- ✅ **Vietnamese labels**: Proper Vietnamese text for all user-facing elements
- ✅ **API structure**: Proper POST/DELETE endpoints
- ✅ **Service functions**: Create and delete functions implemented
- ✅ **Transfer operations**: Add and remove functionality
- ✅ **Search functionality**: Source and target search implemented
- ✅ **Variable naming**: Exact naming patterns followed

## Output Location

Generated files:

- Service: `src/services/{tableName}-service.js`
- API: `src/app/(back)/api/{transferOwnerField}s/[id]/{tableName}/route.js`
- Component: `src/components/feature/{tableName}-component.js`
