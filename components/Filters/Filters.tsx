"use client";

import { useState } from "react";
import type {
  CamperFilters,
  CamperForm,
  CamperEngine,
  CamperTransmission,
} from "@/types/camper";
import css from "./Filters.module.css";
import { BsMap, BsX } from "react-icons/bs";

interface FiltersProps {
  onApply: (filters: CamperFilters) => void;
}

const formOptions: { value: CamperForm; label: string }[] = [
  { value: "alcove", label: "Alcove" },
  { value: "panel_van", label: "Panel Van" },
  { value: "integrated", label: "Fully Integrated" },
  { value: "semi_integrated", label: "Semi Integrated" },
];

const engineOptions: CamperEngine[] = ["diesel", "petrol", "hybrid", "electric"];
const transmissionOptions: CamperTransmission[] = ["automatic", "manual"];

export default function Filters({ onApply }: FiltersProps) {
  const [location, setLocation] = useState("");
  const [form, setForm] = useState<CamperForm | "">("");
  const [engine, setEngine] = useState<CamperEngine | "">("");
  const [transmission, setTransmission] = useState<CamperTransmission | "">("");

  const toggle = <T,>(current: T | "", value: T, setter: (v: T | "") => void) => {
    setter(current === value ? "" : value);
  };

  const handleSearch = () => {
    onApply({
      location: location.trim() || undefined,
      form: form || undefined,
      engine: engine || undefined,
      transmission: transmission || undefined,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const handleClear = () => {
    setLocation("");
    setForm("");
    setEngine("");
    setTransmission("");
    onApply({});
  };

  return (
    <aside className={css.sidebar}>
      <form onSubmit={handleSubmit}>
        <div className={css.field}>
          <p className={css.label}>Location</p>
          <div className={css.inputWrapper}>
            <BsMap size={20} className={css.inputIcon} />
            <input
              type="text"
              className={css.input}
              placeholder="City"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <h2 className={css.title}>Filters</h2>

        <div className={css.group}>
          <p className={css.groupTitle}>Camper form</p>
          <ul className={css.options}>
            {formOptions.map((option) => (
              <li key={option.value}>
                <label className={css.option}>
                  <input
                    type="radio"
                    name="form"
                    checked={form === option.value}
                    onChange={() => {}}
                    onClick={() => toggle(form, option.value, setForm)}
                  />
                  {option.label}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.group}>
          <p className={css.groupTitle}>Engine</p>
          <ul className={css.options}>
            {engineOptions.map((value) => (
              <li key={value}>
                <label className={css.option}>
                  <input
                    type="radio"
                    name="engine"
                    checked={engine === value}
                    onChange={() => {}}
                    onClick={() => toggle(engine, value, setEngine)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.group}>
          <p className={css.groupTitle}>Transmission</p>
          <ul className={css.options}>
            {transmissionOptions.map((value) => (
              <li key={value}>
                <label className={css.option}>
                  <input
                    type="radio"
                    name="transmission"
                    checked={transmission === value}
                    onChange={() => {}}
                    onClick={() => toggle(transmission, value, setTransmission)}
                  />
                  {value}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.search}>
            Search
          </button>
          <button type="button" className={css.clear} onClick={handleClear}>
            <BsX size={24} />
            Clear filters
          </button>
        </div>
      </form>
    </aside>
  );
}