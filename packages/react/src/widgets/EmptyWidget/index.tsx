import { observer } from '@formily/reactive-react'
import React, { PropsWithChildren } from 'react'
import { usePrefix, useTree } from '../../hooks'
import { IconWidget } from '../IconWidget'
import './styles.scss'

export interface IEmptyWidgetProps {
  dragTipsDirection?: 'left' | 'right'
}

export const EmptyWidget: React.FC<PropsWithChildren<IEmptyWidgetProps>> =
  observer(({ dragTipsDirection = 'left', children }) => {
    const tree = useTree()
    const prefix = usePrefix('empty')
    const renderEmpty = () => {
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="animations">
            <IconWidget
              infer={
                dragTipsDirection === 'left'
                  ? 'DragLeftSourceAnimation'
                  : 'DragRightSourceAnimation'
              }
              size={240}
            />
            <IconWidget infer="BatchDragAnimation" size={240} />
          </div>
          <div className="hotkeys-list">
            <div>
              Selection <IconWidget infer="Command" /> + Click /{' '}
              <IconWidget infer="Shift" /> + Click /{' '}
              <IconWidget infer="Command" /> + A
            </div>
            <div>
              Copy <IconWidget infer="Command" /> + C / Paste{' '}
              <IconWidget infer="Command" /> + V
            </div>
            <div>
              Delete <IconWidget infer="Delete" />
            </div>
          </div>
        </div>
      )
    }
    if (!tree?.children?.length) {
      return <div className={prefix}>{children ? children : renderEmpty()}</div>
    }
    return null
  })
