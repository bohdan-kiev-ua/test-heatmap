import React from "react";
import { HeatLevelEntity } from "types/heatLevelOption";

import "./index.scss";

interface DotProps {
    heatLevelStep: number;
    heatLevelEntities: Readonly<HeatLevelEntity[]>;
    dates: Date[];
}

export const Dot: React.FC<DotProps> = ({
    heatLevelStep,
    heatLevelEntities,
    dates
}) => {
    const entity =
        heatLevelEntities[Math.floor(dates.length / heatLevelStep)] ||
        heatLevelEntities[heatLevelEntities.length - 1];
    const backgroundColor = entity.value;

    return <div style={{ backgroundColor }} className="dot" />;
};
