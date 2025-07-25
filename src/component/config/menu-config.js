// path: @/component/config/menu-config.js

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
    path: "/app/system",
    icon: <SettingOutlined />,
    routes: [
      { path: "/app/system/options", name: "Tuỳ chọn" },
      // { path: "/app/system/resources", name: "Tài nguyên" },
      { path: "/app/system/roles", name: "Vai trò" },
    ],
  },
  {
    name: "Thiết lập",
    path: "/app/setting",
    icon: <ToolOutlined />,
    routes: [
      { path: "/app/setting/syllabuses", name: "Giáo trình" },
      { path: "/app/setting/courses", name: "Khóa học" },
      { path: "/app/setting/rooms", name: "Phòng học" },
      { path: "/app/setting/shifts", name: "Ca học" },
    ],
  },
  {
    name: "Quản lý",
    path: "/app/manager",
    icon: <BankOutlined />,
    routes: [
      { path: "/app/manager/users", name: "Người dùng" },
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
    path: "/app/teaching-assistant",
    icon: <TeamOutlined />,
    routes: [],
  },
  {
    name: "Development",
    path: "/app/dev",
    icon: <CodeOutlined style={{ color: "#fa541c" }} />,
  },
];
