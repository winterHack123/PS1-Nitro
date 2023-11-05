import dayjs from 'dayjs';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';

export default function CalendarHeader({ monthIndex, setMonthIndex }: any) {
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(dayjs().month());
  }
  return (
    <header className="flex items-center justify-between">
      <button
        onClick={handleReset}
        className="border bg-slate-300 cursor-pointer rounded py-1 px-4 w-20"
      >
        Today
      </button>

      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        <select
          value={(12 + (monthIndex % 12)) % 12}
          className="bg-slate-300 rounded text-sm cursor-pointer font-normal py-0.5 px-2"
          onChange={(e) => setMonthIndex(+e.target.value)}
        >
          <option value={0}>January</option>
          <option value={1}>February</option>
          <option value={2}>March</option>
          <option value={3}>April</option>
          <option value={4}>May</option>
          <option value={5}>June</option>
          <option value={6}>July</option>
          <option value={7}>August</option>
          <option value={8}>September</option>
          <option value={9}>October</option>
          <option value={10}>November</option>
          <option value={11}>December</option>
        </select>

        <select
          value={dayjs(new Date(dayjs().year(), monthIndex)).format('YYYY')}
          className="bg-slate-300 ml-2 rounded text-sm cursor-pointer font-normal py-0.5 px-2"
          onChange={(e) => {
            const currentYear = dayjs(
              new Date(dayjs().year(), monthIndex)
            ).format('YYYY');
            let difference = +e.target.value - +currentYear;
            setMonthIndex(+monthIndex + difference * 12);
          }}
        >
          <option value={2019}>2019</option>
          <option value={2020}>2020</option>
          <option value={2021}>2021</option>
          <option value={2022}>2022</option>
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
          <option value={2026}>2026</option>
          <option value={2027}>2027</option>
          <option value={2028}>2028</option>
          <option value={2029}>2029</option>
          <option value={2030}>2030</option>
        </select>
      </h2>

      <div className="w-20 flex items-center justify-end">
        <button onClick={handlePrevMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            <ArrowLeft />
          </span>
        </button>
        <button onClick={handleNextMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            <ArrowRight />
          </span>
        </button>
      </div>
    </header>
  );
}
