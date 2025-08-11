// path: @/services/schedules-service.js

import bingoDB from "@/db/connections/neon-bingo";
import { parseSearchParams } from "@/utils/query-util";

// Database initialization
const sql = bingoDB();

// READ operations
export async function getSchedules(searchParams) {
  try {
    const ignoredSearchColumns = [];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [...queryValues];
    const sqlText = `
      SELECT sv.*, COUNT(*) OVER() AS total
      FROM schedules_view sv
      WHERE sv.deleted_at IS NULL
      ${whereClause}
      ${orderByClause || "ORDER BY sv.created_at"}
      ${limitClause};
    `;

    return await sql.query(sqlText, sqlValue);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getSchedule(id) {
  try {
    return await sql`
      SELECT sv.*
      FROM schedules_view sv
      WHERE sv.deleted_at IS NULL
        AND sv.id = ${id};
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// CREATE operations
export async function createSchedule(data) {
  try {
    const {
      source_id,
      class_id,
      lecture_id,
      shift_id,
      room_id,
      schedule_date,
      schedule_status_id,
      schedule_desc,
    } = data;

    return await sql`
      INSERT INTO schedules (
        source_id, class_id, lecture_id, shift_id, room_id, schedule_date, schedule_status_id, schedule_desc
      ) VALUES (
        ${source_id}, ${class_id}, ${lecture_id}, ${shift_id}, ${room_id}, ${schedule_date}, ${schedule_status_id}, ${schedule_desc}
      )
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// UPDATE operations
export async function updateSchedule(id, data) {
  try {
    const {
      source_id,
      class_id,
      lecture_id,
      shift_id,
      room_id,
      schedule_date,
      schedule_status_id,
      schedule_desc,
    } = data;

    return await sql`
      UPDATE schedules
      SET
        source_id = ${source_id},
        class_id = ${class_id},
        lecture_id = ${lecture_id},
        shift_id = ${shift_id},
        room_id = ${room_id},
        schedule_date = ${schedule_date},
        schedule_status_id = ${schedule_status_id},
        schedule_desc = ${schedule_desc}
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// DELETE operations
export async function deleteSchedule(id) {
  try {
    return await sql`
      UPDATE schedules
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// READ operations
export async function getSchedulesSummary(searchParams) {
  try {
    const ignoredSearchColumns = [];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [...queryValues];
    const sqlText = `
      SELECT sv.*, COUNT(*) OVER() AS total,
      COUNT(sv.schedule_pending) AS pending_count,
      COUNT(sv.schedule_completed) AS completed_count,
      COUNT(sv.schedule_absent) AS absent_count
      FROM schedules_view sv
      WHERE sv.deleted_at IS NULL
      ${whereClause}
      ${orderByClause || "ORDER BY s.created_at"}
      ${limitClause};
    `;

    return await sql.query(sqlText, sqlValue);
  } catch (error) {
    throw new Error(error.message);
  }
}
