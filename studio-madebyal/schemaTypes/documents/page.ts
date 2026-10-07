import {defineField, defineType} from 'sanity'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Large headline shown near the top of the page.',
    }),

    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
      description: 'Short introductory paragraph below the headline.',
    }),

    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Optional lead image for this page.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        },
      ],
    }),

    defineField({
      name: 'body',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt text',
              type: 'string',
            },
          ],
        },
      ],
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Optional. Currently used on the About page.',
    }),

    defineField({
      name: 'services',
      title: 'Working Across',
      type: 'array',
      description: 'Optional. Currently used on the About page.',
      of: [
        {
          type: 'string',
        },
      ],
    }),

    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      description: 'Optional. For example: Germany + Europe.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
    },
  },
})