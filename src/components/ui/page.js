// path: @/components/ui/page.js

import Link from "next/link";
import { PageContainer } from "@ant-design/pro-components";

// Helper function to render breadcrumb items
function renderBreadcrumbItem(item) {
  return item.path ? <Link href={item.path}>{item.title}</Link> : item.title;
}

// Function to format a string to uppercase
function formatUpperCase(str) {
  return typeof str === "string" ? str.toUpperCase() : str;
}

export function AntPage({ items = [], title = undefined, ...props }) {
  const uppercaseTitle = title ? formatUpperCase(title) : undefined;

  return (
    <PageContainer
      {...props}
      header={{
        title: uppercaseTitle,
        breadcrumb: {
          items: items,
          itemRender: renderBreadcrumbItem,
        },
      }}
    />
  );
}
