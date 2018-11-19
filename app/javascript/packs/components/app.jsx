import React from 'react'
import PropTypes from 'prop-types';

import Index from './index/index'
import Form from './form/form'

import {Switch, Route} from 'react-router-dom'


export default class App extends React.Component{
    constructor(){
    super();
    this.state = {
        loggedin:false,
        id: 0
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
        reactThis.setState({ loggedin: data.loggedin , id: data.user[0].id});
    })
}

  render(){

    return(<div>
             <Switch>
                <Route exact path="/" render={(props) => <Index {...props} loggedin={this.state.loggedin}/>}/>
                <Route path="/accounts/new" render={(props) => <Form {...props} user_id={this.state.id}/>}/>
            </Switch>
          </div>);
  }
}


