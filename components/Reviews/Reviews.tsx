"use client";

import { useQuery } from "@tanstack/react-query";
import { getCamperReviews } from "@/lib/api";
import StarRating from "@/components/StarRating/StarRating";
import css from "./Reviews.module.css";

interface ReviewsProps {
  camperId: string;
}

export default function Reviews({ camperId }: ReviewsProps) {
  const {
    data: reviews,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["reviews", camperId],
    queryFn: () => getCamperReviews(camperId),
    enabled: !!camperId,
  });

  if (isPending) {
    return <p>Loading reviews...</p>;
  }

  if (isError || !reviews) {
    return <p>Could not load reviews.</p>;
  }

  return (
    <ul className={css.list}>
      {reviews.map((review) => (
        <li key={review.id} className={css.item}>
          <div className={css.head}>
            <div className={css.avatar}>
              {review.reviewer_name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className={css.name}>{review.reviewer_name}</p>
              <StarRating rating={review.reviewer_rating} />
            </div>
          </div>
          <p className={css.comment}>{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}