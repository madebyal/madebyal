import {defineField, defineType} from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',

  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Filmmaker + Photographer — Berlin',
    }),

    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'selectedWorkHeading',
      title: 'Selected Work Heading',
      type: 'string',
      initialValue: 'Selected Work',
    }),

    defineField({
      name: 'filmHeading',
      title: 'Film Heading',
      type: 'string',
      initialValue: 'Stories in motion.',
    }),

    defineField({
      name: 'filmDescription',
      title: 'Film Description',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'photographyHeading',
      title: 'Photography Heading',
      type: 'string',
      initialValue: 'People, moments and atmosphere.',
    }),

    defineField({
      name: 'photographyDescription',
      title: 'Photography Description',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'projectsHeading',
      title: 'Projects Heading',
      type: 'string',
      initialValue: 'Personal and collaborative work.',
    }),

    defineField({
      name: 'projectsDescription',
      title: 'Projects Description',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'aboutHeading',
      title: 'About Heading',
      type: 'string',
      initialValue: 'About',
    }),

    defineField({
      name: 'aboutText',
      title: 'About Preview Text',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'contactHeading',
      title: 'Contact Heading',
      type: 'string',
      initialValue: 'Have a project in mind?',
    }),

    defineField({
      name: 'contactText',
      title: 'Contact Text',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'contactLinkText',
      title: 'Contact Link Text',
      type: 'string',
      initialValue: 'Get in touch →',
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Homepage',
      }
    },
  },
})