'use strict'

import React, {PropTypes} from 'react'
import {Link} from '../Router'
import Container from '../ui-Container'
import Menu from '../ui-Menu'
import {RouteHandler} from 'react-router'

if (__CLIENT__) {
  require('./index.css')
}

class List extends React.Component {

  static contextTypes = {
    router: PropTypes.func
  }

  static propTypes = {
    flux: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
  }

  displayName = 'List'

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {

    return (
      <div className='List'>
        <Menu title={this.props.title} />
        <RouteHandler
          user={this.props.user}
          activeId={this.context.router.getCurrentParams().id}
        />
      </div>

    )
  }

}

export default List
