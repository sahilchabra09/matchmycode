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
  onChange: (date: Date | undefined) => void;
  className?: string;
  minDate?: Date;
}

export function Calendar({
  selectedDate,
  onChange,
  className,
  minDate,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(selectedDate ?? new Date());

  const handleDateClick = (date: Date) => {
    if (minDate && date < minDate) return;
    onChange(date);
  };

  const generateCalendarDays = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days: Date[] = [];
    let currentDay = startDate;

    while (currentDay <= endDate) {
      days.push(currentDay);
      currentDay = addDays(currentDay, 1);
    }

    return days;
  };

 const renderDayCells = () => {
    return generateCalendarDays().map((day) => {
      const isSelected = selectedDate && isSameDay(day, selectedDate);
      const disabled = minDate ? day < minDate : false;

      return (
        <button
          key={day.toISOString()}
          type="button"
          onClick={() => !disabled && handleDateClick(day)}
          disabled={disabled}
          className={cn(
            "px-3 py-1 text-sm rounded-md transition-colors",
            isSelected && "bg-blue-500 text-white",
            isToday(day) && !isSelected && "border border-blue-500",
            disabled
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100 dark:hover:bg-gray-700",
            "text-gray-700 dark:text-gray-300"
          )}
          aria-disabled={disabled}
        >
          {format(day, "d")} {/* Ensure this returns a string */}
        </button>
      );
    });
  };

  const handleMonthNavigation = (direction: "prev" | "next") => {
    setCurrentDate(prev => {
      const newMonth = direction === "prev" 
        ? prev.getMonth() - 1 
        : prev.getMonth() + 1;
      return new Date(prev.getFullYear(), newMonth, 1);
    });
  };

  return (
    <div className={cn(
      "p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-900",
      "border-gray-200 dark:border-gray-700",
      className
    )}>
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => handleMonthNavigation("prev")}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          aria-label="Previous month"
        >
          &lt;
        </button>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <button
          type="button"
          onClick={() => handleMonthNavigation("next")}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          aria-label="Next month"
        >
          &gt;
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-600 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderDayCells()}
      </div>
    </div>
  );
}