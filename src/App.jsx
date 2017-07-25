import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import $ from 'jquery';
import Speech from '../speech';
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
      word: '',
      definition: '',
      userSuccess: null,
      messageToDisplay:'' 
    }
  }

  //**************  Get Updates for changes in state of App **************

  componentDidUpdate() {
    console.log('change detected re-rendering state', this.state, 'localStorage', localStorage)
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

  //************** Search Dictionary **************

  searchDictionary (e) {
    //make API call from client
    //************** For Future Refactor **************
    /*
    Store API key in a secret file that the server will require as an ENV variable
    Save DOM elements in state -- do no access via document.getElementById
    *****************************/
    e.preventDefault();
    const url = 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/';
    let searchInput = document.getElementById('searchedWord');
    let searchedWord = searchInput.value.toLowerCase();
    const key = '?key=3d6528c8-1f2a-4a3d-b31b-aaac711c4efd';
    let query = url + searchedWord + key
    let dataStore = localStorage;

    //search localStorage first
    //************** For Future Refactor **************
    /*
    Send Axios call for GET and POST to server end point
    Server will send request to API ex.
    axios.get('/search', thingToPost
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    //then most of the functionality here will move to the server
    *****************************/
    if(localStorage.getItem(searchedWord)) {
      $.when()
        .then(() =>{
          this.setState({
            word:searchedWord,
            definition: localStorage[searchedWord],
            definitionDisplay:true
          })
        })
        .then(()=> {
          this.setState({
            userSuccess:true,
            messageToDisplay: 'Word search successful!'
          });
          this.toggleMessageDisplay();
          searchInput.readOnly = true;
          document.getElementById('add-to-dic').disabled = true;
        })
    }
    //search API if not in localStorage
    //************** For Future Refactor **************
    /*
    //most of the functionality here will move to the server
    *****************************/

    else {
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
          //disable add to dictionary button
          //display success message
          console.log('definition found, userSuccess')
          this.setState({
            userSuccess: true,
            messageToDisplay: 'Word search successful!'
          });
          this.toggleMessageDisplay();
          searchInput.readOnly = true;
          document.getElementById('add-to-dic').disabled = true;
        })
        .catch(err => {
          console.log('search error: ', err);
          this.setState({
            userSuccess:false,
            messageToDisplay: 'Search error. Please try again.'
          })
          this.toggleMessageDisplay();
        })
    }
  }

  //************** Adding to Dictionary **************

  //controller to add to dictionary JSON store
  //search localStorage first
  //************** For Future Refactor **************
  /*
  Send Axios call for GET and POST to server end point
  Server will send request to API ex.
  axios.post('/post', thingToPost
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  //then most of the functionality here will move to the server
  *****************************/
  addToDictionary (e) {
    e.preventDefault();
    //Save DOM elements in state -- do no access via document.getElementById
    let searchInput = document.getElementById('searchedWord');
    let definitionTextbox = document.getElementById('add-def');
    let addButton = document.getElementById('add-to-dic');
    
    //if the user tries to add a word to the dictionary with no definition, display error message
    if(definitionTextbox.value == '') {
      console.log('null', this.state.userSuccess)
      this.setState({
        userSuccess: false,
        messageToDisplay: 'Please enter a definition.'
      })
      console.log('add to dictionary error user state', this.state.userSuccess)
      this.toggleMessageDisplay();
    } else {
      //if the user has input a definition to the textarea
      console.log('def to add', definitionTextbox.value)
      console.log('currentState definition: ', this.state.definition)
      
      $.when()
      .then(
        this.setState({
          definition: definitionTextbox.value,
          userSuccess:true,
          messageToDisplay:'Successfully added to the dictionary'
        })
      )
      .then(() => {
        //********** Plan A Write to datastore.json ************
        //Uncomment this code to demo Node error

        // console.log('axios call happens now');
        // axios.post('/', {
        //   word: this.state.word,
        //   definition: this.state.definition
        // })
        // .then(function (response) {
        //   console.log('axios post success',response);
        //   searchInput.value = '';
        // })
        // .catch(function (error) {
        //   console.log('axios post error',error);
        // });
        //})

        //********** Plan B Write to localStorage ************
        let dataStore = localStorage;
         dataStore.setItem(this.state.word, this.state.definition)
         console.log('current dataStore',dataStore)
      })
      .then(() => {  
        this.toggleMessageDisplay();
        this.setState({addDisplay:false})
        searchInput.value = '';
        definitionTextbox.value = '';
        searchInput.readOnly = false;
        addButton.disabled = false;
      })
    }
  }

  //************** Toggle Displays **************

  //after successful definition retrieval this will turn off definition box
  //Save DOM elements in state -- do no access via document.getElementById
  toggleDefinitionDisplayOff (e) {
    let searchInput = document.getElementById('searchedWord');
    let definitionTextbox = document.getElementById('add-def');
    let addButton = document.getElementById('add-to-dic')
    e.preventDefault();
    this.setState({
      word: null,
      definition: null,
      definitionDisplay:false
    });
    searchInput.value = '';
    searchInput.readOnly = false;
    addButton.disabled = false;
  }

  //toggle success or error message based on userSuccess in app state
  toggleMessageDisplay () {
    //if the users action was successful
    if(this.state.userSuccess === true) {
      //display message with success styles
      this.setState({messageDisplay:true})
      console.log('user success', this.state.userSuccess,'messageDisplay', this.state.messageDisplay)
      setTimeout(()=> this.setState({messageDisplay:false}), 1500)
      console.log('display success message');
    } 

    if(this.state.userSuccess === false) {
    //if the users action caused an error
      this.setState({messageDisplay:true})
      console.log('display error message');
      //display error message
    }
  }

  //toggle display on and off for adding words to dictionary this is one step before actually adding to the dictionary
  //user must have a word to put in the dictionary
  toggleAddDisplay (e) {
    let searchInput = document.getElementById('searchedWord');
    let searchInputValue = searchInput.value.toLowerCase();
    e.preventDefault();
    //if the search field is blank and the user wants to add a word to the dictionary, send error
    if(searchInputValue == '') {
      this.setState({
        userSuccess: false,
        messageToDisplay: 'Please enter a word.'
      });
      this.toggleMessageDisplay();
      return;
      //else let user add to storage
    } else {
      //if the user tries to add a word that is already in the dictionary return error message
      if(localStorage[searchInputValue]) {
        this.setState({
          userSuccess:false,
          messageDisplay:true,
          messageToDisplay:'Word is already in the Dictionary'
        })
        return
      }
      //if the app is not displaying add to Dictionary, set display to true and let user move on to add to Dictionary function
      //set state.word to what user has input
      if(!this.state.addDisplay) { 
        this.setState({
          word : searchInputValue,
          addDisplay: true
        });
      searchInput.readOnly = true;
      return
    } else {
      //for general toggling display, if it's open and the user wants to cancel or if the user has successfully added to the dictionary and wants to close 
      //empty form and go back to step 1
      this.setState({
        addDisplay: false
      })
      let definitionTextbox = document.getElementById('add-def').value='';
      searchInput.readOnly = false;
      searchInputValue = '';
    }

    }
    this.setState({addDisplay:false})
  }

  closeMessage () {
    this.setState({
      messageDisplay:false
    })
  }
  //currently not rendering Speech to text component
  speechToText (e) {
    e.preventDefault();
    console.log('enabling speech');
    Speech.start();
  }

  //******************* Future onChange function ****************
  //updateSearch (e) {
  //   this.setState({
  //     searchValue: e.target.value
  //   });
  // }


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
        <Message 
          close={this.closeMessage.bind(this)} 
          message={this.state.messageToDisplay} 
          style={messStyle} 
          userSuccess={this.state.userSuccess} 
        />
        <Search 
          speech={this.speechToText.bind(this)}
          toggleAddDisplay={this.toggleAddDisplay.bind(this)} 
          searchWord={this.searchDictionary.bind(this)} 
        />
        <Definition 
          style={defStyle} 
          word={this.state.word} 
          definition={this.state.definition} 
          toggleDefinitionDisplayOff={this.toggleDefinitionDisplayOff.bind(this)} 
        />
        <AddToDictionary 
          style={addStyle} 
          toggleAddDisplay={this.toggleAddDisplay.bind(this)} 
          addToDictionary = {this.addToDictionary.bind(this)} 
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))