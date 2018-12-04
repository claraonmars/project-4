import React from 'react'
import PropTypes from 'prop-types';
import 'whatwg-fetch';
import { Button } from 'mdbreact'

class Account extends React.Component{
    constructor(){
    super();
    this.state={
        current:'',
        saving:'',
    }
}

    componentDidMount(){
        var reactThis = this

        fetch('/accounts',{
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
            console.log(data)
            for (var i =0; i<data.length; i++){
                if (data[i].name === 'saving'){
                    reactThis.setState({saving: data[i]})
                }
                else if (data[i].name === 'current'){
                    reactThis.setState({current: data[i]})
                }
            }
        })

    }


render(){
    return(<div>
        <h1>Accounts</h1>
        Details of your accounts
        <div className='row justify-content-start debit'><br/>
        Bank: DBS/POSB<br/>
        Current Account : 123456789 <br/>
        Saving Account : 123456789
        </div>

        <a href='/accounts/new'><Button size="sm">Edit</Button></a>

    </div>)
}
}

export default Account;