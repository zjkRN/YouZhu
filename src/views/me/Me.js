'use strict';

import React, { Component } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DeviceInfo from 'react-native-device-info'
import Toast from 'react-native-root-toast';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import commonStyles, {colors} from '../common.style';

class Me extends Component {
	
  render() {
    const { navigation } = this.props;
    let uniqueId = DeviceInfo.getUniqueID();
    return (
      <ScrollView >
        <View style={styles.header}>
          <Text>我的 {uniqueId}</Text>
        </View>
        <View style={styles.group}>
          <TouchableOpacity 
            activeOpacity={1} 
            onPress={()=> navigation.navigate('Message')}
            style={styles.row}>
            <AntDesign name='message1' color={colors.gray} size={18} style={{paddingTop:1}}/>
            <Text style={styles.txt}>我的消息</Text>
            <AntDesign name='right' color={colors.gray} size={12} style={{paddingTop:4}}/>
          </TouchableOpacity>
          <TouchableOpacity 
            activeOpacity={1} 
            onPress={()=> navigation.navigate('StarList')}
            style={styles.row}>
            <AntDesign name='staro' color={colors.gray} size={18} style={{paddingTop:1}}/>
            <Text style={styles.txt}>我的收藏</Text>
            <AntDesign name='right' color={colors.gray} size={12} style={{paddingTop:4}}/>
          </TouchableOpacity>
          <TouchableOpacity 
            activeOpacity={1} 
            onPress={()=> navigation.navigate('ShareRecord')}
            style={styles.row}>
            <AntDesign name='clockcircleo' color={colors.gray} size={18} style={{paddingTop:1}}/>
            <Text style={styles.txt}>分享记录</Text>
            <AntDesign name='right' color={colors.gray} size={12} style={{paddingTop:4}}/>
          </TouchableOpacity>
        </View>
        <View style={styles.group}>
          <TouchableOpacity 
            activeOpacity={1} 
            style={styles.row}>
            <AntDesign name='key' color={colors.gray} size={18} style={{paddingTop:1}}/>
            <Text style={styles.txt}>激活码</Text>
            <AntDesign name='right' color={colors.gray} size={12} style={{paddingTop:4}}/>
          </TouchableOpacity>
          <TouchableOpacity 
            activeOpacity={1} 
            onPress={()=> navigation.navigate('About')}
            style={styles.row}>
            <AntDesign name='infocirlceo' color={colors.gray} size={18} style={{paddingTop:1}}/>
            <Text style={styles.txt}>关于我们</Text>
            <AntDesign name='right' color={colors.gray} size={12} style={{paddingTop:4}}/>
          </TouchableOpacity>

          <TouchableOpacity 
            activeOpacity={1} 
            onPress={()=> this._onCacheClear()}
            style={styles.row}>
            <AntDesign name='infocirlceo' color={colors.gray} size={18} style={{paddingTop:1}}/>
            <Text style={styles.txt}>清理缓存</Text>
            <AntDesign name='right' color={colors.gray} size={12} style={{paddingTop:4}}/>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  _onCacheClear(){
    Toast.show('测试提示消息');
    
    AsyncStorage.clear();
  }
}

const styles = StyleSheet.create({
  container:{
    // flex:1,
  },
  header:{
    height:200,
    backgroundColor:colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  group:{
    marginTop:10,
    paddingHorizontal:15,
    backgroundColor:colors.white,
  },
  row:{
    flexDirection:'row',
    paddingVertical:15,
    borderColor: colors.lightGray,
    borderBottomWidth:1,
  },
  txt:{
    flex:1,
    color: colors.black,
    lineHeight:20,
    paddingHorizontal:10,
    fontSize:14,
  }
});


export default Me;