import { Engine, GlobalRegistry } from '@designable/core'
import React, { PropsWithChildren, useEffect, useRef } from 'react'
import { DesignerEngineContext } from '../context'
import { useDesigner } from '../hooks'
import * as icons from '../icons'
import { IDesignerProps } from '../types'
import { GhostWidget } from '../widgets'
import { Layout } from './Layout'

GlobalRegistry.registerDesignerIcons(icons)

export const Designer: React.FC<PropsWithChildren<IDesignerProps>> = ({
  prefixCls = 'dn-',
  theme = 'light',
  children,
  ...props
}) => {
  const engine = useDesigner()
  const ref = useRef<Engine>(null)
  useEffect(() => {
    if (props.engine) {
      if (props.engine && ref.current) {
        if (props.engine !== ref.current) {
          ref.current.unmount()
        }
      }
      props.engine.mount()
      ref.current = props.engine
    }
    return () => {
      if (props.engine) {
        props.engine.unmount()
      }
    }
  }, [props.engine])

  if (engine)
    throw new Error(
      'There can only be one Designable Engine Context in the React Tree'
    )

  return (
    <Layout prefixCls={prefixCls} theme={theme} {...props}>
      <DesignerEngineContext.Provider value={props.engine}>
        {children}
        <GhostWidget />
      </DesignerEngineContext.Provider>
    </Layout>
  )
}
