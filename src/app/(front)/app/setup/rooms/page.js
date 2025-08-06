"use client";

import { EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton } from "@/components/ui";
import {
  RoomsTable,
  RoomsCreate,
  RoomsEdit,
  roomsSchema,
  roomsMapping,
} from "@/components/feature";
import { useTable, useForm } from "@/hooks";
import { PageProvider, usePageContext } from "./provider";

export default function Page(props) {
  return (
    <PageProvider>
      <PageContent {...props} />
    </PageProvider>
  );
}

function PageContent() {
  // Context
  const { roomStatus } = usePageContext();

  // Hooks
  const useRooms = {
    table: useTable(),
    create: useForm(),
    edit: useForm(),
    columns: roomsSchema({ roomStatus }, roomsMapping.columns),
    fields: roomsSchema({ roomStatus }, roomsMapping.fields),
  };

  // Open edit
  const openRoomsEdit = (record) => {
    const { id } = record || {};
    useRooms.edit.setRequestParams({ id });
    useRooms.edit.setDeleteParams({ id });
    useRooms.edit.open();
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="reload-button"
      label="Tải lại"
      color="default"
      variant="outlined"
      onClick={() => useRooms.table.reload()}
    />,
    <AntButton
      key="create-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      onClick={() => useRooms.create.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard boxShadow bordered>
      <RoomsTable
        tableHook={useRooms.table}
        columns={useRooms.columns}
        rightColumns={[
          {
            width: 56,
            align: "center",
            search: false,
            render: (_, record) => {
              return (
                <AntButton
                  icon={<EditOutlined />}
                  color="primary"
                  variant="link"
                  onClick={() => openRoomsEdit(record)}
                />
              );
            },
          },
        ]}
      />
      <RoomsCreate
        formHook={useRooms.create}
        fields={useRooms.fields}
        onSubmitSuccess={useRooms.table.reload}
        title="Tạo phòng học"
        variant="drawer"
      />
      <RoomsEdit
        formHook={useRooms.edit}
        fields={useRooms.fields}
        requestParams={useRooms.edit.requestParams}
        onSubmitSuccess={useRooms.table.reload}
        deleteParams={useRooms.edit.deleteParams}
        onDeleteSuccess={useRooms.table.reload}
        title="Chỉnh sửa phòng học"
        variant="drawer"
      />
    </ProCard>
  );

  // Render
  return (
    <AntPage
      items={[{ title: "Thiết lập" }, { title: "Phòng học" }]}
      title="Phòng học"
      extra={pageButton}
      content={pageContent}
    />
  );
}
