import React, { useEffect, useMemo, useState } from "react";
import { useHeatMapData } from "hooks/useHeatMapData";
import { countHeatMapEntities } from "utils/countHeatMap";
import { WeekPicker } from "components/WeekPicker";
import { WeekList } from "components/WeekList";
import { BucketSizeSelect } from "components/BucketSizeSelect";
import { HeatLevelSelect } from "components/HeatLevelSelect";

import { heatLevelOptions } from "constants/heatLevelOptions";

import { BucketSizeEntity } from "types/bucketSizeEntity";
import { HeatLevelEntity } from "types/heatLevelOption";

import "./index.scss";
import { HeatLevelStepInput } from "../HeatLevelStepInput";
import { ExclusionSelect } from "../ExclusionSelect";

export const HeatMap: React.FC = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [filteredHeatMapData, setFilteredHeatMapData] = useState<Date[]>([]);
    const [bucketSizeEntity, setBucketSizeEntity] = useState<BucketSizeEntity>({
        label: 24,
        value: 24
    });

    const [heatLevelEntities, setHeatLevelEntities] =
        useState<Readonly<HeatLevelEntity[]>>(heatLevelOptions);

    const [heatLevelStep, setHeatLevelStep] = useState(5);

    const heatMapData = useHeatMapData();

    useEffect(() => {
        setFilteredHeatMapData(heatMapData);
    }, [heatMapData]);

    const heatMapEntities = useMemo(
        () => countHeatMapEntities(filteredHeatMapData, bucketSizeEntity.value),
        [filteredHeatMapData, bucketSizeEntity.value]
    );

    if (!filteredHeatMapData.length) {
        return <div>Loading...</div>;
    }

    return (
        <div className="heat-map">
            <h1>Supercreator HeatMap Exercise</h1>

            <div className="heat-map__dropdowns">
                <WeekPicker
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    heatMapEntities={heatMapEntities}
                />
                <BucketSizeSelect
                    bucketSizeEntity={bucketSizeEntity}
                    setBucketSizeEntity={setBucketSizeEntity}
                />
                <ExclusionSelect
                    filteredHeatMapData={filteredHeatMapData}
                    setFilteredHeatMapData={setFilteredHeatMapData}
                    heatMapData={heatMapData}
                />
            </div>
            <div className="heat-map__dropdowns">
                <HeatLevelStepInput
                    heatLevelStep={heatLevelStep}
                    setHeatLevelStep={setHeatLevelStep}
                />
                <HeatLevelSelect
                    heatLevelEntities={heatLevelEntities}
                    setHeatLevelEntities={setHeatLevelEntities}
                />
            </div>

            <WeekList
                heatLevelStep={heatLevelStep}
                heatLevelEntities={heatLevelEntities}
                startDate={startDate}
                endDate={endDate}
                heatMapEntities={heatMapEntities}
            />
        </div>
    );
};
