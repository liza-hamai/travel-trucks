"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getCampers } from "@/lib/api";
import type { CamperFilters } from "@/types/camper";
import CamperCard from "@/components/CamperCard/CamperCard";
import css from "./CampersList.module.css";

interface CampersListProps {
  filters: CamperFilters;
}

export default function CampersList({ filters }: CampersListProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useInfiniteQuery({
    queryKey: ["campers", filters],
    queryFn: ({ pageParam }) => getCampers(pageParam, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage <= lastPage.totalPages ? nextPage : undefined;
    },
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Something went wrong. Please try again.</p>;
  }

  const campers = data.pages.flatMap((page) => page.campers);

  if (campers.length === 0) {
    return <p>No campers found. Try changing the filters.</p>;
  }

  return (
    <div>
      <ul className={css.list}>
        {campers.map((camper) => (
          <CamperCard key={camper.id} camper={camper} />
        ))}
      </ul>

      {hasNextPage && (
        <button
          type="button"
          className={css.loadMore}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load more"}
        </button>
      )}
    </div>
  );
}