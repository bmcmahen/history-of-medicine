'use strict'

import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import CloseButton from '../ui-Close'
import {RouteHandler} from 'react-router'

if (__CLIENT__) {
  require('./index.css')
}

class Container extends Component {

  displayName = 'Container'

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestOpen: PropTypes.func.isRequired,
    main: PropTypes.node.isRequired,
    detail: PropTypes.node.isRequired,
    onRequestClose: PropTypes.func.isRequired
  }

  constructor(props){
    super(props)
    this.state = {}
    this.onWindowClick = this.onWindowClick.bind(this)
  }

  componentDidMount(){
    window.addEventListener('click', this.onWindowClick)
  }

  componentWillUnmount(){
    window.removeEventListener('click', this.onWindowClick)
  }

  onWindowClick(e){
    // request to close menu when clicking outside of
    // the menu when it is already open
    if (this.state.isOpen) {
      e.stopPropagation()
      let el = React.findDOMNode(this.refs.detail)
      if (!el.contains(e.target)) {
        this.setState({ isOpen: false })
      }
    }
  }

  render(){

    const classes = classNames({
      'Container': true
    })

    const main = classNames({
      'Container__main': true,
      'open': this.props.isOpen
    })

    const detail = classNames({
      'Container__detail': true,
      'open': this.props.isOpen
    })

    return (
      <div className={classes}>
        <section className={main}>
          {this.props.main}
        </section>
        <section ref='detail' className={detail}>
          <CloseButton onClick={this.hideDetail.bind(this)} />
          {this.props.detail}
        </section>
      </div>
    )
  }

  showDetail(e){
    e.stopPropagation()
    this.props.onRequestOpen()
  }

  hideDetail(){
    this.props.onRequestClose()
  }
}

export default Container
