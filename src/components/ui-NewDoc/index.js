'use strict';

import React, {Component, PropTypes} from 'react';

class NewDoc extends Component {

  static displayName = 'NewDoc'

  constructor(props){
    super(props);
    this.state = {
      value: {
        name: 'ben',
        surname: 'superman'
      },
      error: null
    };
  }

  onSubmit(e){

  }

  onChange(value){
    this.setState({value});
  }

  render(){

    return (
      <div/>
    );
  }
}

export default NewDoc;
