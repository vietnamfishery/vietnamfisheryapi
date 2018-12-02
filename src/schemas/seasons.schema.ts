export const addSeasonSchema = {
    type: 'object',
    properties: {
        seasonName: {
            require: true,
            type: ['string', 'number']
        }
    },
    additionalProperties: false
};

export const updateSeasonsSchema = {
    type: 'object',
    properties: {
        seasonName: {
            require: false,
            type: ['string', 'number']
        },
        seasonId: {
            require: false,
            type: ['string', 'number'],
            minimum: 0
        },
        seasonUUId: {
            require: false,
            type: ['string'],
            minimum: 36,
            maximum: 36
        },
        status: {
            require: false,
            type: ['string', 'number'],
            enum: ['0', '1', 0, 1]
        },
        additionalProperties: false
    }
};
