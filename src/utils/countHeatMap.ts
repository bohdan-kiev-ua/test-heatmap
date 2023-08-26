import { format } from "date-fns";
import { HeatMapEntities, HeatMapEntity } from "types/heatMap";
import { dateFormat } from "constants/dateFormat";

const HOURS_IN_A_DAY = 24;

export const countHeatMapEntities = (
    heatMapData: Date[],
    bucketSize: number
): HeatMapEntities => {
    const step = HOURS_IN_A_DAY / bucketSize;
    const hours: HeatMapEntity = {};
    Array.from({ length: bucketSize }).forEach((_, index) => {
        hours[index * step] = [];
    });

    return heatMapData.reduce<HeatMapEntities>((acc, heatMapItem) => {
        const date = new Date(heatMapItem);

        const heatMapDate = format(date, dateFormat);

        const heatMapHour = date.getHours();
        const hourIndex = heatMapHour - (heatMapHour % step);

        if (!acc[heatMapDate]?.[hourIndex]) {
            acc[heatMapDate] = {
                ...JSON.parse(JSON.stringify(hours)),
                ...acc[heatMapDate],
                [hourIndex]: [heatMapItem]
            };
        } else {
            acc[heatMapDate][hourIndex].push(heatMapItem);
        }

        return acc;
    }, {});
};
