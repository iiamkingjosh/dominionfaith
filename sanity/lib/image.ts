// sanity/lib/image.ts
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function imageUrlFor(source: SanityImageSource) {
  return builder.image(source)
}
