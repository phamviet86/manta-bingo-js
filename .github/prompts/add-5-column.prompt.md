---
mode: "agent"
model: GPT-4.1
tools:
  [
    "changes",
    "codebase",
    "editFiles",
    "githubRepo",
    "problems",
    "search",
    "searchResults",
  ]
description: "Generate frontend column file from SQL table structure using template code"
---

# Generate Frontend Columns from SQL Table

## Instructions

Generate complete frontend column files from SQL table structure using the template below.

## Template

Use this exact template code:

```javascript
// path: @/components/feature/{table-name}-column.js

import { buildSchema, buildSchemaProps } from "@/utils/schema-util";

export function {tableName}Schema(params = {}, columnMapping = []) {
  const { optionStatus } = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      ...buildSchemaProps({ disabled: true, hidden: true }),
    },
    {
      key: "{field1}",
      dataIndex: "{field1}",
      title: "{Field1 Label}",
      valueType: "text",
      ...buildSchemaProps({ rules: [{ required: true }] }),
    },
    {
      key: "{field2}",
      dataIndex: "{field2}",
      title: "{Field2 Label}",
      valueType: "text",
      ...buildSchemaProps({ rules: [{ required: true }] }),
    },
    {
      key: "{field3}",
      dataIndex: "{field3}",
      title: "{Field3 Label}",
      valueType: "text",
      ...buildSchemaProps({ rules: [{ required: true }] }),
    },
    {
      key: "{optional1}",
      dataIndex: "{optional1}",
      title: "{Optional1 Label}",
      valueType: "select",
      ...buildSchemaProps({
        options: optionStatus.options,
        valueEnum: optionStatus.valueEnum,
      }),
    },
    {
      key: "{optional2}",
      dataIndex: "{optional2}",
      title: "{Optional2 Label}",
      valueType: "textarea",
      ...buildSchemaProps({ autoSize: { minRows: 3, maxRows: 6 } }),
    },
    {
      key: "{optional3}",
      dataIndex: "{optional3}",
      title: "{Optional3 Label}",
      valueType: "time",
      ...buildSchemaProps({ format: "HH:mm", style: { width: "100%" } }),
    },
    {
      key: "{optional4}",
      dataIndex: "{optional4}",
      title: "{Optional4 Label}",
      valueType: "date",
      ...buildSchemaProps({ format: "YYYY-MM-DD", style: { width: "100%" } }),
    },
    {
      key: "{optional5}",
      dataIndex: "{optional5}",
      title: "{Optional5 Label}",
      valueType: "money",
      ...buildSchemaProps({ locale: "vi-VN", precision: 0, style: { width: "100%" } }),
    },
  ];

  return buildSchema(schema, columnMapping);
}

export const {tableName}Mapping = {
  fields: [{key: "id"}, {key: "{field1}"}, {key: "{field2}"}, {key: "{field3}"}, {key: "{optional1}"}, {key: "{optional2}"}, {key: "{optional3}"}, {key: "{optional4}"}, {key: "{optional5}"}],
  columns: [{key: "id"}, {key: "{field1}"}, {key: "{field2}"}, {key: "{field3}"}, {key: "{optional1}"}, {key: "{optional2}"}, {key: "{optional3}"}, {key: "{optional4}"}, {key: "{optional5}"}],
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
- **{optional1}, {optional2}, {optional3}, {optional4}, {optional5}**: Optional database fields in snake_case
- **{Field1 Label}, {Field2 Label}, {Field3 Label}**: Vietnamese labels for required fields
- **{Optional1 Label}, {Optional2 Label}, {Optional3 Label}, {Optional4 Label}, {Optional5 Label}**: Vietnamese labels for optional fields
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
- ✅ **Function**: Single column function with `{tableName}Schema` naming
- ✅ **Schema structure**: Array of column objects with required properties
- ✅ **Field validation**: Use `buildSchemaProps({ rules: [{ required: true }] })` for NOT NULL fields
- ✅ **Field naming**: Use snake_case for database fields
- ✅ **Vietnamese labels**: Use Vietnamese text for all user-facing labels
- ✅ **Import path**: Use `@/utils/schema-util` for buildSchema and buildSchemaProps utilities

## Field Type Mapping

Use specific valueTypes and configurations for different field types:

- **Required fields**: Use `valueType: "text"` with `...buildSchemaProps({ rules: [{ required: true }] })`
- **Select fields**: Use `valueType: "select"` with options configuration
- **Textarea fields**: Use `valueType: "textarea"` with autoSize configuration
- **Time fields**: Use `valueType: "time"` with time format configuration
- **Date fields**: Use `valueType: "date"` with date format configuration
- **Money fields**: Use `valueType: "money"` with locale and precision configuration
- **ID fields**: Use `...buildSchemaProps({ disabled: true, hidden: true })` with `valueType: "text"`

## Column Schema Patterns

### ID Field MUST

- Use exact pattern with `key: "id"`, `dataIndex: "id"`, `title: "ID"`
- Include `...buildSchemaProps({ disabled: true, hidden: true })`
- Use `valueType: "text"`

### Required Fields MUST

- Include `...buildSchemaProps({ rules: [{ required: true }] })`
- Use `valueType: "text"`
- Include Vietnamese `title` labels

### Optional Fields MUST

- Use specific `valueType` based on field purpose:
  - `"select"` for dropdown fields with `options` and `valueEnum` configuration
  - `"textarea"` for multi-line text with `autoSize` configuration
  - `"time"` for time fields with format configuration
  - `"date"` for date fields with format configuration
  - `"money"` for currency fields with locale and precision configuration
- Include Vietnamese `title` labels
- Use appropriate `buildSchemaProps` configuration for each field type

### Function Structure MUST

- Use exact signature: `{tableName}Schema(params = {}, columnMapping = [])`
- Use destructuring for params: `const { optionStatus } = params;`
- Return `buildSchema(schema, columnMapping)`
- Export additional `{tableName}Mapping` object with default column configuration including all field keys

### Mapping Configuration MUST

- Include `fields` and `columns` properties with arrays of all column keys
- Each column key should be in format: `{key: "field_name"}`
- Include all fields: `id`, required fields (`{field1}`, `{field2}`, `{field3}`), and optional fields (`{optional1}` through `{optional5}`)
- Use snake_case for field names in the mapping keys (matching database field names)

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
- ✅ **Function**: Single `{tableName}Schema` function with correct signature
- ✅ **Imports**: Correct import statement for `buildSchema` and `buildSchemaProps` utilities
- ✅ **Schema structure**: Array of column objects with all required properties
- ✅ **ID field**: Hidden ID field with correct `buildSchemaProps` configuration
- ✅ **Field validation**: Required field validation using `buildSchemaProps({ rules: [{ required: true }] })`
- ✅ **Vietnamese labels**: Proper Vietnamese labels for all columns
- ✅ **Field naming**: snake_case for database fields (NOT camelCase)
- ✅ **ValueType mapping**: Use specific `valueType` values for different field purposes (text, select, textarea, time, date, money)
- ✅ **buildSchemaProps usage**: Use spread operator with `buildSchemaProps()` for all field configurations with appropriate options
- ✅ **Dynamic params**: Use destructuring `const { optionStatus } = params;` for accessing options configuration
- ✅ **Mapping export**: Include `{tableName}Mapping` export with `fields` and `columns` arrays containing all field keys
- ✅ **Mapping structure**: Both `fields` and `columns` arrays include all 9 column keys (id + 3 required + 5 optional fields) in `{key: "field_name"}` format
- ✅ **Index export**: Added column export to `src/components/feature/index.js`

## Output Location

Generated files:

- `src/components/feature/{table-name}-column.js`
- Updated `src/components/feature/index.js` with column export
