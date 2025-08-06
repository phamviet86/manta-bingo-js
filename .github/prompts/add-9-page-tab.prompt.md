---
mode: "agent"
model: GPT-4.1
tools: ["changes","codebase","editFiles","githubRepo","problems","search","searchResults"]
description: "Generate a frontend page tab component from a SQL table definition using template code"
---

# Generate Frontend Page Tab from SQL Table

## Instructions

Generate React/Next.js page tab component from SQL table structure using the template code.

## Template

Use this exact template code:

```javascript
// path: @/app/(front)/app/dev/{table-name}-tab/page.js

"use client";

import { InfoCircleOutlined, EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { Space } from "antd";
import { AntPage, AntButton } from "@/components/ui";
import {
  {TableName}Table,
  {TableName}Create,
  {TableName}Info,
  {TableName}Edit,
  {tableName}Schema,
  {tableName}Mapping,
} from "@/components/feature";
import { useTable, useInfo, useForm } from "@/hooks";

export default function Page() {
  const pageButton = [];
  const pageContent = (
    <ProCard boxShadow bordered />
  );
  const pageTitle = "{vnTableName} Tab";

  // Hooks
  const use{TableName} = {
    table: useTable(),
    info: useInfo(),
    create: useForm(),
    edit: useForm(),
    columns: {tableName}Schema({}, {tableName}Mapping.columns),
    fields: {tableName}Schema({}, {tableName}Mapping.fields),
  };

  // Open info modal
  const open{TableName}Info = (record) => {
    const { id } = record || {};
    use{TableName}.info.setRequestParams({ id });
    use{TableName}.info.open();
  };

  // Open edit form
  const open{TableName}Edit = (record) => {
    const { id } = record || {};
    use{TableName}.edit.setRequestParams({ id });
    use{TableName}.edit.setDeleteParams({ id });
    use{TableName}.edit.open();
  };

  // {tableName} tab buttons
  const {tableName}Button = (
    <Space>
      <AntButton
        key="reload-button"
        label="Tải lại"
        color="default"
        variant="outlined"
        onClick={() => use{TableName}.table.reload()}
      />
      <AntButton
        key="create-button"
        label="Tạo mới"
        color="primary"
        variant="solid"
        onClick={() => use{TableName}.create.open()}
      />
    </Space>
  );

  // {tableName} tab content
  const {tableName}Content = (
    <ProCard boxShadow bordered title="Danh sách" extra={{tableName}Button}>
      <{TableName}Table
        tableHook={use{TableName}.table}
        columns={use{TableName}.columns}
        leftColumns={[
          {
            width: 56,
            align: "center",
            search: false,
            render: (_, record) => (
              <AntButton
                icon={<InfoCircleOutlined />}
                color="primary"
                variant="link"
                onClick={() => open{TableName}Info(record)}
              />
            ),
          },
        ]}
        rightColumns={[
          {
            width: 56,
            align: "center",
            search: false,
            render: (_, record) => (
              <AntButton
                icon={<EditOutlined />}
                color="primary"
                variant="link"
                onClick={() => open{TableName}Edit(record)}
              />
            ),
          },
        ]}
      />
      <{TableName}Info
        infoHook={use{TableName}.info}
        columns={use{TableName}.columns}
        requestParams={use{TableName}.info.requestParams}
        title="Thông tin {vnTableName}"
        variant="modal"
        column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
        size="small"
      />
      <{TableName}Create
        formHook={use{TableName}.create}
        fields={use{TableName}.fields}
        onSubmitSuccess={() => use{TableName}.table.reload()}
        title="Tạo {vnTableName}"
        variant="drawer"
      />
      <{TableName}Edit
        formHook={use{TableName}.edit}
        fields={use{TableName}.fields}
        requestParams={use{TableName}.edit.requestParams}
        deleteParams={use{TableName}.edit.deleteParams}
        onSubmitSuccess={() => use{TableName}.table.reload()}
        onDeleteSuccess={() => use{TableName}.table.reload()}
        title="Sửa {vnTableName}"
        variant="drawer"
      />
    </ProCard>
  );

  // {tableName} tab configuration
  const {tableName}Tab = {
    key: "{tableName}",
    label: "{vnTableName}",
    children: {tableName}Content,
  };

  // Render
  return (
    <AntPage
      items={[
        { title: "Hệ thống" },
        { title: "{vnTableName}" },
        { title: "Chi tiết" },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
      tabList={[{tableName}Tab]}
    />
  );
}
```

## Placeholder Mapping

Replace template placeholders with your table data:

### Naming Placeholders

- **{table-name}**: kebab-case table name for paths (e.g., `options`, `user-roles`)
- **{TableName}**: PascalCase table name (e.g., `Options`, `UserRoles`)
- **{tableName}**: camelCase table name (e.g., `options`, `userRoles`)
- **{vnTableName}**: Vietnamese table description (e.g., `tùy chọn`, `vai trò người dùng`)
- **{tableName}**: camelCase table name (e.g., `options`, `userRoles`)

### Template Structure

- Use **PascalCase** for component imports and usage
- Use **camelCase** for variable naming
- Use **Vietnamese** labels for all user-facing text
- Keep all component structure, imports, and hooks exactly as shown

## Quick Steps

1. **File Path**: Create `src/app/(front)/app/dev/{table-name}-tab/page.js`
2. **Copy Template**: Use the exact template structure above
3. **Replace Names**: Fill in table naming placeholders
4. **Vietnamese Labels**: Use appropriate Vietnamese descriptions
5. **Validate**: Ensure all imports and component usage are correct

## Critical Rules

- ✅ **File naming**: kebab-case folder with `-tab` suffix and `page.js` (e.g., `options-tab/page.js`)
- ✅ **Component structure**: Exact tab pattern with all CRUD operations
- ✅ **Component imports**: Import all required components (Table, Create, Info, Edit, Schema, Mapping)
- ✅ **Hook usage**: Use exact hook patterns (useTable, useInfo, useForm)
- ✅ **Vietnamese text**: Use Vietnamese for all user-facing labels
- ✅ **Template structure**: Keep all component structure unchanged
- ✅ **Variable naming**: Follow exact naming patterns for variables

## Component Integration

### Required Components

- **{TableName}Table**: For data display
- **{TableName}Info**: For viewing record details
- **{TableName}Create**: For creating new records
- **{TableName}Edit**: For editing records
- **{tableName}Schema**: For field and column schema definitions
- **{tableName}Mapping**: For column and field mappings

### Required Hooks

- **useTable()**: For table state management
- **useInfo()**: For info modal state management
- **useForm()**: For form state management (used twice: create and edit)

### Schema and Mapping Integration

- **{tableName}Schema()**: Generates column/field definitions with parameters and mapping
- **{tableName}Mapping.columns**: Column mapping configuration
- **{tableName}Mapping.fields**: Field mapping configuration

### Page Structure

- **AntPage**: Main page wrapper with breadcrumbs and tabs
- **ProCard**: Content wrapper with boxShadow and bordered properties
- **Tab integration**: Single tab with complete CRUD operations
- **Action buttons**: Reload and Create buttons in tab header

## Schema and Mapping Pattern

The template uses a schema and mapping pattern for column and field definitions:

### Schema Function

- **{tableName}Schema({}, mapping)**: Takes empty object and mapping to generate definitions
- **Returns**: Column or field configurations based on the mapping provided

### Mapping Objects

- **{tableName}Mapping.columns**: Mapping configuration for table columns
- **{tableName}Mapping.fields**: Mapping configuration for form fields

### Usage in Hooks

```javascript
const use{TableName} = {
  // ... other hooks
  columns: {tableName}Schema({}, {tableName}Mapping.columns),
  fields: {tableName}Schema({}, {tableName}Mapping.fields),
};
```

This pattern provides consistent column and field definitions across the table and forms.

## Tab Structure

The page uses a tab-based interface pattern:

- **Page level**: Empty pageButton array and placeholder pageContent
- **Tab level**: All functionality contained within the tab
- **Tab buttons**: Reload and Create buttons in tab header
- **Table columns**: Left column for view (InfoCircleOutlined), right column for edit (EditOutlined)
- **CRUD operations**: All operations (Create, Read, Update, Delete) in drawer/modal format

## Variable Naming Patterns

Follow exact naming patterns from template:

- **use{TableName}**: Object containing all hooks and component props
- **use{TableName}.table**: Table hook instance
- **use{TableName}.info**: Info modal hook instance
- **use{TableName}.create**: Create form hook instance
- **use{TableName}.edit**: Edit form hook instance
- **use{TableName}.columns**: Column definitions from schema + mapping
- **use{TableName}.fields**: Field definitions from schema + mapping
- **open{TableName}Info**: Function to open info modal
- **open{TableName}Edit**: Function to open edit form
- **{tableName}Button**: Action buttons for tab header
- **{tableName}Content**: Tab content with all CRUD components
- **{tableName}Tab**: Tab definition object

## Table Column Configuration

### Left Column (View)

- Width: 56, align: "center", search: false
- InfoCircleOutlined icon button
- onClick: open info modal

### Right Column (Edit)

- Width: 56, align: "center", search: false
- EditOutlined icon button
- onClick: open edit modal

## Validation Checklist

- ✅ **File location**: `src/app/(front)/app/dev/{table-name}-tab/page.js`
- ✅ **File naming**: kebab-case folder with `-tab` suffix
- ✅ **Template structure**: Exact tab pattern with all variables
- ✅ **Imports**: All required components, icons, and hooks imported
- ✅ **Component usage**: All required components properly integrated
- ✅ **Hook usage**: useTable, useInfo, useForm (x2) properly used
- ✅ **Vietnamese labels**: Proper Vietnamese text for all user-facing elements
- ✅ **Navigation**: Breadcrumbs and title properly configured
- ✅ **Tab structure**: Single tab with complete CRUD operations
- ✅ **Action buttons**: Reload and Create buttons in tab header
- ✅ **Table integration**: Table with view and edit columns
- ✅ **CRUD integration**: All 4 components with drawer/modal variants
- ✅ **Schema integration**: Proper use of {tableName}Schema and {tableName}Mapping
- ✅ **Hook structure**: Proper use{TableName} object with table, info, create, edit, columns, fields
- ✅ **Modal functions**: open{TableName}Info and open{TableName}Edit functions properly implemented
- ✅ **Success handling**: Proper table reload after operations
- ✅ **Variable naming**: Exact naming patterns followed

## Output Location

Generated file: `src/app/(front)/app/dev/{table-name}-tab/page.js`
