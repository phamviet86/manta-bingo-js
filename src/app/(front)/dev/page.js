"use client";

import { AntPage } from "@/component/common";

export default function Page() {
  return (
    <AntPage items={[{ title: "Home", path: "/dev" }]} title="Dev Page">
      {/* Content goes here */}
    </AntPage>
  );
}
