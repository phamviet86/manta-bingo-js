// path: @/services/classes-service.js

import bingoDB from "@/db/connections/neon-bingo";
import { parseSearchParams } from "@/utils/query-util";

// Database initialization
const sql = bingoDB();

// READ operations
export async function getClasses(searchParams) {
  try {
    const ignoredSearchColumns = [];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [...queryValues];
    const sqlText = `
      SELECT c.*, COUNT(*) OVER() AS total
      FROM classes c
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

export async function getClass(id) {
  try {
    return await sql`
      SELECT c.*
      FROM classes c
      WHERE c.deleted_at IS NULL
        AND c.id = ${id};
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// CREATE operations
export async function createClass(data) {
  try {
    const {
      course_id,
      module_id,
      class_start_date,
      class_end_date,
      class_fee,
      class_total_fee,
    } = data;

    return await sql`
      INSERT INTO classes (
        course_id, module_id, class_start_date, class_end_date, class_fee, class_total_fee
      ) VALUES (
        ${course_id}, ${module_id}, ${class_start_date}, ${class_end_date}, ${class_fee}, ${class_total_fee}
      )
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// UPDATE operations
export async function updateClass(id, data) {
  try {
    const {
      course_id,
      module_id,
      class_start_date,
      class_end_date,
      class_fee,
      class_total_fee,
    } = data;

    return await sql`
      UPDATE classes
      SET
        course_id = ${course_id},
        module_id = ${module_id},
        class_start_date = ${class_start_date},
        class_end_date = ${class_end_date},
        class_fee = ${class_fee},
        class_total_fee = ${class_total_fee}
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// DELETE operations
export async function deleteClass(id) {
  try {
    return await sql`
      UPDATE classes
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}
