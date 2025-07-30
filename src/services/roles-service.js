// path: @/services/roles-service.js

import bingoDB from "@/db/connections/neon-bingo";
import { parseSearchParams } from "@/utils/query-util";

// Database initialization
const sql = bingoDB();

// READ operations
export async function getRoles(searchParams) {
  try {
    const ignoredSearchColumns = [];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [...queryValues];
    const sqlText = `
      SELECT r.*, COUNT(*) OVER() AS total
      FROM roles r
      WHERE r.deleted_at IS NULL
      ${whereClause}
      ${orderByClause || "ORDER BY r.created_at"}
      ${limitClause};
    `;

    return await sql.query(sqlText, sqlValue);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getRole(id) {
  try {
    return await sql`
      SELECT r.*
      FROM roles r
      WHERE r.deleted_at IS NULL
        AND r.id = ${id};
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// CREATE operations
export async function createRole(data) {
  try {
    const { role_name, role_path } = data;

    return await sql`
      INSERT INTO roles (
        role_name, role_path
      ) VALUES (
        ${role_name}, ${role_path}
      )
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// UPDATE operations
export async function updateRole(id, data) {
  try {
    const { role_name, role_path } = data;

    return await sql`
      UPDATE roles
      SET role_name = ${role_name}, role_path = ${role_path}
      WHERE deleted_at IS NULL AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// DELETE operations
export async function deleteRole(id) {
  try {
    return await sql`
      UPDATE roles
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}
