// sanity/schemas/event.ts
import { defineType, defineField } from 'sanity'

export const eventSchema = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({ name: 'endDate',  title: 'End Date (multi-day events)', type: 'date' }),
    defineField({ name: 'time',     title: 'Start Time',                  type: 'string', description: 'e.g. 9:00 AM' }),
    defineField({ name: 'endTime',  title: 'End Time',                    type: 'string', description: 'e.g. 12:00 PM' }),
    defineField({ name: 'location', title: 'Location',                    type: 'string' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Service',  value: 'services' },
          { title: 'Youth',    value: 'youth' },
          { title: 'Women',    value: 'women' },
          { title: 'Men',      value: 'men' },
          { title: 'Children', value: 'children' },
          { title: 'Special',  value: 'special' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Event Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({ name: 'isFeatured',      title: 'Featured (spans 2 columns)', type: 'boolean', initialValue: false }),
    defineField({ name: 'registrationUrl', title: 'Registration URL',           type: 'url' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'startDate' },
  },
})
