import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useMemo,
    useState
} from "react";
import Select from "react-select";
import { ExclusionOption } from "types/exclusionOption";
import { useDebounce } from "hooks/useDebounce";
import { ExclusionSelectOption } from "./components/ExclusionSelectOption";

import "./index.scss";

interface ExclusionSelectProps {
    filteredHeatMapData: Date[];
    setFilteredHeatMapData: Dispatch<SetStateAction<Date[]>>;
    heatMapData: Date[];
}

export const ExclusionSelect: React.FC<ExclusionSelectProps> = ({
    filteredHeatMapData,
    setFilteredHeatMapData,
    heatMapData
}) => {
    const [inputValue, setInputValue] = useState("");
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [options, setOptions] = useState(
        heatMapData.map((item, index) => ({
            label: item,
            value: item,
            disabled: false,
            index
        }))
    );

    const debouncedInputValue = useDebounce(inputValue);

    const displayedOptions = useMemo(
        () =>
            options
                .filter((option) =>
                    String(option.value)
                        .toLowerCase()
                        .includes(debouncedInputValue.toLowerCase())
                )
                .slice(0, 10),
        [options, debouncedInputValue]
    );

    const handleChange = useCallback(
        (
            e: React.ChangeEvent<HTMLInputElement>,
            index: number,
            value: Date
        ) => {
            const { checked } = e.target;

            const updatedOptions = [...options];
            updatedOptions[index].disabled = !checked;
            setOptions(updatedOptions);

            const updatedFilteredHeatMapData = [...filteredHeatMapData];
            if (checked) {
                updatedFilteredHeatMapData.push(value);
            } else {
                const filteredHeatMapDataIndex =
                    updatedFilteredHeatMapData.findIndex(
                        (item) => item === value
                    );

                updatedFilteredHeatMapData.splice(filteredHeatMapDataIndex, 1);
            }

            setFilteredHeatMapData(updatedFilteredHeatMapData);
        },
        [filteredHeatMapData]
    );

    const ExclusionOptionComponent = useCallback(
        (data: ExclusionOption) => (
            <ExclusionSelectOption data={data} onChange={handleChange} />
        ),
        [handleChange]
    );

    const handleClick = () =>
        setMenuIsOpen((prevMenuIsOpen) => !prevMenuIsOpen);

    return (
        <div>
            <div>Disable a specific point</div>
            <div onClick={handleClick}>
                <Select<ExclusionOption>
                    className="exclusion-select"
                    inputValue={inputValue}
                    onInputChange={setInputValue}
                    menuIsOpen={menuIsOpen}
                    placeholder="Type to search timestamp..."
                    options={displayedOptions}
                    formatOptionLabel={ExclusionOptionComponent}
                    value={null}
                />
            </div>
        </div>
    );
};
