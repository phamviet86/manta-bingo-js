// path: @/services/users-service.js

import bingoDB from "@/db/connections/neon-bingo";
import { parseSearchParams } from "@/utils/query-util";

// Database initialization
const sql = bingoDB();

// READ operations
export async function getUsers(searchParams) {
  try {
    const ignoredSearchColumns = [];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [...queryValues];
    const sqlText = `
      SELECT u.*, COUNT(*) OVER() AS total
      FROM users u
      WHERE u.deleted_at IS NULL
      ${whereClause}
      ${orderByClause || "ORDER BY u.created_at"}
      ${limitClause};
    `;

    return await sql.query(sqlText, sqlValue);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getUser(id) {
  try {
    return await sql`
      SELECT u.*
      FROM users u
      WHERE u.deleted_at IS NULL
        AND u.id = ${id};
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// CREATE operations
export async function createUser(data) {
  try {
    const {
      user_name,
      user_status_id,
      user_email,
      user_password,
      user_phone,
      user_parent_phone,
      user_avatar,
      user_desc,
      user_notes,
    } = data;

    return await sql`
      INSERT INTO users (
        user_name, user_status_id, user_email, user_password, user_phone, user_parent_phone, user_avatar, user_desc, user_notes
      ) VALUES (
        ${user_name}, ${user_status_id}, ${user_email}, ${user_password}, ${user_phone}, ${user_parent_phone}, ${user_avatar}, ${user_desc}, ${user_notes}
      )
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// UPDATE operations
export async function updateUser(id, data) {
  try {
    const {
      user_name,
      user_status_id,
      user_email,
      user_password,
      user_phone,
      user_parent_phone,
      user_avatar,
      user_desc,
      user_notes,
    } = data;

    return await sql`
      UPDATE users
      SET
        user_name = ${user_name},
        user_status_id = ${user_status_id},
        user_email = ${user_email},
        user_password = ${user_password},
        user_phone = ${user_phone},
        user_parent_phone = ${user_parent_phone},
        user_avatar = ${user_avatar},
        user_desc = ${user_desc},
        user_notes = ${user_notes}
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// DELETE operations
export async function deleteUser(id) {
  try {
    return await sql`
      UPDATE users
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}
