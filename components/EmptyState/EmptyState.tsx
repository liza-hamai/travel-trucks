import Image from "next/image";
import { BsX } from "react-icons/bs";
import css from "./EmptyState.module.css";

interface EmptyStateProps {
  onClear: () => void;
}

export default function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className={css.wrapper}>
      <Image
        src="/no-campers.png"
        alt="No campers found"
        width={488}
        height={463}
        className={css.image}
      />

      <h2 className={css.title}>No campers found</h2>
      <p className={css.text}>
        We couldn`t find any campers that match your filters.
        <br />
        Try adjusting your search or clearing some filters.
      </p>

      <div className={css.actions}>
        <button type="button" className={css.clear} onClick={onClear}>
          <BsX size={24} />
          Clear filters
        </button>
        <button type="button" className={css.viewAll} onClick={onClear}>
          View all campers
        </button>
      </div>
    </div>
  );
}