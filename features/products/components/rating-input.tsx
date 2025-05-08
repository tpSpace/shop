"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";
import { addRating } from "@/lib/api/products";
import { RatingRequest } from "@/lib/types";
import { toast } from "sonner"; // Use Sonner for toasts
import { useRouter } from "next/navigation";

interface RatingInputProps {
  productId: string;
}

export function RatingInput({ productId }: RatingInputProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user, jwt, isAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleHover = (rate: number) => {
    setHoverRating(rate);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (jwt === null) {
      toast.error("Login Required", {
        description: (
          <>
            Please log in to submit a review.{" "}
            <Button
              variant="link"
              size="sm"
              className="p-0 h-auto text-blue-600"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          </>
        ),
      });
      router.push("/login");
      return;
    }
    if (rating === 0) {
      toast.error("Rating Required", {
        description: "Please select a star rating.",
      });
      return;
    }

    setIsLoading(true);
    const ratingData: RatingRequest = {
      productId,
      score: rating,
      comment: comment || "",
      userId: user?.id || "",
    };
    console.log(ratingData);
    try {
      const result = await addRating(ratingData);
      if (result) {
        toast.success("Review Submitted", {
          description: "Thank you for your feedback!",
        });
        setRating(0);
        setComment("");
        router.refresh();
      } else {
        throw new Error("Failed to submit rating");
      }
    } catch (error) {
      console.error("Rating submission failed:", error);
      toast.error("Submission Failed", {
        description: "Could not submit your review. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="mt-6 p-4 border rounded-md bg-secondary/50 text-center">
        <p className="text-sm text-muted-foreground mb-2">
          Please log in to leave a review.
        </p>
        <Button onClick={() => router.push("/login")} size="sm">
          Login
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 p-4 border rounded-md space-y-4"
    >
      <h4 className="font-medium">Leave a Review</h4>
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-6 w-6 cursor-pointer transition-colors ${
              hoverRating >= star || rating >= star
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
            onClick={() => handleRating(star)}
            onMouseEnter={() => handleHover(star)}
            onMouseLeave={() => handleHover(0)}
          />
        ))}
      </div>
      <Textarea
        placeholder="Write your comment here (optional)..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
      />
      <Button type="submit" disabled={isLoading || rating === 0}>
        {isLoading ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
