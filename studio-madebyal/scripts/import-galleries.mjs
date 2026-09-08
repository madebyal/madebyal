import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {createClient} from '@sanity/client'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

if (!process.env.SANITY_AUTH_TOKEN) {
  console.error('SANITY_AUTH_TOKEN is not set.')
  process.exit(1)
}

const client = createClient({
  projectId: 'a2m3sicd',
  dataset: 'production',
  apiVersion: '2026-09-08',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
})

const dataDir = path.resolve(__dirname, '../../src/data')

const galleries = [
  {
    file: 'overview.json',
    title: 'Overview',
    slug: 'overview',
  },
  {
    file: 'events.json',
    title: 'Events',
    slug: 'events',
  },
  {
    file: 'editorial.json',
    title: 'Editorial',
    slug: 'editorial',
  },
  {
    file: 'life-on-set.json',
    title: 'Behind the Scenes',
    slug: 'behind-the-scenes',
  },
  {
    file: 'personal-1.json',
    title: 'Personal',
    slug: 'personal',
  },
]

async function importGallery({file, title, slug}) {
  const filePath = path.join(dataDir, file)

  if (!fs.existsSync(filePath)) {
    console.warn(`Skipping ${title}: ${file} not found`)
    return
  }

  const source = JSON.parse(fs.readFileSync(filePath, 'utf8'))

  const documentId = `photoGallery-${slug}`

  await client.createIfNotExists({
    _id: documentId,
    _type: 'photoGallery',
    title,
    slug: {
      _type: 'slug',
      current: slug,
    },
    images: [],
  })

  const existing = await client.fetch(
    `*[_id == $id][0]{images}`,
    {id: documentId}
  )

  const alreadyImported = existing?.images?.length ?? 0

  console.log('')
  console.log(`=== ${title} ===`)
  console.log(`${source.images.length} source images`)
  console.log(`${alreadyImported} already imported`)

  for (
    let index = alreadyImported;
    index < source.images.length;
    index++
  ) {
    const url = source.images[index]

    console.log(
      `[${index + 1}/${source.images.length}] Downloading ${url}`
    )

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(
        `Failed to download ${url}: ${response.status}`
      )
    }

    const buffer = Buffer.from(
      await response.arrayBuffer()
    )

    const pathname = new URL(url).pathname

    const filename =
      decodeURIComponent(pathname.split('/').pop()) ||
      `${slug}-${index + 1}.jpg`

    console.log(`Uploading ${filename}...`)

    const asset = await client.assets.upload(
      'image',
      buffer,
      {filename}
    )

    await client
      .patch(documentId)
      .setIfMissing({images: []})
      .append('images', [
        {
          _type: 'image',
          _key: `${slug}-${String(index + 1).padStart(3, '0')}`,
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
      ])
      .commit()

    console.log(`✓ ${index + 1}/${source.images.length}`)
  }

  console.log(`✓ ${title} complete`)
}

for (const gallery of galleries) {
  try {
    await importGallery(gallery)
  } catch (error) {
    console.error(`Failed while importing ${gallery.title}`)
    console.error(error)
    process.exit(1)
  }
}

console.log('')
console.log('All gallery migrations complete.')