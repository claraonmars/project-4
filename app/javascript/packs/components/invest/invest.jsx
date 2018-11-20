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
//CHECK FOR EXISTING INVESTMENTS//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    componentDidMount(){
        var reactThis = this

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
            console.log('post req', data);
            for (var i = 0; i<data.accounts.length; i ++){
                if (data.accounts[i].name === 'current'){
                    for (var j = 0; j< data.investments.length; j ++){
                        if (data.investments[j].account_id === data.accounts[i].id){
                            reactThis.setState({investment: data.investments[j]})
                            console.log(reactThis.state.investment);
                        }
                    }
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

    oneOff(){
        this.setState({rounding_class: 'hidden', recurring_class: 'hidden', oneoff_class: 'normal'})
    }

////////////////////////////////////////////////////////////
//ADD ROUNDING //
////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////
//ADD RECURRING //
////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////
//ADD ONEOFF //
////////////////////////////////////////////////////////////

    getOneoff(event){
        var investment = this.state.investment
        investment.oneOff = parseInt(event.target.value)
        this.setState({investment: investment})
        console.log(event.target.value)
    }

    setOneoff(){
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