import { isUUId4 } from '../common';

export const updatePondDiariesSchema = {
    type: 'object',
    properties: {
        pondDiaryUUId: {
            type: 'string',
            required: true,
            pattern: isUUId4
        },
        diaryName: {
            required: false,
            type: ['string']
        },
        fisheryQuantity: {
            required: false,
            type: ['number'],
            minimum: 0
        },
        healthOfFishery: {
            required: false,
            type: ['string']
        },
        pondVolume: {
            required: false,
            type: ['number'],
            minimum: 0
        },
        diedFishery: {
            required: false,
            type: ['integer'],
            minimum: 0
        },
        notes: {
            required: false,
            type: ['string', 'null']
        }
    },
    additionalProperties: true
};
