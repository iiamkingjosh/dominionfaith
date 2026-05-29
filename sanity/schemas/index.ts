// sanity/schemas/index.ts
import { seriesSchema }   from './series'
import { sermonSchema }   from './sermon'
import { eventSchema }    from './event'
import { blogPostSchema } from './blogPost'

export const schemas = [seriesSchema, sermonSchema, eventSchema, blogPostSchema]
