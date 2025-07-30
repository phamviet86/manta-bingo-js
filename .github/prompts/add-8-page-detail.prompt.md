---
mode: "agent"
model: GPT-4.1
tools: ["changes","codebase","editFiles","githubRepo","problems","search","searchResults"]
description: "Generate a frontend page detail component from a SQL table definition using template code"
---

# Generate Frontend Page Detail from SQL Table

## Instructions

Generate React/Next.js page detail component from SQL table structure using the template code.

## Template

Use this exact template code:

```javascript
// path: @/app/(front)/app/dev/{table-name}/[id]/page.js

"use client";

import { use } from "react";
import { Row, Col, Card } from "antd";
import { AntPage, AntButton } from "@/components/ui";
import {
  {TableName}Info,
  {TableName}Edit,
  get{TableName}Column,
} from "@/components/feature";
import { useInfo, useForm, useNavigate } from "@/hooks";
import { PageProvider, usePageContext } from "../provider";

export default function Page(props) {
  return (
    <PageProvider>
      <PageContent {...props} />
    </PageProvider>
  );
}

function PageContent({ params }) {
  // Context
  const {} = usePageContext();
  const { navBack } = useNavigate();
  const { id: {tableName}Id } = use(params);

  // Hooks
  const use{TableName} = {
    info: useInfo(),
    edit: useForm(),
    columns: get{TableName}Column(),
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="back-button"
      label="Quay lại"
      color="default"
      variant="outlined"
      onClick={navBack}
    />,
    <AntButton
      key="edit-button"
      label="Chỉnh sửa"
      color="primary"
      variant="solid"
      onClick={() => use{TableName}.edit.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <Row gutter={[16, 16]} wrap>
      <Col xs={24}>
        <Card hoverable>
          <{TableName}Info
            infoHook={use{TableName}.info}
            requestParams={{ id: {tableName}Id }}
            onRequestSuccess={(result) =>
              use{TableName}.info.setDataSource(result?.data?.[0])
            }
            columns={use{TableName}.columns}
          />
          <{TableName}Edit
            formHook={use{TableName}.edit}
            columns={use{TableName}.columns}
            requestParams={{ id: {tableName}Id }}
            onSubmitSuccess={use{TableName}.info.reload}
            onDeleteSuccess={navBack}
            title="Chỉnh sửa {vnTableName}"
            variant="drawer"
          />
        </Card>
      </Col>
    </Row>
  );

  // Page title
  const pageTitle = use{TableName}.info?.dataSource?.{titleField} || "Chi tiết";

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
    />
  );
}
```

## Placeholder Mapping

Replace template placeholders with your table data:

### Naming Placeholders

- **{table-name}**: kebab-case table name for paths (e.g., `options`, `user-roles`)
- **{TableName}**: PascalCase table name (e.g., `Options`, `UserRoles`)
- **{tableName}**: camelCase table name for ID param (e.g., `option`, `userRole`)
- **{vnTableName}**: Vietnamese table description (e.g., `Tùy chọn`, `Vai trò người dùng`)
- **{titleField}**: field for page title display (e.g., `option_column`, `user_name`)

### Template Structure

- Use **PascalCase** for component imports and usage
- Use **camelCase** for ID parameters and variables
- Use **Vietnamese** labels for all user-facing text
- Use **Row**, **Col**, **Card** for layout instead of ProCard
- Import components from `@/components/ui` and `@/components/feature`
- Import hooks from `@/hooks`

## Quick Steps

1. **File Path**: Create `src/app/(front)/app/dev/{table-name}/[id]/page.js`
2. **Copy Template**: Use the exact template structure above
3. **Replace Names**: Fill in table naming placeholders
4. **Title Field**: Choose appropriate field for page title display
5. **Vietnamese Labels**: Use appropriate Vietnamese descriptions
6. **Validate**: Ensure all imports and component usage are correct

## Critical Rules

- ✅ **File naming**: kebab-case folder with `[id]/page.js` (e.g., `options/[id]/page.js`)
- ✅ **Component structure**: Exact Provider and PageContent pattern
- ✅ **Component imports**: Import UI components from `@/components/ui` and feature components from `@/components/feature`
- ✅ **Hook usage**: Use exact hook patterns (useInfo, useForm, useNavigate)
- ✅ **Vietnamese text**: Use Vietnamese for all user-facing labels
- ✅ **Template structure**: Keep all component structure unchanged
- ✅ **Provider pattern**: Use PageProvider and usePageContext exactly as shown
- ✅ **Dynamic routing**: Use `use(params)` pattern for accessing route parameters
- ✅ **Layout**: Use Row, Col, Card for page layout structure

## Component Integration

### Required Components:

- **{TableName}Info**: For data display (replaces previous {TableName}Desc)
- **{TableName}Edit**: For editing records
- **get{TableName}Column**: Function for table column definitions

### Required Hooks:

- **useInfo()**: For information/detail state management
- **useForm()**: For form state management
- **useNavigate()**: For navigation functionality

### Page Structure:

- **AntPage**: Main page wrapper with breadcrumbs and title
- **Row, Col, Card**: Layout components for responsive design
- **PageProvider**: Context provider for page state (shared with list page)
- **Action buttons**: Back and Edit buttons

## Navigation Setup

The page uses a standard navigation pattern:

- **Breadcrumbs**: Hệ thống → {vnTableName} → Chi tiết
- **Page title**: Dynamic based on record data or "Chi tiết" fallback
- **Parent navigation**: Back button to return to list page
- **Edit success**: Reload detail data after successful edit
- **Delete success**: Navigate back to list page

## Page Title Configuration

Choose appropriate field for `{titleField}` placeholder:

- **For options table**: `option_column`
- **For users table**: `user_name` or `user_email`
- **For rooms table**: `room_name`
- **General rule**: Use the most descriptive field (name, title, label, column)

## Validation Checklist

- ✅ **File location**: `src/app/(front)/app/dev/{table-name}/[id]/page.js`
- ✅ **File naming**: kebab-case folder with [id] dynamic route
- ✅ **Template structure**: Exact Provider and PageContent pattern
- ✅ **Imports**: All required components and hooks imported from correct paths
- ✅ **Component usage**: Info and Edit components properly integrated
- ✅ **Hook usage**: useInfo, useForm, useNavigate properly used
- ✅ **Vietnamese labels**: Proper Vietnamese text for all user-facing elements
- ✅ **Navigation**: Breadcrumbs and title properly configured
- ✅ **Action buttons**: Back and Edit buttons properly implemented
- ✅ **Detail integration**: Info component with proper data binding
- ✅ **Form integration**: Edit form with drawer variant and delete functionality
- ✅ **Success handling**: Proper reload and navigation after operations
- ✅ **Dynamic title**: Page title based on record data with fallback
- ✅ **Route parameters**: Proper use of dynamic routing with use(params)
- ✅ **Layout**: Row, Col, Card structure properly implemented

## Output Location

Generated file: `src/app/(front)/app/dev/{table-name}/[id]/page.js`
