/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { OutputOptions, rollup, RollupOptions } from 'rollup'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'

export const getRollupBasePlugin = () => [
  resolve(),
  postcss({
    extract: true,
    minimize: true,
    sourceMap: true,
    // extensions: ['.css', '.scss', '.sass'],
    use: {
      less: {
        plugins: [],
        javascriptEnabled: true,
      },
      sass: {},
      stylus: {},
    },
  }),
]

export const build = async (
  rollupConfig: Omit<RollupOptions, 'output'> & { output: OutputOptions }
) => {
  const { output, ...input } = rollupConfig
  const bundle = await rollup(input)

  return bundle.write(output as OutputOptions)
}
