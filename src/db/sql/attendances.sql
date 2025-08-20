DROP TABLE IF EXISTS attendances;
CREATE TABLE attendances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,
  schedule_id UUID NOT NULL,
  enrollment_id UUID NOT NULL,
  attendance_status_id INTEGER NOT NULL,
  attendance_type_id INTEGER NOT NULL,
  attendance_desc TEXT DEFAULT NULL
);
CREATE TRIGGER update_record BEFORE
UPDATE ON attendances FOR EACH ROW EXECUTE FUNCTION set_updated_at();