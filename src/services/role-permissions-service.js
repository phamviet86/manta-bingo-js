// path: @/services/role-permissions-service.js

import bingoDB from "@/db/connections/neon-bingo";
import { parseSearchParams } from "@/utils/query-util";

// Database initialization
const sql = bingoDB();

// READ operations
export async function getRolePermissions(searchParams) {
  try {
    const ignoredSearchColumns = [];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [...queryValues];
    const sqlText = `
      SELECT rp.*, COUNT(*) OVER() AS total,
        r.role_name,
        p.permission_key, p.permission_desc
      FROM role_permissions rp
      LEFT JOIN roles r ON r.id = rp.role_id AND r.deleted_at IS NULL
      LEFT JOIN permissions p ON p.id = rp.permission_id AND p.deleted_at IS NULL
      WHERE rp.deleted_at IS NULL
      ${whereClause}
      ${orderByClause || "ORDER BY r.role_name, p.permission_key"}
      ${limitClause};
    `;

    return await sql.query(sqlText, sqlValue);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getRolePermission(id) {
  try {
    return await sql`
      SELECT rp.*
      FROM role_permissions rp
      WHERE rp.deleted_at IS NULL
        AND rp.id = ${id};
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// CREATE operations
export async function createRolePermission(data) {
  try {
    const { role_id, permission_id } = data;

    return await sql`
      INSERT INTO role_permissions (
        role_id, permission_id
      ) VALUES (
        ${role_id}, ${permission_id}
      )
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// UPDATE operations
export async function updateRolePermission(id, data) {
  try {
    const { role_id, permission_id } = data;

    return await sql`
      UPDATE role_permissions
      SET
        role_id = ${role_id},
        permission_id = ${permission_id}
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// DELETE operations
export async function deleteRolePermission(id) {
  try {
    return await sql`
      UPDATE role_permissions
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Create multiple role permissions by role ID and permissions IDs
export async function createRolePermissionsByRole(roleId, permissionIds) {
  try {
    const queryValues = [];
    const valuePlaceholders = permissionIds
      .map((permissionId, index) => {
        queryValues.push(roleId, permissionId);
        return `($${index * 2 + 1}, $${index * 2 + 2})`;
      })
      .join(", ");

    const queryText = `
      INSERT INTO role_permissions (role_id, permission_id)
      VALUES ${valuePlaceholders}
      RETURNING *;
    `;

    return await sql.query(queryText, queryValues);
  } catch (error) {
    throw new Error(error.message);
  }
}

// Soft-delete multiple role permissions by role ID and permission IDs
export async function deleteRolePermissionsByRole(roleId, permissionIds) {
  try {
    const placeholders = permissionIds
      .map((_, index) => `$${index + 2}`)
      .join(", ");

    const queryText = `
      UPDATE role_permissions
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL 
        AND role_id = $1 
        AND permission_id IN (${placeholders})
      RETURNING *;
    `;

    const queryValues = [roleId, ...permissionIds];
    return await sql.query(queryText, queryValues);
  } catch (error) {
    throw new Error(error.message);
  }
}
