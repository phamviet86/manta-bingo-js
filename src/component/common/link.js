// path: @/component/common/link.js

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NextLink({ children, ...props }) {
  return <Link {...props}>{children}</Link>;
}

export function DetailLink({ id, ...props }) {
  const pathname = usePathname();
  return <NextLink href={`${pathname}/${id}`} {...props} />;
}
