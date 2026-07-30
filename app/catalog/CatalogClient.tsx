"use client";

import { useState } from "react";
import type { CamperFilters } from "@/types/camper";
import Filters from "@/components/Filters/Filters";
import CampersList from "@/components/CampersList/CampersList";
import css from "./page.module.css";

export default function CatalogClient() {
  const [filters, setFilters] = useState<CamperFilters>({});

  return (
    <section className="container">
      <div className={css.layout}>
        <Filters onApply={setFilters} />
        <CampersList
          filters={filters}
          onClearFilters={() => setFilters({})}
        />
      </div>
    </section>
  );
}