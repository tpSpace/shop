"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";
import { getRatingsByProduct, addRating } from "@/lib/api/products";
import { Rating, RatingRequest } from "@/lib/types";

interface ProductRatingsProps {
  productId: string;
}

export function ProductRatings({ productId }: ProductRatingsProps) {
  const { user, isAuthenticated, jwt } = useAuthStore();
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
    
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        setLoading(true);
        const data = await getRatingsByProduct(productId);
        setRatings(data);
      } catch (err) {
        setError("Failed to load ratings. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setSubmitError("You must be logged in to submit a rating.");
      return;
    }
    if (score < 1 || score > 5) {
      setSubmitError("Please select a rating between 1 and 5 stars.");
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);
      const ratingData: RatingRequest = {
        productId,
        score: score,
        comment: comment|| "",
        userId: user?.id || "",
      };
      const newRating = await addRating(ratingData);
      if (newRating) {
        setRatings([newRating, ...ratings]);
        setScore(0);
        setComment("");
      } else {
        setSubmitError("Failed to submit rating. Please try again.");
      }
    } catch (err) {
      setSubmitError("Failed to submit rating. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  if (loading) {
    return <div className="text-center py-4">Loading ratings...</div>;
  }

  if (error && ratings.length === 0) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>

      {/* Display Ratings */}
      {ratings.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
      ) : (
        <div className="space-y-4 mb-6">
          {ratings.map((rating) => (
            <div key={rating.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-center mb-2">
                <span className="font-semibold mr-2">{(rating as any).userName || "Anonymous"}</span>
                <div className="flex">{renderStars((rating as any).score || rating.score || 0)}</div>
              </div>
              <p className="text-gray-600 text-sm mb-2">{new Date(rating.createdAt).toLocaleDateString()}</p>
              {rating.comment && <p className="text-gray-800">{rating.comment}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Rating Form for Logged-in Users */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
          {submitError && <p className="text-red-500 mb-4">{submitError}</p>}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Rating</label>
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => {
                const ratingVal = i + 1;
                return (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setScore(ratingVal)}
                    className={`mr-1 focus:outline-none ${ratingVal <= score ? "text-yellow-400" : "text-gray-300"}`}
                  >
                    <Star className="h-6 w-6 hover:text-yellow-400 hover:fill-yellow-400" />
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium mb-2">
              Comment
            </label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your thoughts about this product..."
              className="w-full"
              rows={4}
              maxLength={255}
            />
          </div>
          <Button type="submit" disabled={submitting} className="w-full md:w-auto">
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      ) : (
        <p className="text-gray-500 mt-4">
          You must be logged in to write a review. <a href="/login" className="text-blue-500 hover:underline">Login here</a>.
        </p>
      )}
    </div>
  );
} 