import Select from "react-select";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { defaultHeatLevelOption } from "constants/heatLevelOptions";

import { HeatLevelEntity } from "types/heatLevelOption";
import { ColorInput } from "./components/ColorInput";

interface BucketSizeSelectProps {
    heatLevelEntities: Readonly<HeatLevelEntity[]>;
    setHeatLevelEntities: Dispatch<SetStateAction<Readonly<HeatLevelEntity[]>>>;
}

export const HeatLevelSelect: React.FC<BucketSizeSelectProps> = ({
    heatLevelEntities,
    setHeatLevelEntities
}) => {
    const [isSelectingColor, setIsSelectingColor] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [options, setOptions] = useState([
        ...heatLevelEntities,
        defaultHeatLevelOption
    ]);
    const handleChangeHeatLevels = (
        updatedHeatLevels: Readonly<HeatLevelEntity[]> | null
    ) => {
        if (
            updatedHeatLevels &&
            updatedHeatLevels?.length >= 5 &&
            updatedHeatLevels.length < heatLevelEntities.length
        ) {
            setHeatLevelEntities(updatedHeatLevels);
            setOptions([...updatedHeatLevels, defaultHeatLevelOption]);
        }
    };

    const handleAddOption = useCallback(
        (value: string) => {
            const newOption = { value, label: value };

            setHeatLevelEntities([...heatLevelEntities, newOption]);
            setOptions([
                ...heatLevelEntities,
                newOption,
                defaultHeatLevelOption
            ]);
            setMenuIsOpen(false);
            setIsSelectingColor(false);
        },
        [heatLevelEntities]
    );

    const HeatLevelOption = useCallback(
        (data: HeatLevelEntity) => (
            <ColorInput
                heatLevelEntities={heatLevelEntities}
                data={data}
                onAddOption={handleAddOption}
                setIsSelectingColor={setIsSelectingColor}
            />
        ),
        [handleAddOption, heatLevelEntities]
    );

    const handleClick = () =>
        !isSelectingColor && setMenuIsOpen((prevMenuIsOpen) => !prevMenuIsOpen);

    return (
        <div>
            <div>Select heat levels</div>
            <div onClick={handleClick}>
                <Select
                    menuIsOpen={menuIsOpen}
                    value={heatLevelEntities}
                    options={options}
                    onChange={handleChangeHeatLevels}
                    formatOptionLabel={HeatLevelOption}
                    isMulti
                />
            </div>
        </div>
    );
};
