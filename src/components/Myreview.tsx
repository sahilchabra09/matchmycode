"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface Review {
  comment: string;
  created_at: string;
  rating: number;
  reviewer?: string;
}

export default function MyReview() {
  const { user } = useUser();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `https://pleasant-mullet-unified.ngrok-free.app/reviews/get_reviews/${user.id}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );

        if (!res.ok) {
          if (res.status === 404) {
            setReviews([]);
          } else {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return;
        }

        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [user?.id]);

  if (loading) {
    return <div className="text-gray-400">Loading reviews...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!reviews.length) {
    return <div className="text-gray-400">No reviews yet</div>;
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {reviews.map((review, index) => (
        <Card
          key={index}
          className="bg-neutral-900 border-neutral-800 overflow-hidden"
        >
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-gray-700">
              <AvatarFallback>
                {review.reviewer
                  ? review.reviewer
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                  : "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-gray-100">
                {review.reviewer || "Unknown User"}
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < (review.rating || 0)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              {review.comment || "No comment provided"}
            </p>
            <Badge
              variant="outline"
              className="text-xs bg-gray-800 text-gray-300"
            >
              {new Date(review.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
