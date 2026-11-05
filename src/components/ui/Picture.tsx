type PictureProps = {
  id: string
  alt: string
  className?: string
  imgClassName?: string
  priority?: boolean
  thumb?: boolean
  objectPosition?: string
  width?: number
  height?: number
}

export function Picture({
  id,
  alt,
  className,
  imgClassName,
  priority = false,
  thumb = false,
  objectPosition,
  width,
  height,
}: PictureProps) {
  const webp = thumb ? `/images/optimized/${id}-thumb.webp` : `/images/optimized/${id}.webp`
  const avif = `/images/optimized/${id}.avif`

  return (
    <picture className={className}>
      {thumb ? null : <source srcSet={avif} type="image/avif" />}
      <img
        src={webp}
        alt={alt}
        width={width}
        height={height}
        className={imgClassName}
        style={objectPosition ? { objectPosition } : undefined}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
      />
    </picture>
  )
}
