// path: @/hooks/useNavigate.js

import { usePathname, useRouter } from "next/navigation";

/**
 * Custom hook for navigation utilities.
 *
 * @returns {Object} Navigation functions.
 * @returns {Function} navBack - Navigates to the parent path.
 * @returns {Function} navDetail - Navigates to a detail page by appending an id to the current path.
 *
 * @example
 * const { navBack, navDetail } = useNav();
 * navBack(); // Navigates to parent path
 * navDetail(123); // Navigates to /current/path/123
 */
export function useNavigate() {
  const router = useRouter();
  const currentPath = usePathname();

  const navBack = () => {
    const newPath = currentPath.slice(0, currentPath.lastIndexOf("/"));
    router.push(newPath);
  };

  const navDetail = (id) => {
    if (typeof id !== "string" && typeof id !== "number") {
      throw new Error("Invalid id type. Expected string or number.");
    }
    const newPath = `${currentPath}/${id.toString()}`;
    router.push(newPath);
  };

  return { navBack, navDetail };
}
