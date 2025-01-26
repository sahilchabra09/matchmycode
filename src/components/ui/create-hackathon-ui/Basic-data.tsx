import { Label } from "../hs_ui/label";


import { Input } from "@/components/ui/input";


import { Textarea } from "@/components/ui/hs_ui/textarea";
import { HackathonFormData } from "./types";
interface BasicDataProps {
    formData: Pick<HackathonFormData, "title" | "description" | "category">;
    handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  }

export function BasicData({formData, handleChange} : BasicDataProps){


      
    return(
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


)
}