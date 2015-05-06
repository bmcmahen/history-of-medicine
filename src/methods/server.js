'use strict';

export default [

  {
    name: 'getCurrentSession',
    method: function() {
      const User = this.col('users');
      return User.findOne().then(() => {
        return {name: 'ben' };
      });
    }
  }

];
