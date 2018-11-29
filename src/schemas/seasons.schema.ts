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
