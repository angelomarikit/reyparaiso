import { existsSync, readdirSync } from 'node:fs'
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import sharp from 'sharp'

const root = path.resolve('.')
const publicRoot = path.join(root, 'public')

const imageSources = [
  {
    collectionId: 'collection-1',
    folders: ['new images 1', path.join('public', 'new images 1')],
    title: 'Celebrations & Events',
    description: 'Rey singing and performing at celebrations and decorated events.',
  },
  {
    collectionId: 'collection-2',
    folders: ['new images 2', path.join('public', 'new images 2')],
    title: 'Teaching & Community',
    description: 'Classroom visits, community programs, and time with students.',
  },
  {
    collectionId: 'collection-3',
    folders: ['new images 3', path.join('public', 'new images 3')],
    title: 'Chorale & Harmony',
    description: 'Moments with the chorale group and shared musical gatherings.',
  },
]

const videoSourceDirs = ['new video', path.join('public', 'new video')]
const videoOut = path.join(publicRoot, 'videos', 'featured-performance.mp4')
const posterOut = path.join(publicRoot, 'videos', 'featured-performance-poster.webp')

const imageExt = /\.(jpe?g|png|webp|avif|heic|heif)$/i
const videoExt = /\.(mp4|mov|webm|m4v)$/i

function slugify(name, index) {
  const base = path
    .parse(name)
    .name.replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase()
  return `${String(index + 1).padStart(2, '0')}-${base || 'photo'}`
}

function captionFrom(name, collectionTitle) {
  const base = path.parse(name).name.replace(/[_-]+/g, ' ').trim()
  if (/^img[- ]?\d+$/i.test(base)) return ''
  if (/^[a-f0-9]{16,}$/i.test(base.replace(/\s/g, ''))) return ''
  if (/^att\./i.test(base)) return ''
  if (/^[a-f0-9-]{32,}$/i.test(base)) return ''
  if (!base || /^\d+$/.test(base)) return ''
  const readable = base.replace(/\s+/g, ' ').trim()
  if (readable.length > 48) return ''
  return ''
}

function altFrom(collectionTitle, index) {
  return `Photograph ${index + 1} from ${collectionTitle}`
}

async function listFiles(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true })
    const files = []
    for (const entry of entries) {
      if (!entry.isFile()) continue
      if (!imageExt.test(entry.name) && !videoExt.test(entry.name)) continue
      files.push(path.join(dir, entry.name))
    }
    return files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  } catch {
    return []
  }
}

async function optimizeImage(source, outDir, slug) {
  const meta = await sharp(source, { failOn: 'none' }).rotate().metadata()
  const width = meta.width ?? 1400
  const height = meta.height ?? 1050
  const targetW = Math.min(1800, width)

  const webp = path.join(outDir, `${slug}.webp`)
  const thumb = path.join(outDir, `${slug}-thumb.webp`)

  await sharp(source, { failOn: 'none' })
    .rotate()
    .resize({ width: targetW, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(webp)

  await sharp(source, { failOn: 'none' })
    .rotate()
    .resize({ width: 760, withoutEnlargement: true })
    .webp({ quality: 68 })
    .toFile(thumb)

  return {
    width: targetW,
    height: Math.round((height / width) * targetW),
    webp: webp.replace(publicRoot, '').replace(/\\/g, '/'),
    thumb: thumb.replace(publicRoot, '').replace(/\\/g, '/'),
  }
}

function resolveSourceDir(candidates, pattern) {
  for (const candidate of candidates) {
    const dir = path.join(root, candidate)
    if (!existsSync(dir)) continue
    const entries = readdirSync(dir)
    if (entries.some((name) => pattern.test(name))) return dir
  }
  return path.join(root, candidates[0])
}

async function importImages() {
  const collections = []

  for (const source of imageSources) {
    const dir = resolveSourceDir(source.folders, imageExt)
    const files = (await listFiles(dir)).filter((file) => imageExt.test(file))
    const outDir = path.join(publicRoot, 'images', 'new-collections', source.collectionId)
    await mkdir(outDir, { recursive: true })

    const items = []
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index]
      const slug = slugify(path.basename(file), index)
      const optimized = await optimizeImage(file, outDir, slug)
      const caption = captionFrom(path.basename(file), source.title)
      items.push({
        id: `${source.collectionId}-${slug}`,
        alt: altFrom(source.title, index),
        caption,
        collectionId: source.collectionId,
        width: optimized.width,
        height: optimized.height,
        src: optimized.webp,
        thumb: optimized.thumb,
        objectPosition: 'center',
      })
      console.log('image', source.collectionId, slug)
    }

    collections.push({
      id: source.collectionId,
      title: source.title,
      description: source.description,
      items,
    })
  }

  return collections
}

async function importVideo() {
  let files = []
  let usedDir = videoSourceDirs[0]
  for (const candidate of videoSourceDirs) {
    const dir = path.join(root, candidate)
    const found = (await listFiles(dir)).filter((file) => videoExt.test(file))
    if (found.length > 0) {
      files = found
      usedDir = candidate
      break
    }
  }
  if (files.length === 0) {
    console.log('no video found in', videoSourceDirs.join(' or '))
    return null
  }

  const source = files[0]
  await mkdir(path.dirname(videoOut), { recursive: true })
  const data = await readFile(source)
  await writeFile(videoOut, data)

  const still = files.find((f) => imageExt.test(f))
  if (still) {
    await sharp(still, { failOn: 'none' })
      .rotate()
      .resize(1920, 1080, { fit: 'cover' })
      .webp({ quality: 78 })
      .toFile(posterOut)
  } else {
    const frame = spawnSync(
      'ffmpeg',
      ['-y', '-ss', '0.4', '-i', videoOut, '-frames:v', '1', '-update', '1', posterOut.replace('.webp', '.jpg')],
      { stdio: 'ignore' },
    )
    if (frame.status === 0) {
      await sharp(posterOut.replace('.webp', '.jpg'), { failOn: 'none' })
        .webp({ quality: 78 })
        .toFile(posterOut)
    }
  }

  console.log('video', path.basename(source), '->', videoOut.replace(publicRoot, ''))
  return {
    src: '/videos/featured-performance.mp4',
    poster: still ? '/videos/featured-performance-poster.webp' : '/videos/hero-poster.webp',
    title: 'Hear Rey Live',
    description:
      'Press play to watch a recent performance. Use the sound control to hear Rey’s voice — audio stays off until you choose to listen.',
  }
}

async function writeData(collections, video) {
  const body = `/* Generated by scripts/import-new-media.mjs — run npm run import-new-media after adding files. */
export type NewCollectionItem = {
  id: string
  alt: string
  caption: string
  collectionId: string
  width: number
  height: number
  src: string
  thumb: string
  objectPosition?: string
}

export type NewCollection = {
  id: string
  title: string
  description: string
  items: NewCollectionItem[]
}

export const newCollections: NewCollection[] = ${JSON.stringify(collections, null, 2)}

export type FeaturedPerformanceVideo = {
  src: string
  poster: string
  title: string
  description: string
}

export const featuredPerformanceVideo: FeaturedPerformanceVideo | null = ${video ? JSON.stringify(video, null, 2) : 'null'}

export const hasNewCollections = newCollections.some((collection) => collection.items.length > 0)
export const hasFeaturedVideo = featuredPerformanceVideo !== null
`
  await writeFile(path.join(root, 'src', 'data', 'newCollections.ts'), body)
}

const collections = await importImages()
const video = await importVideo()
await writeData(collections, video)

const total = collections.reduce((sum, collection) => sum + collection.items.length, 0)
console.log(`done — ${total} images, video ${video ? 'yes' : 'no'}`)
