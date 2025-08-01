// path: @/components/ui/button.js

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "antd";
import { useNavigate } from "@/hooks";

// Components
export function AntButton({ label, ...props }) {
  return <Button {...props}>{label}</Button>;
}

export function SubPathButton({ path, ...props }) {
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
  const { navBack } = useNavigate();
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
