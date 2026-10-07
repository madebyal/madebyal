import {createClient} from '@sanity/client'
import {createImageUrlBuilder} from '@sanity/image-url'

export const sanity = createClient({
  projectId: 'a2m3sicd',
  dataset: 'production',
  apiVersion: '2026-09-08',
  useCdn: false,
})

const builder = createImageUrlBuilder(sanity)

export function urlFor(source: any) {
  return builder.image(source)
}