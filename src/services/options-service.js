// path: @/services/options-service.js

import bingoDB from "@/db/connections/neon-bingo";
import { parseSearchParams } from "@/utils/query-util";

// Database initialization
const sql = bingoDB();

// READ operations
export async function getOptions(searchParams) {
  try {
    const ignoredSearchColumns = [];
    const { whereClause, orderByClause, limitClause, queryValues } =
      parseSearchParams(searchParams, ignoredSearchColumns);

    const sqlValue = [...queryValues];
    const sqlText = `
      SELECT o.*, COUNT(*) OVER() AS total
      FROM options o
      WHERE o.deleted_at IS NULL
      ${whereClause}
      ${orderByClause || "ORDER BY o.created_at"}
      ${limitClause};
    `;

    return await sql.query(sqlText, sqlValue);
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getOption(id) {
  try {
    return await sql`
      SELECT o.*
      FROM options o
      WHERE o.deleted_at IS NULL
        AND o.id = ${id};
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// CREATE operations
export async function createOption(data) {
  try {
    const {
      option_table,
      option_column,
      option_label,
      option_color,
      option_group,
    } = data;

    return await sql`
      INSERT INTO options (
        option_table, option_column, option_label, option_color, option_group
      ) VALUES (
        ${option_table}, ${option_column}, ${option_label}, ${option_color}, ${option_group}
      )
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// UPDATE operations
export async function updateOption(id, data) {
  try {
    const {
      option_table,
      option_column,
      option_label,
      option_color,
      option_group,
    } = data;

    return await sql`
      UPDATE options
      SET option_table = ${option_table}, option_column = ${option_column}, option_label = ${option_label}, option_color = ${option_color}, option_group = ${option_group}
      WHERE deleted_at IS NULL AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}

// DELETE operations
export async function deleteOption(id) {
  try {
    return await sql`
      UPDATE options
      SET deleted_at = NOW()
      WHERE deleted_at IS NULL AND id = ${id}
      RETURNING *;
    `;
  } catch (error) {
    throw new Error(error.message);
  }
}
