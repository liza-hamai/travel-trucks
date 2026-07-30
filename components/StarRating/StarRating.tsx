import { BsStarFill } from "react-icons/bs";
import css from "./StarRating.module.css";

interface StarRatingProps {
  rating: number;
  total?: number;
}

export default function StarRating({ rating, total = 5 }: StarRatingProps) {
  return (
    <div className={css.stars}>
      {Array.from({ length: total }, (_, index) => (
        <BsStarFill
          key={index}
          size={16}
          className={index < rating ? css.filled : css.empty}
        />
      ))}
    </div>
  );
}