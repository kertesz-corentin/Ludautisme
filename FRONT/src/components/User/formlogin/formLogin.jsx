 import React from 'react'
 import PropTypes from 'prop-types'
 import classnames from 'classnames'
 import './formlogin.scss'
 import { TextField } from '@mui/material';
  const FormLogin = ({className, ...rest}) => {
      return (
      <form  className={classnames('formlogin', className)} {...rest}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Adresse email"
            name="email"
            autoComplete="email"
            autoFocus
            />
    </form>    )
 }

FormLogin.propTypes = {     className: PropTypes.string, }
FormLogin.defaultProps = {     className: '', }
export default React.memo(FormLogin)
