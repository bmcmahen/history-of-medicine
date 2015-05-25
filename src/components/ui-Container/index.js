'use strict'

import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'

if (__CLIENT__) {
  require('./index.css')
}

class Container extends Component {

  displayName = 'Container'

  static proptTypes = {
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
      'open': this.state.isOpen
    })

    const detail = classNames({
      'Container__detail': true,
      'open': this.state.isOpen
    })

    return (
      <div className={classes}>
        <section className={main}>
          <h1>Main</h1>
          <button onClick={this.showDetail.bind(this)}>
            show detail
          </button>
        </section>
        <section ref='detail' className={detail}>
          <h1>Detail</h1>
          <button onClick={this.hideDetail.bind(this)}>
            hide detail
          </button>
        </section>
      </div>
    )
  }

  showDetail(e){
    e.stopPropagation()
    this.setState({ isOpen: true })
  }

  hideDetail(){
    this.setState({ isOpen: false })
  }
}

export default Container
