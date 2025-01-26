"use client";
import "./style.css";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/hs_ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/hs_ui/label";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Calendar } from "@/components/ui/hs_ui/calendar";
import { format, isBefore } from "date-fns";
import { Textarea } from "@/components/ui/hs_ui/textarea";
import { CalendarIcon } from "lucide-react";
import { Select } from "@/components/ui/hs_ui/Select";

export function CreateHackathonDialog() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        start_date: "",
        start_time: "", // Added
        end_date: "",
        end_time: "", // Added
        registration_deadline: "",
        registration_time: "", // Added
        location: "",
        address: "",
        mode: "online", // default
        category: "",
        themes: "",
        tags: "",
        organiser_clerkId: "",
        prize_money: 0,
        registration_fees: "",
        rules: "",
        additional_info: "",
      });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isCalendarOpen, setIsCalendarOpen] = useState({
    registration_deadline: false,
    start_date: false,
    end_date: false,
  });

  // Handle input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear any existing error for the field
  }

  // Handle date and time changes
  const handleDateTimeChange = (
    dateField: string,
    timeField: string,
    date: Date | undefined,
    time: string
  ) => {
    if (date && time) {
      const [hours, minutes] = time.split(":").map(Number);
      const newDate = new Date(date);
      newDate.setHours(hours, minutes, 0, 0);
      setFormData(prev => ({
        ...prev,
        [dateField]: newDate.toISOString(),
        [timeField]: time
      }));
    } else if (date) {
      // Handle date-only updates
      setFormData(prev => ({
        ...prev,
        [dateField]: date.toISOString()
      }));
    } else {
      // Clear both fields if needed
      setFormData(prev => ({
        ...prev,
        [dateField]: "",
        [timeField]: ""
      }));
    }
  };

  // Validate that Start/End dates are after the Registration Deadline
  function validateDates() {
    const { registration_deadline, start_date, end_date } = formData;
    const newErrors: Record<string, string> = {};

    if (registration_deadline && start_date) {
      const rd = new Date(registration_deadline);
      const st = new Date(start_date);
      if (!isNaN(rd.getTime()) && !isNaN(st.getTime()) && isBefore(st, rd)) {
        newErrors.start_date = "Start date must be after the registration deadline.";
      }
    }

    if (registration_deadline && end_date) {
      const rd = new Date(registration_deadline);
      const ed = new Date(end_date);
      if (!isNaN(rd.getTime()) && !isNaN(ed.getTime()) && isBefore(ed, rd)) {
        newErrors.end_date = "End date must be after the registration deadline.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate date order
    if (!validateDates()) return;

    // Prepare data for backend
    const adjustedFormData = {
      ...formData,
      themes: formData.themes
        ? formData.themes.split(",").map((item) => item.trim())
        : [],
      tags: formData.tags
        ? formData.tags.split(",").map((item) => item.trim())
        : [],
      rules: formData.rules
        ? formData.rules.split(",").map((rule) => rule.trim())
        : [],
      prize_money: Number(formData.prize_money),
      additional_info: JSON.parse(formData.additional_info), // Parse JSON string
    };

    try {
      // Use the NEXT_PUBLIC_BACKEND_URL environment variable
      const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}hackathon/create_hackathon`;
      console.log("Backend URL:", backendUrl);

      // Make the API call
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adjustedFormData),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Parse error message if available
        throw new Error(errorData.message || "Failed to create hackathon");
      }

      // Success
      alert("Hackathon created successfully!");

      // Reset form
      ;
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating the hackathon.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Hackathon</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px] no-scrollbar max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-inter">Create Hackathon</DialogTitle>
          <DialogDescription className="font-inter">
            Fill in the details to create a new hackathon.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-6">
            {/* Basic Information */}
            <div className="space-y-6 rounded-lg border p-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Title */}
                <div className="sm:col-span-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Hackathon Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="mt-1.5"
                  />
                </div>

                {/* Description */}
                <div className="sm:col-span-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Hackathon Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="mt-1.5 min-h-[100px]"
                  />
                </div>

                {/* Category */}
                <div className="sm:col-span-2">
                  <Label htmlFor="category" className="text-sm font-medium">
                    Category
                  </Label>
                  <Input
                    id="category"
                    name="category"
                    placeholder="Hackathon Category (e.g., AI, Web Development)"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="mt-1.5"
                  />
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-6 rounded-lg border p-4">
  <h3 className="text-lg font-semibold">Important Dates</h3>
  <div className="grid gap-4 sm:grid-cols-2">
    {/* Registration Deadline */}
    <div>
      <Label className="text-sm font-medium">
        Registration Deadline
      </Label>
      <Popover
        open={isCalendarOpen.registration_deadline}
        onOpenChange={(open) =>
          setIsCalendarOpen((prev) => ({
            ...prev,
            registration_deadline: open,
          }))
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
              setIsCalendarOpen((prev) => ({
                ...prev,
                registration_deadline: false,
              }));
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
          setIsCalendarOpen((prev) => ({
            ...prev,
            start_date: open,
          }))
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
              setIsCalendarOpen((prev) => ({
                ...prev,
                start_date: false,
              }));
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
        <p className="mt-1.5 text-sm text-destructive">
          {errors.start_date}
        </p>
      )}
    </div>

    {/* End Date */}
    <div>
      <Label className="text-sm font-medium">End Date</Label>
      <Popover
        open={isCalendarOpen.end_date}
        onOpenChange={(open) =>
          setIsCalendarOpen((prev) => ({ ...prev, end_date: open }))
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
              setIsCalendarOpen((prev) => ({
                ...prev,
                end_date: false,
              }));
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
        <p className="mt-1.5 text-sm text-destructive">
          {errors.end_date}
        </p>
      )}
    </div>
  </div>
</div>

            {/* Event Details */}
            <div className="space-y-6 rounded-lg border p-4">
              <h3 className="text-lg font-semibold">Event Details</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Mode */}
                <div className="flex flex-col">
                  <Label htmlFor="mode" className="text-sm font-medium mb-1.5">
                    Mode
                  </Label>
                  <Select
                    options={[
                      { label: "Online", value: "online" },
                      { label: "Offline", value: "offline" },
                    ]}
                    value={formData.mode}
                    placeholder="Select Mode"
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, mode: value }))
                    }
                  />
                </div>

                {/* Prize Money */}
                <div className="flex flex-col">
                  <Label
                    htmlFor="prize_money"
                    className="text-sm font-medium mb-1.5"
                  >
                    Prize Money
                  </Label>
                  <Input
                    id="prize_money"
                    name="prize_money"
                    type="number"
                    placeholder="Prize Money"
                    value={formData.prize_money}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        prize_money: Number(e.target.value),
                      }))
                    }
                    required
                  />
                </div>

                {/* Registration Fees */}
                <div className="flex flex-col">
                  <Label
                    htmlFor="registration_fees"
                    className="text-sm font-medium mb-1.5"
                  >
                    Registration Fees
                  </Label>
                  <Input
                    id="registration_fees"
                    name="registration_fees"
                    placeholder="Registration Fees"
                    value={formData.registration_fees}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Location (Conditional on Mode) */}
                {formData.mode === "offline" && (
                  <>
                    <div className="flex flex-col">
                      <Label
                        htmlFor="location"
                        className="text-sm font-medium mb-1.5"
                      >
                        Location
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        placeholder="Event Location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="flex flex-col">
                      <Label
                        htmlFor="address"
                        className="text-sm font-medium mb-1.5"
                      >
                        Address
                      </Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="Event Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </>
                )}

                {/* Themes */}
                <div className="sm:col-span-2 flex flex-col">
                  <Label htmlFor="themes" className="text-sm font-medium mb-1.5">
                    Themes
                  </Label>
                  <Input
                    id="themes"
                    name="themes"
                    placeholder="Themes (comma-separated)"
                    value={formData.themes}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Tags */}
                <div className="sm:col-span-2 flex flex-col">
                  <Label htmlFor="tags" className="text-sm font-medium mb-1.5">
                    Tags
                  </Label>
                  <Input
                    id="tags"
                    name="tags"
                    placeholder="Tags (comma-separated)"
                    value={formData.tags}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Rules */}
                <div className="sm:col-span-2 flex flex-col">
                  <Label htmlFor="rules" className="text-sm font-medium mb-1.5">
                    Rules
                  </Label>
                  <Textarea
                    id="rules"
                    name="rules"
                    placeholder="Rules (comma-separated)"
                    value={formData.rules}
                    onChange={handleChange}
                    required
                    className="min-h-[100px]"
                  />
                </div>

                {/* Additional Info */}
                <div className="sm:col-span-2 flex flex-col">
                  <Label
                    htmlFor="additional_info"
                    className="text-sm font-medium mb-1.5"
                  >
                    Additional Info 
                  </Label>
                  <Textarea
                    id="additional_info"
                    name="additional_info"
                    placeholder="Additional Info (JSON format)"
                    value={formData.additional_info}
                    onChange={handleChange}
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Create Hackathon
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}