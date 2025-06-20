import React, { PropsWithChildren } from 'react'
import { Simulator } from '../containers'
import { IWorkspaceItemProps, WorkspacePanel } from './WorkspacePanel'
export const ViewportPanel: React.FC<PropsWithChildren<IWorkspaceItemProps>> = (
  props
) => {
  return (
    <WorkspacePanel.Item {...props} flexable>
      <Simulator>{props.children}</Simulator>
    </WorkspacePanel.Item>
  )
}
