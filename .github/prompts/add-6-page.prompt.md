---
mode: "agent"
model: GPT-4.1
tools: ["changes","codebase","editFiles","githubRepo","problems","search","searchResults"]
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

import { EditOutlined } from "@ant-design/icons";
import { Row, Col, Card } from "antd";
import { AntPage, AntButton } from "@/components/ui";
import {
  {TableName}Table,
  {TableName}Create,
  {TableName}Edit,
  get{TableName}Column,
} from "@/components/feature";
import { useTable, useForm } from "@/hooks";
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

  // Hooks
  const use{TableName} = {
    table: useTable(),
    create: useForm(),
    edit: useForm(),
    columns: get{TableName}Column(),
  };

  // Open edit
  const open{TableName}Edit = (record) => {
    const { id } = record || {};
    use{TableName}.edit.setRequestParams({ id });
    use{TableName}.edit.setDeleteParams({ id });
    use{TableName}.edit.open();
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
    <Row gutter={[16, 16]} wrap>
      <Col xs={24}>
        <Card hoverable>
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
                    <AntButton
                      icon={<EditOutlined />}
                      color="primary"
                      variant="link"
                      onClick={() => open{TableName}Edit(record)}
                    />
                  );
                },
              },
            ]}
          />
          <{TableName}Create
            formHook={use{TableName}.create}
            columns={use{TableName}.columns}
            onSubmitSuccess={use{TableName}.table.reload}
            title="Tạo {vnTableName}"
            variant="drawer"
          />
          <{TableName}Edit
            formHook={use{TableName}.edit}
            columns={use{TableName}.columns}
            requestParams={use{TableName}.edit.requestParams}
            onSubmitSuccess={use{TableName}.table.reload}
            deleteParams={use{TableName}.edit.deleteParams}
            onDeleteSuccess={use{TableName}.table.reload}
            title="Chỉnh sửa {vnTableName}"
            variant="drawer"
          />
        </Card>
      </Col>
    </Row>
  );

  // Render
  return (
    <AntPage
      items={[{ title: "Development" }, { title: "{vnTableName}" }]}
      title="{vnTableName}"
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
- **{table-name}**: kebab-case table name for file paths (e.g., `options`, `user-roles`)

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
import { buildEnum } from "@/utils/build-util";

const PageContext = createContext(null);

export function PageProvider({ children }) {
  const { optionsData } = useAppContext();

  const contextValue = useMemo(() => ({}), []);

  return (
    <PageContext.Provider value={contextValue}>{children}</PageContext.Provider>
  );
}

export function usePageContext() {
  return useContext(PageContext);
}
```

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
- ✅ **Component imports**: Import UI components from `@/components/ui` and feature components from `@/components/feature`
- ✅ **Hook usage**: Use exact hook patterns (useTable, useForm)
- ✅ **Vietnamese text**: Use Vietnamese for all user-facing labels
- ✅ **Template structure**: Keep all component structure unchanged
- ✅ **Provider pattern**: Use PageProvider and usePageContext exactly as shown

## Component Integration

### Required Components:

- **{TableName}Table**: For data display
- **{TableName}Create**: For creating new records
- **{TableName}Edit**: For editing existing records
- **get{TableName}Column**: Function to get column definitions

### Required Hooks:

- **useTable()**: For table state management
- **useForm()**: For form state management (both create and edit)

### Page Structure:

- **AntPage**: Main page wrapper with breadcrumbs and title
- **Card**: Content wrapper with hover effect
- **Row/Col**: Grid layout system
- **PageProvider**: Context provider for page state
- **Action buttons**: Reload and Create buttons
- **Edit functionality**: Edit button in table rows with form handling

## Navigation Setup

The page uses a standard navigation pattern:

- **Breadcrumbs**: Development → {vnTableName}
- **Page title**: {vnTableName}
- **Edit functionality**: Click edit icon to modify records
- **Create success**: Reload table data after successful creation
- **Edit success**: Reload table data after successful editing
- **Delete success**: Reload table data after successful deletion

## Validation Checklist

- ✅ **Page file location**: `src/app/(front)/app/dev/{table-name}/page.js`
- ✅ **Provider file location**: `src/app/(front)/app/dev/{table-name}/provider.js`
- ✅ **File naming**: kebab-case folder convention
- ✅ **Template structure**: Exact Provider and PageContent pattern
- ✅ **Imports**: All required components and hooks imported
- ✅ **Component usage**: UI and feature components properly integrated
- ✅ **Hook usage**: useTable and useForm properly used
- ✅ **Vietnamese labels**: Proper Vietnamese text for all user-facing elements
- ✅ **Navigation**: Breadcrumbs and title properly configured
- ✅ **Action buttons**: Reload and Create buttons properly implemented
- ✅ **Table integration**: Table with edit button and proper columns
- ✅ **Form integration**: Create and Edit forms with drawer variant
- ✅ **Success handling**: Table reload after successful operations
- ✅ **Provider template**: Exact provider.js content without modifications
- ✅ **Edit functionality**: Edit form with request/delete parameters
- ✅ **Grid layout**: Row/Col structure with Card wrapper

## Output Location

Generated files:

- `src/app/(front)/app/dev/{table-name}/page.js`
- `src/app/(front)/app/dev/{table-name}/provider.js`
