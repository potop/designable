import { GlobalRegistry, IDesignerRegistry } from '@kdesignable/core'
import { globalThisPolyfill } from '@kdesignable/shared'

export const useRegistry = (): IDesignerRegistry => {
  return globalThisPolyfill['__DESIGNER_REGISTRY__'] || GlobalRegistry
}
