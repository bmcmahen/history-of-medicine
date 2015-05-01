import React from 'react';

class List extends React.Component {

  render(){

    return (
      <div>
        <p>Hello {this.props.user.name}</p>
        <button onClick={this.changeName.bind(this)}>Change Name</button>
      </div>

    );
  }

  changeName(){
    this.props.flux.getActions('users').getUser('bento');
  }
}

export default List;
