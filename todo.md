# MANTA-BINGO-JS

## App Structure

- **sysadmin**

  - **options**:
    - [x] quản lý tuỳ chọn
  - **permissions**:
    - [x] quản lý quyền
  - **roles**:
    - [x] xem/tạo vai trò
    - **id**:
      - [x] sửa/xoá vai trò
      - [x] thêm quyền (bảng role-permissions)

- **setup**

  - **rooms**:
    - [x] quản lý phòng học
  - **shifts**:
    - [x] quản lý giờ học

- **manager**

  - **users**:
    - [x] xem/tạo người dùng
    - **id**:
      - [x] sửa/xoá/reset mật khẩu người dùng
      - [x] thêm vai trò (bảng user-roles)
  - **syllabuses**:
    - [x] xem/tạo giáo trình
    - **id**:
      - [x] sửa/xoá giáo trình
      - [x] quản lý học phần
      - [x] quản lý bài giảng
  - **courses**:
    - [x] xem/tạo khoá học
    - **id**:
      - [x] sửa/xoá khoá học
      - [x] quản lý lớp học: tạo lớp, học phí, ngày bắt đầu
  - **classes**:
    - [x] xem lớp học
    - **id**:
      - [x] sửa/xoá lớp học
      - [x] quản lý giáo viên, trợ giảng, học viên (bảng enrollments)
  - **schedules**:
    - [x] quản lý lịch học
    - [x] sao chép lịch học

- **admin**
  - **users**:
    - [x] xem/tạo người dùng (học viên)
    - **id**:
      - [x] khoá edit đối với nhân viên
      - [x] thêm học viên vào các lớp (bảng enrollments) - chỉ thêm học viên vào lớp
      - [x] thêm phần disable các lớp đã học xong (transfer source list)
      - [x] thêm phần disable các lớp đang học (transfer target list)
  - **classes**:
    - [x] xem lớp học
    - **id**:
      - [x] sửa lớp học
      - [x] thêm học viên vào lớp (bảng enrollments) - không xem và sửa giáo viên, trợ giảng
      - [x] thêm tab lịch học của lớp
  - **schedules**:
    - [ ] xem lịch học
    - [ ] xếp phòng
    - [ ] điểm danh
    - **id**:
      - [ ] xem/sửa lịch học
      - [ ] xem danh sách của lớp
