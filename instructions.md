# MANTA-BINGO-JS

## App Structure

- **sysadmin**

  - **options**:
    - [x] quản lý tuỳ chọn
  - **permissions**:
    - [ ] quản lý quyền
  - **roles**:
    - [ ] xem/tạo vai trò
    - **id**:
      - [ ] sửa/xoá vai trò
      - [ ] thêm quyền (bảng role-permissions)

- **setup**

  - **rooms**:
    - [ ] quản lý phòng học
  - **shifts**:
    - [ ] quản lý giờ học

- **manager**

  - **users**:
    - [ ] xem/tạo người dùng
    - **id**:
      - [ ] sửa/xoá/reset mật khẩu người dùng
      - [ ] thêm vai trò (bảng user-roles)
  - **syllabuses**:
    - [ ] xem/tạo giáo trình
    - **id**:
      - [ ] sửa/xoá giáo trình
      - [ ] quản lý học phần
      - [ ] quản lý bài giảng
  - **courses**:
    - [ ] xem/tạo khoá học
    - **id**:
      - [ ] sửa/xoá khoá học
      - [ ] quản lý lớp học
  - **classes**:
    - [ ] xem lớp học
    - **id**:
      - [ ] sửa/xoá lớp học
      - [ ] quản lý giáo viên, trợ giảng, học viên (bảng enrollments)
  - **schedules**:
    - [ ] quản lý lịch học
    - [ ] sao chép lịch học

- **admin**
  - **users**:
    - [ ] xem/tạo người dùng (học viên)
    - **id**:
      - [ ] thêm học viên vào các lớp (bảng enrollments)
  - **classes**:
    - [ ] xem lớp học
    - **id**:
      - [ ] sửa lớp học
      - [ ] thêm học viên vào lớp (bảng enrollments)
  - **schedules**:
    - [ ] xem lịch học
    - [ ] điểm danh
    - **id**:
      - [ ] xem/sửa lịch học
      - [ ] xem danh sách của lớp
