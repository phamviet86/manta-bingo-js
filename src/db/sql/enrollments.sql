-- table: đăng ký

DROP VIEW IF EXISTS enrollments_view CASCADE;
DROP TABLE IF EXISTS enrollments CASCADE;

CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,
  user_id UUID NOT NULL,
  module_id UUID DEFAULT NULL,
  class_id UUID DEFAULT NULL,
  enrollment_type_id INTEGER NOT NULL,
  enrollment_payment_type_id INTEGER DEFAULT 30,
  enrollment_payment_amount INTEGER DEFAULT 0,
  enrollment_start_date TIMESTAMPTZ DEFAULT NULL,
  enrollment_end_date TIMESTAMPTZ DEFAULT NULL,
  enrollment_desc TEXT DEFAULT NULL
);
CREATE TRIGGER update_record BEFORE
UPDATE ON enrollments FOR EACH ROW EXECUTE FUNCTION set_updated_at();

DROP VIEW IF EXISTS enrollments_view CASCADE;

CREATE OR REPLACE VIEW enrollments_view AS
SELECT 
  *,
  CASE
    -- 20: Nhập sai ngày
    WHEN enrollment_end_date IS NOT NULL 
         AND enrollment_start_date > enrollment_end_date THEN 20

    -- 21: Đã kết thúc
    WHEN enrollment_end_date IS NOT NULL 
         AND DATE(enrollment_end_date AT TIME ZONE 'Asia/Ho_Chi_Minh') <= (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Ho_Chi_Minh')::DATE THEN 21

    -- 22: Chờ xếp lớp
    WHEN class_id IS NULL THEN 22

    -- 23: Thiếu ngày bắt đầu
    WHEN enrollment_start_date IS NULL THEN 23

    -- 24: Đang tham gia
    WHEN enrollment_start_date IS NOT NULL
         AND DATE(enrollment_start_date AT TIME ZONE 'Asia/Ho_Chi_Minh') <= (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Ho_Chi_Minh')::DATE
         AND (
           enrollment_end_date IS NULL 
           OR DATE(enrollment_end_date AT TIME ZONE 'Asia/Ho_Chi_Minh') >= (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Ho_Chi_Minh')::DATE
         ) THEN 24

    -- 25: Chờ bắt đầu
    ELSE 25
  END AS enrollment_status_id
FROM 
  enrollments;