import { DroppableWidget, IDroppableWidgetProps } from '@designable/react'
import { observer } from '@formily/reactive-react'
import React, { PropsWithChildren } from 'react'
import './styles.less'

export const Container: React.FC<PropsWithChildren<IDroppableWidgetProps>> =
  observer((props) => {
    return <DroppableWidget {...props}>{props.children}</DroppableWidget>
  })

export const withContainer = (Target: React.JSXElementConstructor<any>) => {
  return (props: any) => {
    return (
      <DroppableWidget {...props}>
        <Target {...props} />
      </DroppableWidget>
    )
  }
}
