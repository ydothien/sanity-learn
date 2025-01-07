import { defineType, defineField } from 'sanity';
export const artistType = defineType({
    name: 'artist',
    title: 'Artist',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
        })
    ],
})