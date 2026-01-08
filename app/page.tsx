"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Info, MapPin, Phone, Mail, HeartHandshake } from "lucide-react";

import styles from "./Home.module.css";

/* ======================
   Typer
====================== */
type PrayerTimes = {
  Day?: number;
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

type PrayerFile = Record<string, PrayerTimes>;

/* ======================
   Utils
====================== */

// Lager samme nøkkel som JSON-en (UTC midnatt i ms)
function utcMidnightMsKey(date: Date) {
  return String(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
}

// Henter riktig månedsfil automatisk
function getMonthlyFile(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `/data/prayer-times-${y}-${m}.json`;
}

/* ======================
   Static content
====================== */
const HERO_IMAGE = "/hero-image.jpg";

const QUICK_INFO = [
  { label: "Adresse", value: "Torggata 5, 1707 Sarpsborg" },
  { label: "Åpent", value: "Daglig 10:00–21:00" },
  { label: "Jumu'ah", value: "Fredag 13:00" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

/* ======================
   Component
====================== */
export default function MosqueHomeSections() {
  const [todayTimes, setTodayTimes] = useState<PrayerTimes | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTimes = async () => {
      try {
        const today = new Date();
        const file = getMonthlyFile(today);
        const key = utcMidnightMsKey(today);

        const res = await fetch(file, { cache: "no-store" });
        if (!res.ok) throw new Error("Kunne ikke laste bønnetider");

        const data: PrayerFile = await res.json();
        const times = data[key];

        if (!times) {
          throw new Error("Fant ikke bønnetider for i dag");
        }

        setTodayTimes(times);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Ukjent feil");
      }
    };

    loadTimes();
  }, []);

  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.heroSection}>
        <div className={styles.heroWrap}>
          <Image
            src={HERO_IMAGE}
            alt="Moské"
            fill
            priority
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />

          <div className={styles.heroContentLayer}>
            <div className={styles.heroContent}>
              <motion.div
                initial="hidden"
                animate="show"
                variants={fadeUp}
                className={styles.heroInner}
              >
                <div className={styles.heroPill}>
                  <Info className={styles.iconSm} />
                  <span>Velkommen</span>
                  <span className={styles.dot}>•</span>
                  <span className={styles.pillMuted}>
                    Et sted for bønn, ro og fellesskap
                  </span>
                </div>

                <h1 className={styles.heroTitle}>Masjid Al-Ihsan</h1>

                <p className={styles.heroLead}>
                  Her finner du praktisk informasjon: bønnetider,
                  åpningstider, kontakt og hvordan du kan bidra.
                </p>

                <div className={styles.heroActions}>
                  <a href="#bonnetider">
                    <Button className={styles.btnPrimary}>
                      Se bønnetider
                    </Button>
                  </a>
                  <a href="#kontakt">
                    <Button
                      variant="secondary"
                      className={styles.btnSecondaryOnHero}
                    >
                      Kontakt oss
                    </Button>
                  </a>

                  <div className={styles.badgeRow}>
                    {QUICK_INFO.map((x) => (
                      <Badge key={x.label} className={styles.heroBadge}>
                        <span className={styles.badgeLabel}>
                          {x.label}:
                        </span>{" "}
                        {x.value}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* INNHOLD */}
      <section className={styles.contentSection}>
        <div className={styles.grid3}>
          {/* OM */}
          <Card className={styles.card}>
            <CardHeader>
              <CardTitle className={styles.cardTitle}>
                <Info className={styles.iconMd} /> Om moskeen
              </CardTitle>
            </CardHeader>
            <CardContent className={styles.cardBody}>
              <p>
                Skriv en kort introduksjon: hvem dere er, hva dere
                tilbyr, og hvilken rolle moskeen har i lokalsamfunnet.
              </p>
            </CardContent>
          </Card>

          {/* BØNNETIDER */}
          <Card id="bonnetider" className={styles.card}>
            <CardHeader>
              <CardTitle className={styles.cardTitle}>
                <Clock className={styles.iconMd} /> Bønnetider (i dag)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <p className={styles.errorText}>⚠️ {error}</p>
              )}

              {!error && !todayTimes && <p>Laster…</p>}

              {todayTimes && (
                <div className={styles.prayerList}>
                  {[
                    ["Fajr", todayTimes.Fajr],
                    ["Soloppgang", todayTimes.Sunrise],
                    ["Dhuhr", todayTimes.Dhuhr],
                    ["Asr", todayTimes.Asr],
                    ["Maghrib", todayTimes.Maghrib],
                    ["Isha", todayTimes.Isha],
                  ].map(([name, time]) => (
                    <div key={name} className={styles.prayerRow}>
                      <span className={styles.prayerName}>{name}</span>
                      <span className={styles.prayerTime}>{time}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* KONTAKT */}
          <Card id="kontakt" className={styles.card}>
            <CardHeader>
              <CardTitle className={styles.cardTitle}>
                <MapPin className={styles.iconMd} /> Kontakt & besøk
              </CardTitle>
            </CardHeader>
            <CardContent className={styles.contactBody}>
              <div className={styles.contactItem}>
                <MapPin className={styles.iconSmMuted} />
                <div>
                  <div className={styles.contactLabel}>Adresse</div>
                  <div className={styles.contactValue}>
                    Torggata 5, 1707 Sarpsborg
                  </div>
                </div>
              </div>

              <div className={styles.contactItem}>
                <Phone className={styles.iconSmMuted} />
                <div>
                  <div className={styles.contactLabel}>Telefon</div>
                  <div className={styles.contactValue}>
                    +47 972 53 265
                  </div>
                </div>
              </div>

              <div className={styles.contactItem}>
                <Mail className={styles.iconSmMuted} />
                <div>
                  <div className={styles.contactLabel}>E-post</div>
                  <div className={styles.contactValue}>
                    al-rawdah@gmail.com
                  </div>
                </div>
              </div>

              <Separator />

              <div className={styles.openingBox}>
                <div className={styles.openingTitle}>Åpningstider</div>
                <div>Daglig 10:00–21:00</div>
                <div>Fredag: Jumuah kl. 13:00</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
