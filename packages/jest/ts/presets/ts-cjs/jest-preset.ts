import type { Config } from 'jest'
import { configSourceDir, nodejs, tsCjs, watch } from '../../config.js'

const tsCjsPreset = {
  ...tsCjs,
  ...configSourceDir(),
  resolver: '@repobuddy/jest/resolver',
  ...nodejs,
  ...watch
} satisfies Config

export default tsCjsPreset

export { configSourceDir, nodejs, tsCjs, watch }

