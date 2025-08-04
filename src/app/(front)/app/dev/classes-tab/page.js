"use client";

import { InfoCircleOutlined, EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { Space } from "antd";
import { AntPage, AntButton } from "@/components/ui";
import {
  ClassesTable,
  ClassesCreate,
  ClassesInfo,
  ClassesEdit,
  classesColumn,
} from "@/components/feature";
import { useTable, useInfo, useForm } from "@/hooks";

export default function Page() {
  const pageButton = [];
  const pageContent = <ProCard boxShadow bordered />;
  const pageTitle = "Lớp học Tab";


  // Render
  return (
    <AntPage
      items={[
        { title: "Hệ thống" },
        { title: "Lớp học" },
        { title: "Chi tiết" },
      ]}
      title={pageTitle}
      extra={pageButton}
      content={pageContent}
    />
  );
}
