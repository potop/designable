import { Workspace } from '@kdesignable/core'
import { globalThisPolyfill } from '@kdesignable/shared'
import { useContext } from 'react'
import { WorkspaceContext } from '../context'
import { useDesigner } from './useDesigner'

export const useWorkspace = (id?: string): Workspace => {
  const designer = useDesigner()
  const workspaceId = id || useContext(WorkspaceContext)?.id
  if (workspaceId) {
    return designer.workbench.findWorkspaceById(workspaceId)
  }
  if (globalThisPolyfill['__DESIGNABLE_WORKSPACE__'])
    return globalThisPolyfill['__DESIGNABLE_WORKSPACE__']
  return designer.workbench.currentWorkspace
}
