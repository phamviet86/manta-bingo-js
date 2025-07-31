// path: @/services/rooms-service.js

import bingoDB from "@/db/connections/neon-bingo";
import { parseSearchParams } from "@/utils/query-util";

// Database initialization
const sql = bingoDB();

// READ operations
export async function getRooms(searchParams) {
  try {
    const ignoredSearchColumns = [];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [...queryValues];
    const sqlText = `
      SELECT r.*, COUNT(*) OVER() AS total
      FROM rooms r
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

export async function getRoom(id) {
  try {
    return await sql`
      SELECT r.*
      FROM rooms r
      WHERE r.deleted_at IS NULL
        AND r.id = ${id};
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// CREATE operations
export async function createRoom(data) {
  try {
    const { room_name, room_status_id, room_desc } = data;

    return await sql`
      INSERT INTO rooms (
        room_name, room_status_id, room_desc
      ) VALUES (
        ${room_name}, ${room_status_id}, ${room_desc}
      )
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// UPDATE operations
export async function updateRoom(id, data) {
  try {
    const { room_name, room_status_id, room_desc } = data;

    return await sql`
      UPDATE rooms
      SET
        room_name = ${room_name},
        room_status_id = ${room_status_id},
        room_desc = ${room_desc}
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// DELETE operations
export async function deleteRoom(id) {
  try {
    return await sql`
      UPDATE rooms
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}
