import { resolve } from 'path'
import {PluginOption, normalizePath} from 'vite'
export default function (entries:string[]):PluginOption{
    let base:string
return {
    name:'vite-plugin-mult-entry',
    configResolved(config) {
        base = config.base || ''
        const root=config.root||process.cwd()
        entries=entries.map((entry)=>normalizePath(resolve(root,entry)))
      },
      options(options) {
        options.input = [options.input as any, ...entries]
      },
      
    transformIndexHtml(html, ctx) {
        return {
          html,
          tags: Object.values(ctx.bundle!).filter((item:any) => item?.facadeModuleId&&entries.includes(item.facadeModuleId)).map((item) => {
            return {
              tag: 'script',
              attrs: { type: 'module', src: `${base}${item.fileName}` },
              injectTo: 'head-prepend',
            }
          }),
  
        }
      },
}
}

