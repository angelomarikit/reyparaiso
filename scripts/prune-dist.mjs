import { readdir, rm } from 'node:fs/promises'
import path from 'node:path'

const dist = path.resolve('dist')
const files = await readdir(dist)
const raw = files.filter((file) => /^\d+_.*\.jpe?g$/i.test(file))

await Promise.all(raw.map((file) => rm(path.join(dist, file))))
console.log(`Removed ${raw.length} original photographs from dist`)
