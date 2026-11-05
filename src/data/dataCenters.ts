export type DataCenter = {
  id: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
  capacityMW: number;
  renewable: number;
  energy: string;
  avgTemp: string;
  pue: number;
  status: "Operational" | "Expanding";
  opened: number;
  miners: number;
  description: string;
};

export const DATA_CENTERS: DataCenter[] = [
  {
    id: "reykjavik",
    city: "Reykjavík",
    country: "Iceland",
    lat: 64.1,
    lon: -21.9,
    capacityMW: 45,
    renewable: 100,
    energy: "Geothermal & hydro",
    avgTemp: "4 °C",
    pue: 1.05,
    status: "Operational",
    opened: 2019,
    miners: 9800,
    description: "Free-air cooling and 100% geothermal power make Reykjavík our most efficient site.",
  },
  {
    id: "quebec",
    city: "Québec",
    country: "Canada",
    lat: 46.8,
    lon: -71.2,
    capacityMW: 60,
    renewable: 99,
    energy: "Hydroelectric",
    avgTemp: "5 °C",
    pue: 1.08,
    status: "Operational",
    opened: 2020,
    miners: 13200,
    description: "Hydro-Québec power and cold winters keep chips cool and costs predictable.",
  },
  {
    id: "texas",
    city: "Abilene, Texas",
    country: "United States",
    lat: 32.4,
    lon: -99.7,
    capacityMW: 120,
    renewable: 68,
    energy: "Wind, solar & grid",
    avgTemp: "18 °C",
    pue: 1.12,
    status: "Operational",
    opened: 2021,
    miners: 26400,
    description: "Our largest campus participates in grid-balancing programs to support ERCOT at peak demand.",
  },
  {
    id: "paraguay",
    city: "Hernandarias",
    country: "Paraguay",
    lat: -25.4,
    lon: -54.6,
    capacityMW: 40,
    renewable: 100,
    energy: "Itaipú hydro",
    avgTemp: "22 °C",
    pue: 1.15,
    status: "Expanding",
    opened: 2023,
    miners: 7400,
    description: "Next to one of the world's largest hydro dams. A 60 MW expansion is under construction.",
  },
  {
    id: "norway",
    city: "Mo i Rana",
    country: "Norway",
    lat: 66.3,
    lon: 14.1,
    capacityMW: 35,
    renewable: 100,
    energy: "Hydroelectric",
    avgTemp: "3 °C",
    pue: 1.06,
    status: "Operational",
    opened: 2022,
    miners: 7100,
    description: "Arctic-circle facility with heat recovery that warms local greenhouses.",
  },
  {
    id: "abu-dhabi",
    city: "Abu Dhabi",
    country: "United Arab Emirates",
    lat: 24.4,
    lon: 54.6,
    capacityMW: 30,
    renewable: 42,
    energy: "Solar & gas",
    avgTemp: "28 °C",
    pue: 1.2,
    status: "Expanding",
    opened: 2024,
    miners: 5600,
    description: "Immersion-cooled halls designed for the desert climate, with a growing solar share.",
  },
];

export const DATA_CENTER_BY_ID: Record<string, DataCenter> = Object.fromEntries(DATA_CENTERS.map((d) => [d.id, d]));
