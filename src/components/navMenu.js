/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import logo from '../assets/TOKOHOKI.svg'
import userImg from '../assets/img/user.png'
import { connect } from 'react-redux'
// import { Redirect } from 'react-router-dom'
import { authLogin, authLogout } from '../action/authAction'
class NavMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activePath: '/',
    }
  }

  classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  async onBtLogout() {
    await this.props.authLogout()
  }

  async onBtLogin() {
    // this.props.authLogin('hamzah.habibi@protonmail.com', 'Pa55w0rd')
  }

  render() {
    return (
      <Disclosure as='nav' className='bg-gray-50 shadow-lg'>
        {({ open }) => (
          <>
            <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
              <div className='relative flex items-center justify-between h-16'>
                <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
                  {/* Mobile menu button*/}
                  <Disclosure.Button className='inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <MenuIcon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
                <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                  <div className='flex-shrink-0 flex items-center'>
                    <Link to={{ pathname: '/' }}>
                      <img
                        onClick={() =>
                          this.setState({ activePath: '/products' })
                        }
                        className='hidden lg:block h-8 w-auto'
                        src={logo}
                        alt='TOKOHOKI'
                      />
                    </Link>
                  </div>
                  <div className='hidden sm:block sm:ml-6'>
                    <div className='flex space-x-4'>
                      {this.props.navList.map(item => (
                        <Link key={item.name} to={{ pathname: item.path }}>
                          <div
                            onClick={() =>
                              this.setState({ activePath: item.path })
                            }
                            className={this.classNames(
                              item.path === window.location.pathname ||
                                item.path === this.state.activePath
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-800 hover:bg-gray-700 hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={
                              item.path === window.location.pathname ||
                              item.path === this.state.activePath
                                ? 'page'
                                : undefined
                            }
                          >
                            {item.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                  <div className='flex space-x-4'>
                    {this.props.user ? this.props.user.data.email : ''}
                  </div>
                  <div className='sm:hidden pl-2' hidden={!this.props.user}>
                    <button
                      onClick={() => this.onBtLogout()}
                      className='inline-flex items-center bg-red-500 border-0 py-1 px-3 focus:outline-none hover:bg-red-400 rounded text-white'
                    >
                      Logout
                    </button>
                  </div>

                  {this.props.user ? (
                    <Menu as='div' className='ml-3 relative'>
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className='bg-gray-50 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'>
                              <span className='sr-only'>Open user menu</span>
                              <img
                                className='hidden lg:block h-8 w-auto'
                                src={userImg}
                                alt='user'
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter='transition ease-out duration-100'
                            enterFrom='transform opacity-0 scale-95'
                            enterTo='transform opacity-100 scale-100'
                            leave='transition ease-in duration-75'
                            leaveFrom='transform opacity-100 scale-100'
                            leaveTo='transform opacity-0 scale-95'
                          >
                            <Menu.Items
                              static
                              className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                            >
                              <Menu.Item onClick={() => this.onBtLogout()}>
                                {({ active }) => (
                                  <a
                                    className={this.classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    Sign out
                                  </a>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  ) : (
                    <Link to={{ pathname: '/login' }}>
                      <button
                        onClick={() => this.setState({ activePath: '/login' })}
                        className='inline-flex items-center bg-blue-500 border-0 py-1 px-3 focus:outline-none hover:bg-blue-400 rounded text-white'
                      >
                        Log In
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className='sm:hidden'>
              <div className='px-2 pt-2 pb-3 space-y-1'>
                {this.props.navList.map(item => (
                  <Link key={item.name} to={{ pathname: item.path }}>
                    <div
                      onClick={() => this.setState({ activePath: item.path })}
                      className={this.classNames(
                        item.path === window.location.pathname ||
                          item.path === this.state.activePath
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-800 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={
                        item.path === window.location.pathname ||
                        item.path === this.state.activePath
                          ? 'page'
                          : undefined
                      }
                    >
                      {item.name}
                    </div>
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )
  }
}

const mapStateToProps = ({ navReducer, authReducer }) => {
  return {
    user: authReducer.user,
    navList: navReducer.navList,
  }
}

export default connect(mapStateToProps, { authLogin, authLogout })(NavMenu)
