import React from 'react'
import PropTypes from 'prop-types';
import { Pagination, PageItem, PageLink } from "mdbreact";
import { ListGroup, ListGroupItem, Button } from 'mdbreact'



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//onClick={() => this.props.display(item)}

class Current extends React.Component{
    constructor(props){
    super(props);
    this.state={
        newmonth: props.currentmonth,
        pageNumbers: [],
        newMonthArr:[],
    }
}

    componentDidUpdate(prevProps) {

      // Typical usage (don't forget to compare props):
      if (this.props.currentmonth !== prevProps.currentmonth) {
        this.setState({newmonth: this.props.currentmonth, pageNumbers:[], newMonthArr:[]})
      }
    }


    render(){

        const currentTodos = this.props.trans.reverse().slice(this.props.indexOfFirstTodo, this.props.indexOfLastTodo);
        const newmonth = this.props.currentmonth

        //console.log('number',this.props.indexOfFirstTodo)

        const renderTodos = currentTodos.map((trans, i) => {

            var split = String(trans.date)
            split = split.split('');
            split = split.slice(2, 4)
            split = split.join('')

            console.log(this.state.newmonth)

            if(parseInt(split) === parseInt(this.state.newmonth)){

            return <ListGroupItem key={i} >

            {trans.date}

            <div className="row">
                <div className="col-8">
                    {trans.operation}
                </div>
                <div className="col-4">
                    ${trans.amount}
                </div>
            </div>

            <div className="row">
                <div className="col-4">
                {trans.sort}
                </div>
                <div className="col-4">
                {trans.merchant_id}
                </div>
                <div className="col-4">
                ${trans.balance}
                </div>
            </div>
                </ListGroupItem>;
            }
        });

        // const pageNumbers = [];
        // var newMonthArr=[];

            for (var i = 0; i < this.props.trans.length; i ++){
                var month = String(this.props.trans[i].date);
                month = month.split('');
                month = month.slice(0,4);
                month= month.join('');

                if(parseInt(month) === parseInt('18' + this.state.newmonth)){
                    [...this.state.newMonthArr].push(this.props.trans[i]);
                }
            }

            for (let i = 1; i <= Math.ceil(this.state.newMonthArr.length / this.props.transPerPage); i++) {
              [...this.state.pageNumbers].push(i);
        }



        const renderPageNumbers = this.state.pageNumbers.map(number => {
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
            <Button size="sm" onClick={this.props.switch}>View SAVINGS ACCOUNT TRANSACTIONS</Button>

            <select onChange={this.props.getMonth} value={this.props.currentmonth}>
            <option>View previous months</option>
            <option value='12'>December</option>
            <option value='11'>November</option>
            <option value='10'>October</option>
            </select>

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

        //console.log('number',this.props.indexOfFirstTodo)

        const renderTodos = currentTodos.map((trans, i) => {
            return <ListGroupItem key={i} >
                {trans.date}

            <div className="row">
                <div className="col-8">
                    {trans.operation}
                </div>
                <div className="col-4">
                    ${trans.amount}
                </div>
            </div>

            <div className="row">
                <div className="col-4">
                {trans.sort}
                </div>
                <div className="col-4">
                {trans.merchant_id}
                </div>
                <div className="col-4">
                ${trans.balance}
                </div>
            </div>
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
            <Button size="sm" onClick={this.props.switch}>View CURRENT ACCOUNT TRANSACTIONS</Button>

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
        transPerPage: 10,

        currentmonth: 12,
    }

    this.switchToSaving = this.switchToSaving.bind(this)
    this.switchToCurrent = this.switchToCurrent.bind(this)
    this.changePage = this.changePage.bind(this)
    this.getMonth = this.getMonth.bind(this)
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//UNRESOLVED: need to get account/:id from user table             TRANSACTION DATA AJAX CALL
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    componentDidMount(){
    var reactThis = this

    fetch('/accounts/2/savings',{
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

    fetch('/accounts/1/currents',{
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

    getMonth(event){
        this.setState({currentmonth: event.target.value});
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
                indexOfFirstTodo={indexOfFirstTodo}
                getMonth={this.getMonth}
                currentmonth={this.state.currentmonth}/>


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
