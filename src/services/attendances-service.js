// path: @/services/attendances-service.js

import bingoDB from "@/db/connections/neon-bingo";
import { parseSearchParams } from "@/utils/query-util";

// Database initialization
const sql = bingoDB();

// READ operations
export async function getAttendances(searchParams) {
  try {
    const ignoredSearchColumns = [];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [...queryValues];
    const sqlText = `
      SELECT a.*, COUNT(*) OVER() AS total
      FROM attendances a
      WHERE a.deleted_at IS NULL
      ${whereClause}
      ${orderByClause || "ORDER BY a.created_at"}
      ${limitClause};
    `;

    return await sql.query(sqlText, sqlValue);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getAttendance(id) {
  try {
    return await sql`
      SELECT a.*
      FROM attendances a
      WHERE a.deleted_at IS NULL
        AND a.id = ${id};
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// CREATE operations
export async function createAttendance(data) {
  try {
    const {
      schedule_id,
      enrollment_id,
      attendance_status_id,
      attendance_type_id,
      attendance_desc,
    } = data;

    return await sql`
      INSERT INTO attendances (
        schedule_id, enrollment_id, attendance_status_id, attendance_type_id, attendance_desc
      ) VALUES (
        ${schedule_id}, ${enrollment_id}, ${attendance_status_id}, ${attendance_type_id}, ${attendance_desc}
      )
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// UPDATE operations
export async function updateAttendance(id, data) {
  try {
    const {
      schedule_id,
      enrollment_id,
      attendance_status_id,
      attendance_type_id,
      attendance_desc,
    } = data;

    return await sql`
      UPDATE attendances
      SET
        schedule_id = ${schedule_id},
        enrollment_id = ${enrollment_id},
        attendance_status_id = ${attendance_status_id},
        attendance_type_id = ${attendance_type_id},
        attendance_desc = ${attendance_desc}
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// DELETE operations
export async function deleteAttendance(id) {
  try {
    return await sql`
      UPDATE attendances
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}
