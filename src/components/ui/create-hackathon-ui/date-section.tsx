// components/DatesSection.tsx
"use client";
import { Label } from "@/components/ui/hs_ui/label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/hs_ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { HackathonFormData } from "./types";

interface DatesSectionProps {
  formData: Pick<HackathonFormData,
    "registration_deadline" | "registration_time" |
    "start_date" | "start_time" |
    "end_date" | "end_time"
  >;
  isCalendarOpen: {
    registration_deadline: boolean;
    start_date: boolean;
    end_date: boolean;
  };
  setIsCalendarOpen: React.Dispatch<React.SetStateAction<{
    registration_deadline: boolean;
    start_date: boolean;
    end_date: boolean;
  }>>;
  handleDateTimeChange: (
    dateField: keyof HackathonFormData,
    timeField: keyof HackathonFormData,
    date: Date | undefined,
    time: string
  ) => void;
  errors: {
    start_date?: string;
    end_date?: string;
  };
}

export function DatesSection({
  formData,
  isCalendarOpen,
  setIsCalendarOpen,
  handleDateTimeChange,
  errors
}: DatesSectionProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {/* Registration Deadline */}
      <div>
        <Label className="text-sm font-medium">Registration Deadline</Label>
        <Popover
          open={isCalendarOpen.registration_deadline}
          onOpenChange={(open) =>
            setIsCalendarOpen(prev => ({ ...prev, registration_deadline: open }))
          }
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full mt-1.5 justify-start text-left font-normal",
                !formData.registration_deadline && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.registration_deadline
                ? format(new Date(formData.registration_deadline), "PPP")
                : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto z-50 p-0" align="start">
            <Calendar
              selectedDate={formData.registration_deadline ? new Date(formData.registration_deadline) : undefined}
              onChange={(date) => {
                handleDateTimeChange(
                  "registration_deadline",
                  "registration_time",
                  date,
                  formData.registration_time
                );
                setIsCalendarOpen(prev => ({ ...prev, registration_deadline: false }));
              }}
            />
          </PopoverContent>
        </Popover>
        <Input
          type="time"
          name="registration_time"
          value={formData.registration_time}
          onChange={(e) => {
            const time = e.target.value;
            const date = formData.registration_deadline
              ? new Date(formData.registration_deadline)
              : undefined;
            handleDateTimeChange("registration_deadline", "registration_time", date, time);
          }}
          className="mt-1.5"
        />
      </div>

      {/* Start Date */}
      <div>
        <Label className="text-sm font-medium">Start Date</Label>
        <Popover
          open={isCalendarOpen.start_date}
          onOpenChange={(open) =>
            setIsCalendarOpen(prev => ({ ...prev, start_date: open }))
          }
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full mt-1.5 justify-start text-left font-normal",
                !formData.start_date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.start_date
                ? format(new Date(formData.start_date), "PPP")
                : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto z-50 p-0" align="start">
            <Calendar
              selectedDate={formData.start_date ? new Date(formData.start_date) : undefined}
              onChange={(date) => {
                handleDateTimeChange(
                  "start_date",
                  "start_time",
                  date,
                  formData.start_time
                );
                setIsCalendarOpen(prev => ({ ...prev, start_date: false }));
              }}
            />
          </PopoverContent>
        </Popover>
        <Input
          type="time"
          name="start_time"
          value={formData.start_time}
          onChange={(e) => {
            const time = e.target.value;
            const date = formData.start_date
              ? new Date(formData.start_date)
              : undefined;
            handleDateTimeChange("start_date", "start_time", date, time);
          }}
          className="mt-1.5"
        />
        {errors.start_date && (
          <p className="mt-1.5 text-sm text-destructive">{errors.start_date}</p>
        )}
      </div>

      {/* End Date */}
      <div>
        <Label className="text-sm font-medium">End Date</Label>
        <Popover
          open={isCalendarOpen.end_date}
          onOpenChange={(open) =>
            setIsCalendarOpen(prev => ({ ...prev, end_date: open }))
          }
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full mt-1.5 justify-start text-left font-normal",
                !formData.end_date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.end_date
                ? format(new Date(formData.end_date), "PPP")
                : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-50" align="start">
            <Calendar
              selectedDate={formData.end_date ? new Date(formData.end_date) : undefined}
              onChange={(date) => {
                handleDateTimeChange(
                  "end_date",
                  "end_time",
                  date,
                  formData.end_time
                );
                setIsCalendarOpen(prev => ({ ...prev, end_date: false }));
              }}
            />
          </PopoverContent>
        </Popover>
        <Input
          type="time"
          name="end_time"
          value={formData.end_time}
          onChange={(e) => {
            const time = e.target.value;
            const date = formData.end_date
              ? new Date(formData.end_date)
              : undefined;
            handleDateTimeChange("end_date", "end_time", date, time);
          }}
          className="mt-1.5"
        />
        {errors.end_date && (
          <p className="mt-1.5 text-sm text-destructive">{errors.end_date}</p>
        )}
      </div>
    </div>
  );
}