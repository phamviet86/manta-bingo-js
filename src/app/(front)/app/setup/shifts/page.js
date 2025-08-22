"use client";

import { EditOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { AntPage, AntButton } from "@/components/ui";
import {
  ShiftsTable,
  ShiftsCreate,
  ShiftsEdit,
  shiftsSchema,
  shiftsMapping,
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
  const { shiftStatus } = usePageContext();

  // Hooks
  const useShifts = {
    table: useTable(),
    create: useForm(),
    edit: useForm(),
    columns: shiftsSchema({ shiftStatus }, shiftsMapping.columns),
    fields: shiftsSchema({ shiftStatus }, shiftsMapping.fields),
  };

  // Open edit
  const openShiftsEdit = (shiftRecord) => {
    const { id } = shiftRecord || {};
    useShifts.edit.setRequestParams({ id });
    useShifts.edit.setDeleteParams({ id });
    useShifts.edit.open();
  };

  // Page action buttons
  const pageButton = [
    <AntButton
      key="reload-button"
      label="Tải lại"
      color="default"
      variant="outlined"
      onClick={() => useShifts.table.reload()}
    />,
    <AntButton
      key="create-button"
      label="Tạo mới"
      color="primary"
      variant="solid"
      onClick={() => useShifts.create.open()}
    />,
  ];

  // Main content
  const pageContent = (
    <ProCard hoverable bordered>
      <ShiftsTable
        tableHook={useShifts.table}
        columns={useShifts.columns}
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
                  onClick={() => openShiftsEdit(record)}
                />
              );
            },
          },
        ]}
      />
      <ShiftsCreate
        formHook={useShifts.create}
        fields={useShifts.fields}
        onSubmitSuccess={useShifts.table.reload}
        title="Tạo ca học"
        variant="drawer"
      />
      <ShiftsEdit
        formHook={useShifts.edit}
        fields={useShifts.fields}
        requestParams={useShifts.edit.requestParams}
        onSubmitSuccess={useShifts.table.reload}
        deleteParams={useShifts.edit.deleteParams}
        onDeleteSuccess={useShifts.table.reload}
        title="Chỉnh sửa ca học"
        variant="drawer"
      />
    </ProCard>
  );

  // Render
  return (
    <AntPage
      items={[{ title: "Thiết lập" }, { title: "Ca học" }]}
      title="Ca học"
      extra={pageButton}
      content={pageContent}
    />
  );
}
