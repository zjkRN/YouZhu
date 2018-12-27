'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
} from 'react-native';

import commonStyles, { colors } from '../common.style';

class ShareRecord extends Component {
	
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	dataItems:[
	  		{id:1, pid:1, type:'pro', share:'wechat', content:'test desc 1', ctime:'2018-11-11', image:{width:100, height:300, uri:'http://g.hiphotos.baidu.com/image/pic/item/024f78f0f736afc3cf9d3fdebe19ebc4b64512f3.jpg'}},
	  		{id:2, pid:1, type:'plan', share:'moment', content:'test desc 1', ctime:'2018-11-11', image:{width:100, height:300, uri:'http://g.hiphotos.baidu.com/image/pic/item/024f78f0f736afc3cf9d3fdebe19ebc4b64512f3.jpg'}},
	  	],
	  };
	}

  render() {
    return (
      <View style={commonStyles.container}>
      	<View style={styles.item}>
      		<Image style={styles.img} source={{uri:item.image.uri}} />
      		<Text style={styles.content}>{item.content}</Text>
      		<View>
      			
      		</View>
      	</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	item:{

	}
});


export default ShareRecord;