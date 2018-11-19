import React from 'react'
import PropTypes from 'prop-types';

import './style.scss';

var request = require('request');


class Debit extends React.Component{
    render(){
    return(
        <div>
            <div>
            Name on card
            <input onChange={this.props.debitName} name={this.props.debitValue} />
            </div>
            <div>
            Card Number
            <input onChange={this.props.debitNumber} number={this.props.debitValue} />
            </div>
            <div>
            Card expiry
            <input onChange={this.props.debitExpiry} expiry={this.props.debitValue} />
            </div>
            <div>
            CV
            <input onChange={this.props.debitCv} cv={this.props.debitValue} />
            <br/>
            <button onClick={this.props.debitSubmit}>Add debit card</button>
            </div>
        </div>);
        }
  }

class Otp extends React.Component{
  render(){
    return(<div className={this.props.class}>
        <input onChange={this.props.getOtp} value={this.props.otpvalue}/>
        <button onClick={this.props.callOtp}>Submit OTP</button>
          </div>);
        }
  }


class AddCurrent extends React.Component{
  render(){
    return(<div className={this.props.class}>
        <p>Add your Current Account details</p>
            <input onChange={this.changeHandlerCurrent} value={this.current_account}/>
            <button onClick={this.props.addCurrentAcc}>submit</button>
          </div>);
  }
}

class AddSavings extends React.Component{
  render(){
    return(<div  className={this.props.class}>
        <p>Add your Saving Account details</p>
            <input onChange={this.changeHandlerSaving} value={this.saving_account}/>
            <button onClick={this.callotp}>submit</button>
          </div>);
  }
}

class Form extends React.Component{
    constructor(){
    super();
    this.state={
        card:{
                name: 'default',
                card_number: 0,
                expiry: 'default',
                cv: 0,
                account_id: 0
        },
        otp: '',
        otp_class: 'hidden',
        current_class: 'hidden',
        saving_class: 'hidden',
        account:{
                name: '',
                user_id: '',
                bank: '',
                account_number: ''
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DEBIT CARD//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    this.getDebitName = this.getDebitName.bind(this)
    this.getDebitExpiry = this.getDebitExpiry.bind(this)
    this.getDebitNumber = this.getDebitNumber.bind(this)
    this.getDebitCv = this.getDebitCv.bind(this)

    this.debitSubmit = this.debitSubmit.bind(this)

    this.debitReadCard = this.debitReadCard.bind(this)
    this.getOtp = this.getOtp.bind(this)

////////////////////////////////////////////////////////////
//ADD CURRENT ACCOUNT//
////////////////////////////////////////////////////////////

    this.changeHandlerCurrent = this.changeHandlerCurrent.bind(this)
    this.changeHandlerSaving = this.changeHandlerSaving.bind(this)


    this.addCurrentAcc = this.addCurrentAcc.bind(this)
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//DEBIT CARD//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////
    // UNRESOLVED            Read credit card image
    ////////////////////////////////////////////////////////////
    debitReadCard(){
        let body = {
          "requests": [
            {
              "image": {
                "source": {
                  "imageUri": "https://res.cloudinary.com/dsfjnc10g/image/upload/v1542595025/1529504445934.jpg" //image URL
                }
              },
              "features": [
                {
                  "type": "TEXT_DETECTION",
                  "maxResults": 10
                }
              ]
            }
          ]
    }
        fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyC4OsmVzL71Exh7Tsp5aaSNS2rTSRN8Ijo',{
                method: 'post',
                body: JSON.stringify(body),
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
    // RESOLVED            Submit debit card details
    ////////////////////////////////////////////////////////////

    debitSubmit(){
    var reactThis = this
    fetch('http://localhost:3000/cards',{
        method: 'post',
        body: JSON.stringify(reactThis.state.card),
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

    reactThis.setState({otp_class: 'normal'})


    // UNRESOLVED: generate random otp            Call otp

    if (reactThis.state.otp === ''){
        request.post('https://textbelt.com/text', {
      form: {
        phone: '+6593274988',
        message: 'Hello world',
        key: 'textbelt',
      },
    }, function(err, httpResponse, body) {
      if (err) {
        console.error('Error:', err);
        return;
      }
      console.log(JSON.parse(body));
    })
    }

}

    ////////////////////////////////////////////////////////////
    // Debit card on change handlers:

    getDebitName(event){
    var card = this.state.card
    card.name = event.target.value
    this.setState({card: card})
    }

    getDebitExpiry(event){
    var card = this.state.card
    card.expiry = event.target.value
    this.setState({card: card})
    }

    getDebitNumber(event){
    var card = this.state.card
    card.card_number = event.target.value
    this.setState({card: card})
    }

    getDebitCv(event){
    var card = this.state.card
    card.cv = event.target.value
    this.setState({card: card})
    }

    ////////////////////////////////////////////////////////////

    getOtp(){
    this.setState({otp: event.target.value});
    console.log('otp:', event.target.value)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ADD CURRENT ACCOUNT//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    changeHandlerCurrent(event) {
        this.setState({ current_account: event.target.value });
        console.log("change", event.target.value);
    }

    changeHandlerSaving(event) {
        this.setState({ saving_account: event.target.value });
        console.log("change", event.target.value);
    }

    addCurrentAcc(){
    var reactThis = this
    fetch('http://localhost:3000/accounts',{
        method: 'post',
        body: JSON.stringify(reactThis.state.account),
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

  render(){
    return(<div>
        <Debit
        debitName={this.getDebitName}
        debitNumber={this.getDebitNumber}
        debitExpiry={this.getDebitExpiry}
        debitCv={this.getDebitCv}
        debitSubmit={this.debitSubmit}
        debitNameValue={this.state.card.name}
        debitNumberValue={this.state.card.number}
        debitExpiryValue={this.state.card.expiry}
        debitCvValue={this.state.card.cv}
        class={this.state.class}/>

        <Otp otpvalue={this.state.otp} getOtp={this.getOtp} callOtp={this.callOtp} class={this.state.otp_class}/>

        <AddCurrent class={this.state.current_class} addCurrentAcc={this.addCurrentAcc}/>
        <AddSavings class={this.state.saving_class}/>
          </div>);
  }
}

export default Form;