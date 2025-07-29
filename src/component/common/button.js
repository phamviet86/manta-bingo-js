// path: @/component/common/button.js

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "antd";
import { useNav } from "@/component/hook";

// Components
export function AntButton({ label, ...props }) {
  return <Button {...props}>{label}</Button>;
}

export function PathButton({ path, ...props }) {
  const pathname = usePathname();
  return (
    <Link href={`${pathname}/${path}`}>
      <AntButton {...props} />
    </Link>
  );
}

export function BackButton({
  label = "Quay lại",
  color = "default",
  variant = "filled",
  ...props
}) {
  const { navBack } = useNav();
  return (
    <AntButton
      {...props}
      label={label}
      color={color}
      variant={variant}
      onClick={() => navBack()}
    />
  );
}
