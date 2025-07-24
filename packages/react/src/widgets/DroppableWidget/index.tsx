import { observer } from '@formily/reactive-react'
import { TreeNode } from '@kdesignable/core'
import React, { PropsWithChildren } from 'react'
import { useNodeIdProps, useTreeNode } from '../../hooks'
import {
  INodeActionsWidgetActionProps,
  NodeActionsWidget,
} from '../NodeActionsWidget'
import { NodeTitleWidget } from '../NodeTitleWidget'
import './styles.scss'

export interface IDroppableWidgetProps {
  node?: TreeNode
  actions?: INodeActionsWidgetActionProps[]
  placeholder?: boolean
  height?: number
  style?: React.CSSProperties
  className?: string
  hasChildren?: boolean
}

export const DroppableWidget: React.FC<
  PropsWithChildren<IDroppableWidgetProps>
> = observer(
  ({
    node,
    actions,
    height,
    placeholder = true,
    style,
    className,
    hasChildren: hasChildrenProp,
    children,
    ...props
  }) => {
    const currentNode = useTreeNode()
    const nodeId = useNodeIdProps(node)
    const target = node ?? currentNode
    const hasChildren = hasChildrenProp ?? target.children?.length > 0
    return (
      <div {...nodeId} {...props} className={className} style={style}>
        {hasChildren ? (
          children
        ) : placeholder ? (
          <div style={{ height }} className="dn-droppable-placeholder">
            <NodeTitleWidget node={target} />
          </div>
        ) : (
          children
        )}
        {actions?.length ? (
          <NodeActionsWidget>
            {actions.map((action, key) => (
              <NodeActionsWidget.Action {...action} key={key} />
            ))}
          </NodeActionsWidget>
        ) : null}
      </div>
    )
  }
)
