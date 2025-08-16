// path: @/components/ui/calendar.js

import dayjs from "dayjs";
import viVN from "antd/locale/vi_VN";
import { Calendar, Select, Flex, Button } from "antd";

export function AntCalendar(props) {
  return <Calendar locale={viVN} {...props} />;
}

// headerRender functions
export function headerRenderMonth({ value, onChange }) {
  const year = value.year();
  const month = value.month();
  const yearOptions = Array.from({ length: 20 }, (_, i) => {
    const label = year - 10 + i;
    return { label, value: label };
  });
  const monthOptions = value
    .localeData()
    .monthsShort()
    .map((label, index) => ({
      label,
      value: index,
    }));

  return (
    <div style={{ paddingBottom: 8 }}>
      <Flex gap={8} align="center">
        <Select
          size="small"
          popupMatchSelectWidth={false}
          value={year}
          options={yearOptions}
          onChange={(newYear) => {
            const now = value.clone().year(newYear);
            onChange(now);
          }}
        />
        <Select
          size="small"
          popupMatchSelectWidth={false}
          value={month}
          options={monthOptions}
          onChange={(newMonth) => {
            const now = value.clone().month(newMonth);
            onChange(now);
          }}
        />
        <Button
          size="small"
          color="primary"
          variant="outlined"
          onClick={() => {
            const today = dayjs();
            onChange(today);
          }}
        >
          Hôm nay
        </Button>
      </Flex>
    </div>
  );
}
