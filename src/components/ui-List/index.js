import React from 'react';

if (__CLIENT__) {
  require('./index.css');
}

class List extends React.Component {

  render(){

    return (
      <div>
        <p>Hello</p>
        <button onClick={this.changeName.bind(this)}>Change Name</button>
      </div>

    );
  }

  changeName(){
    this.props.flux.getActions('users').getUser('bento');
  }
}

export default List;
