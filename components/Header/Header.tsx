"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <div className={`container ${css.inner}`}>
        <Link href="/" className={css.logo}>
          Travel<span>Trucks</span>
        </Link>

        <ul className={css.list}>
          <li>
            <Link
              href="/"
              className={pathname === "/" ? css.active : ""}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/catalog"
              className={pathname === "/catalog" ? css.active : ""}
            >
              Catalog
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}