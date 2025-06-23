import { GithubOutlined } from '@ant-design/icons'
import { observer } from '@formily/react'
import { GlobalRegistry } from '@kdesignable/core'
import { TextWidget, useDesigner } from '@kdesignable/react'
import { Button, Space } from 'antd'
import React, { useEffect } from 'react'
import { loadInitialSchema, saveSchema } from '../service'

export const ActionsWidget = observer(() => {
  const designer = useDesigner()
  useEffect(() => {
    GlobalRegistry.setDesignerLanguage('en-us')
    loadInitialSchema(designer)
  }, [])

  return (
    <Space style={{ marginRight: 10 }}>
      <Button href="https://github.com/potop/kdesignable" target="_blank">
        <GithubOutlined />
        Github
      </Button>
      <Button
        onClick={() => {
          saveSchema(designer)
        }}
      >
        <TextWidget>Save</TextWidget>
      </Button>
      <Button
        type="primary"
        onClick={() => {
          saveSchema(designer)
        }}
      >
        <TextWidget>Publish</TextWidget>
      </Button>
    </Space>
  )
})
