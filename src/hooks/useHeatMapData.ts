import { useEffect, useState } from "react";

export const useHeatMapData = () => {
    const [heatMapData, setHeatMapData] = useState([]);

    useEffect(() => {
        fetch("/data.json")
            .then((response) => response.json())
            .then(setHeatMapData);
    }, []);

    return heatMapData;
};
