 import React from 'react'
 import PropTypes from 'prop-types'
 import classnames from 'classnames'
 import './formlogin.scss'
  const FormLogin = ({className, ...rest}) => {
      return (
      <form  className={classnames('formlogin', className)} {...rest}>
    </form>    )
 }

FormLogin.propTypes = {     className: PropTypes.string, }

FormLogin.defaultProps = {     className: '', }

 export default React.memo(FormLogin)
