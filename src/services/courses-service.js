// path: @/services/courses-service.js

import bingoDB from "@/db/connections/neon-bingo";
import { parseSearchParams } from "@/utils/query-util";

// Database initialization
const sql = bingoDB();

// READ operations
export async function getCourses(searchParams) {
  try {
    const ignoredSearchColumns = [];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [...queryValues];
    const sqlText = `
      SELECT c.*, COUNT(*) OVER() AS total
      FROM courses c
      WHERE c.deleted_at IS NULL
      ${whereClause}
      ${orderByClause || "ORDER BY c.created_at"}
      ${limitClause};
    `;

    return await sql.query(sqlText, sqlValue);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCourse(id) {
  try {
    return await sql`
      SELECT c.*
      FROM courses c
      WHERE c.deleted_at IS NULL
        AND c.id = ${id};
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// CREATE operations
export async function createCourse(data) {
  try {
    const { course_name, course_code } = data;

    return await sql`
      INSERT INTO courses (
        course_name, course_code
      ) VALUES (
        ${course_name}, ${course_code}
      )
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// UPDATE operations
export async function updateCourse(id, data) {
  try {
    const { course_name, course_code } = data;

    return await sql`
      UPDATE courses
      SET
        course_name = ${course_name},
        course_code = ${course_code}
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// DELETE operations
export async function deleteCourse(id) {
  try {
    return await sql`
      UPDATE courses
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}
