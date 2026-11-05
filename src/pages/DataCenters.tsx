import { useSearchParams } from "react-router";
import { CtaBand } from "../components/sections/CtaBand";
import { Button } from "../components/ui/Button";
import { CountUp } from "../components/ui/CountUp";
import { Icon } from "../components/ui/Icon";
import { PageHero } from "../components/ui/PageHero";
import { Reveal } from "../components/ui/Reveal";
import { SectionHeading } from "../components/ui/SectionHeading";
import { WorldMap } from "../components/widgets/WorldMap";
import { DATA_CENTERS, DATA_CENTER_BY_ID } from "../data/dataCenters";
import { PLANS } from "../data/plans";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { cx } from "../lib/cx";
import { formatNumber } from "../lib/format";
import styles from "./DataCenters.module.css";

const totalMW = DATA_CENTERS.reduce((s, d) => s + d.capacityMW, 0);
const totalMiners = DATA_CENTERS.reduce((s, d) => s + d.miners, 0);
const renewable = Math.round(DATA_CENTERS.reduce((s, d) => s + d.renewable * d.capacityMW, 0) / totalMW);

export default function DataCenters() {
  useDocumentMeta({ title: "Data Centers", description: "Explore MineCryptos' six renewable-first mining data centers in Iceland, Canada, the USA, Paraguay, Norway and the UAE." });
  const [params, setParams] = useSearchParams();
  const selectedId = DATA_CENTER_BY_ID[params.get("site") ?? ""] ? (params.get("site") as string) : DATA_CENTERS[0].id;
  const site = DATA_CENTER_BY_ID[selectedId];
  const select = (id: string) => setParams({ site: id }, { replace: true, preventScrollReset: true });
  const plans = PLANS.filter((p) => p.locations.includes(site.id));

  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", to: "/" }, { label: "Data Centers" }]}
        title="Where Your Hashpower Lives"
        description="Six facilities on three continents, chosen for cheap renewable power, cool climates and political stability. Select a site on the map to explore it."
      />

      <section className="section">
        <div className="container">
          <div className={styles.stats}>
            <div>
              <strong>
                <CountUp value={DATA_CENTERS.length} />
              </strong>
              <span>Data centers</span>
            </div>
            <div>
              <strong>
                <CountUp value={totalMW} suffix=" MW" />
              </strong>
              <span>Total capacity</span>
            </div>
            <div>
              <strong>
                <CountUp value={renewable} suffix="%" />
              </strong>
              <span>Renewable energy (weighted)</span>
            </div>
            <div>
              <strong>
                <CountUp value={totalMiners} />
              </strong>
              <span>Machines online</span>
            </div>
          </div>

          <div className={styles.explorer}>
            <WorldMap sites={DATA_CENTERS} selected={site.id} onSelect={select} />
            <aside className={styles.panel} aria-live="polite" key={site.id}>
              <span className={cx(styles.status, site.status === "Expanding" && styles.expanding)}>
                <span className={styles.statusDot} /> {site.status}
              </span>
              <h2 className={styles.city}>{site.city}</h2>
              <p className={styles.country}>
                <Icon name="map-pin" size={16} /> {site.country} · since {site.opened}
              </p>
              <p className="copy">{site.description}</p>
              <dl className={styles.facts}>
                <div>
                  <dt>Capacity</dt>
                  <dd>{site.capacityMW} MW</dd>
                </div>
                <div>
                  <dt>Energy</dt>
                  <dd>{site.energy}</dd>
                </div>
                <div>
                  <dt>Avg. temperature</dt>
                  <dd>{site.avgTemp}</dd>
                </div>
                <div>
                  <dt>PUE</dt>
                  <dd>{site.pue.toFixed(2)}</dd>
                </div>
                <div>
                  <dt>Machines</dt>
                  <dd>{formatNumber(site.miners)}</dd>
                </div>
              </dl>
              <div className={styles.mix}>
                <div className={styles.mixHead}>
                  <span>Renewable share</span>
                  <strong>{site.renewable}%</strong>
                </div>
                <div className={styles.mixBar}>
                  <span style={{ width: `${site.renewable}%` }} />
                </div>
              </div>
              {plans.length > 0 && (
                <div className={styles.plans}>
                  <span>Plans hosted here</span>
                  <div>
                    {plans.map((p) => (
                      <Button key={p.slug} to={`/plans/${p.slug}`} size="sm" variant="outline">
                        {p.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <section className="section section-lavender">
        <div className="container">
          <SectionHeading title="All locations" description="Every site runs 24/7 with on-site engineers, biometric access control and redundant fibre uplinks." />
          <div className="grid-3">
            {DATA_CENTERS.map((d, i) => (
              <Reveal key={d.id} delay={(i % 3) * 80}>
                <button type="button" className={cx(styles.siteCard, d.id === site.id && styles.siteActive)} onClick={() => { select(d.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                  <span className={styles.siteTop}>
                    <strong>{d.city}</strong>
                    <span className={cx(styles.status, d.status === "Expanding" && styles.expanding)}>
                      <span className={styles.statusDot} />
                      {d.status}
                    </span>
                  </span>
                  <span className={styles.siteCountry}>{d.country}</span>
                  <span className={styles.siteMeta}>
                    <span>
                      <Icon name="zap" size={15} /> {d.capacityMW} MW
                    </span>
                    <span>
                      <Icon name="leaf" size={15} /> {d.renewable}% renewable
                    </span>
                    <span>
                      <Icon name="thermometer" size={15} /> {d.avgTemp}
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Want to see a facility in person?" text="Enterprise customers can schedule guided visits to any MineCryptos data center." primary={{ label: "Request a visit", to: "/contact" }} secondary={{ label: "Enterprise plan", to: "/plans/securehash-haven" }} />
    </>
  );
}
