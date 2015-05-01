import Promise from 'bluebird';


export default [

  {
    name: 'getUserById',
    method: function() {
      const User = this.col('users');
      return User.findOne().then(() => {
        return {name: 'ben' };
      });
    }
  }

];
