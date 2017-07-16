import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Header from './components/Header';
import Message from './components/Message';
import Search from './components/Search';
import Definition from  './components/Definition';
import AddToDictionary from './components/AddToDictionary';


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: null,
      definitionDisplay: false,
      messageDisplay: false,
      addDisplay: false,
      word: null,
      definition: null,
      userSuccess: null
    }
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
    console.log('definitionDisplay', this.state.definitionDisplay);
    let searchInput = document.getElementById('searchedWord');
    e.preventDefault();
    this.setState({
      word: null,
      definition: null,
      definitionDisplay:false
    });
    searchInput.value = '';
    searchInput.readOnly = false;
  }

  toggleMessageDisplay () {
    //if the users action was successful
    if(this.state.userSuccess === true) {
      //display message with success styles
      this.setState({messageDisplay:true})
      console.log('user success', this.state.userSuccess,'messageDisplay', this.state.messageDisplay)
      setTimeout(()=> this.setState({messageDisplay:false}), 1500)
      console.log('display success message', );
    } 

    if(this.state.userSucess === false) {
    //if the users action caused an error
      this.setState({messageDisplay:true})
      console.log('display error message');
      //display error message
    }
  }

  toggleAddDisplay (e) {
    let searchInput = document.getElementById('searchedWord');
    e.preventDefault();
    //if the search field is blank and the user wants to add a word to the dictionary, send error
    if(searchInput.value == '') {
      alert('FILL the shit out!');
      return;
      //else let user add to storage
    } else {
      if(!this.state.addDisplay) { 
        this.setState({
          addDisplay: true
        });
      searchInput.readOnly = true;
      return
    } else {
      this.setState({
        addDisplay: false
      })
      let definitionTextbox = document.getElementById('add-def').value='';
      searchInput.readOnly = false;
      searchInput.value = '';
    }

    }
    this.setState({addDisplay:false})
  }

  addToDictionary (e) {
    e.preventDefault();
    let definitionTextbox = document.getElementById('add-def');
    if(definitionTextbox.value == '') {
      this.setState({userSuccess:false});
      this.toggleMessageDisplay();
    } else {
      this.setState({userSuccess:true});
      this.toggleMessageDisplay();
      this.toggleAddDisplay(e);
    }
  }


  searchDictionary (e) {
    //make API call from client
    e.preventDefault();
    const url = 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/';
    let searchInput = document.getElementById('searchedWord');
    let searchedWord = searchInput.value;
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
        console.log(word + ":" + definition)
        //update the state of the app with new word and definition and display definition
        this.setState({
          word: word,
          definition:definition,
          definitionDisplay:true
        })
        //while definition is visible set the search field to read only
        //user success set to true
        //display success message
        console.log('definition found, userSuccess')
        this.setState({userSuccess:true});
        this.toggleMessageDisplay();
        searchInput.readOnly = true;
      })
      .catch(err => {
        console.log('search error: ', err);
        this.setState({userSuccess:false})
        this.toggleMessageDisplay();
      })
  }


  render () {

    let defStyle = {
      display: this.state.definitionDisplay ? 'block' : 'none'
    };
    let messStyle = {
      opacity: this.state.messageDisplay ? '1' : '0'
    };
    let addStyle = {
      display: this.state.addDisplay ? 'block' : 'none'
    };


    return (
      <div>
        <Header date={this.state.date}/>
        <Message style={messStyle} />
        <Search toggleAddDisplay={this.toggleAddDisplay.bind(this)} searchWord={this.searchDictionary.bind(this)} />
        <Definition style={defStyle} word={this.state.word} definition={this.state.definition} toggleDefinitionDisplayOff={this.toggleDefinitionDisplayOff.bind(this)} />
        <AddToDictionary style={addStyle} toggleAddDisplay={this.toggleAddDisplay.bind(this)} addToDictionary = {this.addToDictionary.bind(this)}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))