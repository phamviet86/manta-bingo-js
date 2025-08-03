---
mode: "agent"
model: GPT-4.1
tools: ["changes","codebase","editFiles","githubRepo","problems","search","searchResults"]
description: "Generate frontend column file from SQL table structure using template code"
---

# Generate Frontend Columns from SQL Table

## Instructions

Generate complete frontend column files from SQL table structure using the template below.

## Template

Use this exact template code:

```javascript
// path: @/components/feature/{table-name}-column.js

import { buildColumns, buildColumnProps } from "@/utils/column-util";

export function {tableName}Column(params = {}, columnMapping = []) {
  const {} = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      hideInTable: true,
      hideInDescriptions: true,
      ...buildColumnProps({ disabled: true, hidden: true }),
    },
    {
      key: "{field1}",
      dataIndex: "{field1}",
      title: "{Field1 Label}",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
    {
      key: "{field2}",
      dataIndex: "{field2}",
      title: "{Field2 Label}",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
    {
      key: "{field3}",
      dataIndex: "{field3}",
      title: "{Field3 Label}",
      valueType: "text",
      ...buildColumnProps({ required: true }),
    },
    {
      key: "{optional1}",
      dataIndex: "{optional1}",
      title: "{Optional1 Label}",
      valueType: "text",
      ...buildColumnProps({}),
    },
    {
      key: "{optional2}",
      dataIndex: "{optional2}",
      title: "{Optional2 Label}",
      valueType: "text",
      ...buildColumnProps({}),
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const {tableName}Mapping = {
  default: [],
};
```

## Placeholder Mapping

Replace template placeholders with your table data:

### Naming Placeholders

- **{table-name}**: kebab-case table name (e.g., `options`, `user-roles`)
- **{TableName}**: PascalCase table name (e.g., `Options`, `UserRoles`)
- **{tableName}**: camelCase table name (e.g., `options`, `userRoles`)

### Field Placeholders

- **{field1}, {field2}, {field3}**: Required database fields in snake_case (minimum 3 if available)
- **{optional1}, {optional2}**: Optional database fields in snake_case
- **{Field1 Label}, {Field2 Label}, {Field3 Label}**: Vietnamese labels for required fields
- **{Optional1 Label}, {Optional2 Label}**: Vietnamese labels for optional fields
- Use **snake_case** for database field names (do NOT convert to camelCase)
- Skip system columns: `id`, `created_at`, `updated_at`, `deleted_at`

## Quick Steps

1. **File Path**: Create `src/components/feature/{table-name}-column.js`
2. **Copy Template**: Use the exact template structure above
3. **Replace Names**: Fill in table naming placeholders
4. **Map Fields**: Replace field placeholders with your table's columns
5. **Update Index**: Add column export to `src/components/feature/index.js`
6. **Validate**: Ensure function has correct schema structure

## Critical Rules

- ✅ **File naming**: kebab-case with `-column` suffix (e.g., `options-column.js`)
- ✅ **Function**: Single column function with `{tableName}Column` naming
- ✅ **Schema structure**: Array of column objects with required properties
- ✅ **Field validation**: Use `buildColumnProps({ required: true })` for NOT NULL fields
- ✅ **Field naming**: Use snake_case for database fields
- ✅ **Vietnamese labels**: Use Vietnamese text for all user-facing labels
- ✅ **Import path**: Use `@/utils/column-util` for buildColumns and buildColumnProps utilities

## Field Type Mapping

Use helper functions for consistent field configuration:

- **All fields**: Use `valueType: "text"` for simplicity
- **Required fields**: Use `...buildColumnProps({ required: true })` for NOT NULL fields
- **Optional fields**: Use `...buildColumnProps({})` with empty configuration
- **ID fields**: Hidden with `hideInTable: true, hideInDescriptions: true` plus `...buildColumnProps({ disabled: true, hidden: true })`

## Column Schema Patterns

### ID Field MUST:

- Use exact pattern with `key: "id"`, `dataIndex: "id"`, `title: "ID"`
- Include `hideInTable: true, hideInDescriptions: true` properties
- Include `...buildColumnProps({ disabled: true, hidden: true })`
- Use `valueType: "text"`

### Required Fields MUST:

- Include `...buildColumnProps({ required: true })`
- Use `valueType: "text"`
- Include Vietnamese `title` labels

### Optional Fields MUST:

- Use `valueType: "text"`
- Include `...buildColumnProps({})` with empty configuration
- Include Vietnamese `title` labels

### Function Structure MUST:

- Use exact signature: `{tableName}Column(params = {}, columnMapping = [])`
- Use empty destructuring: `const {} = params;`
- Return `buildColumns(schema, columnMapping)`
- Export additional `{tableName}Mapping` object with default configuration

## Export to Index File

After creating the column file, add exports to the main index file:

**File Location**: `src/components/feature/index.js`

**Export Pattern**:

```javascript
// Export column function from {table-name}-column.js
export * from "./{table-name}-column";
```

## Validation Checklist

- ✅ **File location**: `src/components/feature/{table-name}-column.js`
- ✅ **File naming**: kebab-case convention with `-column` suffix
- ✅ **Function**: Single `{tableName}Column` function with correct signature
- ✅ **Imports**: Correct import statement for `buildColumns` and `buildColumnProps` utilities
- ✅ **Schema structure**: Array of column objects with all required properties
- ✅ **ID field**: Hidden ID field with correct `buildColumnProps` configuration and hide properties
- ✅ **Field validation**: Required field validation using `buildColumnProps({ required: true })`
- ✅ **Vietnamese labels**: Proper Vietnamese labels for all columns
- ✅ **Field naming**: snake_case for database fields (NOT camelCase)
- ✅ **ValueType mapping**: Use `valueType: "text"` for all fields
- ✅ **buildColumnProps usage**: Use spread operator with `buildColumnProps()` for all field configurations
- ✅ **Dynamic params**: Use empty destructuring `const {} = params;`
- ✅ **Mapping export**: Include `{tableName}Mapping` export with default configuration
- ✅ **Index export**: Added column export to `src/components/feature/index.js`

## Output Location

Generated files:

- `src/components/feature/{table-name}-column.js`
- Updated `src/components/feature/index.js` with column export
