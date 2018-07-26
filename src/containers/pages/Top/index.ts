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
  requestPost: typeof actions.request.requestPost
}

interface FormValues {
  headers: string
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
    const { requestPost } = actions.request
    return bindActionCreators({ requestPost }, dispatch)
  }
)

const withForm = withFormik<FormikProps, FormValues>({
  handleSubmit: (values, { setSubmitting, props }) => {
    setSubmitting(true)

    const baseURL = values.baseUrl
    const path = values.path
    const headers = parseToJson(values.headers)
    const data = parseToJson(values.body)

    if (!headers || !data) {
      return
    }

    props.requestPost(baseURL, path, headers, data)
  },

  mapPropsToValues: () => ({
    headers: '{}',
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
