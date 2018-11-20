import React from 'react'
import PropTypes from 'prop-types';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Rounding extends React.Component{
    render(){
        return(<div className={this.props.class}>
            Rounding investments round up your purchases to the next dollar and invests the change in your savings account.

            <button onClick={this.props.selectRound}>Implement Rounding?</button>

            </div>)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


class Recurring extends React.Component{
    render(){
        return(<div className={this.props.class}>
            Recurring
            </div>)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


class Oneoff extends React.Component{
    render(){
        return(<div className={this.props.class}>
            Oneoff
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


    }

    this.rounding = this.rounding.bind(this)
    this.recurring = this.recurring.bind(this)
    this.oneOff = this.oneOff.bind(this)
}

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
//RENDER//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        render(){
                return(<div>
                    How would you like to invest?<br/>
                    <button onClick={this.rounding}>Rounding</button>
                    <button onClick={this.recurring}>Recurring</button>
                    <button onClick={this.oneOff}>One off</button>

                    <Rounding
                    class={this.state.rounding_class}/>

                    <Recurring
                    class={this.state.recurring_class}/>

                    <Oneoff
                    class={this.state.oneoff_class}/>

                    </div>)
    }
}


export default Invest;