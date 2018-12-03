import React from 'react'
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Button } from 'mdbreact'


class Paysuccess extends React.Component{
    render(){
        return(<div>
            <h1>Payment Successful!</h1>
            <a href="/pay"><Button size="md">Make another payment?</Button></a>
            </div>)
    }
}

export default Paysuccess;