import { isPlainObj, reduce } from '@formily/shared'
import { TextWidget, usePrefix } from '@kdesignable/react'
import { MonacoInput } from '@kdesignable/react-settings-form'
import { Menu } from 'antd'
import React, { useState } from 'react'
import { FieldProperties } from './properties'
export interface IFieldProperty {
  [key: string]: string
}

export interface IFieldPropertySetterProps {
  extraLib?: string
  value?: IFieldProperty
  onChange?: (value: IFieldProperty) => void
}

const template = (code: string) => {
  if (!code) return
  return code.trim()
}

export const FieldPropertySetter: React.FC<IFieldPropertySetterProps> = (
  props
) => {
  const [selectKeys, setSelectKeys] = useState(['visible'])
  const prefix = usePrefix('field-property-setter')
  const value = { ...props.value }

  const parseExpression = (expression: string) => {
    if (!expression) return ''
    return String(expression).match(/^\{\{([\s\S]*)\}\}$/)?.[1] || ''
  }

  const filterEmpty = (value: object) => {
    return reduce(
      value,
      (buf, value, key) => {
        if (!value || value === '{{}}') return buf
        buf[key] = value
        return buf
      },
      {}
    )
  }

  const currentProperty = FieldProperties.find(
    (item) => item.key === selectKeys[0]
  )

  const items = FieldProperties.map((key) => {
    if (isPlainObj(key)) {
      return {
        key: key.key,
        label: (
          <TextWidget
            token={`SettingComponents.ReactionsSetter.${key.token || key.key}`}
          />
        ),
      }
    }
    return {
      key: key as string,
      label: (
        <TextWidget token={`SettingComponents.ReactionsSetter.${key}`} />
      ),
    }
  })

  return (
    <div className={prefix}>
      <Menu
        mode="vertical"
        style={{
          width: 200,
          height: 300,
          paddingRight: 4,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
        defaultSelectedKeys={selectKeys}
        selectedKeys={selectKeys}
        onSelect={({ selectedKeys }) => {
          setSelectKeys(selectedKeys)
        }}
        items={items}
      />
      <div className={prefix + '-coder-wrapper'}>
        <div className={prefix + '-coder-start'}>
          {`$self.${selectKeys[0]} = (`}
          <span
            style={{
              fontSize: 14,
              marginLeft: 10,
              color: '#888',
              fontWeight: 'normal',
            }}
          >
            {'//'}{' '}
            <TextWidget token="SettingComponents.ReactionsSetter.expressionValueTypeIs" />{' '}
            {'`'}
            {currentProperty?.type}
            {'`'}
          </span>
        </div>
        <div className={prefix + '-coder'}>
          <MonacoInput
            key={selectKeys[0]}
            language="javascript.expression"
            extraLib={props.extraLib}
            helpCode={template(currentProperty?.helpCode)}
            value={parseExpression(value[selectKeys[0]])}
            options={{
              lineNumbers: 'off',
              wordWrap: 'on',
              glyphMargin: false,
              folding: false,
              lineDecorationsWidth: 0,
              lineNumbersMinChars: 0,
              minimap: {
                enabled: false,
              },
            }}
            onChange={(expression) => {
              props.onChange?.(
                filterEmpty({
                  ...value,
                  [selectKeys[0]]: `{{${expression}}}`,
                })
              )
            }}
          />
        </div>
        <div className={prefix + '-coder-end'}>{`)`}</div>
      </div>
    </div>
  )
}
