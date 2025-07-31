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
      SELECT rp.*, COUNT(*) OVER() AS total
      FROM role_permissions rp
      WHERE rp.deleted_at IS NULL
      ${whereClause}
      ${orderByClause || "ORDER BY rp.created_at"}
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
