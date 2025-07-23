-- table: lớp học

DROP VIEW IF EXISTS classes_view CASCADE;
DROP TABLE IF EXISTS classes CASCADE;

CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,
  course_id UUID NOT NULL,
  module_id UUID NOT NULL,
  class_start_date TIMESTAMPTZ DEFAULT NULL,
  class_end_date TIMESTAMPTZ DEFAULT NULL,
  class_fee INTEGER DEFAULT 0,
  class_total_fee INTEGER DEFAULT 0
);
CREATE TRIGGER update_record
BEFORE UPDATE ON classes
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

DROP VIEW IF EXISTS classes_view CASCADE;

CREATE OR REPLACE VIEW classes_view AS
SELECT
  *,
  CASE
    -- 19: 'Chưa có lịch'
    WHEN class_start_date IS NULL AND class_end_date IS NULL THEN 19

    -- 20: 'Nhập sai ngày'
    WHEN class_start_date > class_end_date AND class_end_date IS NOT NULL THEN 20

    -- 21: 'Chờ'
    WHEN class_start_date IS NOT NULL 
         AND DATE(class_start_date AT TIME ZONE 'Asia/Ho_Chi_Minh') > (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Ho_Chi_Minh')::DATE THEN 21

    -- 22: 'Đang học'
    WHEN class_start_date IS NOT NULL 
         AND DATE(class_start_date AT TIME ZONE 'Asia/Ho_Chi_Minh') <= (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Ho_Chi_Minh')::DATE
         AND (
           class_end_date IS NULL 
           OR DATE(class_end_date AT TIME ZONE 'Asia/Ho_Chi_Minh') > (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Ho_Chi_Minh')::DATE
         ) THEN 22

    -- 23: 'Đã học xong'
    WHEN class_end_date IS NOT NULL 
         AND DATE(class_end_date AT TIME ZONE 'Asia/Ho_Chi_Minh') <= (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Ho_Chi_Minh')::DATE THEN 23

    -- 19: fallback
    ELSE 19
  END AS class_status_id
FROM classes;