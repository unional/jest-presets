import { Config } from 'jest'
import { join } from 'node:path'
import uniRequire from 'uni-require'

export function withChalk<P extends Partial<Config>>(preset: P, mode: 'cjs' | 'esm' = 'esm') {
  const chalk = uniRequire.resolve('chalk')
  const chalkRootDir = chalk.slice(0, chalk.lastIndexOf('chalk'))
  if (mode === 'esm') {
    return {
      ...preset,
      moduleNameMapper: {
        ...preset.moduleNameMapper,
        // * test in `ts-esm` shows this is not needed.
        // chalk,
        '#ansi-styles': join(
          chalkRootDir,
          'chalk/source/vendor/ansi-styles/index.js',
        ),
        '#supports-color': join(
          chalkRootDir,
          'chalk/source/vendor/supports-color/index.js',
        )
      }
    }
  }
  return {
    ...preset,
    moduleNameMapper: {
      ...preset.moduleNameMapper,
      '#ansi-styles': join(
        chalkRootDir,
        'chalk/source/vendor/ansi-styles/index.js',
      ),
      '#supports-color': join(
        chalkRootDir,
        'chalk/source/vendor/supports-color/index.js',
      )
    },
    transform: {
      ...preset.transform,
      "\\.m?jsx?$": "jest-esm-transformer-2"
    },
    transformIgnorePatterns: [
      ...preset.transformIgnorePatterns ?? [],
      "/node_modules/(?!chalk)/"
    ]
  }
}
