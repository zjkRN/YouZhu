'use strict';

import React, { Component } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SYImagePicker from 'react-native-syan-image-picker'
import { withNavigation } from "react-navigation";

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  DeviceEventEmitter,
  FlatList,
  StatusBar,
} from 'react-native';

import LocalStorage from '../../utils/localStorage';
import EventTypes from '../../config/eventTypes';
import commonStyles, { colors } from '../common.style';
import ListItem from './ListItem';

import HttpRequest from '../../utils/httpRequest';

class PlanList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: props.navigation.getParam('type'),
      searchValue:'',
      pageNum: 1,
      dataItems:[
        // {id:1, content:'test content 1', image:{width:100, height:300, uri:'http://g.hiphotos.baidu.com/image/pic/item/024f78f0f736afc3cf9d3fdebe19ebc4b64512f3.jpg'}},
        // {id:2, content:'test content 2', image:{width:100, height:300, uri:'http://a.hiphotos.baidu.com/image/pic/item/d439b6003af33a87112d6dadcb5c10385243b5c1.jpg'}},
        // {id:3, content:'test content 3', image:{width:100, height:300, uri:'http://d.hiphotos.baidu.com/image/pic/item/2934349b033b5bb512407b473bd3d539b700bcf0.jpg'}},
      ]
    };
  }
  
  render() {
    const { dataItems } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="请输入探索内容"
            placeholderTextColor="#ccc"
            onChangeText={(text)=>{ this.setState({searchValue: text })}}
            value={this.state.searchValue}/>
          <View style="styles.btnSearch">
            <AntDesign.Button 
              style={{marginLeft:10}} 
              name="search1" 
              onPress={()=> this.onSearch()}
              size={15} 
              color={colors.gray}
              underlayColor="transparent"
              backgroundColor="transparent"/>
          </View>
        </View>
        <FlatList
          style={styles.list}
          data={dataItems}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.id.toString()}
        />
      </View>
    );
  }

  _renderItem = ({item, index}) => {
    const {type} = this.state;
    let buttons = [];
    switch(type){
      case 1: // 行程
        buttons = ['star','wechat','moment','edit','delete'];
        break;
      case 2: // 产品
        buttons = ['star','wechat','moment','copy'];
        break;
      case 'star':
        buttons = ['star','wechat','moment','edit'];
        break;
    }
    
    return (
      <ListItem item={item} buttons={buttons} {...this.props }/>
    );
  }

  componentDidMount(){
    const { navigation } = this.props;
    navigation.setParams({
      onBtnAddClick: () => this.onBtnAddClick(),
    });
    this.setState({dataItems: [] });

    // this.eventBackHome = DeviceEventEmitter.addListener(EventTypes.EVENT_BACK_HOME, () => this.loadData());
    this.eventStar = DeviceEventEmitter.addListener(EventTypes.EVENT_STAR, (item) => {
      this.setState({dataItems: Object.assign([], this.state.dataItems)});
    });
    this.didFocus = navigation.addListener('didFocus', () => {
      this.loadData();
    })
  }

  

  componentWillUnmount(){
    // this.eventBackHome.remove();
    this.eventStar.remove();
    this.didFocus.remove();
  }

  // componentWillReceiveProps(nextProps){
  //   console.log('componentWillReceiveProps');
  //   // 每次值更新时，都会走这个方法，所以可以在这里添加判断以更新页面
  // }

  loadData(){
    const {searchValue, pageNum, type } = this.state;
    let data = {
      key: searchValue,
      pageNum: pageNum,
      type: type
    };
    HttpRequest.post('/product', data).then(res => {
      if(res.code !== "SUCCESS"){
        return;
      }
      this.setState({dataItems: res.data });
    });
  }

  onSearch(){
    const {searchValue} = this.state;
    this.loadData();
  }
  onBtnAddClick(){
    SYImagePicker.asyncShowImagePicker({ imageCount:1 }).then(photos => {
      let curItem = {};
      curItem.image = { 
        width:photos[0].width, 
        height:photos[0].height, 
        uri:photos[0].uri 
      };
      this.props.navigation.navigate('PlanDetail', { item: curItem });
    }).catch(err=>{
      console.log(err.message);
    });
  }

  onItemClick(item){
    this.props.navigation.navigate('PlanDetail', {item: item});
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
    marginTop:10,
    flex:1,
  },
  searchBox:{
    flexDirection:'row',
    marginHorizontal:15,
    marginBottom:10,
    borderColor:'#f0f0f0',
    borderWidth:1,
    backgroundColor:'#fff',
    borderRadius:6,
  },
  searchInput:{
    height:30,
    borderColor:'transparent',
    borderWidth:0,
    flex:1,
    paddingHorizontal:10,
    paddingVertical:5,
    color:colors.gray,
  },
  btnSearch:{
    position:'absolute',
    top:0,
    right:15,
  },
  list:{
    // paddingHorizontal:15,
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


export default withNavigation(PlanList);
