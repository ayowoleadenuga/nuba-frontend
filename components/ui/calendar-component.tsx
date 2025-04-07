import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CalendarComp = ({
  setShowCalendar,
  setDateIsSelected,
  setSelectedDate,
}: any) => {
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setDateIsSelected(true);
    setShowCalendar(false);
  };
  const maxDate = new Date();
  return (
    <div className="relative">
      <Calendar
        onChange={handleDateClick}
        className="border-[#999999] shadow-lg border-[1px] rounded-[8px] font-workSans  font-[500] text-[14px] "
        color="#3F5BF6"
        rangeColors={["#3F5BF6"]}
        showMonthAndYearPickers={true}
      />
      {/* <button
        disabled={!dateIsSelected}
        className={`font-nunito  text-[14px] bg-primary text-white border-[1px] bg-secondary rounded-[30px] px-4 py-1 flex items-center justify-center absolute bottom-4 right-6 `}
      >
        Apply
      </button> */}
    </div>
  );
};

export default CalendarComp;
