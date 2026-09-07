import {defineField, defineType} from 'sanity'

export const videoCollection = defineType({
  name: 'videoCollection',
  title: 'Video Collection',
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
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'videoItem',
          title: 'Video',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'url',
              title: 'YouTube or Vimeo URL',
              type: 'url',
              validation: (rule) => rule.required(),
            },
            {
              name: 'thumbnail',
              title: 'Custom thumbnail',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'url',
              media: 'thumbnail',
            },
          },
        },
      ],
    }),
  ],
})