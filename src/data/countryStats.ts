export type CountryPoint = {
    year: number;
    enrolment: number;      // primary school enrolment (% gross or net, simplified)
    learningIndex: number;  // synthetic 0-100 quality index (illustrative)
    gdpPerCapita: number;   // USD per person (approx, current US$)
};

export type CountrySeries = Record<string, CountryPoint[]>;

/**
 * Data notes:
 * - Enrolment values are simplified from World Bank / Our World in Data style series.
 * - GDP per capita rounded from World Bank / IMF figures (current US$).
 * - LearningIndex is a synthetic "quality" index (0-100) just for demo.
 *
 * These are NOT exact official numbers, but they’re realistic and proportional.
 */
export const countryStats: CountrySeries = {
    // India (IND)
    // Primary gross enrolment: ~115% in 2010 (peak), ~99–112% 2013–2023:contentReference[oaicite:0]{index=0}
    // GDP per capita: ~1.4k (2010), ~1.6–1.7k (2015), ~2k (2020), ~2.7k (2023):contentReference[oaicite:1]{index=1}
    India: [
        { year: 2010, enrolment: 112, learningIndex: 48, gdpPerCapita: 1400 },
        { year: 2015, enrolment: 104, learningIndex: 52, gdpPerCapita: 1600 },
        { year: 2020, enrolment: 110, learningIndex: 56, gdpPerCapita: 2000 },
        { year: 2023, enrolment: 112, learningIndex: 60, gdpPerCapita: 2700 },
    ],

    // Nigeria (NGA)
    // Primary enrolment ~80–87% range 2010–2021:contentReference[oaicite:2]{index=2}
    // GDP per capita ~2.3–3.2k pre-2014, around 2k in late 2010s:contentReference[oaicite:3]{index=3}
    Nigeria: [
        { year: 2010, enrolment: 80, learningIndex: 35, gdpPerCapita: 2400 },
        { year: 2015, enrolment: 83, learningIndex: 38, gdpPerCapita: 2700 },
        { year: 2020, enrolment: 87, learningIndex: 42, gdpPerCapita: 2100 },
        { year: 2023, enrolment: 86, learningIndex: 45, gdpPerCapita: 2400 },
    ],

    // United States (USA)
    // Primary gross enrolment ~96% (2010), ~99% (2015), ~102% (2020):contentReference[oaicite:4]{index=4}
    // GDP per capita ~48–50k (2010), ~57k (2015), ~63k (2020), mid-70k+ by 2023:contentReference[oaicite:5]{index=5}
    'United States of America': [
        { year: 2010, enrolment: 96, learningIndex: 82, gdpPerCapita: 48000 },
        { year: 2015, enrolment: 99, learningIndex: 84, gdpPerCapita: 57000 },
        { year: 2020, enrolment: 102, learningIndex: 86, gdpPerCapita: 63000 },
        { year: 2023, enrolment: 101, learningIndex: 88, gdpPerCapita: 76000 },
    ],

    // Add more as needed (CHN, BRA, ZAF, etc.) following same pattern:
    // CHN, BRA, ZAF: left empty here for brevity.
};
