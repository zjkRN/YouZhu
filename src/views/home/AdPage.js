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
	
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title') || '加载中...'
    }
  }

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
          onNavigationStateChange={this.onNavigationStateChange}
          />
    );
  }

  componentDidMount(){
  	this.state.url = this.props.navigation.getParam('url', '');
    this.setState({});
  }

  onNavigationStateChange = (event) => {
    const { navigation } = this.props;
    if(!event.loading){
      navigation.setParams({
        title: event.title
      });
    }
    
  }
}

const styles = StyleSheet.create({

});


export default AdPage;