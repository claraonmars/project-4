import React from 'react'

export default class Index extends React.Component{
    constructor(){
    super();
    this.state = {
        loggedin:false
    }
    this.makeQuery= this.makeQuery.bind(this);

}

    makeQuery(){

    var reactThis = this

    let newPost={
        post:{
        name:'hello world',
        title:'that is something'}
    }

    fetch('http://localhost:3000/savings',{
        method: 'post',
        body: JSON.stringify(newPost),
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
    })
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log('post req', data);
    })

    }



    render(){
    return(<div>
            <h1>Welcome!</h1>
            <a href="/users/sign_up"><button>Sign Up</button></a>
            <a href="/users/sign_in"><button>Sign In</button></a>
          </div>);
  }
}