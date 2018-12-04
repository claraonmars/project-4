import React from 'react'
import PropTypes from 'prop-types';

import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

import { Button } from 'mdbreact'
import 'whatwg-fetch';



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Rounding extends React.Component{
    render(){
        return(<div className={this.props.class}>
            Rounding investments round up your purchases to the next dollar and invests the change in your savings account.
            <br/>
            <Button size="sm" onClick={this.props.setRounding}>Implement Rounding!</Button>

            </div>)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Recurring extends React.Component{
    render(){
        return(<div className={this.props.class}>
            Recurring investments add the set amount to your savings account every month.
            <br/>
            <input onChange={this.props.getRecurring} value={this.props.recurring_amt}/>
            <Button size="sm" onClick={this.props.setRecurring}>Recurr Monthly!</Button>
            </div>)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


class Oneoff extends React.Component{
    render(){
        return(<div className={this.props.class}>
            Make a one off investment.
            <br/>
            <input onChange={this.props.getoneoff} value={this.props.oneoff}/>
            <Button size="sm" onClick={this.props.setoneoff}>Invest now!</Button>
            </div>)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Invest extends React.Component{
    constructor(){
    super();
    this.state={
        user_id: 0,
        rounding_class:'hidden',
        recurring_class:'hidden',
        oneoff_class:'hidden',

        investment:{
        },

        transaction:{
            current:{
            },
            saving:{

            }
        },

        data:{

        }
    }

////////////////////////////////////////////////////////////
//SELECT INVESTMENT//
////////////////////////////////////////////////////////////

    this.rounding = this.rounding.bind(this)
    this.recurring = this.recurring.bind(this)
    this.oneoff = this.oneoff.bind(this)

////////////////////////////////////////////////////////////
//ADD INVESTMENT TYPE//
////////////////////////////////////////////////////////////

    this.setRounding = this.setRounding.bind(this)

    this.setRecurring = this.setRecurring.bind(this)
    this.getRecurring = this.getRecurring.bind(this)

    this.setoneoff = this.setoneoff.bind(this)
    this.getoneoff = this.getoneoff.bind(this)

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CHECK FOR EXISTING INVESTMENTS IN CURRENT ACCOUNT//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    componentDidMount(){
        var reactThis = this
        reactThis.setState({user_id: this.props.user_id})

////////////////////////////////////////////////////////////
//view current account's current investment plans //
////////////////////////////////////////////////////////////

        fetch('/investments',{
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

            for (var i = 0; i<data.accounts.length; i ++){
                if (data.accounts[i].name === 'current'){
                    for (var j = 0; j< data.investments.length; j ++){
                        if (data.investments[j].account_id === data.accounts[i].id){

                            //set state of investments
                            reactThis.setState({investment: data.investments[j]})

                                //set state as last current account transaction
                                fetch('/currents/'+ data.investments[j].id,{
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

                                    //set state of saving account_id
                                    var current = reactThis.state.transaction
                                    current.current = data
                                    reactThis.setState({transaction: current})

                                })
                        }
                    }
                }

                ////////////////////////////////////////////////////////////
                //set state as last current account transaction //
                ////////////////////////////////////////////////////////////

                else if(data.accounts[i].name === 'saving'){

                            fetch('/savings/'+ data.accounts[i].id,{
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

                                    //set state of saving account_id
                                    var current = reactThis.state.transaction
                                    current.saving = data
                                    reactThis.setState({transaction: current})

                                })

                            ////////////////////////////////////////////////////////////
                            // set state as all savings done through app //
                            ////////////////////////////////////////////////////////////

                            fetch('/accounts/'+ data.accounts[i].id+'/savings',{
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

                                    //set state of saving account_id
                                    // var current = reactThis.state.allSavings
                                    // current = data
                                    // reactThis.setState({allSavings: current})

                                    ////////////////////////////////////////////////////////////
                                    //ADD OVERVIEW OF SAVINGS IN CHART //
                                    ////////////////////////////////////////////////////////////

                                    var key = []
                                    var value = []
                                    var cat1amt = 0
                                    var cat2amt = 0
                                    var cat3amt = 0
                                    var otheramt = 0
                                    var result = {}


                                    for (var i = 0; i < data.length; i++){

                                        var newsplit = String(data[i].date)
                                        newsplit = newsplit.split('');
                                        newsplit = newsplit.slice(0, 4)
                                        newsplit = newsplit.join('')

                                        if (data[i].sort === 'CREDIT' && newsplit === '1812'){
                                            if(data[i].operation === 'One Off Invest'){
                                                cat1amt = cat1amt + parseFloat(data[i].amount)
                                            }
                                            else if(data[i].operation === 'Recurring'){
                                                cat2amt = cat2amt + parseFloat(data[i].amount)
                                            }
                                            else if(data[i].operation === 'Rounding Investment'){
                                                cat3amt = cat3amt + parseFloat(data[i].amount)
                                            }
                                            else{
                                                otheramt = otheramt + parseFloat(data[i].amount)
                                            }
                                        }
                                    }

                                    key.push('One Off Invest')
                                    key.push('Recurring')
                                    key.push('Rounding')
                                    key.push('Others')

                                    value.push(cat1amt)
                                    value.push(cat2amt)
                                    value.push(cat3amt)
                                    value.push(otheramt)

                                    key.forEach((key, i) => result[key] = value[i]);

                                    var current = reactThis.state.data
                                    current = result
                                    reactThis.setState({data: current})

                                })

                }
            }
        })

    }


////////////////////////////////////////////////////////////
//TRIGGER HIDE & DISPLAY//
////////////////////////////////////////////////////////////

    rounding(){
        this.setState({rounding_class: 'normal', recurring_class: 'hidden', oneoff_class: 'hidden'})
    }

    recurring(){
        this.setState({rounding_class: 'hidden', recurring_class: 'normal', oneoff_class: 'hidden'})
    }

    oneoff(){
        this.setState({rounding_class: 'hidden', recurring_class: 'hidden', oneoff_class: 'normal'})
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ADD ROUNDING//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    setRounding(){
        var reactThis = this

        var investment = this.state.investment
        investment.rounding = true
        this.setState({investment: investment})


        fetch('/investments/' + this.state.investment.id,{
                method: 'put',
                body: JSON.stringify(reactThis.state.investment),
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ADD RECURRING//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getRecurring(event){
        var investment = this.state.investment
        investment.recurring_amount = parseInt(event.target.value)
        this.setState({investment: investment})
        console.log(this.state.investment)
    }

    setRecurring(){
        var investment = this.state.investment
        investment.recurring = true
        this.setState({investment: investment})
        console.log('look here', this.state.investment)

        var reactThis = this
        fetch('/investments/' + reactThis.state.investment.id,{
                method: 'put',
                body: JSON.stringify(reactThis.state.investment),
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ADD ONE OFF//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getoneoff(event){
        var investment = this.state.investment
        investment.oneoff = parseInt(event.target.value)
        this.setState({investment: investment})
        console.log(event.target.value)
        console.log(this.state.investment)
    }

////////////////////////////////////////////////////////////
//UNRESOLVED:               MAKE AN IMMEDIATE TRANSACTION //
////////////////////////////////////////////////////////////

    setoneoff(){
        var reactThis = this

        console.log('look at me',reactThis.state.transaction)

        //get balance
        let newcurrenttransc = {
            current:{
                amount: reactThis.state.investment.oneoff,
                balance: parseInt(reactThis.state.transaction.current.balance) - parseInt(reactThis.state.investment.oneoff),
                sort: 'DEBIT',
                operation: 'One Off Invest',
                date: new Date(),
                account_id: reactThis.state.transaction.current.account_id,
                merchant_id: 0
            }
        }

        let newsavingtransc = {
            saving:{
                amount: reactThis.state.investment.oneoff,
                balance: parseInt(reactThis.state.transaction.saving.balance) + parseInt(reactThis.state.investment.oneoff),
                sort: 'CREDIT',
                operation: 'One Off Invest',
                date: new Date(),
                account_id: reactThis.state.transaction.saving.account_id
            }
        }

        //make a new transaction to transfer $ from current ...
        fetch('/currents/',{
                method: 'post',
                body: JSON.stringify(newcurrenttransc),
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   }
            })
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log('current',newcurrenttransc);
                console.log('data',data);
        })

        // ....to savings
        fetch('/savings/',{
                method: 'post',
                body: JSON.stringify(newsavingtransc),
                headers : {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                   }
            })
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log('saving', newsavingtransc);
                console.log('data',data);
        })

    }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//RENDER//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        render(){

                return(<div>
                    <h1>Investments</h1>
                    We've helped you saved this month:
                    <PieChart data={this.state.data} colors={["#20BBB2", "#8ED2CD", '#076F69']}/>
                    <br/>
                    Invest more?<br/>
                    <div class="row justify-content-start">
                    <div class='col-8'>
                    <Button rounded outline onClick={this.rounding}>Rounding</Button>
                    <Button rounded outline onClick={this.recurring}>Recurring</Button>
                    <Button rounded outline onClick={this.oneoff}>One off</Button>
                    </div>
                    </div><br/><br/>

                    <div className="holder">
                    <Rounding
                    class={this.state.rounding_class}
                    setRounding={this.setRounding}/>
                    </div>

                    <div className="holder">
                    <Recurring
                    class={this.state.recurring_class}
                    getRecurring={this.getRecurring}
                    setRecurring={this.setRecurring}
                    recurring_amt={this.state.investment.recurring_amount}/>
                    </div>

                    <div className="holder">
                    <Oneoff
                    class={this.state.oneoff_class}
                    getoneoff={this.getoneoff}
                    setoneoff={this.setoneoff}
                    oneoff={this.state.investment.oneoff}/>
                    </div>



                    </div>)
    }
}


export default Invest;