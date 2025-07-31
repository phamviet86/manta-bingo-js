// path: @/configs/menu-config.js

import {
  HomeOutlined,
  SettingOutlined,
  ToolOutlined,
  BankOutlined,
  PhoneOutlined,
  BookOutlined,
  TeamOutlined,
  CodeOutlined,
} from "@ant-design/icons";

export const MENU_CONFIG = [
  {
    name: "Trang chủ",
    path: "/app",
    icon: <HomeOutlined />,
    routes: [],
  },
  {
    // hideInMenu: true,
    name: "Hệ thống",
    path: "/app/sysadmin",
    icon: <SettingOutlined />,
    routes: [
      { path: "/app/sysadmin/options", name: "Tuỳ chọn" },
      { path: "/app/sysadmin/roles", name: "Vai trò" },
      { path: "/app/sysadmin/permissions", name: "Quyền" },
    ],
  },
  {
    name: "Thiết lập",
    path: "/app/setup",
    icon: <ToolOutlined />,
    routes: [
      { path: "/app/setup/rooms", name: "Phòng học" },
      { path: "/app/setup/shifts", name: "Ca học" },
    ],
  },
  {
    name: "Quản lý",
    path: "/app/manager",
    icon: <BankOutlined />,
    routes: [
      { path: "/app/setup/syllabuses", name: "Giáo trình" },
      { path: "/app/manager/users", name: "Người dùng" },
      { path: "/app/setup/courses", name: "Khóa học" },
      { path: "/app/manager/classes", name: "Lớp học" },
      { path: "/app/manager/schedules", name: "Lịch học" },
    ],
  },
  {
    name: "Quản sinh",
    path: "/app/admin",
    icon: <PhoneOutlined />,
    routes: [
      { path: "/app/admin/users", name: "Học viên" },
      { path: "/app/admin/classes", name: "Lớp học" },
    ],
  },
  {
    name: "Giáo viên",
    path: "/app/teacher",
    icon: <BookOutlined />,
    routes: [],
  },
  {
    name: "Trợ giảng",
    path: "/app/assistant",
    icon: <TeamOutlined />,
    routes: [],
  },
  {
    name: "Development",
    path: "/app/dev",
    icon: <CodeOutlined style={{ color: "#fa541c" }} />,
  },
];
