import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
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
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
            list: [
                {title: 'Personal Project', value: 'personal'},
                {title: 'Behind the Scenes', value: 'bts'},
                {title: 'Collaborative Project', value: 'collaborative'},
                {title: 'Podcast / Audio', value: 'audio'},
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
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
      rows: 3,
      description:
        'A short description used on project overview pages.',
    }),

    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'text',
      rows: 6,
    }),

    defineField({
        name: 'embedUrl',
        title: 'Optional Media Embed URL',
        type: 'url',
        description:
            'YouTube, Vimeo, Spotify or SoundCloud link to embed on the project page.',
    }),

    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
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
      name: 'credits',
      title: 'Credits / Collaborators',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description:
        'Feature this project prominently on the Projects page.',
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
      subtitle: 'projectType',
      media: 'coverImage',
    },
  },
})