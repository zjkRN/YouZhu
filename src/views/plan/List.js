'use strict';

import React, { Component } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import ImagePicker from 'react-native-image-picker';
import LocalStorage from '../../utils/localStorage';
import EventTypes from '../../config/eventTypes';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  DeviceEventEmitter,
  FlatList,
} from 'react-native';



class List extends Component {

  static navigationOptions =  {
    title:'友助',
  };

  constructor(props) {
    super(props);
  
    this.state = {
      dataItems:[]
    };
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={()=> this.onBtnAddClick()}>
        	<View style={styles.add}>
            <AntDesign name='plus' size={40} color='#333' />
          </View>
        </TouchableOpacity>
        <FlatList
          style={styles.list}
          data={this.state.dataItems}
          renderItem={({item, index}) => this.renderItem(item, index)}
          keyExtractor={(item, index) => item.id.toString()}
        />
      </View>
    );
  }

  renderItem(item, index){
    return (
      <TouchableOpacity
        onPress={()=> this.onItemClick(item)}>
        <View style={[styles.item,{backgroundColor:item.bgColor}]}>
          <View style={styles.desc}>
            <Text style={{color:'#fff', fontSize:16,lineHeight:20}} numberOfLines={2} ellipsizeMode="tail">{item.desc}</Text>
          </View>
          <Text style={styles.ctime}>{item.ctime}</Text>
          <View style={styles.delete}>
            <AntDesign.Button
              name="delete" 
              size={30} 
              underlayColor="transparent"
              backgroundColor="transparent"
              onPress={()=> this.onDeleteClick(item)}/>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  componentDidMount(){
    this.eventBackHome = DeviceEventEmitter.addListener(EventTypes.EVENT_BACK_HOME, () => this.loadData());
    this.loadData();
  }
  componentWillUnmount(){
    this.eventBackHome.remove();
  }

  // componentWillReceiveProps(nextProps){
  //   console.log('componentWillReceiveProps');
  //   // 每次值更新时，都会走这个方法，所以可以在这里添加判断以更新页面
  // }

  

  loadData(){
    LocalStorage.get('dataItems').then(res => {
      this.setState({ dataItems: res });
    });
  }

  onBtnAddClick(){
    const photoOptions = {
      //底部弹出框选项
      // title:'请选择',
      // cancelButtonTitle:'取消',
      // takePhotoButtonTitle:'拍照',
      // chooseFromLibraryButtonTitle:'选择相册',
      // quality:0.75,
      // allowsEditing:true,
      // noData:false,
      // storageOptions: {
      //     skipBackup: true,
      //     path:'images'
      // }
    }
    ImagePicker.launchImageLibrary(photoOptions, (response) => {
      if(response.didCancel){
        return;
      }
      let curItem = {
        image:{
          width: response.width,
          height: response.height,
          uri: response.uri
        }
      }
      this.props.navigation.navigate('Detail',{item: curItem});
    });
  }

  onItemClick(item){
    this.props.navigation.navigate('Detail', {item: item});
  }

  onDeleteClick(item){
    let itemIndex = this.state.dataItems.findIndex(obj => obj.id === item.id);
    this.state.dataItems.splice(itemIndex, 1);
    LocalStorage.save('dataItems', this.state.dataItems);
    this.setState({
      dataItems: Object.assign([], this.state.dataItems)
    });    
  }

}

const styles = StyleSheet.create({
  container:{
    marginTop:20,
    flex:1,
  },
  add:{
    alignItems:'center',
    justifyContent:'center',
    borderColor:'#ccc',
    borderRadius:10,
    paddingVertical:20,
    marginHorizontal:15,
    borderStyle:'dashed',
    borderWidth: 1,
    marginBottom:20,
  },
  list:{
    paddingHorizontal:15,
  },
  item:{
    marginBottom:20,
    borderRadius:10,
    paddingVertical:10,
    paddingLeft:15,
    paddingRight:30,
  },
  desc:{
    alignItems:'flex-start',
    justifyContent:'center',
    height:40,
    marginBottom:10,
  },
  ctime:{
    flex:1,
    color:'#fff',
    fontSize:12,
    lineHeight:15,
  },
  delete:{
    position:'absolute',
    bottom:0,
    right:-10
  }
});


export default List;
