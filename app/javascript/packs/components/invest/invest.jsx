import React from 'react'
import PropTypes from 'prop-types';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Rounding extends React.Component{
    render(){
        return(<div className={this.props.class}>
            Rounding investments round up your purchases to the next dollar and invests the change in your savings account.

            <button onClick={this.props.setRounding}>Implement Rounding!</button>

            </div>)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Recurring extends React.Component{
    render(){
        return(<div className={this.props.class}>
            Recurring investments add the set amount to your savings account every month.

            <input onChange={this.props.getRecurring} value={this.props.recurring_amt}/>
            <button onClick={this.props.setRecurring}>Recurr Monthly!</button>
            </div>)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


class Oneoff extends React.Component{
    render(){
        return(<div className={this.props.class}>
            Make a one off investment.

            <input onChange={this.props.getOneoff} value={this.props.oneOff}/>
            <button onClick={this.props.setOneoff}>Invest now!</button>
            </div>)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Invest extends React.Component{
    constructor(){
    super();
    this.state={
        rounding_class:'hidden',
        recurring_class:'hidden',
        oneoff_class:'hidden',

        investment:{
        },

        transaction:{
            current:{
                amount: 0,
                balance: 0,
                sort: 'default',
                operation: 'default',
                date: new Date(),
                account_id: 0,
                merchant_id: 0
            },
            saving:{
                amount: 0,
                balance: 0,
                sort: 'default',
                operation: 'default',
                date: new Date(),
                account_id: 0,
            }
        }
    }

////////////////////////////////////////////////////////////
//SELECT INVESTMENT//
////////////////////////////////////////////////////////////

    this.rounding = this.rounding.bind(this)
    this.recurring = this.recurring.bind(this)
    this.oneOff = this.oneOff.bind(this)

////////////////////////////////////////////////////////////
//ADD INVESTMENT TYPE//
////////////////////////////////////////////////////////////

    this.setRounding = this.setRounding.bind(this)

    this.setRecurring = this.setRecurring.bind(this)
    this.getRecurring = this.getRecurring.bind(this)

    this.setOneoff = this.setOneoff.bind(this)
    this.getOneoff = this.getOneoff.bind(this)

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//CHECK FOR EXISTING INVESTMENTS IN CURRENT ACCOUNT//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    componentDidMount(){
        var reactThis = this

        //view current account's current investment plans
        fetch('http://localhost:3000/investments',{
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

                            console.log(reactThis.state.transaction);


                                //set state as last current account transaction
                                fetch('http://localhost:3000/currents/'+ data.investments[j].id,{
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

                                    //set state of saving account_id
                                    var current = reactThis.state.transaction
                                    current.current = data
                                    reactThis.setState({transaction: current})

                                    console.log('impt',reactThis.state.transaction)
                                })
                        }
                    }
                }
                else if(data.accounts[i].name === 'saving'){

                            //set state as last current account transaction
                            fetch('http://localhost:3000/savings/'+ data.accounts[i].id,{
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

                                    //set state of saving account_id
                                    var current = reactThis.state.transaction
                                    current.saving = data
                                    reactThis.setState({transaction: current})

                                    console.log('impt',reactThis.state.transaction)
                                })
                }
            }
        })




        //view last saving account transaction

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

    oneOff(){
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


        fetch('http://localhost:3000/investments/' + this.state.investment.id,{
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
        fetch('http://localhost:3000/investments/' + reactThis.state.investment.id,{
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

    getOneoff(event){
        var investment = this.state.investment
        investment.oneOff = parseInt(event.target.value)
        this.setState({investment: investment})
        console.log(event.target.value)
    }

////////////////////////////////////////////////////////////
//UNRESOLVED:               MAKE AN IMMEDIATE TRANSACTION //
////////////////////////////////////////////////////////////

    setOneoff(){
        var reactThis = this
        fetch('http://localhost:3000/currents/',{
                method: 'post',
                body: JSON.stringify(reactThis.state.transaction.current),
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
//RENDER//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        render(){

                return(<div>
                    How would you like to invest?<br/>
                    <button onClick={this.rounding}>Rounding</button>
                    <button onClick={this.recurring}>Recurring</button>
                    <button onClick={this.oneOff}>One off</button>

                    <Rounding
                    class={this.state.rounding_class}
                    setRounding={this.setRounding}/>

                    <Recurring
                    class={this.state.recurring_class}
                    getRecurring={this.getRecurring}
                    setRecurring={this.setRecurring}
                    recurring_amt={this.state.investment.recurring_amount}/>

                    <Oneoff
                    class={this.state.oneoff_class}
                    getOneoff={this.getOneoff}
                    setOneoff={this.setOneoff}
                    oneOff={this.state.investment.oneOff}/>

                    </div>)
    }
}


export default Invest;