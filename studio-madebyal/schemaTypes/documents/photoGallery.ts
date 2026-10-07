import {defineField, defineType} from 'sanity'

export const photoGallery = defineType({
  name: 'photoGallery',
  title: 'Photo Gallery',
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
      name: 'homepageImage',
      title: 'Homepage Image',
      type: 'image',
      description:
        'The image used to represent this gallery in Selected Work on the homepage.',
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
  ],

  preview: {
    select: {
      title: 'title',
      media: 'homepageImage',
    },
  },
})