// path: @/services/permissions-service.js

import bingoDB from "@/db/connections/neon-bingo";
import { parseSearchParams } from "@/utils/query-util";

// Database initialization
const sql = bingoDB();

// READ operations
export async function getPermissions(searchParams) {
  try {
    const ignoredSearchColumns = [];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [...queryValues];
    const sqlText = `
      SELECT p.*, COUNT(*) OVER() AS total
      FROM permissions p
      WHERE p.deleted_at IS NULL
      ${whereClause}
      ${orderByClause || "ORDER BY p.permission_key"}
      ${limitClause};
    `;

    return await sql.query(sqlText, sqlValue);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getPermission(id) {
  try {
    return await sql`
      SELECT p.*
      FROM permissions p
      WHERE p.deleted_at IS NULL
        AND p.id = ${id};
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// CREATE operations
export async function createPermission(data) {
  try {
    const { permission_key, permission_desc } = data;

    return await sql`
      INSERT INTO permissions (
        permission_key, permission_desc
      ) VALUES (
        ${permission_key}, ${permission_desc}
      )
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// UPDATE operations
export async function updatePermission(id, data) {
  try {
    const { permission_key, permission_desc } = data;

    return await sql`
      UPDATE permissions
      SET
        permission_key = ${permission_key},
        permission_desc = ${permission_desc}
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// DELETE operations
export async function deletePermission(id) {
  try {
    return await sql`
      UPDATE permissions
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}
