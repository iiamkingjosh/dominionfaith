// sanity.config.ts
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemas } from './sanity/schemas'

export default defineConfig({
  name: 'dominion-faith',
  title: 'Dominion Faith',
  projectId: '6lfjc9b1',
  dataset: 'production',
  basePath: '/studio',
  plugins: [deskTool(), visionTool()],
  schema: { types: schemas },
})
