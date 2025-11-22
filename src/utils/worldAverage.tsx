import { countryStats, CountryPoint } from "@/data/countryStats";

/**
 * Produces a world-average time series across all countries in dataset.
 * Only includes countries with data for that year.
 */
export function getWorldAverageSeries(): CountryPoint[] {
    const allYears = new Set<number>();
    Object.values(countryStats).forEach((series) => {
        series.forEach((d) => allYears.add(d.year));
    });

    const sortedYears = [...allYears].sort((a, b) => a - b);

    return sortedYears.map((year) => {
        let enrolmentSum = 0,
            learningSum = 0,
            gdpSum = 0,
            count = 0;

        Object.values(countryStats).forEach((series) => {
            const point = series.find((p) => p.year === year);
            if (point) {
                enrolmentSum += point.enrolment;
                learningSum += point.learningIndex;
                gdpSum += point.gdpPerCapita;
                count++;
            }
        });

        return {
            year,
            enrolment: count ? Math.round(enrolmentSum / count) : 0,
            learningIndex: count ? Math.round(learningSum / count) : 0,
            gdpPerCapita: count ? Math.round(gdpSum / count) : 0,
        };
    });
}
