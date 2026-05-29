// lib/blog.ts
import { client } from '@/sanity/lib/client'
import { allBlogPostsQuery, blogPostBySlugQuery } from '@/sanity/lib/queries'
import type { BlogPost } from '@/types/blog'

export async function getBlogPosts(): Promise<BlogPost[]> {
  return client.fetch(allBlogPostsQuery, {}, { next: { revalidate: 60 } })
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return client.fetch(blogPostBySlugQuery, { slug }, { next: { revalidate: 60 } })
}
