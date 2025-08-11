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
description: "Generate React/Next.js frontend page list component and provider from SQL table structure using template code"
---

# Generate Frontend Page List from SQL Table

## Instructions

Generate React/Next.js page list component from SQL table structure using the template code.

## Template

Use this exact template code:

```javascript
// path: @/app/(front)/app/dev/{table-name}/page.js

"use client";

import { InfoCircleOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton, SubPathButton } from "@/components/ui";
import {
  {TableName}Table,
  {TableName}Create,
  {tableName}Schema,
  {tableName}Mapping,
} from "@/components/feature";
import { useTable, useForm, useNavigate } from "@/hooks";
import { PageProvider, usePageContext } from "./provider";

export default function Page(props) {
  return (
    <PageProvider>
      <PageContent {...props} />
    </PageProvider>
  );
}

function PageContent() {
  // Context
  const {} = usePageContext();
  const { navDetail } = useNavigate();

  // Hooks
  const use{TableName} = {
    table: useTable(),
    create: useForm(),
    columns: {tableName}Schema({}, {tableName}Mapping.columns),
    fields: {tableName}Schema({}, {tableName}Mapping.fields),
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="reload-button"
      label="Tải lại"
      color="default"
      variant="outlined"
      onClick={() => use{TableName}.table.reload()}
    />,
    <AntButton
      key="create-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      onClick={() => use{TableName}.create.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <{TableName}Table
        tableHook={use{TableName}.table}
        columns={use{TableName}.columns}
        rightColumns={[
          {
            width: 56,
            align: "center",
            search: false,
            render: (_, record) => {
              return (
                <SubPathButton
                  icon={<InfoCircleOutlined />}
                  color="primary"
                  variant="link"
                  path={record?.id}
                />
              );
            },
          },
        ]}
      />
      <{TableName}Create
        formHook={use{TableName}.create}
        fields={use{TableName}.fields}
        onSubmitSuccess={(result) => navDetail(result?.data[0]?.id)}
        title="Tạo {vnTableName}"
        variant="drawer"
      />
    </ProCard>
  );

  // Render
  return (
    <AntPage
      items={[{ title: "Development" }, { title: "{VnTableName}" }]}
      title="{VnTableName}"
      extra={pageButton}
      content={pageContent}
    />
  );
}
```

## Placeholder Mapping

Replace template placeholders with your table data:

### Naming Placeholders

- **{TableName}**: PascalCase table name (e.g., `Options`, `UserRoles`)
- **{vnTableName}**: Vietnamese table description (e.g., `tùy chọn`, `vai trò người dùng`)
- **{VnTableName}**: Vietnamese table description (e.g., `Tùy chọn`, `Vai trò người dùng`)
- **{table-name}**: kebab-case table name for file paths (e.g., `options`, `user-roles`)
- **{tableName}**: camelCase table name (e.g., `options`, `userRoles`)

### Template Structure

- Use **PascalCase** for component imports and usage
- Use **Vietnamese** labels for all user-facing text
- Keep all component structure, imports, and hooks exactly as shown

## Provider Template

Create a provider file alongside the page with this exact content:

```javascript
// path: @/app/(front)/app/dev/{table-name}/provider.js

import { createContext, useContext, useMemo } from "react";
import { useAppContext } from "@/app/(front)/provider";
import { buildSelection } from "@/utils/selection-util";

const PageContext = createContext(null);

export function PageProvider({ children }) {
  const { optionsData } = useAppContext();

  const contextValue = useMemo(() => ({}), []);

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}

/* 
  const syllabusStatus = buildSelection(
    optionsData,
    { value: "id", label: "option_label", color: "option_color" },
    { option_table: "syllabuses", option_column: "syllabus_status_id" }
  );
  const contextValue = useMemo(() => ({ syllabusStatus }), [syllabusStatus]);
*/

export function usePageContext() {
  return useContext(PageContext);
}
```

## Template Key Features

### Component Structure

- **Page Component**: Default export with PageProvider wrapper
- **PageContent Function**: Contains all page logic and UI
- **Provider Pattern**: Separate provider.js file with PageContext and usePageContext

### Data Management

- **Schema Integration**: Uses {tableName}Schema with mapping objects
- **Hook Organization**: Consolidated use{TableName} object pattern
- **Form Handling**: Integrated create form with drawer variant
- **Table Display**: Full-featured table with right action column

### Navigation Features

- **Breadcrumb Navigation**: Development → {VnTableName} structure
- **Detail Navigation**: SubPathButton in rightColumns for record details
- **Create Success**: Automatic navigation to newly created record detail
- **Action Buttons**: Reload table and create new record functionality

### UI Components

- **AntPage**: Main page wrapper with breadcrumbs, title, and actions
- **ProCard**: Content wrapper with shadow and border styling
- **AntButton**: Styled buttons with Vietnamese labels
- **SubPathButton**: Navigation button for detail pages

## Quick Steps

1. **Page File**: Create `src/app/(front)/app/dev/{table-name}/page.js`
2. **Provider File**: Create `src/app/(front)/app/dev/{table-name}/provider.js`
3. **Copy Templates**: Use the exact template structures above
4. **Replace Names**: Fill in table naming placeholders for page.js only
5. **Provider Content**: Use provider template exactly as shown (no modifications)
6. **Validate**: Ensure all imports and component usage are correct

## Critical Rules

- ✅ **File naming**: kebab-case folder with `page.js` and `provider.js` (e.g., `options/page.js`, `options/provider.js`)
- ✅ **Component structure**: Exact Provider and PageContent pattern
- ✅ **Component imports**: Import UI components from `@/components/ui` (including SubPathButton) and feature components from `@/components/feature`
- ✅ **Hook usage**: Use exact hook patterns (useTable, useForm, useNavigate)
- ✅ **Vietnamese text**: Use Vietnamese for all user-facing labels
- ✅ **Template structure**: Keep all component structure unchanged
- ✅ **Provider pattern**: Use PageProvider and usePageContext exactly as shown

## Component Integration

### Required Components:

- **{TableName}Table**: For data display with rightColumns support
- **{TableName}Create**: For creating new records with drawer variant
- **{tableName}Schema**: Function that takes empty object and mapping to return schema
- **{tableName}Mapping**: Object containing columns and fields mappings

### Required Hooks:

- **useTable()**: For table state management (provides reload function)
- **useForm()**: For form state management (provides open function)
- **useNavigate()**: For navigation (provides navDetail function)
- **usePageContext()**: For accessing page-specific context data

### Page Structure:

- **AntPage**: Main page wrapper with breadcrumbs, title, and extra buttons
- **ProCard**: Content wrapper with boxShadow and bordered properties
- **PageProvider**: Context provider for page state (wraps PageContent)
- **Action buttons**: Array with Reload and Create buttons in pageButton variable
- **Detail navigation**: Info button in rightColumns that navigates to detail page using SubPathButton

### Hook Usage Pattern:

The template uses a specific hook structure pattern:

```javascript
const use{TableName} = {
  table: useTable(),
  create: useForm(),
  columns: {tableName}Schema({}, {tableName}Mapping.columns),
  fields: {tableName}Schema({}, {tableName}Mapping.fields),
};
```

This pattern provides:

- **table.reload()**: Function to reload table data
- **create.open()**: Function to open create form
- **columns**: Column definitions for table display
- **fields**: Field definitions for create form

## Navigation Setup

The page uses a standard navigation pattern:

- **Breadcrumbs**: Development → {VnTableName} (using AntPage items prop)
- **Page title**: {VnTableName} (using AntPage title prop)
- **Detail navigation**: SubPathButton with InfoCircleOutlined icon in rightColumns
- **Create success**: Navigate to detail page using navDetail(result?.data[0]?.id)
- **Page actions**: Extra buttons array with reload and create functionality

## Validation Checklist

- ✅ **Page file location**: `src/app/(front)/app/dev/{table-name}/page.js`
- ✅ **Provider file location**: `src/app/(front)/app/dev/{table-name}/provider.js`
- ✅ **File naming**: kebab-case folder convention
- ✅ **Template structure**: Exact Provider wrapper with PageContent function
- ✅ **Imports**: All required UI components, feature components, and hooks imported
- ✅ **Hook structure**: use{TableName} object with table, create, columns, fields properties
- ✅ **Schema usage**: {tableName}Schema with empty object and mapping parameters
- ✅ **Vietnamese labels**: Proper Vietnamese text in buttons and form titles
- ✅ **Breadcrumbs**: AntPage items array with Development and {VnTableName}
- ✅ **Page actions**: pageButton array with reload and create AntButtons
- ✅ **Table integration**: {TableName}Table with tableHook, columns, and rightColumns props
- ✅ **Right column**: SubPathButton with InfoCircleOutlined icon for detail navigation
- ✅ **Create form**: {TableName}Create with formHook, fields, onSubmitSuccess, title, variant props
- ✅ **Navigation handling**: navDetail function called with result?.data[0]?.id
- ✅ **Provider template**: Empty contextValue with useAppContext and buildSelection imports
- ✅ **Content wrapper**: ProCard with boxShadow and bordered properties
- ✅ **Page wrapper**: AntPage with items, title, extra, and content props

## Output Location

Generated files:

- `src/app/(front)/app/dev/{table-name}/page.js`
- `src/app/(front)/app/dev/{table-name}/provider.js`
