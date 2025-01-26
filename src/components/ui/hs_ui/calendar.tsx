"use client";
import React, { useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameDay,
  isToday,
} from "date-fns";
import { cn } from "@/lib/utils";

export interface CalendarProps {
  selectedDate?: Date;
  onChange: (date: Date | undefined) => void; // Required prop
  className?: string;
  minDate?: Date;
}

export function Calendar({
  selectedDate,
  onChange,
  className,
  minDate,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());

  const handleDateClick = (date: Date) => {
    onChange(date); // Now properly calling the required onChange
  };

  const renderDays = () => {
    // Show partial weeks from the first day of the displayed month
    const start = startOfWeek(startOfMonth(currentDate));
    const end = endOfWeek(endOfMonth(currentDate));
    const days: Date[] = [];
    let day = start;

    while (day <= end) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days.map((calendarDay) => {
      // Prevent error if selectedDate is undefined
      const isSelected = selectedDate && isSameDay(calendarDay, selectedDate);
      const disabled = minDate && calendarDay < minDate;

      return (
        <button
          key={calendarDay.toISOString()}
          onClick={(e) => {
            e.preventDefault();
            if (!disabled) {
              handleDateClick(calendarDay);
            }
          }}
          disabled={disabled}
          className={cn(
            "px-3 py-1 text-sm rounded-md transition-colors",
            // Selected date style
            isSelected && "bg-blue-500 text-white",
            // Highlight today's date
            isToday(calendarDay) && "border border-blue-500",
            // Disabled style
            disabled
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          )}
        >
          {calendarDay.getDate()}
        </button>
      );
    });
  };

  return (
    <div
      className={cn(
        "p-4 border rounded-lg shadow-sm",
        "bg-white border-gray-200", // Light mode
        "dark:bg-gray-900 dark:border-gray-700", // Dark mode
        className
      )}
    >
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            setCurrentDate(
              (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
            );
          }}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          &lt;
        </button>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <button
          onClick={(e) => {
            e.preventDefault();
            setCurrentDate(
              (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
            );
          }}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
        >
          &gt;
        </button>
      </div>

      {/* Weekdays Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
    </div>
  );
}
