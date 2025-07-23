// path: @/component/common/layout.js

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { LAYOUT_CONFIG } from "@/component/config";

// Helper function to render menu items
function renderMenuItem(item, dom) {
  return <Link href={item.path}>{dom}</Link>;
}

export function AntLayout({ menu = [], ...props }) {
  const pathname = usePathname();

  return (
    <ProLayout
      {...props}
      {...LAYOUT_CONFIG}
      route={{ path: "/", routes: menu }}
      menuItemRender={renderMenuItem}
      location={{ pathname }}
      selectedKeys={[pathname]}
      avatarProps={{
        icon: <UserOutlined />,
        size: "small",
        title: "Người dùng",
        render: (props, dom) => {
          return (
            <Dropdown
              menu={{
                items: [],
              }}
            >
              {dom}
            </Dropdown>
          );
        },
      }}
    />
  );
}
