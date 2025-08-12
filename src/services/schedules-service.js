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
      SELECT s.*, COUNT(*) OVER() AS total,
        course_name, course_code,
        module_name,
        syllabus_name,
        shift_start_time, shift_end_time,
        option_color AS schedule_status_color
      FROM schedules s
      LEFT JOIN classes_view cv ON cv.id = s.class_id AND cv.deleted_at IS NULL
      LEFT JOIN courses c ON c.id = cv.course_id AND c.deleted_at IS NULL
      LEFT JOIN modules m ON m.id = cv.module_id AND m.deleted_at IS NULL
      LEFT JOIN syllabuses sy ON sy.id = m.syllabus_id AND sy.deleted_at IS NULL
      LEFT JOIN shifts sh ON sh.id = s.shift_id AND sh.deleted_at IS NULL
      LEFT JOIN options o ON o.id = s.schedule_status_id AND o.deleted_at IS NULL
      WHERE s.deleted_at IS NULL
      ${whereClause}
      ${orderByClause || "ORDER BY s.created_at"}
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
      SELECT s.*, 
        course_name,
        module_name,
        syllabus_name
      FROM schedules s
      LEFT JOIN classes_view cv ON cv.id = s.class_id AND cv.deleted_at IS NULL
      LEFT JOIN courses c ON c.id = cv.course_id AND c.deleted_at IS NULL
      LEFT JOIN modules m ON m.id = cv.module_id AND m.deleted_at IS NULL
      LEFT JOIN syllabuses sy ON sy.id = m.syllabus_id AND sy.deleted_at IS NULL
      WHERE s.deleted_at IS NULL
        AND s.id = ${id};
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

// Duplicate multiple schedules by their IDs, incrementing schedule_date by specified days
export async function duplicateSchedules(ids, days = 7) {
  try {
    const placeholders = ids.map((_, index) => `$${index + 2}`).join(", ");

    const queryText = `
      INSERT INTO schedules (source_id, class_id, shift_id, schedule_date, schedule_status_id)
      SELECT id, class_id, shift_id, schedule_date + INTERVAL '${days} days', 31 
      FROM schedules
      WHERE id IN (${placeholders}) AND deleted_at IS NULL
      RETURNING *;
    `;
    const queryValues = [days, ...ids];

    return await sql.query(queryText, queryValues);
  } catch (error) {
    throw new Error(error.message);
  }
}
