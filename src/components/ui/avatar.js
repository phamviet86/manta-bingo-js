// path: @/components/ui/avatar.js

import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export function DiceBeerAvatar({ src, seed, ...props }) {
  return (
    <Avatar
      src={src ? src : `https://api.dicebear.com/9.x/bottts/svg?seed=${seed}`}
      icon={<UserOutlined />}
      {...props}
    />
  );
}
