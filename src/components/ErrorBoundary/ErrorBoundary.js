import React from "react"
import PropTypes from "prop-types"
import Error from "../../pages/ErrorPage/ErrorPage"
import useErrorStore from "../../states/Error"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    this.props.setError(error)
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo)
  }

  render() {
    console.log(this.props)
    const { error, hasError, setError } = this.props
    if (this.props.hasError()) {
      // You can render any custom fallback UI
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
