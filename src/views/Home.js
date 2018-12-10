'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text
} from 'react-native';


class Home extends Component {
	static navigationOptions =  {
	  title:'首页',
	};
  render() {
    return (
      <View>
      	<Text> 首页 </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});


export default Home;