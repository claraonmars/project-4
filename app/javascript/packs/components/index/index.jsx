import React from 'react'

export default class Index extends React.Component{
    constructor(){
    super();
    this.state = {
        loggedin:false
    }
}

    render(){
    return(<div>
            <h1>Welcome!</h1>
            <a href="/users/sign_up"><button>Sign Up</button></a>
            <a href="/users/sign_in"><button>Sign In</button></a>
          </div>);
  }
}