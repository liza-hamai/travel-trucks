import Image from "next/image";
import Link from "next/link";
import type { Camper } from "@/types/camper";
import css from "./CamperCard.module.css";
import {
  BsFillStarFill,
  BsMap,
  BsFuelPump,
  BsDiagram3
} from "react-icons/bs";
import { IoCar } from "react-icons/io5";

const formLabels: Record<string, string> = {
  alcove: "Alcove",
  panelTruck: "Panel Truck",
  integrated: "Fully Integrated",
  semi_integrated: "Semi Integrated",
};

interface CamperCardProps {
  camper: Camper;
}

export default function CamperCard({ camper }: CamperCardProps) {
  return (
    <li className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          src={camper.coverImage}
          alt={camper.name}
          fill
          sizes="292px"
          className={css.image}
        />
      </div>

      <div className={css.content}>
        <div className={css.head}>
          <h3 className={css.name}>{camper.name}</h3>
          <p className={css.price}>€{camper.price.toFixed(2)}</p>
        </div>

        <div className={css.meta}>
            <span className={css.span}>
                <BsFillStarFill size={16} className={css.star} />
                {camper.rating} ({camper.totalReviews} Reviews)
            </span>
            <span className={css.span}>
                <BsMap size={16} />
                {camper.location}
            </span>
        </div>

        <p className={css.description}>{camper.description}</p>

        <ul className={css.features}>
            
        <li className={css.feature}>
            <BsFuelPump size={20} />
            {camper.engine}
        </li>
        <li className={css.feature}>
            <BsDiagram3 size={20} />
            {camper.transmission}
        </li>
        <li className={css.feature}>
            <IoCar size={20} />
            {formLabels[camper.form] ?? camper.form}
        </li>
        </ul>      
        
        <Link href={`/catalog/${camper.id}`} target="_blank" className={css.button}>
          Show more
        </Link>
      </div>
    </li>
  );
}