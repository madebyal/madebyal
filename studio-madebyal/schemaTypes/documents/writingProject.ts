import {defineField, defineType} from 'sanity'

export const writingProject = defineType({
  name: 'writingProject',
  title: 'Writing Project',
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
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Book', value: 'book'},
          {title: 'Zine', value: 'zine'},
          {title: 'Essay', value: 'essay'},
          {title: 'Publication', value: 'publication'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
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
    }),

    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'body',
      title: 'Full Description',
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
      name: 'externalUrl',
      title: 'External / Purchase Link',
      type: 'url',
      description:
        'Optional link to a shop, publisher, article, external essay, etc.',
    }),

    defineField({
      name: 'pdfUrl',
      title: 'PDF / Download Link',
      type: 'url',
      description:
        'Optional direct link to a PDF or downloadable version.',
    }),

    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'featuredOrder',
      title: 'Featured Order',
      type: 'number',
      hidden: ({parent}) => !parent?.featured,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      media: 'coverImage',
    },
  },
})