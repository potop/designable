import { observer } from '@formily/reactive-react'
import { DroppableWidget, IDroppableWidgetProps } from '@kdesignable/react'
import React, { PropsWithChildren } from 'react'
import './styles.scss'

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
