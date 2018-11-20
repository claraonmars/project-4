import React from 'react'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default class Index extends React.Component{
    constructor(){
    super();
}

    render(){
        let loggedin = this.props.loggedin

////////////////////////////////////////////////////////////
//IF USER LOGGED IN//
////////////////////////////////////////////////////////////

        if (loggedin === 'true'){
            return(<div>
            <h1>Welcome back!</h1>
            <a href="/accounts/new"><button>Start Saving!</button></a>
            <a href="/transactions"><button>View transactions!</button></a>
            <a href="/investments"><button>Start Investing!</button></a>
          </div>);
        }

////////////////////////////////////////////////////////////
//IF USER NOT LOGGED IN//
////////////////////////////////////////////////////////////

        else{
            return(<div>
            <h1>Welcome!</h1>
            <a href="/users/sign_up"><button>Sign Up</button></a>
            <a href="/users/sign_in"><button>Sign In</button></a>

          </div>);
        }

  }
}