import React from 'react'

export default class Form extends React.Component{
    constructor(){
    super();
    this.state={
        current:{
        sort: 'hello world',
        user_id: 1
                },
        current_account: ''

    }

    this.changeHandler = this.changeHandler.bind(this)
    this.createCurrentAcc = this.createCurrentAcc.bind(this)
}

    changeHandler(event) {
        this.setState({ current_account: event.target.value });
        console.log("change", event.target.value);
    }

    createCurrentAcc(){
    var reactThis = this
    fetch('http://localhost:3000/currents',{
        method: 'post',
        body: JSON.stringify(reactThis.state.current),
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
            <input onChange={this.changeHandler} value={this.current_account}/>
            <button onClick={this.createCurrentAcc}>submit</button>
          </div>);
  }
}