import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Message from './components/Message';
import Search from './components/Search';
import Definition from  './components/Definition';
import $ from 'jquery';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: null,
      definitionDisplay: false,
      messageDisplay: false
    }
  }

  handleClick (e) {
    e.preventDefault();
    console.log('clicked!')
  }
  //when the app loads, find the current date
  componentDidMount () {
    let today = new Date();
    let dd = today.getDate();
    const month = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
    let mm = month[today.getMonth()];
    let yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd;
    } 

    today = dd + '-' + mm + '-' + yyyy;
    
    if(today) {
      console.log('date is true', today)
      this.setState({
        date:today
      })
      console.log('set date')
    }
    console.log('state date',this.state.date)
  }

  toggleDefinitionDisplay (e) {
    console.log('definitionDisplay', this.state.definitionDisplay)
    e.preventDefault();
    if(!this.state.definitionDisplay) { 
      this.setState({
        definitionDisplay: true
      });
    return
    }
    this.setState({definitionDisplay:false})
  }

  toggleMessageDisplay (e) {
    e.preventDefault();
    if(!this.state.messageDisplay) { 
      this.setState({
        messageDisplay: true
      });
    return
    }
    this.setState({messageDisplay:false})
  }

  render () {

    let defStyle = {
      display: this.state.definitionDisplay ? 'block' : 'none'
    };
    let messStyle = {
      display: this.state.messageDisplay ? 'block' : 'none'
    };


    return (
      <div>
        <Header date={this.state.date}/>
        <Message style={messStyle} />
        <Search toggleDefinitionDisplay={this.toggleDefinitionDisplay.bind(this)} toggleMessageDisplay={this.toggleMessageDisplay.bind(this)}/>
        <Definition style={defStyle} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))