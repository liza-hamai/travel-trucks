"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { getCamperById } from "@/lib/api";
import Loader from "@/components/Loader/Loader";
import Gallery from "@/components/Gallery/Gallery";
import Reviews from "@/components/Reviews/Reviews";
import BookingForm from "@/components/BookingForm/BookingForm";
import { BsFillStarFill, BsMap } from "react-icons/bs";
import css from "./page.module.css";

const formLabels: Record<string, string> = {
  alcove: "Alcove",
  panel_van: "Panel truck",
  integrated: "Fully Integrated",
  semi_integrated: "Semi Integrated",
};

const amenityLabels: Record<string, string> = {
  ac: "AC",
  bathroom: "Bathroom",
  kitchen: "Kitchen",
  tv: "TV",
  radio: "Radio",
  refrigerator: "Refrigerator",
  microwave: "Microwave",
  gas: "Gas",
  water: "Water",
};

export default function CamperDetailsPage() {
  const { camperId } = useParams<{ camperId: string }>();

  const {
    data: camper,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["camper", camperId],
    queryFn: () => getCamperById(camperId),
    enabled: !!camperId,
  });

  if (isPending) {
    return <Loader />;
  }

  if (isError || !camper) {
    return <p className="container">Something went wrong.</p>;
  }

  return (
    <section className={`container ${css.page}`}>
      <div className={css.grid}>
        <div className={css.left}>
          {camper.gallery && camper.gallery.length > 0 && (
            <Gallery images={camper.gallery} alt={camper.name} />
          )}
        </div>

        <div className={css.right}>
          <div className={css.card}>
            <h1 className={css.name}>{camper.name}</h1>
            <div className={css.meta}>
              <span className={css.metaItem}>
                <BsFillStarFill size={16} className={css.star} />
                {camper.rating}({camper.totalReviews} Reviews)
              </span>
              <span className={css.metaItem}>
                <BsMap size={16} />
                {camper.location}
              </span>
            </div>
            <p className={css.price}>€{camper.price.toFixed(2)}</p>
            <p className={css.description}>{camper.description}</p>
          </div>

          <div className={css.card}>
            <h2 className={css.detailsTitle}>Vehicle details</h2>
            <ul className={css.badges}>
              <li className={css.badge}>{camper.transmission}</li>
              <li className={css.badge}>{camper.engine}</li>
              {camper.amenities.map((item) => (
                <li key={item} className={css.badge}>
                  {amenityLabels[item] ?? item}
                </li>
              ))}
            </ul>

            <ul className={css.specs}>
              <li className={css.specRow}>
                <span>Form</span>
                <span>{formLabels[camper.form] ?? camper.form}</span>
              </li>
              <li className={css.specRow}>
                <span>Length</span>
                <span>{camper.length}</span>
              </li>
              <li className={css.specRow}>
                <span>Width</span>
                <span>{camper.width}</span>
              </li>
              <li className={css.specRow}>
                <span>Height</span>
                <span>{camper.height}</span>
              </li>
              <li className={css.specRow}>
                <span>Tank</span>
                <span>{camper.tank}</span>
              </li>
              <li className={css.specRow}>
                <span>Consumption</span>
                <span>{camper.consumption}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={css.bottomSection}>
        <h2 className={css.reviewsTitle}>Reviews</h2>

        <div className={css.bottom}>
            <div className={css.reviewsCol}>
            <Reviews camperId={camper.id} />
            </div>

            <div className={css.formCol}>
            <BookingForm camperId={camper.id} />
            </div>
        </div>
      </div>
    </section>
  );
}