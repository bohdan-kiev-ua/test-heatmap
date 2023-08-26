import React, {
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
    useState
} from "react";
import DatePicker, { ReactDatePicker } from "react-datepicker";
import { endOfWeek, startOfWeek } from "date-fns";
import { HeatMapEntities } from "types/heatMap";

import "react-datepicker/dist/react-datepicker.css";
import "./index.scss";

interface WeekPickerProps {
    startDate: Date;
    setStartDate: Dispatch<SetStateAction<Date>>;
    endDate: Date;
    setEndDate: Dispatch<SetStateAction<Date>>;
    heatMapEntities: HeatMapEntities;
}

export const WeekPicker: React.FC<WeekPickerProps> = ({
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    heatMapEntities
}) => {
    const ref = useRef<ReactDatePicker | null>(null);
    const [includeDates, setIncludeDates] = useState<Date[]>([]);
    const onChange = (dates: [Date, Date]) => {
        const [start] = dates;
        setStartDate(startOfWeek(start, { weekStartsOn: 1 }));
        setEndDate(endOfWeek(start, { weekStartsOn: 1 }));
        ref.current?.setOpen(false);
    };

    useEffect(() => {
        const heatMapDates = Object.keys(heatMapEntities);
        setIncludeDates(
            heatMapDates.map((heatMapDate) => new Date(heatMapDate))
        );

        const [initialDate] = heatMapDates;
        if (initialDate) {
            onChange([new Date(initialDate), new Date()]);
        }
    }, [heatMapEntities]);

    return (
        <div className="week-picker">
            <div>Select week</div>
            <DatePicker
                ref={ref}
                selected={startDate}
                onChange={onChange}
                startDate={startDate}
                endDate={endDate}
                includeDates={includeDates}
                selectsRange
                calendarStartDay={1}
            />
        </div>
    );
};
