import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import type { QuartzTransformerPluginInstance } from "./quartz/plugins/types"
import type { VFile } from "vfile"

const config = await loadQuartzConfig()

// created-modified-date 插件在找不到任何日期来源时，会把日期伪造成"构建时刻"，
// 导致没写日期的笔记也显示一个日期。这里在流水线末尾清除这些伪造日期：
// 只有 frontmatter 里显式写了 created / modified / published / date 的笔记才显示日期。
const stripFabricatedDates: QuartzTransformerPluginInstance = {
  name: "StripFabricatedDates",
  markdownPlugins() {
    return [
      () => {
        return (_tree: unknown, file: VFile) => {
          const data = file.data as Record<string, unknown> & {
            frontmatter?: Record<string, unknown>
          }
          const fm = data.frontmatter
          if (!fm?.created && !fm?.modified && !fm?.published && !fm?.date) {
            delete data.dates
            delete data.defaultDateType
          }
        }
      },
    ]
  },
}

config.plugins.transformers.push(stripFabricatedDates)

export default config
export const layout = await loadQuartzLayout()
