import {defineField, defineType} from 'sanity'

export const filmProject = defineType({
  name: 'filmProject',
  title: 'Film Project',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Documentary', value: 'documentary'},
          {title: 'People + Ideas', value: 'podcast'},
          {title: 'Events', value: 'events'},
          {title: 'Commercial', value: 'commercial'},
          {title: 'Film + Music', value: 'film-music'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'videoUrl',
      title: 'YouTube or Vimeo URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'poster',
      title: 'Poster / Thumbnail',
      type: 'image',
      description:
        'Used on the Film page, category pages and anywhere the film is shown before playback.',
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
      name: 'client',
      title: 'Client',
      type: 'string',
    }),

    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
    }),

    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description:
        'For example: Director, Cinematographer & Editor',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'text',
      rows: 4,
      description:
        'Optional production credits, collaborators or crew.',
    }),

    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description:
        'Show this project in selected/featured work.',
      initialValue: false,
    }),

    defineField({
      name: 'featuredOrder',
      title: 'Featured Order',
      type: 'number',
      description:
        'Lower numbers appear first when multiple projects are featured.',
      hidden: ({parent}) => !parent?.featured,
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'poster',
    },
  },
})