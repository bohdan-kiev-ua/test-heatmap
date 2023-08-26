import Select from "react-select";
import React, { Dispatch, SetStateAction } from "react";
import { BucketSizeEntity } from "types/bucketSizeEntity";
import { bucketSizeOptions } from "constants/bucketSizeOptions";

interface BucketSizeSelectProps {
    bucketSizeEntity: BucketSizeEntity;
    setBucketSizeEntity: Dispatch<SetStateAction<BucketSizeEntity>>;
}

export const BucketSizeSelect: React.FC<BucketSizeSelectProps> = ({
    bucketSizeEntity,
    setBucketSizeEntity
}) => {
    const handleChangeBucketSize = (
        updatedBucketSize: BucketSizeEntity | null
    ) => {
        if (updatedBucketSize) {
            setBucketSizeEntity(updatedBucketSize);
        }
    };

    return (
        <div>
            <div>Select bucket size</div>
            <Select<BucketSizeEntity>
                options={bucketSizeOptions}
                value={bucketSizeEntity}
                onChange={handleChangeBucketSize}
            />
        </div>
    );
};
