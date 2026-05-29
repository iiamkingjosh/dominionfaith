// sanity/schemas/sermon.ts
import { defineType, defineField } from 'sanity'

export const sermonSchema = defineType({
  name: 'sermon',
  title: 'Sermon',
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
      name: 'videoId',
      title: 'YouTube Video ID',
      type: 'string',
      description: 'The ID from the YouTube URL, e.g. dQw4w9WgXcQ',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'speaker',
      title: 'Speaker',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: Rule => Rule.required(),
    }),
    defineField({ name: 'duration',        title: 'Duration (display)',   type: 'string', description: 'e.g. 52:18' }),
    defineField({ name: 'durationSeconds', title: 'Duration (seconds)',   type: 'number' }),
    defineField({ name: 'scripture',       title: 'Scripture Reference',  type: 'string' }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'reference',
      to: [{ type: 'series' }],
    }),
    defineField({
      name: 'topic',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
    defineField({ name: 'audioUrl',    title: 'Audio URL',   type: 'url' }),
    defineField({ name: 'featured',    title: 'Featured',    type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'speaker', media: 'date' },
  },
})
