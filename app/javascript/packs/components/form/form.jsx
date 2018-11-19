import React from 'react'
var request = require('request');


export default class Form extends React.Component{
    constructor(){
    super();
    this.state={
        current_account: '',
        saving_account:''

    }

    this.changeHandlerCurrent = this.changeHandlerCurrent.bind(this)
    this.changeHandlerSaving = this.changeHandlerSaving.bind(this)

    this.callotp = this.callotp.bind(this)

    this.addCurrentAcc = this.addCurrentAcc.bind(this)
    this.addDebitCard = this.addDebitCard.bind(this)
}

    changeHandlerCurrent(event) {
        this.setState({ current_account: event.target.value });
        console.log("change", event.target.value);
    }

    changeHandlerSaving(event) {
        this.setState({ saving_account: event.target.value });
        console.log("change", event.target.value);
    }

    callotp(){
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

    addCurrentAcc(){
    var reactThis = this
    fetch('http://localhost:3000/currents',{
        method: 'post',
        body: JSON.stringify(reactThis.state.current),
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

    addDebitCard(){
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

  render(){
    return(<div>
        <p>Add your Current Account details</p>
            <input onChange={this.changeHandlerCurrent} value={this.current_account}/>
        <p>Add your Saving Account details</p>
            <input onChange={this.changeHandlerSaving} value={this.saving_account}/>
            <button onClick={this.addDebitCard}>debit</button>

            <button onClick={this.callotp}>submit</button>
          </div>);
  }
}