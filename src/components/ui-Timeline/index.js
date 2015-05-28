'use strict'

import React, {Component, PropTypes} from 'react'
import Container from '../ui-Container'
import {RouteHandler, Link} from 'react-router'
import Detail from '../ui-Detail'

class AppTimeline extends Component {

  displayName = 'AppTimeline'

  static contextTypes = {
    router: PropTypes.func.isRequired
  }

  static propTypes = {
    user: PropTypes.object.isRequired,
    activeDocument: PropTypes.object,
    activeId: PropTypes.string,
    docs: PropTypes.array
  }

  static fetchData (params, flux) {
    let appActions = flux.getActions('app')
    let appStore = flux.getStore('app')
    if (appStore.state.title !== 'Timeline') {
      return appActions.setTitle('Timeline')
    }
  }

  constructor (props) {
    super(props)
    this.state = { isOpen: false }
  }

  render () {
    return (
      <Container
        main={this.renderTimeline()}
        detail={this.renderDetail()}
        onRequestOpen={this.onRequestOpen.bind(this)}
        onRequestClose={this.onRequestClose.bind(this)}
        isOpen={this.state.isOpen}
      />
    )
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.activeId) {
      this.setState({ isOpen: true })
    } else {
      this.setState({ isOpen: false })
    }
  }

  componentDidMount(){
    this.componentWillReceiveProps(this.props)
  }

  renderTimeline () {
    return (
      <div>
        Timeline main content
        <Link to='timeline-detail' params={{id: 'hello'}}>
          Show Detail
        </Link>
      </div>
    )
  }

  renderDetail () {
    return (
      <Detail
        user={this.props.user}
        activeDocument={this.props.activeDocument}
      />
    )
  }

  onRequestOpen () {

  }

  onRequestClose () {
    this.context.router.replaceWith('timeline')
  }
}

export default AppTimeline
