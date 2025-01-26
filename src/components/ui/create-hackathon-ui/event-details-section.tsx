// components/EventDetails.tsx
"use client";
import { Label } from "@/components/ui/hs_ui/label";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/hs_ui/Select";
import { Textarea } from "@/components/ui/hs_ui/textarea";
import { HackathonFormData } from "./types";

interface EventDetailsProps {
  formData: Pick<HackathonFormData,
    "mode" | 
    "prize_money" |
    "registration_fees" |
    "location" |
    "address" |
    "themes" |
    "tags" |
    "rules" |
    "additional_info"
  >;
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  setFormData: React.Dispatch<React.SetStateAction<HackathonFormData>>;
}

export function EventDetails({ formData, handleChange, setFormData }: EventDetailsProps) {
  return (
    <div className="space-y-6 rounded-lg border p-4">
      <h3 className="text-lg font-semibold">Event Details</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Mode */}
        <div className="flex flex-col">
          <Label htmlFor="mode" className="text-sm font-medium mb-1.5">
            Mode
          </Label>
          <Select<"online" | "offline">  // Add generic type parameter
            options={[
              { label: "Online", value: "online" },
              { label: "Offline", value: "offline" },
            ]}
            value={formData.mode}
            placeholder="Select Mode"
            onChange={(value) => 
              setFormData(prev => ({ 
                ...prev, 
                mode: value // Now type-safe without assertion
              }))
  }
/>
        </div>

        {/* Prize Money */}
        <div className="flex flex-col">
          <Label htmlFor="prize_money" className="text-sm font-medium mb-1.5">
            Prize Money
          </Label>
          <Input
            id="prize_money"
            name="prize_money"
            type="number"
            placeholder="Prize Money"
            value={formData.prize_money}
            onChange={(e) =>
              setFormData(prev => ({
                ...prev,
                prize_money: Number(e.target.value),
              }))
            }
            required
          />
        </div>

        {/* Registration Fees */}
        <div className="flex flex-col">
          <Label htmlFor="registration_fees" className="text-sm font-medium mb-1.5">
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
              <Label htmlFor="location" className="text-sm font-medium mb-1.5">
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
              <Label htmlFor="address" className="text-sm font-medium mb-1.5">
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
          <Label htmlFor="additional_info" className="text-sm font-medium mb-1.5">
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
  );
}