import React, { Dispatch, SetStateAction, useState } from "react";
import { HeatLevelEntity } from "types/heatLevelOption";

import "./index.scss";

interface ColorInputProps {
    heatLevelEntities: Readonly<HeatLevelEntity[]>;
    data: HeatLevelEntity;
    onAddOption: (value: string) => void;
    setIsSelectingColor: Dispatch<SetStateAction<boolean>>;
}

export const ColorInput: React.FC<ColorInputProps> = ({
    heatLevelEntities,
    data,
    onAddOption,
    setIsSelectingColor
}) => {
    const [color, setColor] = useState(data.label);
    const [error, setError] = useState("");

    const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.stopPropagation();
        setIsSelectingColor(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const isExist = heatLevelEntities.find(
            (heatLevelEntity) => heatLevelEntity.label === color
        );
        if (isExist) {
            e.stopPropagation();
            setError("Color's already exist");
        } else {
            setError("");
            onAddOption(color || "");
            setIsSelectingColor(false);
        }
    };

    return (
        <div className="color-input">
            <input
                onClick={handleInputClick}
                type="color"
                value={color}
                onChange={handleInputChange}
            />
            {error ? <div className="color-input__error">{error}</div> : null}
            {!data.value && (
                <button
                    className="color-input__button"
                    onClick={handleButtonClick}
                >
                    submit
                </button>
            )}
        </div>
    );
};
