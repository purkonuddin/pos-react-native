import React, { Component } from 'react';
import { View, Image, Button, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
// import Axios from "react-native-axios";
import { REACT_APP_URL_STRING } from 'react-native-dotenv';
import { connect } from "react-redux";
import RenderProducts from './secondscreen/ItemRoute/RenderProducts';
import {wait, getUser} from './helper/index';
import ImagePicker from 'react-native-image-picker'; 
// import RNFetchBlob from 'rn-fetch-blob';
import { Avatar } from 'react-native-elements';
const {height, width}= Dimensions.get('window');

class CobaScreen extends Component{   
  constructor(props) {
    super(props);
    this.state={
      photo: null,
    }
  }
  
  handleTakePhoto = () => {
    let options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      noData: true,
    }
    ImagePicker.launchCamera(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  }

  handleChoosePhoto = () => {
    let options = { 
      noData: true,
    }
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photo: response })
      }
    })
  } 

  handleUploadPhoto = async() => {
    const user = await getUser(); 
    const { photo } = this.state;  
    // let data = await createFormData(photo, {id: user.id})  
    const data = new FormData();
    // data.append('name', 'avatar');
    data.append('image', {
      uri : photo.uri,
      type: photo.type,
      name: photo.fileName,
      path: photo.path,
    });
    console.log('data: ',data);
    console.log('photo: ',photo);
    
    // RNFetchBlob.fetch('POST', `${REACT_APP_URL_STRING}user/upload/${user.id}`, {
    //   'Content-Type' : 'multipart/form-data',
    // }, [ 
    //   { name : 'image', filename : `${photo.fileName}`, type:`${photo.type}`, data: RNFetchBlob.wrap(photo.path)},
    //   { name : 'name', data : 'user'}, 
    // ])
    // .then(response => {
    //   console.log("upload succes", response);
    //   alert("Upload success!");
    //   this.setState({ photo: null });
    // })
    // .catch(error => {
    //   console.log("upload error", error);
    //   alert("Upload failed!");
    // });
  };

  render(){
    const { photo } = this.state;

    return(
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Avatar
              rounded
              size="xlarge"
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
              }}
              accessory={{ name: 'mode-edit', type: 'material', color: '#fff', underlayColor: '#000' }}
              showAccessory={true} 
            />
        <Avatar rounded icon={{ name: 'edit' }} containerStyle={{position:'absolute', right:width/2-85}}/>

        {photo && (
          <React.Fragment>
            
            <Avatar   
                    size="xlarge"
                    title={photo.name}
                    onPress={() => console.log("Works!")}
                    source={{uri:photo.uri}} 
                    containerStyle={{borderWidth:5,borderColor:'#FFF'}}
                    showAccessory={false}
                    accessory={{ name: 'mode-edit', type: 'material', color: '#fff', underlayColor: '#000' }}
                    onAccessoryPress
                    />
            {/* <Image
              source={{ uri: photo.uri }}
              style={{ width: 300, height: 300 }}
            /> */}
            <Button title="Upload" onPress={this.handleUploadPhoto} />
          </React.Fragment>
        )}
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
        <Button title="Take Photo" onPress={this.handleTakePhoto} /> 
      </View>
    )
  } 
}

// mapStateToProps =(state)=>{
//   // const { user, product, checkout } = state
//   return{
//     user: state.user, 
//     product: state.product, 
//     checkout: state.checkout,
//   }
// }

// export default connect(mapStateToProps)(CobaScreen);
export default CobaScreen;

const createFormData = (photo, body) => {
  const data = new FormData();

  data.append("image", { 
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};