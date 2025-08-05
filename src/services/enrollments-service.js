// path: @/services/enrollments-service.js

import bingoDB from "@/db/connections/neon-bingo";
import { parseSearchParams } from "@/utils/query-util";

// Database initialization
const sql = bingoDB();

// READ operations
export async function getEnrollments(searchParams) {
  try {
    const ignoredSearchColumns = [];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [...queryValues];
    const sqlText = `
      SELECT e.*, COUNT(*) OVER() AS total
      FROM enrollments e
      WHERE e.deleted_at IS NULL
      ${whereClause}
      ${orderByClause || "ORDER BY e.created_at"}
      ${limitClause};
    `;

    return await sql.query(sqlText, sqlValue);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getEnrollment(id) {
  try {
    return await sql`
      SELECT e.*
      FROM enrollments e
      WHERE e.deleted_at IS NULL
        AND e.id = ${id};
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// CREATE operations
export async function createEnrollment(data) {
  try {
    const {
      user_id,
      module_id,
      class_id,
      enrollment_type_id,
      enrollment_payment_type_id,
      enrollment_payment_amount,
      enrollment_payment_discount,
      enrollment_start_date,
      enrollment_end_date,
      enrollment_discount_notes,
      enrollment_desc,
    } = data;

    return await sql`
      INSERT INTO enrollments (
        user_id, module_id, class_id, enrollment_type_id, enrollment_payment_type_id, enrollment_payment_amount, enrollment_payment_discount, enrollment_start_date, enrollment_end_date, enrollment_discount_notes, enrollment_desc
      ) VALUES (
        ${user_id}, ${module_id}, ${class_id}, ${enrollment_type_id}, ${enrollment_payment_type_id}, ${enrollment_payment_amount}, ${enrollment_payment_discount}, ${enrollment_start_date}, ${enrollment_end_date}, ${enrollment_discount_notes}, ${enrollment_desc}
      )
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// UPDATE operations
export async function updateEnrollment(id, data) {
  try {
    const {
      user_id,
      module_id,
      class_id,
      enrollment_type_id,
      enrollment_payment_type_id,
      enrollment_payment_amount,
      enrollment_payment_discount,
      enrollment_start_date,
      enrollment_end_date,
      enrollment_discount_notes,
      enrollment_desc,
    } = data;

    return await sql`
      UPDATE enrollments
      SET
        user_id = ${user_id},
        module_id = ${module_id},
        class_id = ${class_id},
        enrollment_type_id = ${enrollment_type_id},
        enrollment_payment_type_id = ${enrollment_payment_type_id},
        enrollment_payment_amount = ${enrollment_payment_amount},
        enrollment_payment_discount = ${enrollment_payment_discount},
        enrollment_start_date = ${enrollment_start_date},
        enrollment_end_date = ${enrollment_end_date},
        enrollment_discount_notes = ${enrollment_discount_notes},
        enrollment_desc = ${enrollment_desc}
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// DELETE operations
export async function deleteEnrollment(id) {
  try {
    return await sql`
      UPDATE enrollments
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL
        AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}
