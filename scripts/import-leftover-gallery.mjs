import { existsSync, readdirSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve('.')
const sourceDirs = ['leftover', path.join('public', 'leftover')]
const outDir = path.join(root, 'public', 'images', 'optimized')

const items = [
  {
    prefix: '891914767',
    id: 'wedding-group-joy',
    category: 'hosting',
    caption: 'With the couple at their wedding celebration.',
    alt: 'Rey standing with a couple at a wedding celebration.',
  },
  {
    prefix: '893292766',
    id: 'birthday-host-mic',
    category: 'hosting',
    caption: 'Hosting a birthday program with a microphone.',
    alt: 'Rey holding a microphone while hosting a birthday program.',
  },
  {
    prefix: '900710134',
    id: 'wedding-reception-trio',
    category: 'hosting',
    caption: 'With newlyweds at their reception.',
    alt: 'Rey posing with newlyweds at a reception.',
  },
  {
    prefix: '894009417',
    id: 'celebration-selfie',
    category: 'hosting',
    caption: 'A moment with the couple at their celebration.',
    alt: 'Rey in a group photo at a decorated celebration.',
  },
  {
    prefix: '898582886',
    id: 'tawag-audition-day',
    category: 'personal',
    caption: 'Before a Tawag ng Tanghalan audition.',
    alt: 'Rey standing in front of a Tawag ng Tanghalan audition banner.',
  },
  {
    prefix: '896484938',
    id: 'wedding-host-mic',
    category: 'hosting',
    caption: 'Hosting at a wedding celebration.',
    alt: 'Rey with a microphone at a wedding celebration.',
  },
  {
    prefix: '899441642',
    id: 'kids-party-host',
    category: 'hosting',
    caption: "Hosting a children's birthday program.",
    alt: "Rey hosting a children's birthday program with a microphone.",
  },
  {
    prefix: '897604998',
    id: 'wedding-decor-evening',
    category: 'hosting',
    caption: 'At a wedding celebration.',
    alt: 'Rey with guests at an evening wedding celebration.',
  },
]

function resolveDir() {
  for (const dir of sourceDirs) {
    const full = path.join(root, dir)
    if (existsSync(full) && readdirSync(full).some((name) => /\.jpe?g$/i.test(name))) return full
  }
  throw new Error('Missing leftover image folder')
}

async function optimize(source, id) {
  const meta = await sharp(source, { failOn: 'none' }).rotate().metadata()
  const width = meta.width ?? 1200
  const height = meta.height ?? 900
  const targetW = Math.min(1600, width)

  await sharp(source, { failOn: 'none' })
    .rotate()
    .resize({ width: targetW, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(path.join(outDir, `${id}.webp`))

  await sharp(source, { failOn: 'none' })
    .rotate()
    .resize({ width: targetW, withoutEnlargement: true })
    .avif({ quality: 54, effort: 5 })
    .toFile(path.join(outDir, `${id}.avif`))

  await sharp(source, { failOn: 'none' })
    .rotate()
    .resize({ width: 760, withoutEnlargement: true })
    .webp({ quality: 68 })
    .toFile(path.join(outDir, `${id}-thumb.webp`))

  return {
    width: targetW,
    height: Math.round((height / width) * targetW),
  }
}

const dir = resolveDir()
const files = readdirSync(dir)
await mkdir(outDir, { recursive: true })

const galleryItems = []
for (const item of items) {
  const hit = files.find((name) => name.startsWith(item.prefix) && /\.jpe?g$/i.test(name))
  if (!hit) {
    console.warn('skip missing', item.prefix)
    continue
  }
  const dims = await optimize(path.join(dir, hit), item.id)
  galleryItems.push({
    id: item.id,
    alt: item.alt,
    caption: item.caption,
    category: item.category,
    width: dims.width,
    height: dims.height,
    objectPosition: 'center',
  })
  console.log('gallery +', item.id)
}

const body = `import type { GalleryItem } from './gallery'

export const galleryMemorable: GalleryItem[] = ${JSON.stringify(galleryItems, null, 2)}
`

await writeFile(path.join(root, 'src', 'data', 'galleryMemorable.ts'), body)
console.log('wrote galleryMemorable.ts', galleryItems.length)
