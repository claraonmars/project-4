import React from 'react'
import PropTypes from 'prop-types';
import { Pagination, PageItem, PageLink } from "mdbreact";
import { ListGroup, ListGroupItem } from 'mdbreact'



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//onClick={() => this.props.display(item)}

class Current extends React.Component{
    render(){

        const currentTodos = this.props.trans.reverse().slice(this.props.indexOfFirstTodo, this.props.indexOfLastTodo);

        console.log('number',this.props.indexOfFirstTodo)

        const renderTodos = currentTodos.map((trans, i) => {
            return <ListGroupItem key={i} >
                ${trans.amount} |
                ${trans.balance} |
                {trans.sort} |
                {trans.operation} |
                {trans.merchant_id} |
                {trans.date}
                </ListGroupItem>;
        });

        const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(this.props.trans.length / this.props.transPerPage); i++) {
              pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
            <PageItem className="page-link"
              key={number}
              id={number}
              onClick={this.props.changePage}>
              <PageLink className="page-link">{number}</PageLink>
            </PageItem>

          );
        });


        return(<div className={this.props.class}>
            You are currently viewing your CURRENT ACCOUNT TRANSACTIONS <br/>
            <button onClick={this.props.switch}>View SAVINGS ACCOUNT TRANSACTIONS</button>

            <ListGroup>
            <ListGroupItem></ListGroupItem>
            {renderTodos}
            </ListGroup>

            <Pagination className="pagination-sm">

              {renderPageNumbers}

            </Pagination>
            </div>)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Saving extends React.Component{
    render(){
        const currentTodos = this.props.trans.reverse().slice(this.props.indexOfFirstTodo, this.props.indexOfLastTodo);

        console.log('number',this.props.indexOfFirstTodo)

        const renderTodos = currentTodos.map((trans, i) => {
            return <ListGroupItem key={i} >
                ${trans.amount} |
                ${trans.balance} |
                {trans.sort} |
                {trans.operation} |
                {trans.date}
                </ListGroupItem>;
        });

        const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(this.props.trans.length / this.props.transPerPage); i++) {
              pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
          return (
             <PageItem className="page-link"
              key={number}
              id={number}
              onClick={this.props.changePage}>
              <PageLink className="page-link">{number}</PageLink>
            </PageItem>
          );
        });

        return(<div className={this.props.class}>
            You are currently viewing your SAVING ACCOUNT TRANSACTIONS <br/>
            <button onClick={this.props.switch}>View CURRENT ACCOUNT TRANSACTIONS</button>

           <ListGroup>
            <ListGroupItem></ListGroupItem>
            {renderTodos}
            </ListGroup>

            <Pagination className="pagination-sm">

              {renderPageNumbers}

            </Pagination>
            </div>)
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class Trans extends React.Component{
    constructor(){
    super();
    this.state={
        saving_class: 'hidden',
        current_class: 'normal',
        current_trans: [],
        saving_trans: [],

        currentPage: 1,
        transPerPage: 30,
    }

    this.switchToSaving = this.switchToSaving.bind(this)
    this.switchToCurrent = this.switchToCurrent.bind(this)
    this.changePage = this.changePage.bind(this)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//UNRESOLVED: need to get account/:id from user table             TRANSACTION DATA AJAX CALL
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    componentDidMount(){
    var reactThis = this

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
        console.log('post req', data);
        reactThis.setState({saving_trans: data})
    })

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
        console.log('post req', data);
        reactThis.setState({current_trans: data})
    })
}

    switchToSaving(){
        this.setState({current_class:'hidden', saving_class:'normal'})
    }

    switchToCurrent(){
        this.setState({current_class:'normal', saving_class:'hidden'})
    }

    changePage(event) {
    this.setState({currentPage: Number(event.target.id)});
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//RENDER//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    render(){
        const indexOfLastTodo = this.state.currentPage * this.state.transPerPage;
        const indexOfFirstTodo = indexOfLastTodo - this.state.transPerPage;

        return(
            <div>
            <h1>Transactions</h1>

                <Current
                class={this.state.current_class}
                trans={this.state.current_trans}
                switch={this.switchToSaving}
                currentpage={this.state.currentpage}
                transPerPage={this.state.transPerPage}
                changePage={this.changePage}
                indexOfLastTodo={indexOfLastTodo}
                indexOfFirstTodo={indexOfFirstTodo}/>


                <Saving
                class={this.state.saving_class}
                trans={this.state.saving_trans}
                switch={this.switchToCurrent}
                currentpage={this.state.currentpage}
                transPerPage={this.state.transPerPage}
                changePage={this.changePage}
                indexOfLastTodo={indexOfLastTodo}
                indexOfFirstTodo={indexOfFirstTodo}/>
            </div>);
        }
}

export default Trans;
