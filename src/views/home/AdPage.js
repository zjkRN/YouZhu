'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  WebView,
  Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');

class AdPage extends Component {
	
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	url:''
	  };
	}

  render() {
  	const { url } = this.state;
    return (
      <WebView
          style={{width:width, height:height}}
          source={{uri:url, method: 'GET'}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={false}
          />
    );
  }

  componentDidMount(){
  	this.state.url = this.props.navigation.getParam('url', '');
    this.setState({});
  }
}

const styles = StyleSheet.create({

});


export default AdPage;