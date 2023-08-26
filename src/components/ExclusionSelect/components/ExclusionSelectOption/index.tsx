import React from "react";
import { ExclusionOption } from "types/exclusionOption";

import "./index.scss";

interface ExclusionSelectOptionProps {
    data: ExclusionOption;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        value: Date
    ) => void;
}

export const ExclusionSelectOption: React.FC<ExclusionSelectOptionProps> = ({
    data,
    onChange
}) => {
    const handleClick = (e: React.MouseEvent<HTMLInputElement>) =>
        e.stopPropagation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e, data.index, data.value);
    };

    return (
        <div className="exclusion-select-option">
            {String(data.label)}
            <input
                onClick={handleClick}
                type="checkbox"
                checked={!data.disabled}
                onChange={handleChange}
            />
        </div>
    );
};
