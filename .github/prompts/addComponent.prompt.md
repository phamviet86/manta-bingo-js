---
mode: "agent"
model: GPT-4.1
tools: ["changes","codebase","editFiles","githubRepo","problems","search","searchResults"]
description: "Generate frontend component files from SQL table structure using template code"
---

# Generate Frontend Components from SQL Table

## Instructions

Generate complete frontend component files from SQL table structure using the template below.

## Template

Use this exact template code:

```javascript
// path: @/components/feature/{table-name}-component.js

import { AntTable, AntInfo, AntForm } from "@/components/ui";
import {
  fetchList,
  fetchGet,
  fetchPost,
  fetchPut,
  fetchDelete,
} from "@/utils/fetch-util";

export function {TableName}Table(props) {
  return (
    <AntTable
      {...props}
      onRequest={(params, sort, filter) =>
        fetchList("/api/{table-name}", params, sort, filter)
      }
    />
  );
}

export function {TableName}Info(props) {
  return (
    <AntInfo
      {...props}
      onRequest={(params) => fetchGet(`/api/{table-name}/${params?.id}`)}
    />
  );
}

export function {TableName}Create(props) {
  return (
    <AntForm
      {...props}
      onSubmit={(values) => fetchPost("/api/{table-name}", values)}
    />
  );
}

export function {TableName}Edit(props) {
  return (
    <AntForm
      {...props}
      onRequest={(params) => fetchGet(`/api/{table-name}/${params?.id}`)}
      onSubmit={(values) => fetchPut(`/api/{table-name}/${values?.id}`, values)}
      onDelete={(params) => fetchDelete(`/api/{table-name}/${params?.id}`)}
    />
  );
}
```

## Placeholder Mapping

Replace template placeholders with your table data:

### Naming Placeholders

- **{table-name}**: kebab-case table name (e.g., `options`, `user-roles`)
- **{TableName}**: PascalCase table name (e.g., `Options`, `UserRoles`)

### Field Placeholders

- Use **snake_case** for database field names (do NOT convert to camelCase)
- Skip system columns: `id`, `created_at`, `updated_at`, `deleted_at`

## Quick Steps

1. **File Path**: Create `src/components/feature/{table-name}-component.js`
2. **Copy Template**: Use the exact template structure above
3. **Replace Names**: Fill in table naming placeholders
4. **Update Index**: Add component exports to `src/components/feature/index.js`
5. **Validate**: Ensure all 4 functions are present with correct patterns

## Critical Rules

- ✅ **File naming**: kebab-case (e.g., `options-component.js`)
- ✅ **Functions**: 4 required (Table, Info, Create, Edit)
- ✅ **API patterns**: Use exact fetch utility patterns from template
- ✅ **Component naming**: Use PascalCase with table name prefix
- ✅ **Import paths**: Use `@/components/ui` and `@/utils/fetch-util`

## Component Function Patterns

### Table Function MUST:

- Use exact pattern: `onRequest={(params, sort, filter) => fetchList("/api/{table-name}", params, sort, filter)}`
- Use props spreading: `<AntTable {...props} onRequest={...} />`

### Info Function MUST:

- Use exact pattern: `onRequest={(params) => fetchGet(\`/api/{table-name}/${params?.id}\`)}`
- Use props spreading: `<AntInfo {...props} onRequest={...} />`

### Create Function MUST:

- Use exact pattern: `onSubmit={(values) => fetchPost("/api/{table-name}", values)}`
- Use props spreading: `<AntForm {...props} onSubmit={...} />`

### Edit Function MUST:

- Use exact patterns for all three operations:
  - `onRequest={(params) => fetchGet(\`/api/{table-name}/${params?.id}\`)}`
  - `onSubmit={(values) => fetchPut(\`/api/{table-name}/${values?.id}\`, values)}`
  - `onDelete={(params) => fetchDelete(\`/api/{table-name}/${params?.id}\`)}`

## Export to Index File

After creating the component file, add exports to the main index file:

**File Location**: `src/components/feature/index.js`

**Export Pattern**:

```javascript
// Export all components from {table-name}-component.js
export * from "./{table-name}-component";
```

## Validation Checklist

- ✅ **File location**: `src/components/feature/{table-name}-component.js`
- ✅ **File naming**: kebab-case convention
- ✅ **Functions**: All 4 required functions (Table, Info, Create, Edit)
- ✅ **Imports**: Correct import statements for components and utilities
- ✅ **API patterns**: Uses exact fetch utility patterns from template
- ✅ **Component naming**: PascalCase with table name prefix
- ✅ **Index export**: Added component exports to `src/components/feature/index.js`

## Output Location

Generated files:

- `src/components/feature/{table-name}-component.js`
- Updated `src/components/feature/index.js` with component exports
