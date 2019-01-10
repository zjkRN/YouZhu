'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';

import commonStyles, { colors } from '../common.style';
import utils from '../../utils/utils';


class MessageDetail extends Component {
	static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title')
    }
  }

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	data:{
	  		// id:1,
	  		// title:'消息标题消息标题消息标题消息标题',
	  		// content:'消息正文换行消息正文换行消息正文\n换行消息正文换行消息正文\n换行消息正文换行消息正文\n换行消息正文换行',
	  		// ctime:'2018-11-11'
	  	}
	  };
	}

  render() {
  	const { data } = this.state;
    return (
      <View style={commonStyles.container}>
      	<ScrollView style={commonStyles.group}>
      		<Text style={styles.title}>{data.title}</Text>
      		<Text style={styles.ctime}>{utils.formatDate(data.ctime)}</Text>
      		<View style={styles.conBox}>
      			<Text style={styles.content}>{data.content}</Text>
      		</View>
      	</ScrollView>
      </View>
    );
  }

  componentDidMount(){
  	const { navigation } = this.props;
  	const { data } = this.state;
    navigation.setParams({ title: data.title });

    this.state.data = navigation.getParam('item', this.state.data);
  }
}

const styles = StyleSheet.create({
	title:{
		flex:1,
		lineHeight:25,
		fontSize:18,
		fontWeight:'bold',
		textAlign: 'center',
		paddingVertical:10,
	},
	ctime:{
		lineHeight:20,
		fontSize:12,
		textAlign:'right',
		paddingRight:15,
		color:colors.gray,
	},
	conBox:{
		borderTopWidth:1,
		borderColor:colors.lightGray,
		paddingTop:15,
	},
	content:{
		lineHeight:25,
		color:colors.gray,
		fontSize:14,
	},
});


export default MessageDetail;