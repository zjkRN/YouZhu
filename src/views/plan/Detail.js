'use strict';

import React, { Component } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SYImagePicker from 'react-native-syan-image-picker'


import LocalStorage from '../../utils/localStorage';
import Utils from '../../utils/utils';
import EventTypes from '../../config/eventTypes';

import {
  StyleSheet,
  View,ScrollView,
  Text,TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  Clipboard,
  DeviceEventEmitter,
  NativeModules,
} from 'react-native';

// import {Toast} from 'antd-mobile-rn';

let screenW = Dimensions.get('window').width;
let screenH = Dimensions.get('window').height;

let dataItems = [];
const colors = ['#2f54eb','#108ee9','#2db7f5','#1890ff', '#6699ff',
                '#13c2c2','#87d068','#1a535c','#4ecdc4','#cc99ff',
                '#ff6b6b','#fa8c16','#fa541c','#722ed1','#eb2f96'];

class Detail extends Component {
	static navigationOptions = ({navigation}) =>{
    return (
      {
        title:'友助',
        headerRight:(
          <View style={{flexDirection:'row'}}>
            <AntDesign.Button 
              name="save" 
              size={30}
              underlayColor="transparent"
              backgroundColor="transparent"
              onPress={navigation.getParam('onSave')}
              style={{paddingHorizontal:5}} />
            <AntDesign.Button 
              name="sharealt" 
              size={30}
              underlayColor="transparent"
              backgroundColor="transparent"
              onPress={navigation.getParam('onShare')}
              style={{paddingHorizontal:5}}/>
          </View>
        )
      }
    );
  }

  constructor(props) {
    super(props);
  
    this.state = {
      curItem:{
        image:{}
      }
    };
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { height:90}]}
            multiline={true}
            numberOfLines = {4}
            nderlineColorAndroid="transparent"
            placeholder="描述"
            onChangeText={(desc)=>{ this.state.curItem.desc = desc; this.setState({});}}
            value={this.state.curItem.desc}/>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={()=> this.onImgClick()}>
          <Image
            style={{ width:screenW-30,height:this.getImgHeight(), resizeMode:'cover' }}
            source={{uri:this.state.curItem.image.uri}} />
        </TouchableOpacity>
      </ScrollView>
    );
  }

  componentDidMount(){
    this.props.navigation.setParams({
      onSave: () => this.onSave(),
      onShare:() => this.onShare()
    });

    LocalStorage.get('dataItems').then(res => {
      dataItems = res || [];
    });

    this.state.curItem = this.props.navigation.getParam('item', this.state.curItem);
    this.setState({});
  }

  getImgHeight(){
    if(!this.state.curItem.image.width || !this.state.curItem.image.height){
      return 200;
    }
    return( screenW * this.state.curItem.image.height / this.state.curItem.image.width);
  }

  onImgClick(){
    SYImagePicker.asyncShowImagePicker({ imageCount:1 }).then(photos => {
      this.state.curItem.image = {
        width: photos[0].width,
        height: photos[0].height,
        uri: photos[0].uri
      };
      this.setState({});
    });
  }

  onSave(){
    if(!this.saveItem()){
      return;
    }
    this.props.navigation.goBack();
    DeviceEventEmitter.emit(EventTypes.EVENT_BACK_HOME);
  }

  onShare(){
    if(!this.saveItem()){
      return;
    }
    Clipboard.setString(this.state.curItem.desc);
    NativeModules.RNShareModule.shareToTimeLine(this.state.curItem.image.uri, this.state.curItem.desc, (response)=>{
      if(response.code !== 'SUCCESS'){
        // Toast.fail(response.msg);
        console.log(response.msg);
        return;
      }
    });
  }

  saveItem(){
    let curItem = this.state.curItem;
    if(!curItem.desc || !curItem.image.uri){
      // Toast.show('请设置分享内容');
      console.log('请设置分享内容');
      return false;
    }

    if(!curItem.id){
      let tmpItem = dataItems[0];
      curItem.id = tmpItem ? tmpItem.id+1 : 1;
      curItem.bgColor = colors[dataItems.length%colors.length];
      curItem.ctime = Utils.formatDate();
      dataItems.unshift(curItem);
    } else {
      let tmpIndex = dataItems.findIndex(item => item.id === curItem.id);
      dataItems.splice(tmpIndex, 1, curItem);
    }

    LocalStorage.save('dataItems', dataItems);
    return true;
  }
}

const styles = StyleSheet.create({
  container:{
    paddingVertical:20,
    paddingHorizontal:15, 
    height:screenH
  },
  row:{
    flex:1,
    paddingBottom: 20,
    fontSize:16,

  },
  label:{
    color:'#bbb', 
    fontSize:12,
    marginBottom:5,
  },
  input:{
    lineHeight:20,
    paddingVertical:5,
    paddingHorizontal:10,
    borderStyle:'solid',
    borderWidth:1,
    borderColor:'#ddd',
    textAlignVertical: 'top'
  }
});


export default Detail;