import React, { Fragment} from 'react'; 
import { ActivityIndicator, View, Text } from 'react-native';
import Overlay from 'react-native-modal-overlay'; 

export const OverlayLoading =(props)=>{ 
    const {visible, onClose} = props;
    return(
      <Overlay 
          visible={visible} 
          onClose={onClose} 
        //   closeOnTouchOutside 
          animationType="zoomIn" 
          containerStyle={{backgroundColor: 'rgba(37, 8, 10, 0.78)'}}
          childrenWrapperStyle={{backgroundColor: 'transparent'}}
          animationDuration={500}>
            {
            (hideModal, overlayState) => (
              <Fragment>
                <View style={{flexDirection:'row'}}>
                <ActivityIndicator color={'#FFF'}/>
                <Text style={{color:'#FFF', paddingHorizontal:5}}>Loading...</Text>
                </View>
              </Fragment>
            )
            } 
        </Overlay>
    )
  }  