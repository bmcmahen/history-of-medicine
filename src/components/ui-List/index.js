'use strict'

import React from 'react'
import {Link} from '../Router'
import Container from '../ui-Container'
import Menu from '../ui-Menu'

if (__CLIENT__) {
  require('./index.css')
}

class List extends React.Component {

  displayName = 'List'

  render () {

    return (
      <div className='List'>
        <Menu title='Guns and Stuff' />
        <Container />
      </div>

    )
  }
}

List.propTypes = {
  flux: React.PropTypes.object.isRequired
}

export default List
