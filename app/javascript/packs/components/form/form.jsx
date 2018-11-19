import React from 'react'

export default class Form extends React.Component{
    constructor(){
    super();
    this.state={
        current:{
        sort: 'hello world',
        user_id: 1
                },
        current_account: ''

    }

    this.changeHandler = this.changeHandler.bind(this)
    this.addCurrentAcc = this.addCurrentAcc.bind(this)
    this.addDebitCard = this.addDebitCard.bind(this)
}

    changeHandler(event) {
        this.setState({ current_account: event.target.value });
        console.log("change", event.target.value);
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
                  "imageUri": "https://www.google.com.sg/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjEhaqwrt_eAhVWXisKHUStA-IQjRx6BAgBEAU&url=http%3A%2F%2Fyelom.agdiffusion.com%2Fcredit-card-example%2F&psig=AOvVaw3-8pBS3UhUWgnJrcRvDXQt&ust=1542679229809529" //image URL
                }
              },
              "features": [
                {
                  "type": "TEXT_DETECTION",
                  "maxResults": 1
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
            <input onChange={this.changeHandler} value={this.current_account}/>
            <button onClick={this.addCurrentAcc}>submit</button>
            <button onClick={this.addDebitCard}>debit</button>
          </div>);
  }
}