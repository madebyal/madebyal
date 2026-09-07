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

const dataPath = path.resolve(
  __dirname,
  '../../src/data/portraits.json'
)

const portraits = JSON.parse(
  fs.readFileSync(dataPath, 'utf8')
)

const documentId = 'photoGallery-portraits'

await client.createIfNotExists({
  _id: documentId,
  _type: 'photoGallery',
  title: 'Portraits',
  slug: {
    _type: 'slug',
    current: 'portraits',
  },
  images: [],
})

const existing = await client.fetch(
  `*[_id == $id][0]{images}`,
  {id: documentId}
)

const alreadyImported = existing?.images?.length ?? 0

console.log(
  `Portraits contains ${portraits.images.length} images.`
)

console.log(
  `${alreadyImported} already imported.`
)

for (
  let index = alreadyImported;
  index < portraits.images.length;
  index++
) {
  const url = portraits.images[index]

  console.log(
    `[${index + 1}/${portraits.images.length}] Downloading ${url}`
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
    `portrait-${index + 1}.jpg`

  console.log(`Uploading ${filename} to Sanity...`)

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
        _key: `portrait-${String(index + 1).padStart(3, '0')}`,
        asset: {
          _type: 'reference',
          _ref: asset._id,
        },
      },
    ])
    .commit()

  console.log(`✓ ${index + 1}/${portraits.images.length}`)
}

console.log('')
console.log('Portraits migration complete.')