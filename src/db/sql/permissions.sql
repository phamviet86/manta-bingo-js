-- table: Quyền

DROP TABLE IF EXISTS permissions CASCADE;
CREATE TABLE permissions (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,
  permission_key VARCHAR(255) NOT NULL,
  permission_desc VARCHAR(255) NOT NULL
);
CREATE TRIGGER update_record BEFORE
UPDATE ON permissions FOR EACH ROW EXECUTE FUNCTION set_updated_at();