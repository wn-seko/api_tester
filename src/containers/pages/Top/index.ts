import { compose, pure, withProps } from 'recompose'
import { withRouter } from 'react-router-dom'
import { withFormik, InjectedFormikProps } from 'formik'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions, RootState } from '../../../modules'
import { requestSelector } from '../../../modules/selector'
import { RequestSettings } from '../../../modules/request/types'

import Top from '../../../components/templates/Top'

interface FormikProps {
  requestGet: typeof actions.request.requestGet
  requestPost: typeof actions.request.requestPost
  requestPut: typeof actions.request.requestPut
  requestDelete: typeof actions.request.requestDelete
}

interface FormValues {
  method: string
  headers: string
  query: string
  body: string
  baseUrl: string
  path: string
}

export type FormProps = InjectedFormikProps<{}, FormValues>

const connector = connect(
  (state: RootState) => ({
    level: requestSelector.getLevel(state),
    loading: requestSelector.getLoading(state),
    response: requestSelector.getResponse(state)
  }),
  dispatch => {
    const { requestGet, requestPost, requestPut, requestDelete } = actions.request
    return bindActionCreators({ requestGet, requestPost, requestPut, requestDelete }, dispatch)
  }
)

const withForm = withFormik<FormikProps, FormValues>({
  handleSubmit: (values, { setSubmitting, props }) => {
    setSubmitting(true)

    const method = values.method
    const baseURL = values.baseUrl
    const path = values.path
    const headers = parseToJson(values.headers)
    const params = parseToJson(values.query)
    const data = parseToJson(values.body)

    if (!headers || !data) {
      return
    }

    switch (method) {
      case 'get':
        props.requestGet(baseURL, path, headers, params)
        break
      case 'put':
        props.requestPut(baseURL, path, headers, data)
        break
      case 'post':
        props.requestPost(baseURL, path, headers, data)
        break
      case 'delete':
        props.requestDelete(baseURL, path, headers, params)
        break
    }
  },

  mapPropsToValues: () => ({
    method: 'get',
    headers: '{}',
    query: '{}',
    body: '{}',
    baseUrl: '',
    path: ''
  })
})

const parseToJson = (stringify: string) => {
  try {
    return JSON.parse(stringify)
  } catch {
    return null
  }
}

const withHandleOpenQuery = withProps((props: FormProps) => ({
  handleOpenQuery: (settings: RequestSettings) => {
    props.setFieldValue('method', settings.method)
    props.setFieldValue('headers', JSON.stringify(settings.headers, null, '  '))
    props.setFieldValue('body', JSON.stringify(settings.data, null, '  '))
    props.setFieldValue('baseUrl', settings.baseURL)
    props.setFieldValue('path', settings.url)
  }
}))

const enhancer = compose(
  withRouter,
  connector,
  withForm,
  withHandleOpenQuery,
  pure
)

export default enhancer(Top)
