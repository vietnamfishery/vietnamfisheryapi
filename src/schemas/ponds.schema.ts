export const addPondSchema = {
    type: 'object',
    properties: {
        pondName: {
            required: true,
            type: 'string',
            maxlenght: 50
        },
        pondCreatedDate: {
            required: true,
            type: 'string',
            pattern: /^(?![+-]?\d{4,5}-?(?:\d{2}|W\d{2})T)(?:|(\d{4}|[+-]\d{5})-?(?:|(0\d|1[0-2])(?:|-?([0-2]\d|3[0-1]))|([0-2]\d{2}|3[0-5]\d|36[0-6])|W([0-4]\d|5[0-3])(?:|-?([1-7])))(?:(?!\d)|T(?=\d)))(?:|([01]\d|2[0-4])(?:|:?([0-5]\d)(?:|:?([0-5]\d)(?:|\.(\d{3})))(?:|[zZ]|([+-](?:[01]\d|2[0-4]))(?:|:?([0-5]\d)))))$/
        },
        pondArea: {
            required: true,
            type: 'number',
            minimum: 0
        },
        pondDepth: {
            required: true,
            type: 'number',
            minimum: 0
        },
        createCost: {
            required: true,
            type: 'number',
            minimum: 0
        },
        pondLatitude: {
            required: false,
            type: ['number', null]
        },
        pondLongitude: {
            required: false,
            type: ['number', null]
        },
        status: {
            required: true,
            type: ['number'],
            enum: [0, 1, 2]
        }
    },
    additionalProperties: false
};
