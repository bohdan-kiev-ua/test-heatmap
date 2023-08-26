import React, { Dispatch, SetStateAction } from "react";

import "./index.scss";

interface HeatLevelStepInputProps {
    heatLevelStep: number;
    setHeatLevelStep: Dispatch<SetStateAction<number>>;
}

export const HeatLevelStepInput: React.FC<HeatLevelStepInputProps> = ({
    heatLevelStep,
    setHeatLevelStep
}) => {
    const handleHeatLevelChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setHeatLevelStep(Number(e.target.value));

    return (
        <div>
            <div>Select heat level step</div>
            <input
                className="heat-level-step-input"
                type="number"
                value={heatLevelStep}
                onChange={handleHeatLevelChange}
                min={1}
                max={100}
            />
        </div>
    );
};
