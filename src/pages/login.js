import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { authLogin, authSignup } from '../action/authAction'
import { validateEmail, validatePassword } from '../action/validationAction'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const sAlert = withReactContent(Swal)

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'login',
      email: '',
      emailValidation: { status: false, message: '' },
      password: '',
      passwordValidation: { status: false, message: '' },
      loginState: { status: true, message: '' },
      rePassword: '',
      rePasswordValidation: { match: true, message: '' },
    }
  }

  classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  async onBtLogin() {
    // await this.props.authLogin(email, password)
    if (this.state.email === '') {
      this.setState({
        emailValidation: {
          status: true,
          message: 'Please input email address',
        },
      })
    }

    if (this.state.password === '') {
      this.setState({
        passwordValidation: { status: true, message: 'Please input password' },
      })
    }

    if (
      !this.state.emailValidation.status &&
      !this.state.passwordValidation.status &&
      !this.state.email == '' &&
      !this.state.password == ''
    ) {
      await this.props
        .authLogin(this.state.email, this.state.password)
        .then(res => {
          return <Redirect to='/' />
        })
        .catch(err => {
          sAlert.fire({
            icon: 'error',
            title: <p>Oops...!</p>,
            text: err.error,
            showCloseButton: true,
            confirmButtonColor: '#3B82F6',
            width: 400,
          })
        })
    }
    //   console.log(this.state.email, this.state.password)
  }

  async onBtSignup() {
    if (this.state.email === '') {
      this.setState({
        emailValidation: {
          status: true,
          message: 'Please input email address',
        },
      })
    }

    if (this.state.password === '') {
      this.setState({
        passwordValidation: { status: true, message: 'Please input password' },
      })
    }

    if (this.state.rePassword === '') {
      this.setState({
        rePasswordValidation: {
          match: false,
          message: 'Please re-input password',
        },
      })
    }

    if (
      !this.state.emailValidation.status &&
      !this.state.passwordValidation.status &&
      !this.state.email == '' &&
      !this.state.password == '' &&
      this.state.rePasswordValidation.match
    ) {
      await this.props
        .authSignup(this.state.email, this.state.password)
        .then(() => {
          sAlert.fire({
            icon: 'success',
            title: <p>Success</p>,
            showCloseButton: true,
            confirmButtonColor: '#3B82F6',
            width: 400,
          })
          this.setState({ type: 'login' })
        })
        .catch(err => {
          sAlert.fire({
            icon: 'error',
            title: <p>Oops...!</p>,
            text: err.error,
            showCloseButton: true,
            confirmButtonColor: '#3B82F6',
            width: 400,
          })
        })
    }
  }

  async onBlurEmail(email) {
    this.setState({ email: email })
    await this.props.validateEmail(email)
    if (this.props.inputValidation.status) {
      this.setState({
        emailValidation: {
          status: true,
          message: this.props.inputValidation.message,
        },
      })
    } else {
      this.setState({ emailValidation: { status: false, message: '' } })
    }
  }

  async onBlurPassword(password) {
    this.setState({ password: password })
    await this.props.validatePassword(password)
    if (this.props.inputValidation.status) {
      this.setState({
        passwordValidation: {
          status: true,
          message: this.props.inputValidation.message,
        },
      })
    } else {
      this.setState({ passwordValidation: { status: false, message: '' } })
    }
  }

  async onBlurRePassword(password) {
    this.setState({ rePassword: password })
    if (password === this.state.password) {
      this.setState({ rePasswordValidation: { match: true, message: '' } })
    } else {
      this.setState({
        rePasswordValidation: {
          match: false,
          message: 'Password does not match',
        },
      })
    }
  }

  onChangeType() {
    if (this.state.type == 'login') {
      this.setState({ type: 'signup' })
    } else {
      this.setState({ type: 'login' })
    }
  }

  render() {
    if (this.props.user) return <Redirect to='/' />
    return (
      <div>
        <label
          className='pt-10 pb-5 block text-gray-800 text-2xl font-bold mb-2'
          htmlFor='appname'
        >
          {this.state.type == 'login' ? 'Log In' : 'Sign Up'} to{' '}
          {process.env.REACT_APP_NAME}
        </label>
        <div className='flex justify-center text-left'>
          <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 lg:w-1/3 md:w-1/2'>
            <div className='mb-4'>
              <label
                className='block text-gray-800 text-sm font-bold mb-2'
                htmlFor='email'
              >
                Email
              </label>
              <input
                onBlur={e => this.onBlurEmail(e.target.value)}
                className={this.classNames(
                  this.state.emailValidation.status ? 'border-red-600' : '',
                  'shadow appearance-none rounded border w-full py-2 px-3 text-gray-800'
                )}
                id='email'
                type='text'
                placeholder='Email'
              ></input>
              {this.state.emailValidation.status ? (
                <p className='text-red-600 text-xs italic'>
                  {this.state.emailValidation.message}
                </p>
              ) : (
                ''
              )}
            </div>
            <div className='mb-6'>
              <label
                className='block text-gray-800 text-sm font-bold mb-2'
                htmlFor='password'
              >
                Password
              </label>
              <input
                onBlur={e => this.onBlurPassword(e.target.value)}
                className={this.classNames(
                  this.state.passwordValidation.status ? 'border-red-600' : '',
                  'shadow appearance-none rounded border w-full py-2 px-3 text-gray-800'
                )}
                id='password'
                type='password'
                placeholder='******************'
              ></input>
              {this.state.passwordValidation.status ? (
                <p className='text-red-600 text-xs italic'>
                  {this.state.passwordValidation.message}
                </p>
              ) : (
                ''
              )}
            </div>
            <div className='mb-6' hidden={this.state.type != 'signup'}>
              <label
                className='block text-gray-800 text-sm font-bold mb-2'
                htmlFor='repassword'
              >
                Re-Password
              </label>
              <input
                onBlur={e => this.onBlurRePassword(e.target.value)}
                className={this.classNames(
                  !this.state.rePasswordValidation.match
                    ? 'border-red-600'
                    : '',
                  'shadow appearance-none rounded border w-full py-2 px-3 text-gray-800'
                )}
                id='repassword'
                type='password'
                placeholder='******************'
              ></input>
              {!this.state.rePasswordValidation.match ? (
                <p className='text-red-600 text-xs italic'>
                  {this.state.rePasswordValidation.message}
                </p>
              ) : (
                ''
              )}
            </div>
            <div className='flex items-center justify-between'>
              <button
                onClick={() => this.onBtLogin()}
                className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded'
                type='button'
                hidden={this.state.type != 'login'}
              >
                Log In
              </button>
              <button
                onClick={() => this.onBtSignup()}
                className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded'
                type='button'
                hidden={this.state.type != 'signup'}
              >
                Sign Up
              </button>
              <div className='flex items-center justify-end'>
                <a
                  onClick={() => this.onChangeType()}
                  className='inline-block font-bold text-sm text-blue-500 hover:text-blue-400 pr-4'
                  href='#'
                >
                  {this.state.type == 'login' ? 'Sign Up' : 'Log In'}
                </a>

                <a
                  className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-400'
                  href='#'
                >
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ authReducer, validationReducer }) => {
  return {
    user: authReducer.user,
    inputValidation: validationReducer,
  }
}

export default connect(mapStateToProps, {
  authLogin,
  authSignup,
  validateEmail,
  validatePassword,
})(Login)
