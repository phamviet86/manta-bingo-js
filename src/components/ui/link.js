// path: @/components/ui/link.js

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NextLink({ children, ...props }) {
  return <Link {...props}>{children}</Link>;
}

export function SubLink({ path, ...props }) {
  const pathname = usePathname();
  return <NextLink href={`${pathname}/${path}`} {...props} />;
}
