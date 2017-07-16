import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './components/Header';
import Message from './components/Message';
import Search from './components/Search';
import Definition from  './components/Definition';


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: null,
      definitionDisplay: false,
      messageDisplay: false,
      word: null,
      definition: null,
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
      this.setState({
        date:today
      })
    }
  }

  toggleDefinitionDisplayOff (e) {
    console.log('definitionDisplay', this.state.definitionDisplay)
    e.preventDefault();
    this.setState({definitionDisplay:false});
    this.clearField();
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

  searchDictionary (e) {
    //make API call from client
    e.preventDefault();
    const url = 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/'
    let searchedWord = document.getElementById('searchedWord').value;
    const key = '?key=3d6528c8-1f2a-4a3d-b31b-aaac711c4efd';
    let query = url + searchedWord + key
    axios.get(query)
      .then(dictionaryResponseXML => {
        //parse the XML info into an XML file
        var parser = new DOMParser();
        let xml = parser.parseFromString(dictionaryResponseXML.data,"text/xml")
        //grab the word and definition from XML file
        let word = xml.getElementsByTagName('ew')[0].innerHTML;
        let definition = xml.getElementsByTagName('def')[0].textContent;
        console.log('word', word, 'definition', definition.substring(13,this.length));
        //update the state of the app with new word and definition and display definition
        this.setState({
          word: word,
          definition:definition,
          definitionDisplay:true
        })
        console.log('state after search', this.state)
      })
      .catch(err => console.log('search error: ', err))
  }

  clearField () {
    this.setState({
      word:null,
      definition:null
    })
    let searchInput = document.getElementById('searchedWord');
    searchInput.value = '';
    console.log('reset');
  }


  render () {

    let defStyle = {
      display: this.state.definitionDisplay ? 'block' : 'none'
    };
    let messStyle = {
      opacity: this.state.messageDisplay ? '1' : '0'
    };


    return (
      <div>
        <Header date={this.state.date}/>
        <Message style={messStyle} />
        <Search toggleMessageDisplay={this.toggleMessageDisplay.bind(this)} searchWord={this.searchDictionary.bind(this)} />
        <Definition style={defStyle} word={this.state.word} definition={this.state.definition} toggleDefinitionDisplayOff={this.toggleDefinitionDisplayOff.bind(this)} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))