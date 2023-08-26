import React from "react";
import { HeatMapEntity } from "types/heatMap";
import { format } from "date-fns";
import { weekFormat } from "constants/weekFormat";
import { HeatLevelEntity } from "types/heatLevelOption";
import { Dot } from "./components/Dot";

import "./index.scss";

interface WeekRowProps {
    heatLevelStep: number;
    heatLevelEntities: Readonly<HeatLevelEntity[]>;
    heatMapDate: Date;
    heatMapEntity: HeatMapEntity;
}

export const WeekRow: React.FC<WeekRowProps> = ({
    heatLevelStep,
    heatLevelEntities,
    heatMapDate,
    heatMapEntity
}) => {
    const timeSlots = Object.entries(heatMapEntity);

    return (
        <div className="week-row">
            <div className="week-row__title">
                {format(new Date(heatMapDate), weekFormat)}
            </div>
            <div className="week-row__dots">
                {timeSlots.map(([hour, dates]) => (
                    <Dot
                        key={hour}
                        heatLevelStep={heatLevelStep}
                        heatLevelEntities={heatLevelEntities}
                        dates={dates}
                    />
                ))}
            </div>
        </div>
    );
};
