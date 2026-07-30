import CampersList from "@/components/CampersList/CampersList";

export const metadata = {
  title: "Catalog",
};

export default function CatalogPage() {
  return (
    <section className="container" style={{ paddingBlock: 48 }}>
      <CampersList />
    </section>
  );
}