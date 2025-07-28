"use client";

import { AntPage } from "@/component/common";

export default function Page() {
  return (
    <AntPage items={[{ title: "Home", path: "/app" }]} title="Home Page">
      {/* Content goes here */}
    </AntPage>
  );
}
