// path: @/components/ui/image.js

import { Image } from "antd";

export function DiceBeerImage({ src, seed, ...props }) {
  return (
    <Image
      src={src ? src : `https://api.dicebear.com/9.x/bottts/svg?seed=${seed}`}
      alt="Ảnh đại diện"
      {...props}
    />
  );
}
