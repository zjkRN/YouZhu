'use strict';

import React, { Component } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import commonStyles, { colors } from '../common.style';

class Message extends Component {

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	dataItems:[
	  		{id:1, type:'notice', title:'消息标题1', content:'消息内容', ctime:'2018-11-12'},
	  		{id:2, type:'notice', title:'消息标题2', content:'消息内容', ctime:'2018-11-12'},
	  		{id:3, type:'notice', title:'消息标题3', content:'消息内容', ctime:'2018-11-12'},
	  		{id:4, type:'notice', title:'消息标题4', content:'消息内容', ctime:'2018-11-12'},
	  		{id:5, type:'notice', title:'消息标题5', content:'消息内容', ctime:'2018-11-12'},
	  	],
	  };
	}

  render() {
		const { dataItems } = this.state;
    return (
      <View style={commonStyles.container}>
        <FlatList
          style={commonStyles.group}
          data={dataItems}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => item.id.toString()}
        />
      </View>
    );
  }

  _renderItem = ({item, index}) => {

  	const { navigation } = this.props;
  	return (
  		<TouchableOpacity 
        activeOpacity={1} 
        onPress={()=> navigation.navigate('MessageDetail')}
        style={commonStyles.groupRow}>
        <View style={styles.iconBox}>
          <AntDesign 
          	name='sound' 
          	color={colors.black} 
          	size={18}/>
        </View>
        <View style={[commonStyles.groupContent,{paddingRight:0}]}>
        	<Text style={[commonStyles.groupTitle,{paddingRight:70}]} numberOfLines={1}>{item.title}</Text>
        	<Text style={commonStyles.groupDesc} numberOfLines={1}>{item.content}</Text>
        	<Text style={styles.time}>{item.ctime}</Text>
        </View>
      </TouchableOpacity>
  	);
  }
}

const styles = StyleSheet.create({
	iconBox:{
		width:40,
		height:40,
		borderRadius:25,
		backgroundColor:colors.lightGray,
		justifyContent: 'center',
		alignItems: 'center',
	},
	time:{
		position:'absolute',
		right:0,
		top:4,
		fontSize: 12,
		color:colors.gray,
	}
});


export default Message;