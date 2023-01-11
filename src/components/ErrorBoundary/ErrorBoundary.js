import React from "react"
import PropTypes from "prop-types"
import Error from "../../pages/ErrorPage/ErrorPage"
import useErrorStore from "../../states/Error"
import * as Sentry from "@sentry/react"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // trigger fallback UI.
    this.props.setError(error)
  }

  componentDidCatch(error, errorInfo) {
    // send error to sentry service
    Sentry.captureException(error, errorInfo)
  }

  render() {
    const { error, hasError, setError } = this.props

    if (this.props.hasError()) {
      return <Error error={error} hasError={hasError} setError={setError} />
    }
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
  error: PropTypes.object,
  setError: PropTypes.func,
  hasError: PropTypes.func,
}

const withErrorStore = (Component) =>
  function addErrorStore(props) {
    const { error, setError, hasError } = useErrorStore()
    return <Component {...props} error={error} setError={setError} hasError={hasError} />
  }

export default withErrorStore(ErrorBoundary)
