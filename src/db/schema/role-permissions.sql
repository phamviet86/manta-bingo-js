-- table: phân quyền

DROP TABLE IF EXISTS role_permissions CASCADE;
CREATE TABLE role_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ DEFAULT NULL,
  role_id INTEGER NOT NULL,
  permission_id INTEGER NOT NULL
);
CREATE TRIGGER update_record BEFORE
UPDATE ON role_permissions FOR EACH ROW EXECUTE FUNCTION set_updated_at();