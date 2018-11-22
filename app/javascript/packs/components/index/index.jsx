import React from 'react'

import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Body extends React.Component{
    constructor(){
        super();
        this.state={
            newdata: '',
        }
    }

    componentWillReceiveProps(nextProps){
        var reactThis = this
        console.log(nextProps)
        if(Array.isArray(nextProps.data)){
            console.log('huh',JSON.stringify(nextProps.data))
            reactThis.setState({newdata: nextProps.data.toString()})
        }
    }

    render(){
        if (this.props.account === false){
        return(<div>
            <a href="/accounts/new"><button>Start Saving!</button></a>
            </div>)
        }
        else{
        return(<div>
            <a href="/investments">Start Investing!</a>
            <br/>

            Accounts overview: (past 3 months):<br/>
            <LineChart data={this.state.newdata} />


            </div>)

        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default class Index extends React.Component{
    constructor(){
    super();
    this.state={
        investment:false,
        accounts: false,
        data: '',
        user_id: 0,
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
        console.log('second req', data);
            if(data.loggedin === "true"){
                reactThis.setState({user_id: data.user[0].id});
                console.log('whats this',reactThis.state.user_id)

                ////////////////////////////////////////////////////////////
                //view current account's current investment plans //
                ////////////////////////////////////////////////////////////

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
                                if(data.accounts[i].user_id === reactThis.state.user_id){
                                    var datasetarr=[]
                                    if (data.accounts[i].name === 'current'){

                                        //set state of investments
                                        reactThis.setState({accounts: true})

                                        ////////////////////////////////////////////////////////////
                                        // find all current account transactions //
                                        ////////////////////////////////////////////////////////////

                                        fetch('http://localhost:3000/accounts/'+ data.accounts[i].id +'/currents',{
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

                                                ////////////////////////////////////////////////////////////
                                                // set first dataset (current account transc) //
                                                ////////////////////////////////////////////////////////////

                                                // getting:
                                                // key : value
                                                // month : amount (past three months)

                                                var key =[]
                                                var value = []
                                                var month1 = 0
                                                var month2 = 0
                                                var month3 = 0
                                                var result = {}

                                                for (var i = 0; i < data.length; i++){

                                                    var newsplit = String(data[i].date)
                                                    newsplit = newsplit.split('');
                                                    newsplit = newsplit.slice(0, 4)
                                                    newsplit = newsplit.join('')

                                                    if (data[i].sort === 'DEBIT' && newsplit === '1809'){
                                                            month1 = month1 + parseFloat(data[i].amount)
                                                        }
                                                    else if (data[i].sort === 'DEBIT' && newsplit === '1810'){
                                                            month2 = month2 + parseFloat(data[i].amount)
                                                        }
                                                    else if (data[i].sort === 'DEBIT' && newsplit === '1811')
                                                            month3 = month3 + parseFloat(data[i].amount)

                                                    }


                                                key.push('September')
                                                key.push('October')
                                                key.push('November')

                                                value.push(month1)
                                                value.push(month3)
                                                value.push(month3)

                                                key.forEach((key, i) => result[key] = value[i])

                                                // var current = reactThis.state.data
                                                // current = result
                                                // reactThis.setState({data: current})

                                                var set1={
                                                    "name":"current",
                                                    "data": result
                                                }

                                                // let dataA = [...reactThis.state.dataset];
                                                // dataA.push(set1);

                                                datasetarr.push(set1)

                                            })


                                        }
                                        else if (data.accounts[i].name === 'saving'){

                                        //set state of investments
                                        reactThis.setState({accounts: true})

                                        ////////////////////////////////////////////////////////////
                                        // find all current account transactions //
                                        ////////////////////////////////////////////////////////////

                                        fetch('http://localhost:3000/accounts/'+ data.accounts[i].id +'/savings',{
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

                                                ////////////////////////////////////////////////////////////
                                                // set first dataset (current account transc) //
                                                ////////////////////////////////////////////////////////////

                                                // getting:
                                                // key : value
                                                // month : amount (past three months)

                                                var key =[]
                                                var value = []
                                                var month1 = 0
                                                var month2 = 0
                                                var month3 = 0
                                                var result = {}

                                                for (var i = 0; i < data.length; i++){

                                                    var newsplit = String(data[i].date)
                                                    newsplit = newsplit.split('');
                                                    newsplit = newsplit.slice(0, 4)
                                                    newsplit = newsplit.join('')

                                                    if (data[i].sort === 'CREDIT' && newsplit === '1809'){
                                                            month1 = month1 + parseFloat(data[i].amount)
                                                        }
                                                    else if (data[i].sort === 'CREDIT' && newsplit === '1810'){
                                                            month2 = month2 + parseFloat(data[i].amount)
                                                        }
                                                    else if (data[i].sort === 'CREDIT' && newsplit === '1811')
                                                            month3 = month3 + parseFloat(data[i].amount)

                                                    }


                                                key.push('September')
                                                key.push('October')
                                                key.push('November')

                                                value.push(month1)
                                                value.push(month3)
                                                value.push(month3)

                                                key.forEach((key, i) => result[key] = value[i])

                                                // var current = reactThis.state.data
                                                // current = result
                                                // reactThis.setState({data1: current})

                                                var set2={
                                                    "name":"saving",
                                                    "data": result
                                                }

                                                // let arr = [...reactThis.state.dataset]
                                                // arr.push(set2);

                                                datasetarr.push(set2)

                                            })

                                            var current = reactThis.state.data
                                            current = datasetarr
                                            reactThis.setState({data: current})

                                            console.log(reactThis.state.data)
                                        }



                                    }
                                }

                        })

            }
    })


    }

    render(){
        let loggedin = this.props.loggedin

////////////////////////////////////////////////////////////
//IF USER LOGGED IN//
////////////////////////////////////////////////////////////

        if (loggedin === 'true'){
            return(<div>
            <h1>Welcome back!</h1>
            <Body data={this.state.data} account={this.state.accounts}/>
          </div>);
        }

////////////////////////////////////////////////////////////
//IF USER NOT LOGGED IN//
////////////////////////////////////////////////////////////

        else{
            return(<div>
            <h1>Welcome!</h1>
            <a href="/users/sign_up"><button>Sign Up</button></a>
            <a href="/users/sign_in"><button>Sign In</button></a>

          </div>);
        }

  }
}