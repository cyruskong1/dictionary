import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
// import Face from './Face.jsx';
import $ from 'jquery';
import parse from 'curl-to-fetch';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      init:null,
      file: '',
      imagePreviewUrl: '',
      imagePreviewGender:'',
      imagePreviewAge:'',
    }
  }

  componentDidUpdate () {
    console.log('face uploaded, detecting face')
    this.detectFace();
  }

   _handleSubmit(e) {
    e.preventDefault();
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    console.log('uploaded file: ', e.target.files[0])
    var reader = new FileReader();
    var file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file:file,
        imagePreviewUrl:reader.result
      });
    }
  reader.readAsDataURL(file);

  }

  _handleURLChange (e) {
    e.preventDefault();

   console.log('uploaded url: ', e.target.value)
    //http://pngimg.com/uploads/face/face_PNG5660.png?i=1
    var imagePreviewUrl = e.target.value; 
   this.setState({
    file : e.target.value,
    imagePreviewUrl: imagePreviewUrl
   });
  }


  detectFace() {
    //https://westus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false
    //key: c0eca6dc966543c4880d6c2eeea5ffbf
    var context = this;
    console.log('this was uploaded', context.state.file)
    console.log('this', context)

    $(function() {
      var params = {
          // Request parameters
          "returnFaceId": "true",
          "returnFaceLandmarks": "false",
      };

   $.ajax({
      url: "https://westus.api.cognitive.microsoft.com/face/v1.0/detect?" + $.param(params),
      beforeSend: function(xhrObj){
          // Request headers
          xhrObj.setRequestHeader("Content-Type","application/json");
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","c0eca6dc966543c4880d6c2eeea5ffbf");
          console.log('this in ajax call', context)
      },
      type: "POST",
      // Request body
      data: { "url": context.state.file},
      })
      .done(function(data) {
          console.log("success");
      })
      .fail(function(e) {
          console.log("error", e.responseText);
      });
    })

  }

    searchForMatchingFace () {
    console.log('searching for face');

  }

  compareFace(data, index) {
    console.log('comparing face')
    // fetch( 
    //   'https://api-us.faceplusplus.com/facepp/v3/detect', 
    //   {headers:{
    //     api_key: apiKey,
    //     api_secret: apiSecret,
    //     image_file: data,
    //     image_file2: index,
    //     },
    //   method:'POST',
    //   dataType:'json'
    //   }
    //  )
    //  .then(function(response) {
    //     console.log('response to compare', response);
    //     return response.confidence;
    //   })
    //  .then(function(data) {
    //     console.log('data from face compare', data)
    //   })
    //  .catch(function(error) {console.log('error', error)
    //    });
    
  }

  clearSearch() {
    if(this.state.imagePreviewUrl) {
      this.setState({
        imagePreviewUrl:''
      });
      console.log('cleared image')
    }
  }


  render () {

    var {imagePreviewUrl} = this.state;
    var $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Upload a picture to find your Celebrity Look-a-like</div>);
    }

    return (
      <div>

        <Header />
 
        <div className="face-compare container">
          <h2>Celeb Look-a-like</h2>
          <p>Upload a picture to see who your celebrity Look-a-like is!</p>
          <div className="compare-container">
            <div className="first compare">
              <div className="compare-box">
                <div id="img-box-one" className="img-box imgPreview">
                  {$imagePreview}
                </div>
                <div className="previewComponent">
                  <form onSubmit={(e)=>this._handleSubmit(e)}>
                    <input className="urlInput" type="text" onChange={(e)=>this._handleURLChange(e)} />
                    <input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} />
                    <button className="submitButton" type="submit" onClick={(e)=>this._handleSubmit(e)} onClick={() => this.searchForMatchingFace()}>Find my Look-a-like</button>
                    <button className="clear" onClick ={() => this.clearSearch()}>Clear</button>
                  </form>
                </div>
              </div>
            </div>

            <div className="compare">
              <div className="compare-box">
                <div className="img-box imgResult">
                </div>
                <div className="resultComponent">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))