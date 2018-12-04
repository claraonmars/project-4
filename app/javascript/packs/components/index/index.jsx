import React from 'react'

import ReactChartkick, { LineChart, PieChart, BarChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)
import { Button } from 'mdbreact'
import 'whatwg-fetch';



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Body extends React.Component{
    // constructor(){
    //     super();
    //     this.state={
    //         newdata: '',
    //     }
    // }

    // componentWillReceiveProps(nextProps){
    //     var reactThis = this
    //     console.log(nextProps)
    //     if(Array.isArray(nextProps.data)){
    //         console.log('huh',JSON.stringify(nextProps.data))
    //         reactThis.setState({newdata: nextProps.data.toString()})
    //     }
    // }

    render(){
        if (this.props.account === false){
        return(<div>
            <a href="/accounts/new"><Button size="sm">Start Saving!</Button></a>
            </div>)
        }
        else{
        return(<div>
            <div className="row justify-content-end'">
            <div className="col-12">
            Spendings overview:<br/>
            <LineChart data={this.props.data} height="500px" colors={["#20BBB2"]}/>
            </div>
            </div>

            {/*<div className="row">
            <div className="col-6">
            Savings overview:<br/>
             <BarChart data={this.props.saving_data} colors={["#20BBB2"]}/>

            </div>
            </div>*/}

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
        data: [],
        user_id: 0,
        saving_data: [],
    }
}


    componentDidMount(){
    var reactThis = this
    fetch('/check_user',{
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
                            console.log('this data', data)
                            for (var i = 0; i<data.accounts.length; i ++){
                                if(data.accounts[i].user_id === reactThis.state.user_id){
                                    var datasetarr=[]
                                    if (data.accounts[i].name === 'current'){

                                        //set state of investments
                                        reactThis.setState({accounts: true})

                                        ////////////////////////////////////////////////////////////
                                        // find all current account transactions //
                                        ////////////////////////////////////////////////////////////

                                        fetch('/accounts/'+ data.accounts[i].id +'/currents',{
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

                                                var current = reactThis.state.data
                                                current = result
                                                reactThis.setState({data: current})

                                                // var set1={
                                                //     "name":"current",
                                                //     "data": result
                                                // }

                                                // let dataA = [...reactThis.state.dataset];
                                                // dataA.push(set1);

                                                // datasetarr.push(set1)

                                            })


                                        }
                                        else if (data.accounts[i].name === 'saving'){

                                        //set state of investments
                                        reactThis.setState({accounts: true})

                                        ////////////////////////////////////////////////////////////
                                        // find all current account transactions //
                                        ////////////////////////////////////////////////////////////

                                        fetch('/accounts/'+ data.accounts[i].id +'/savings',{
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

                                                var current = reactThis.state.data
                                                current = result
                                                reactThis.setState({saving_data: current})

                                                // var set2={
                                                //     "name":"saving",
                                                //     "data": result
                                                // }

                                                // let arr = [...reactThis.state.dataset]
                                                // arr.push(set2);

                                                // datasetarr.push(set2)

                                            })

                                            // var current = reactThis.state.data
                                            // current = datasetarr
                                            // reactThis.setState({data: current})

                                            // console.log(reactThis.state.data)
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
            <Body data={this.state.data} saving_data={this.state.saving_data} account={this.state.accounts} />
          </div>);
        }

////////////////////////////////////////////////////////////
//IF USER NOT LOGGED IN//
////////////////////////////////////////////////////////////

        else{
            return(<div>
            <div className="landing">
                <div className='row justify-content-end'>
                    <div className='col-6 header_text'>
                        <h1>Effortless saving at your fingertips</h1>
                        <h4>Manage your expenses, save money, track your spending.</h4>
                        <div className='d-flex justify-content-center'>
                        <a href="/users/sign_up"><Button size="md">Sign Up Today!</Button></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row article">
                do this and that and that and that

            </div>
          </div>);
        }

  }
}