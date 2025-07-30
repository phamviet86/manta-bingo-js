// path: @/components/ui/layout.js

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ProLayout as AntLayout } from "@ant-design/pro-components";
import { LAYOUT_CONFIG } from "@/configs";

// Helper function to render menu items
function renderMenuItem(item, dom) {
  return <Link href={item.path}>{dom}</Link>;
}

export function Layout({ menu = [], ...props }) {
  const pathname = usePathname();

  return (
    <AntLayout
      {...LAYOUT_CONFIG}
      route={{ path: "/", routes: menu }}
      menuItemRender={renderMenuItem}
      location={{ pathname }}
      selectedKeys={[pathname]}
      {...props}
    />
  );
}
