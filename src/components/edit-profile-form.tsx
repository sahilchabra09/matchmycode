"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

const userSchema = z.object({
  bio: z.string().max(500, "Bio must be 500 characters or less"),
  city: z.string().max(100, "City must be 100 characters or less"),
  country: z.string().max(100, "Country must be 100 characters or less"),
  email: z.string().email("Invalid email address"),
  interests: z.array(z.string()),
  name: z.string().min(2, "Name must be at least 2 characters"),
  ongoing_project_links: z.array(z.string().url("Invalid URL")),
  phone_number: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  portfolio_links: z.array(z.string().url("Invalid URL")),
  skills: z.array(z.string()),
  socials: z.array(z.string().url("Invalid URL")),
  state: z.string().max(100, "State must be 100 characters or less"),
  tags: z.array(z.string()),
});

type UserFormData = z.infer<typeof userSchema>;

export function EditProfileForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const userId = user?.id;

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      bio: "",
      city: "",
      country: "",
      email: "",
      interests: [],
      name: "",
      ongoing_project_links: [],
      phone_number: "",
      portfolio_links: [],
      skills: [],
      socials: [],
      state: "",
      tags: [],
    },
  });

  // Fetch user data and set as default values
  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://match-my-code.up.railway.app//user/get_user_details_dashboard/${userId}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch user data");
        const userData = await response.json();
        form.reset(userData); // Populate form with fetched data
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast({
          title: "Error",
          description: "Failed to load user data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId, form]);

  const onSubmit = async (data: UserFormData) => {
    if (!userId) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://match-my-code.up.railway.app/user/update_user_details/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) throw new Error("Failed to update user data");
      toast({
        title: "Success",
        description: "Your profile has been updated.",
      });
    } catch (error) {
      console.error("Error updating user data:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
                  {...field}
                  className="bg-neutral-800 border-neutral-700 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="your.email@example.com"
                  {...field}
                  className="bg-neutral-800 border-neutral-700 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about yourself"
                  {...field}
                  className="bg-neutral-800 border-neutral-700 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="+1234567890"
                  {...field}
                  className="bg-neutral-800 border-neutral-700 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your city"
                  {...field}
                  className="bg-neutral-800 border-neutral-700 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your state"
                  {...field}
                  className="bg-neutral-800 border-neutral-700 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your country"
                  {...field}
                  className="bg-neutral-800 border-neutral-700 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interests (comma-separated)</FormLabel>
              <FormControl>
                <Input
                  placeholder="AI, Web Development, Machine Learning"
                  {...field}
                  value={
                    Array.isArray(field.value) ? field.value.join(", ") : ""
                  }
                  onChange={(e) =>
                    field.onChange(
                      e.target.value
                        .split(",")
                        .map((item) => item.trim())
                        .filter((item) => item)
                    )
                  }
                  className="bg-neutral-800 border-neutral-700 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills (comma-separated)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Python, JavaScript, React"
                  {...field}
                  value={field.value.join(", ")}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(",").map((item) => item.trim())
                    )
                  }
                  className="bg-neutral-800 border-neutral-700 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags (comma-separated)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Developer, Designer, Student"
                  {...field}
                  value={field.value.join(", ")}
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.split(",").map((item) => item.trim())
                    )
                  }
                  className="bg-neutral-800 border-neutral-700 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ongoing_project_links"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ongoing Project Links (one per line)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="https://github.com/yourusername/project1&#10;https://github.com/yourusername/project2"
                  {...field}
                  value={field.value.join("\n")}
                  onChange={(e) =>
                    field.onChange(e.target.value.split("\n").filter(Boolean))
                  }
                  className="bg-neutral-800 border-neutral-700 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portfolio_links"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Portfolio Links (one per line)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="https://yourportfolio.com&#10;https://github.com/yourusername"
                  {...field}
                  value={field.value.join("\n")}
                  onChange={(e) =>
                    field.onChange(e.target.value.split("\n").filter(Boolean))
                  }
                  className="bg-neutral-800 border-neutral-700 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="socials"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Social Links (one per line)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="https://twitter.com/yourusername&#10;https://linkedin.com/in/yourusername"
                  {...field}
                  value={field.value.join("\n")}
                  onChange={(e) =>
                    field.onChange(e.target.value.split("\n").filter(Boolean))
                  }
                  className="bg-neutral-800 border-neutral-700 rounded-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Update Profile"
          )}
        </Button>
      </form>
    </Form>
  );
}
