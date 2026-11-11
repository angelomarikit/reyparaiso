type CollectionImageProps = {
  src: string
  thumb?: string
  alt: string
  className?: string
  imgClassName?: string
  priority?: boolean
  objectPosition?: string
  width?: number
  height?: number
}

export function CollectionImage({
  src,
  thumb,
  alt,
  className,
  imgClassName,
  priority = false,
  objectPosition,
  width,
  height,
}: CollectionImageProps) {
  const display = thumb ?? src

  return (
    <picture className={className}>
      <img
        src={display}
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
