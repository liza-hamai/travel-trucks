import type { Metadata } from "next";
import CatalogClient from "./CatalogClient";

export const metadata: Metadata = {
  title: "Catalog",
  description: "Browse and filter available campers for your next trip.",
};

export default function CatalogPage() {
  return <CatalogClient />;
}