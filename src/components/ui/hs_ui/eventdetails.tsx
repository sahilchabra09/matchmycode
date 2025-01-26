import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/hs_ui/Select";

export function EventDetailsSection({
  formData,
  handleChange,
}: {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="space-y-6 rounded-lg border p-4">
      <h3 className="text-lg font-semibold">Event Details</h3>
      <div className="grid gap-4 sm:grid-cols-2">
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
            onChange={(value) => handleChange({ target: { name: "mode", value } } as any)}
          />
        </div>
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
            onChange={handleChange}
            required
          />
        </div>
        {/* Add other fields here */}
      </div>
    </div>
  );
}