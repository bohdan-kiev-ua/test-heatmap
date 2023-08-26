import React from "react";
import { format } from "date-fns";
import { HeatMapEntities } from "types/heatMap";
import { dateFormat } from "constants/dateFormat";
import { WeekRow } from "components/WeekList/components/WeekRow";
import { formatAmPm } from "utils/formatAmPm";
import { HeatLevelEntity } from "types/heatLevelOption";

import "./index.scss";

interface WeekListProps {
    heatLevelStep: number;
    heatLevelEntities: Readonly<HeatLevelEntity[]>;
    startDate: Date;
    endDate: Date;
    heatMapEntities: HeatMapEntities;
}

export const WeekList: React.FC<WeekListProps> = ({
    heatLevelStep,
    heatLevelEntities,
    startDate,
    endDate,
    heatMapEntities
}) => {
    const displayedDays = Object.entries(heatMapEntities).filter(
        ([heatMapDate]) =>
            heatMapDate >= format(startDate, dateFormat) &&
            heatMapDate <= format(endDate, dateFormat)
    );

    if (!displayedDays.length) {
        return null;
    }

    const [, timeSlots] = displayedDays[0];

    return (
        <div className="week-list">
            {displayedDays.map(([heatMapDate, heatMapEntity]) => (
                <WeekRow
                    heatLevelStep={heatLevelStep}
                    heatLevelEntities={heatLevelEntities}
                    key={heatMapDate}
                    heatMapDate={heatMapDate as unknown as Date}
                    heatMapEntity={heatMapEntity}
                />
            ))}
            <div className="week-list__timeslots">
                {Object.keys(timeSlots).map((timeSlot) => (
                    <div key={timeSlot} className="week-list__timeslot">
                        {formatAmPm(Number(timeSlot))}
                    </div>
                ))}
            </div>
        </div>
    );
};
