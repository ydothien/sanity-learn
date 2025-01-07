import { defineField, defineType } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const eventType = defineType({
    name: 'event',
    title: 'Event',
    type: 'document',
    icon: CalendarIcon,
    groups: [
        { name: "details", title: "Details" },
        { name: "editorial", title: "Editorial" },
    ],
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            group: 'editorial',
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: { source: 'name' },
            group: 'editorial',
            validation: (rule) => rule
                .required()
                .error('Required to generate a page on the website'),
            hidden: ({ document }) => !document?.name,
        }),
        defineField({
            name: 'eventType',
            type: 'string',
            group: "details",
            options: {
                list: ['in-person', 'virtual'],
                layout: 'radio',
            },
        }),
        defineField({
            name: 'date',
            type: 'datetime',
        }),
        defineField({
            name: 'doorsOpen',
            description: 'Number of minutes before the start time for admission',
            type: 'number',
            initialValue: 60
        }),
        defineField({
            name: 'venue',
            type: 'reference',
            to: [{ type: 'venue' }],
            readOnly: ({ value, document }) => !value && document?.eventType === 'virtual',
            validation: (rule) =>
                rule.custom((value, context) => {
                    if (!value) {
                        return 'Required'
                    }
                    if (context.document?.eventType === 'in-person' && !value) {
                        return 'Required for in-person events'
                    }
                    return true
                })
        }),
        defineField({
            name: 'headline',
            type: 'reference',
            to: [{ type: 'artist' }],
        }),
        defineField({
            name: 'image',
            type: 'image',
        }),
        defineField({
            name: 'details',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'tickets',
            type: 'url',
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'headline.name',
            media: 'image',
        }
    }
})