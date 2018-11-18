import React from 'react'
import Index from './index/index'
import Form from './form/form'

import {Switch, Route} from 'react-router-dom'


export default class App extends React.Component{
    constructor(){
    super();
    this.state = {
        loggedin:false
    }

}
    componentDidMount(){
    var reactThis = this
    fetch('http://localhost:3000/check_user',{
        method: 'get',
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
        reactThis.setState({ loggedin: data.loggedin });
        console.log(reactThis.state.loggedin);
    })
}

  render(){

    return(<div>

            <Index loggedin={this.state.loggedin}/>
          </div>);
  }
}