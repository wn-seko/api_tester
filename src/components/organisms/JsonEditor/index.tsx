import * as React from 'react'

import AceEditor from 'react-ace'

import 'brace/mode/json'
import 'brace/theme/github'

interface Props {
  name: string
  value: string
  setFieldValue: (name: string, value: string) => void
}

const JsonEditor = (props: Props) => {
  const { name, value, setFieldValue } = props

  const onChange = (value: string) => {
    setFieldValue(name, value)
  }

  return (
    <AceEditor
      mode="json"
      theme="github"
      width="800px"
      height="200px"
      name={name}
      value={value}
      showPrintMargin={false}
      tabSize={2}
      onChange={onChange}
      editorProps={{ $blockScrolling: true }}
    />
  )
}

export default JsonEditor
