import React from 'react'
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Button } from 'mdbreact'

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Payform extends React.Component{
render(){
    return(<div>
        <div className="row justify-content-center">
            <h1>Make a payment to another account</h1>
            </div>

            <div className="row justify-content-center">
                <div className="col-2">
                Amount
                </div>
                <div className="col-3">
                <input onChange={this.props.getAmount} value={this.props.payer_amt} />
                </div>
            </div>
            <br/>
            <div className="row justify-content-center">
                <div className="col-2">
                Payee Name
                </div>
                <div className="col-3">
                <input onChange={this.props.getPayee} value={this.props.payee} />
                </div>
            </div>
            <br/>
            <div className="row justify-content-center">
                <div className="col-2">
                Payee Account
                </div>
                <div className="col-3">
                <input onChange={this.props.getPayeeAcc} value={this.props.payee_acc} />
                </div>
            </div>
            <br/>
            <div className="row justify-content-center">
                <Button size="sm" onClick={this.props.submitform}>Make payment now</Button>
            </div>
        </div>)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// params: :amount, :balance, :sort, :operation, :date, :account_id


class Pay extends React.Component{
constructor(){
    super();

    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();

    this.state = {
        userid:0,
        date:today.getDate(),
        hours:hours,
        minutes: minutes,
        seconds: seconds,

        transaction:{
            current:{

            },

            saving:{

            },
        },

        investments:{},

        payer_amt:0,
        payee: '',
        payee_acc: '',

    }

    this.getAmount = this.getAmount.bind(this)
    this.getPayee = this.getPayee.bind(this)
    this.getPayeeAcc = this.getPayeeAcc.bind(this)
    this.submitform = this.submitform.bind(this)

}

    componentDidMount(){

        var reactThis = this
        reactThis.setState({user_id: this.props.user_id})

        //get all current transactions
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
            console.log('currents req', data);

            var total = data.length

            //getting latest transaction details
            //console.log(data[total-1])

             //set state of current account
            var current = reactThis.state.transaction
            current.current = data[total-1]
            reactThis.setState({transaction: current})

        })


        //get all savings transactions
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
            console.log('saving req', data);

            var total = data.length

            //getting latest transaction details
            //console.log(data[total-1])

             //set state of saving account
            var saving = reactThis.state.transaction
            saving.saving = data[total-1]
            reactThis.setState({transaction: saving})

        })

        //get active investment plans
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

            // set state of existing investments
            for (var i = 0; i< data.investments.length; i++){

                if (data.investments[i].account_id === 1){
                    var investments = reactThis.state.investments
                    investments = data.investments[i]
                    reactThis.setState({investments: investments})
                    console.log(reactThis.state.investments)

                    //if recurring is active

                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //Recurring savings//
                    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    if (reactThis.state.investments.recurring === true){

                        //console.log('balance:',reactThis.state.transaction.current.balance)
                        //console.log('recurring amt:',reactThis.state.investments.recurring_amount)

                        // if its the first day of the month
                        if (parseInt(reactThis.state.date) === parseInt('2')){

                            // if it is 00:00
                            if (parseInt(reactThis.state.hours) === parseInt('19') && parseInt(reactThis.state.minutes) === parseInt('27') && parseInt(reactThis.state.seconds) === parseInt('00')){

                            let newcurrenttransc = {
                                current:{
                                    amount: reactThis.state.investments.recurring_amount,
                                    balance: parseFloat(reactThis.state.transaction.current.balance) - parseFloat(reactThis.state.investments.recurring_amount),
                                    sort: 'DEBIT',
                                    operation: 'Monthly Recurr',
                                    date: new Date(),
                                    account_id: reactThis.state.transaction.current.account_id,
                                    merchant_id: 0
                                }
                            }

                            let newsavingtransc = {
                                saving:{
                                    amount: reactThis.state.investments.recurring_amount,
                                    balance: parseFloat(reactThis.state.transaction.saving.balance) + parseFloat(reactThis.state.investments.recurring_amount),
                                    sort: 'CREDIT',
                                    operation: 'Monthly Recurr',
                                    date: new Date(),
                                    account_id: reactThis.state.transaction.saving.account_id
                                }
                            }

                            fetch('http://localhost:3000/currents/',{
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
                                        // console.log('current',newcurrenttransc);
                                        // console.log('data',data);
                                })

                            fetch('http://localhost:3000/savings/',{
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
                                    // console.log('saving', newsavingtransc);
                                    // console.log('data',data);
                                })


                            }

                        }
                    }
                }
            }

        })


    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Get payment details//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getAmount(event){
        this.setState({payer_amt: event.target.value})
        console.log(event.target.value)
    }

    getPayee(){
        this.setState({payee: event.target.value})
        console.log(event.target.value)
    }

    getPayeeAcc(){
        this.setState({payee_acc: event.target.value})
        console.log(event.target.value)
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Confirm payment//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    submitform(){
        var reactThis = this
        let newcurrenttransc
        let newsavingtransc
        let investmenttransc

        ////////////////////////////////////////////////////////////
        //Check for existing investment plans//
        ////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Rounding savings//
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (reactThis.state.investments.rounding === true){

            ////////////////////////////////////////////////////////////
            //Check if amount is decimal//
            ////////////////////////////////////////////////////////////
            if(reactThis.state.payer_amt % 1 != 0){

                newcurrenttransc = {
                    current:{
                        amount: reactThis.state.payer_amt,
                        balance: parseFloat(reactThis.state.transaction.current.balance) - parseFloat(reactThis.state.payer_amt),
                        sort: 'DEBIT',
                        operation: 'Payment to '+ reactThis.state.payee_acc,
                        date: new Date(),
                        account_id: reactThis.state.transaction.current.account_id,
                        merchant_id: 0
                    }
                }

                newsavingtransc = {
                    saving:{
                        amount: Math.round(reactThis.state.payer_amt) - reactThis.state.payer_amt,
                        balance: parseFloat(reactThis.state.transaction.saving.balance) + parseFloat(Math.round(reactThis.state.payer_amt) - reactThis.state.payer_amt),
                        sort: 'CREDIT',
                        operation: 'Rounding Investment',
                        date: new Date(),
                        account_id: reactThis.state.transaction.saving.account_id
                    }
                }

            }

        }

        ////////////////////////////////////////////////////////////
        //Continue with transaction without investment plan//
        ////////////////////////////////////////////////////////////

        else{

            //update transaction details without investment plans
            newcurrenttransc = {
                current:{
                    amount: reactThis.state.payer_amt,
                    balance: parseFloat(reactThis.state.transaction.current.balance) - parseFloat(reactThis.state.payer_amt),
                    sort: 'DEBIT',
                    operation: 'Payment to '+ reactThis.state.payee_acc,
                    date: new Date(),
                    account_id: reactThis.state.transaction.current.account_id,
                    merchant_id: 0
                }
            }
        }


        ////////////////////////////////////////////////////////////
        //Posting trans to database//
        ////////////////////////////////////////////////////////////

        //make a new transaction to transfer $ from current ...
        fetch('http://localhost:3000/currents/',{
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

                    //get updated current transactions
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
                        console.log('currents req', data);

                        var total = data.length

                        //getting latest transaction details
                        //console.log(data[total-1])

                         //set state of current account
                        var current = reactThis.state.transaction
                        current.current = data[total-1]
                        reactThis.setState({transaction: current})

                            investmenttransc = {
                                current:{
                                    amount: (Math.round(reactThis.state.payer_amt) - reactThis.state.payer_amt),
                                    balance: parseFloat(reactThis.state.transaction.current.balance) - parseFloat(Math.round(reactThis.state.payer_amt) - reactThis.state.payer_amt),
                                    sort: 'DEBIT',
                                    operation: 'Rounding investment',
                                    date: new Date(),
                                    account_id: reactThis.state.transaction.current.account_id,
                                    merchant_id: 0
                                }
                            }


                            if (investmenttransc != null){
                                fetch('http://localhost:3000/currents/',{
                                    method: 'post',
                                    body: JSON.stringify(investmenttransc),
                                    headers : {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json'
                                       }
                                })
                                .then(function(response){
                                    return response.json()
                                })
                                .then(function(data){
                                    console.log('current',investmenttransc);
                                    console.log('data',data);
                                })

                            }


                    })
            })

        // ....to savings

        if (newsavingtransc != null){
        fetch('http://localhost:3000/savings/',{
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

}



render(){
    return(
        <div>
            <h1>Payment Gate</h1>
            <Payform
            payer_amt={this.state.payer_amt}
            payee={this.state.payee}
            payee_acc={this.state.payee_acc}
            getAmount={this.getAmount}
            getPayee={this.getPayee}
            getPayeeAcc={this.getPayeeAcc}
            submitform={this.submitform} />
        </div>
        )
}

}


export default Pay;