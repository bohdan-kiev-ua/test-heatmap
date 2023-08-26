export const formatAmPm = (hour: number): string => {
    if (hour === 0) {
        return "12AM";
    }

    return `${hour % 12 || 12}${hour > 0 && hour < 12 ? "AM" : "PM"}`;
};
