import { each } from '@kdesignable/shared'
import cls from 'classnames'
import React, {
  Fragment,
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useRef,
} from 'react'
import { DesignerLayoutContext } from '../context'
import { IDesignerLayoutProps } from '../types'

export const Layout: React.FC<PropsWithChildren<IDesignerLayoutProps>> = ({
  theme = 'light',
  prefixCls = 'dn-',
  position = 'fixed',
  children,
  ...props
}) => {
  const layout = useContext(DesignerLayoutContext)
  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (ref.current) {
      each(props.variables, (value, key) => {
        ref.current.style.setProperty(`--${key}`, value)
      })
    }
  }, [])

  if (layout) {
    return <Fragment>{children}</Fragment>
  }
  return (
    <div
      ref={ref}
      className={cls({
        [`${prefixCls}app`]: true,
        [`${prefixCls}${theme}`]: theme,
      })}
    >
      <DesignerLayoutContext.Provider
        value={{
          theme: theme,
          prefixCls: prefixCls,
          position: position,
        }}
      >
        {children}
      </DesignerLayoutContext.Provider>
    </div>
  )
}
