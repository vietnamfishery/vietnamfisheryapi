export const addPondPrepareSchema = {
    type: 'object',
    properties: {
        pondId: {
            required: true,
            type: ['number', 'string']
        },
        ownerId: {
            required: true,
            type: ['number', 'string']
        },
        pondPrepareName: {
            required: true,
            type: 'string'
        },
        detailsOfPrepare: {
            required: true,
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    storageId: 'number',
                    quantity: {
                        type: 'integer',
                        minimum: 1
                    }
                }
            }
        }
    },
    additionalProperties: false
};
