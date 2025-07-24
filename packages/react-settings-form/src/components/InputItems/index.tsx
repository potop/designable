import { IconWidget, usePrefix } from '@kdesignable/react'
import cls from 'classnames'
import React, { PropsWithChildren, useContext } from 'react'
import './styles.scss'

export interface IInputItemsContext {
  width?: string | number
  vertical?: boolean
}

export interface IInputItemsProps {
  className?: string
  style?: React.CSSProperties
  width?: string | number
  vertical?: boolean
}

export interface IInputItemProps {
  className?: string
  style?: React.CSSProperties
  icon?: React.ReactNode
  width?: string | number
  vertical?: boolean
  title?: React.ReactNode
}

const InputItemsContext = React.createContext<IInputItemsContext>(null)

export const InputItems: React.FC<PropsWithChildren<IInputItemsProps>> & {
  Item: React.FC<PropsWithChildren<IInputItemProps>>
} = ({ width = '100%', ...props }) => {
  const prefix = usePrefix('input-items')
  return (
    <InputItemsContext.Provider value={{ width, ...props }}>
      <div className={cls(prefix, props.className)} style={props.style}>
        {props.children}
      </div>
    </InputItemsContext.Provider>
  )
}

InputItems.Item = (props: PropsWithChildren<IInputItemProps>) => {
  const prefix = usePrefix('input-items-item')
  const ctx = useContext(InputItemsContext)
  return (
    <div
      className={cls(prefix, props.className, {
        vertical: props.vertical || ctx.vertical,
      })}
      style={{ width: props.width || ctx.width, ...props.style }}
    >
      {props.icon && (
        <div className={prefix + '-icon'}>
          <IconWidget infer={props.icon} size={16} />
        </div>
      )}
      {props.title && <div className={prefix + '-title'}>{props.title}</div>}
      <div className={prefix + '-controller'}>{props.children}</div>
    </div>
  )
}
