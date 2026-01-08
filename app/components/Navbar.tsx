"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <div className={styles.logo}>Al-Rawdah</div>

        <ul className={styles.navLinks}>
          <li><Link href="/">Hjem</Link></li>
          <li><Link href="/om-oss">Om oss</Link></li>
          <li><Link href="/arrangementer">Arrangementer</Link></li>
          <li><Link href="/kontakt">Kontakt</Link></li>
        </ul>
      </div>
    </nav>
  );
}
