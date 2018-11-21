import React from 'react'
import PropTypes from 'prop-types';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//onClick={() => this.props.display(item)}

class Current extends React.Component{
    render(){
        return(<div className={this.props.class}>
            You are currently viewing your CURRENT ACCOUNT TRANSACTIONS <br/>
            <button onClick={this.props.switch}>View SAVINGS ACCOUNT TRANSACTIONS</button>

            {this.props.trans.map((trans, i) => (
                <li key={i} >
                {trans.id} |
                ${trans.amount} |
                ${trans.balance} |
                {trans.sort} |
                {trans.operation} |
                {trans.merchant_id} |
                {trans.date}
                </li>
            ))}
            </div>)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Saving extends React.Component{
    render(){
        return(<div className={this.props.class}>
            You are currently viewing your SAVING ACCOUNT TRANSACTIONS <br/>
            <button onClick={this.props.switch}>View CURRENT ACCOUNT TRANSACTIONS</button>

            {this.props.trans.map((trans, i) => (
                <li key={i} >
                {trans.id} |
                ${trans.amount} |
                ${trans.balance} |
                {trans.sort} |
                {trans.operation} |
                {trans.merchant_id} |
                {trans.date}
                </li>
            ))}
            </div>)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Trans extends React.Component{
    constructor(){
    super();
    this.state={
        saving_class: 'hidden',
        current_class: 'normal',
        current_trans: [],
        saving_trans: []
    }

    this.switchToSaving = this.switchToSaving.bind(this)
    this.switchToCurrent = this.switchToCurrent.bind(this)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//UNRESOLVED: need to get account/:id from user table             TRANSACTION DATA AJAX CALL
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    componentDidMount(){
    var reactThis = this

    fetch('http://localhost:3000/accounts/2/savings',{
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
        reactThis.setState({saving_trans: data})
    })

    fetch('http://localhost:3000/accounts/1/currents',{
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
        reactThis.setState({current_trans: data})
    })
}

    switchToSaving(){
        this.setState({current_class:'hidden', saving_class:'normal'})
    }

    switchToCurrent(){
        this.setState({current_class:'normal', saving_class:'hidden'})
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//RENDER//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    render(){
        return(
            <div>
                <Current class={this.state.current_class} trans={this.state.current_trans} switch={this.switchToSaving}/>
                <Saving class={this.state.saving_class} trans={this.state.saving_trans} switch={this.switchToCurrent}/>
            </div>);
        }
}

export default Trans;