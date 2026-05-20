export interface VideoTestimony {
  id: string
  name: string
  role?: string           // "Member, Lagos HQ"
  videoId?: string        // YouTube video ID; shows gradient if absent
  thumbnailUrl?: string   // custom thumbnail URL
  quote: string           // short quote shown on the gradient overlay
  transformationTag: string  // "From kidney failure to divine health"
}

export interface TextTestimony {
  id: string
  name: string
  role?: string
  photo?: string          // URL or /public path
  quote: string
  transformationTag: string
}

export interface TestimonySlide {
  id: string
  featured: VideoTestimony
  cards: [TextTestimony, TextTestimony, TextTestimony]
}
