// path: @/component/common/page.js

import Link from "next/link";
import { PageContainer } from "@ant-design/pro-components";
import { formatUpperCase } from "@/lib/util/format-util";

// Helper function to render breadcrumb items
function renderBreadcrumbItem(item) {
  return item.path ? <Link href={item.path}>{item.title}</Link> : item.title;
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
