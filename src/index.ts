import { resolve } from 'path'
import {PluginOption, normalizePath,HtmlTagDescriptor} from 'vite'

type EntryType={entry:string}&Omit<HtmlTagDescriptor,'tag'>

export default function (entries:EntryType[]):PluginOption{
    let base:string
    let resolvedEntries:string[]
return {
    name:'vite-plugin-mult-entry',
    configResolved(config) {
        base = config.base || ''
        const root=config.root||process.cwd()
        resolvedEntries=entries.map((entry)=>normalizePath(resolve(root,entry.entry)))
      },
      options(options) {
        options.input = [options.input as any, ...entries]
      },
      
    transformIndexHtml(html, ctx) {
        return {
          html,
          tags: Object.values(ctx.bundle!).filter((item:any) => item?.facadeModuleId&&resolvedEntries.includes(item.facadeModuleId)).map((item,i) => {
            const attrs=entries[i].attrs||{}
            delete entries[i].attrs
           
            return {
              tag: 'script',
              attrs: { type: 'module', src: `${base}${item.fileName}` ,...attrs},
              injectTo: 'head-prepend',
              ...entries[i]
            }
          }),
  
        }
      },
}
}

