import Promise from 'bluebird';

export default {

  getUserById(id) {
    return fetch('/api/user')
      .then(res => {
        return { name: 'ben' };
      });
  }

};
