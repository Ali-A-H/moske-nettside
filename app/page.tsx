"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Clock, Info, MapPin, Phone, Mail, HeartHandshake } from "lucide-react";

import styles from "./Home.module.css"; // <-- juster path hvis filen ligger et annet sted

const HERO_IMAGE = "/hero-image.jpg";

const PRAYER_TIMES = [
  { name: "Fajr", time: "06:12" },
  { name: "Dhuhr", time: "12:27" },
  { name: "Asr", time: "14:38" },
  { name: "Maghrib", time: "16:06" },
  { name: "Isha", time: "17:32" },
];

const QUICK_INFO = [
  { label: "Adresse", value: "Gate 12, 0001 Oslo" },
  { label: "Åpent", value: "Daglig 10:00–21:00" },
  { label: "Jumu'ah", value: "Fredag 13:00" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function MosqueHomeSections() {
  return (
    <main className={styles.page}>
      {/* HERO */}
      <section className={styles.heroSection}>
        <div className={styles.heroWrap}>
          <Image src={HERO_IMAGE} alt="Moské" fill priority className={styles.heroImage} />

          {/* Overlay (ingen “forsvinning” under) */}
          <div className={styles.heroOverlay} />

          <div className={styles.heroContentLayer}>
            <div className={styles.heroContent}>
              <motion.div initial="hidden" animate="show" variants={fadeUp} className={styles.heroInner}>
                <div className={styles.heroPill}>
                  <Info className={styles.iconSm} />
                  <span>Velkommen</span>
                  <span className={styles.dot}>•</span>
                  <span className={styles.pillMuted}>Et sted for bønn, ro og fellesskap</span>
                </div>

                <h1 className={styles.heroTitle}>Moskéens navn</h1>

                <p className={styles.heroLead}>
                  Her finner du praktisk informasjon: bønnetider, åpningstider, kontakt og hvordan du kan bidra.
                </p>

                <div className={styles.heroActions}>
                  <a href="#bonnetider" className={styles.fullOnMobile}>
                    <Button className={styles.btnPrimary}>Se bønnetider</Button>
                  </a>

                  <a href="#kontakt" className={styles.fullOnMobile}>
                    <Button variant="secondary" className={styles.btnSecondaryOnHero}>
                      Kontakt oss
                    </Button>
                  </a>

                  <div className={styles.badgeRow}>
                    {QUICK_INFO.map((x) => (
                      <Badge key={x.label} variant="secondary" className={styles.heroBadge}>
                        <span className={styles.badgeLabel}>{x.label}:</span>&nbsp;{x.value}
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
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className={styles.grid3}
        >
          <Card className={styles.card}>
            <CardHeader>
              <CardTitle className={styles.cardTitle}>
                <Info className={styles.iconMd} /> Om moskeen
              </CardTitle>
            </CardHeader>
            <CardContent className={styles.cardBody}>
              <p>
                Skriv en kort introduksjon: hvem dere er, hva dere tilbyr, og hvilken rolle moskeen har i lokalsamfunnet.
              </p>
            </CardContent>
          </Card>

          <Card id="bonnetider" className={`${styles.card} ${styles.scrollOffset}`}>
            <CardHeader>
              <CardTitle className={styles.cardTitle}>
                <Clock className={styles.iconMd} /> Bønnetider (i dag)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.prayerList}>
                {PRAYER_TIMES.map((p) => (
                  <div key={p.name} className={styles.prayerRow}>
                    <span className={styles.prayerName}>{p.name}</span>
                    <span className={styles.prayerTime}>{p.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card id="kontakt" className={`${styles.card} ${styles.scrollOffset}`}>
            <CardHeader>
              <CardTitle className={styles.cardTitle}>
                <MapPin className={styles.iconMd} /> Kontakt & besøk
              </CardTitle>
            </CardHeader>
            <CardContent className={styles.contactBody}>
              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <MapPin className={styles.iconSmMuted} />
                  <div>
                    <div className={styles.contactLabel}>Adresse</div>
                    <div className={styles.contactValue}>GTorggata 5 1707 Sarpsborg</div>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <Phone className={styles.iconSmMuted} />
                  <div>
                    <div className={styles.contactLabel}>Telefon</div>
                    <div className={styles.contactValue}>+47 972 53 265</div>
                  </div>
                </div>

                <div className={styles.contactItem}>
                  <Mail className={styles.iconSmMuted} />
                  <div>
                    <div className={styles.contactLabel}>E-post</div>
                    <div className={styles.contactValue}>Al-rawdah@gmail.com</div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className={styles.openingBox}>
                <div className={styles.openingTitle}>Åpningstider</div>
                <div className={styles.openingText}>Daglig 10:00–21:00</div>
                <div className={styles.openingText}>Fredag: Jumuah kl. 13:00</div>
              </div>

              <Button variant="outline" className={styles.btnOutlineFull}>
                Åpne kart
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className={styles.supportWrap}
        >
          <Card className={styles.card}>
            <CardContent className={styles.supportInner}>
              <div className={styles.supportRow}>
                <div className={styles.supportText}>
                  <div className={styles.supportPill}>
                    <HeartHandshake className={styles.iconSmMuted} />
                    <span>Støtt arbeidet</span>
                  </div>

                  <h2 className={styles.supportTitle}>Ønsker du å bidra?</h2>
                  <p className={styles.supportDesc}>
                    Legg inn Vipps-nummer/kontonummer, og en kort tekst om frivillighet.
                  </p>
                </div>

                <div className={styles.supportActions}>
                  <Button className={styles.btnPrimary}>Doner</Button>
                  <Button variant="secondary" className={styles.btnSecondary}>
                    Bli frivillig
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </main>
  );
}
