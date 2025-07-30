// path: @/components/ui/layout.js

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProLayout } from "@ant-design/pro-components";
import { LAYOUT_CONFIG } from "@/configs";

// Helper function to render menu items
function renderMenuItem(item, dom) {
  return <Link href={item.path}>{dom}</Link>;
}

export function AntLayout({ menu = [], ...props }) {
  const pathname = usePathname();

  return (
    <ProLayout
      {...LAYOUT_CONFIG}
      route={{ path: "/", routes: menu }}
      menuItemRender={renderMenuItem}
      location={{ pathname }}
      selectedKeys={[pathname]}
      {...props}
    />
  );
}
