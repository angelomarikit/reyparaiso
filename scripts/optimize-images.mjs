import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const publicDir = path.resolve('public')
const outDir = path.join(publicDir, 'images', 'optimized')

const jobs = [
  { id: 'sing-close', prefix: '683037182', width: 1800, thumb: true, webp: 88, avif: 68, sharpen: true },
  { id: 'secret-cafe-set', prefix: '598457178', width: 1800, thumb: true },
  { id: 'secret-cafe-close', prefix: '598640183', width: 1400, thumb: true },
  { id: 'secret-cafe-dusk', prefix: '600291641', width: 1400, thumb: true },
  { id: 'secret-cafe-night', prefix: '597391657', width: 1800, thumb: true },
  { id: 'vikings', prefix: '599925772', width: 1600, thumb: true },
  { id: 'venue-hall', prefix: '672674011', width: 1800, thumb: true },
  { id: 'string-lights', prefix: '650267495', width: 1400, thumb: true },
  { id: 'red-backdrop', prefix: '617499458', width: 1400, thumb: true },
  { id: 'neon-wall', prefix: '600817714', width: 1400, thumb: true },
  { id: 'standing-guitar', prefix: '600291663', width: 1400, thumb: true },
  { id: 'purple-venue', prefix: '657556227', width: 1400, thumb: true },
  { id: 'red-light-set', prefix: '658299306', width: 1400, thumb: true },
  { id: 'cafe-selfie', prefix: '659129546', width: 1600, thumb: true },
  { id: 'stage-host', prefix: '600533755', width: 1400, thumb: true },
  { id: 'christmas-host', prefix: '605131394', width: 1400, thumb: true },
  { id: 'program-host', prefix: '598160166', width: 1400, thumb: true },
  { id: 'stage-2015', prefix: '598149238', width: 1200, thumb: true },
  { id: 'church-2015', prefix: '597675631', width: 1200, thumb: true },
  { id: 'stage-group', prefix: '648508889', width: 1200, thumb: true },
  { id: 'tawag-2018', prefix: '600326702', width: 1400, thumb: true },
  { id: 'headshot', prefix: '878257571', width: 1400, thumb: true },
  { id: 'portrait-chair', prefix: '615277553', width: 1600, thumb: true },
  { id: 'early-guitar', prefix: '605106702', width: 1200, thumb: true },
  { id: 'green-portrait', prefix: '603843074', width: 1200, thumb: true },
  { id: 'classroom', prefix: '650228924', width: 1400, thumb: true },
  { id: 'restaurant-set', prefix: '597916011', width: 1400, thumb: true },
]

const files = await readdir(publicDir)

function find(prefix) {
  const hit = files.find((file) => file.startsWith(prefix) && /\.jpe?g$/i.test(file))
  if (!hit) throw new Error(`Missing source image ${prefix}`)
  return path.join(publicDir, hit)
}

async function render(id, source, width, suffix, format, options = {}) {
  let pipeline = sharp(source, { failOn: 'none' }).rotate().resize({
    width,
    withoutEnlargement: true,
  })
  if (options.sharpen && suffix !== 'thumb') {
    pipeline = pipeline.sharpen({ sigma: 0.8, m1: 0.6, m2: 0.35 })
  }
  const webpQuality = suffix === 'thumb' ? 68 : (options.webp ?? 78)
  const avifQuality = options.avif ?? 54
  pipeline =
    format === 'avif'
      ? pipeline.avif({ quality: avifQuality, effort: 5 })
      : pipeline.webp({ quality: webpQuality })
  const name = suffix === 'thumb' ? `${id}-thumb.webp` : `${id}.${format}`
  await pipeline.toFile(path.join(outDir, name))
}

await mkdir(outDir, { recursive: true })

for (const job of jobs) {
  const source = find(job.prefix)
  await render(job.id, source, job.width, 'full', 'webp', job)
  await render(job.id, source, job.width, 'full', 'avif', job)
  if (job.thumb) await render(job.id, source, 760, 'thumb', 'webp', job)
  console.log(job.id)
}

const portrait = await sharp(find('878257571'))
  .rotate()
  .resize(520, 630, { fit: 'cover', position: 'attention' })
  .toBuffer()

const svg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#101B2B"/>
      <stop offset="58%" stop-color="#101B2B"/>
      <stop offset="78%" stop-color="#101B2B" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#fade)"/>
  <rect x="72" y="168" width="56" height="2" fill="#C6A76A"/>
  <text x="72" y="230" fill="#C6A76A" font-family="Georgia, serif" font-size="22" letter-spacing="6">KURA YEY</text>
  <text x="72" y="320" fill="#F8F7F3" font-family="Georgia, serif" font-size="72">Rey Paraiso</text>
  <text x="72" y="390" fill="#B6BECA" font-family="Georgia, sans-serif" font-size="26">Singer, Acoustic Performer</text>
  <text x="72" y="430" fill="#B6BECA" font-family="Georgia, sans-serif" font-size="26">&amp; Event Host in Cavite</text>
</svg>`)

await sharp({
  create: { width: 1200, height: 630, channels: 3, background: '#101B2B' },
})
  .composite([
    { input: portrait, left: 680, top: 0 },
    { input: svg, left: 0, top: 0 },
  ])
  .jpeg({ quality: 82 })
  .toFile(path.join(publicDir, 'og-image.jpg'))

await sharp(find('878257571'))
  .rotate()
  .resize(180, 180, { fit: 'cover', position: 'attention' })
  .png()
  .toFile(path.join(publicDir, 'apple-touch-icon.png'))

await sharp(find('878257571'))
  .rotate()
  .resize(32, 32, { fit: 'cover', position: 'attention' })
  .png()
  .toFile(path.join(publicDir, 'favicon.png'))

console.log('og and icons ready')
