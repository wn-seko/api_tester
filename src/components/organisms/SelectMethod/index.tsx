import * as React from 'react'
import { Select } from 'semantic-ui-react'

interface Props {
  name: string
  value: string
  setFieldValue: (name: string, value: string) => void
}

const SelectMethod = (props: Props) => {
  const { name, value, setFieldValue } = props

  const onChange = (_: any, { value }: { value: string }) => {
    setFieldValue(name, value)
  }

  const options = [
    { key: 'get', value: 'get', text: 'GET' },
    { key: 'post', value: 'post', text: 'POST' },
    { key: 'put', value: 'put', text: 'PUT' },
    { key: 'delete', value: 'delete', text: 'DELETE' }
  ]

  return <Select options={options} onChange={onChange} value={value} />
}

export default SelectMethod
