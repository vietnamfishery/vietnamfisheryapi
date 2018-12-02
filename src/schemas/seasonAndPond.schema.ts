export const addSeasonAndPondSchema = {
    type: 'object',
    properties: {
        seasonName: {
            require: true,
            type: ['string', 'number']
        }
    },
    additionalProperties: false
};
