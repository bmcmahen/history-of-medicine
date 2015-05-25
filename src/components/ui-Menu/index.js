import React, {Component, PropTypes} from 'react'
import Menu from './menu.js'

class MenuController extends Component {

  static propTypes = {
    title: PropTypes.string
  }

  constructor(props){
    super(props)
    this.state = {isOpen: false}
  }

  render(){

    return (
      <Menu isOpen={this.state.isOpen}
        onRequestClose={this.close.bind(this)}
        title={this.props.title}
        onRequestOpen={this.open.bind(this)}>
        <button onClick={this.close.bind(this)}>Click me</button>
      </Menu>
    )
  }

  close(){
    this.setState({ isOpen: false })
  }

  open(){
    this.setState({ isOpen: true })
  }
}

export default MenuController
