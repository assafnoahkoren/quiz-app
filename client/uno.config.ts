import { defineConfig, presetWind } from 'unocss'

export default defineConfig({
  presets: [
    presetWind(),
  ],
  safelist: [
    'border-red-500',
    'border-lime-500',
    'bg-red-200',
    'bg-lime-200',
    'border-blue-500',
  ]
})
