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
description: "Arrange column object properties in consistent order for better code readability and maintenance"
---

# Column Props Arrangement Guide

## Instructions

Arrange properties in column objects following the standardized order below. This ensures consistent code structure across all column definition files.

## Standard Props Order

Follow this exact order for all column object properties:

```javascript
{
  key: "field_name",
  dataIndex: "field_name",
  title: "Display Title",
  valueType: "text|select|textarea|etc",
  valueEnum: {},
  fieldProps: buildFieldProps({}),
  formItemProps: buildFormItemProps({}),
  colProps: { sm: 12 },
  search: false,
  width: 68,
  align: "center",
  render: (_, record) => {},
  hideInDescriptions: true,
  hideInForm: true,
  hidden: true,
}
```

## Property Descriptions

### Core Properties

- **key**: Unique identifier for the column
- **dataIndex**: Field name in the data object
- **title**: Display title for the column
- **valueType**: Type of input/display component

### Configuration Properties

- **valueEnum**: Enum values for select fields
- **fieldProps**: Field-specific properties using buildFieldProps()
- **formItemProps**: Form item properties using buildFormItemProps()
- **colProps**: Column layout properties (responsive design)

### Display Properties

- **search**: Whether field is searchable
- **hidden**: Whether column is hidden in table
- **width**: Column width in pixels
- **align**: Text alignment (left, center, right)
- **render**: Custom render function

### Visibility Properties

- **hideInDescriptions**: Hide in description views
- **hideInForm**: Hide in form views

## Template Structure

Use this template for column definition files:

```javascript
// path: @/components/feature/{tableName}-column.js

import { Space, Typography } from "antd";
import { DiceBeerAvatar, SubLink } from "@/components/ui";
import {
  buildColumns,
  buildFieldProps,
  buildFormItemProps,
} from "@/utils/column-util";

export function get{TableName}Column(params = {}, columnMapping = []) {
  const { enumObject } = params;

  const schema = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
      valueType: "text",
      fieldProps: buildFieldProps({
        disabled: true,
      }),
      formItemProps: buildFormItemProps({
        hidden: true,
      }),
      search: false,
      hidden: true,
      hideInDescriptions: true,
    },
    {
      key: "field_name",
      dataIndex: "field_name",
      title: "Field Title",
      valueType: "text",
      formItemProps: buildFormItemProps({
        required: true,
      }),
    },
    {
      key: "select_field",
      dataIndex: "select_field",
      title: "Select Field",
      valueType: "select",
      valueEnum: enumObject.valueEnum,
      fieldProps: buildFieldProps({
        options: enumObject.options,
      }),
      formItemProps: buildFormItemProps({
        required: true,
      }),
      colProps: { sm: 12 },
    },
    {
      key: "textarea_field",
      dataIndex: "textarea_field",
      title: "Textarea Field",
      valueType: "textarea",
      fieldProps: buildFieldProps({
        autoSize: { minRows: 3, maxRows: 6 },
      }),
      search: false,
    },
    {
      key: "display_column",
      title: "Display Column",
      width: 68,
      align: "center",
      render: (_, record) => (
        <SubLink path={record?.id}>
          <DiceBeerAvatar
            src={record?.avatar_field}
            seed={record?.id}
            shape="square"
            size="large"
            alt="Display Image"
          />
        </SubLink>
      ),
      search: false,
      hideInDescriptions: true,
      hideInForm: true,
    },
  ];

  return buildColumns(schema, columnMapping);
}

export const {TABLE_NAME}_COLUMNS = [
  { key: "display_column" },
  { key: "field_name" },
  { key: "id" },
  // ... other column mappings
];
```

## Arrangement Rules

### Property Order Priority

1. **Identification**: key, dataIndex, title
2. **Type Configuration**: valueType, valueEnum
3. **Field Configuration**: fieldProps, formItemProps, colProps
4. **Display Behavior**: search, hidden, width, align
5. **Custom Rendering**: render
6. **Visibility Control**: hideInDescriptions, hideInForm

### Consistent Formatting

- **Indentation**: Use 2 spaces for object properties
- **Spacing**: Add empty line between column objects
- **Comments**: Add section comments for complex columns
- **Import Order**: Core libraries first, then UI components, then utils

## Example Transformation

### Before (Inconsistent Order)

```javascript
{
  title: "User Name",
  render: (_, record) => record.name,
  key: "user_name",
  hideInForm: true,
  dataIndex: "user_name",
  valueType: "text",
  search: false,
  formItemProps: buildFormItemProps({ required: true }),
}
```

### After (Standard Order)

```javascript
{
  key: "user_name",
  dataIndex: "user_name",
  title: "User Name",
  valueType: "text",
  formItemProps: buildFormItemProps({
    required: true,
  }),
  search: false,
  render: (_, record) => record.name,
  hideInForm: true,
}
```

## Common Patterns

### Standard Text Field

```javascript
{
  key: "field_name",
  dataIndex: "field_name",
  title: "Field Title",
  valueType: "text",
  formItemProps: buildFormItemProps({
    required: true,
  }),
}
```

### Select Field with Enum

```javascript
{
  key: "status_field",
  dataIndex: "status_field",
  title: "Status",
  valueType: "select",
  valueEnum: statusEnum.valueEnum,
  fieldProps: buildFieldProps({
    options: statusEnum.options,
  }),
  formItemProps: buildFormItemProps({
    required: true,
  }),
  colProps: { sm: 12 },
}
```

### Display-Only Column

```javascript
{
  key: "display_field",
  title: "Display Field",
  width: 120,
  align: "center",
  render: (_, record) => (
    <Space direction="vertical" size={0}>
      <Typography.Text strong>{record?.field_name}</Typography.Text>
      <Typography.Text type="secondary">
        {record?.field_desc}
      </Typography.Text>
    </Space>
  ),
  search: false,
  hideInDescriptions: true,
  hideInForm: true,
}
```

### Hidden Form Field

```javascript
{
  key: "id",
  dataIndex: "id",
  title: "ID",
  valueType: "text",
  fieldProps: buildFieldProps({
    disabled: true,
  }),
  formItemProps: buildFormItemProps({
    hidden: true,
  }),
  search: false,
  hidden: true,
  hideInDescriptions: true,
}
```

## Validation Checklist

- ✅ **Property Order**: Follow exact order: key → dataIndex → title → valueType → valueEnum → fieldProps → formItemProps → colProps → search → hidden → width → align → render → hideInDescriptions → hideInForm
- ✅ **Indentation**: Consistent 2-space indentation
- ✅ **Function Calls**: Proper buildFieldProps() and buildFormItemProps() usage
- ✅ **Import Structure**: All required imports at top of file
- ✅ **Export Pattern**: Column function and mapping array exported
- ✅ **Vietnamese Labels**: User-facing text in Vietnamese
- ✅ **Naming Convention**: camelCase for variables, PascalCase for components
- ✅ **File Structure**: Comments with file path at top

## Benefits

### Code Consistency

- **Predictable Structure**: Same property order across all files
- **Easy Navigation**: Properties always in expected location
- **Maintenance**: Easier to compare and update columns

### Development Efficiency

- **Faster Reading**: Consistent order improves code scanning
- **Less Errors**: Standardized pattern reduces mistakes
- **Better Reviews**: Easier to spot inconsistencies in PRs

### Team Collaboration

- **Standard Practice**: All developers follow same pattern
- **Onboarding**: New team members learn consistent structure
- **Documentation**: Self-documenting through consistent ordering

## Quick Steps

1. **Open Column File**: Navigate to `src/components/feature/{tableName}-column.js`
2. **Identify Objects**: Find all column definition objects in schema array
3. **Reorder Properties**: Arrange properties following standard order
4. **Validate Structure**: Check imports, exports, and function calls
5. **Test Functionality**: Ensure no breaking changes after reordering

## Critical Rules

- ✅ **No Logic Changes**: Only reorder properties, don't modify functionality
- ✅ **Preserve Values**: Keep all property values exactly the same
- ✅ **Maintain Spacing**: Keep consistent indentation and line breaks
- ✅ **Check Imports**: Ensure all required imports are present
- ✅ **Validate Exports**: Verify column function and mapping exports
- ✅ **Test Compilation**: Ensure code compiles after changes
- ✅ **Function Integrity**: Don't modify buildFieldProps/buildFormItemProps calls

## File Locations

Column definition files are located in:

- **Feature Components**: `src/components/feature/{tableName}-column.js`
- **Export Pattern**: Both function and mapping array
- **Import Pattern**: UI components and utility functions

## Output Validation

After applying arrangements:

- **Property Order**: Matches standard order exactly
- **Code Compilation**: No syntax or import errors
- **Functionality**: All features work as before
- **Consistency**: All column files follow same pattern
- **Readability**: Improved code structure and maintainability
