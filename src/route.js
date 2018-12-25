
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  View,
} from 'react-native';

import {colors} from './views/common.style';

import Index from './views/home/Index';
import AdPage from './views/home/AdPage';

import ProList from './views/pro/List';
import ProDetail from './views/pro/Detail';

import Me from './views/me/Me';
import Message from './views/me/Message';
import ShareRecord from './views/me/ShareRecord';
import About from './views/me/About';


import {
	createStackNavigator, 
	createAppContainer,
	createDrawerNavigator,
	createBottomTabNavigator
} from 'react-navigation';

const defaultNavigatorConfig = {
	headerLayoutPreset:'center',
	defaultNavigationOptions:{
		headerStyle:{
      backgroundColor:'#262626',
    },
    headerTintColor: '#fff',
    headerTitleStyle:{
      fontWeight:'bold'
    }
	},
	cardStyle:{
		backgroundColor:'#f9f9f9'
	}
}

const PlanNavigator = createStackNavigator({
	PlanList: {
		screen: ProList,
		params:{ type:'plan' },
		navigationOptions:({navigation}) => ({
			title:'我的行程',
			headerBackTitle:null,
			headerRight:(
        <AntDesign.Button 
          name="plus" 
          size={30}
          underlayColor="transparent"
          backgroundColor="transparent"
          onPress={navigation.getParam('onBtnAddClick')}
          style={{paddingHorizontal:5}}/>
        )
		})
	},
	PlanDetail: ProDetail,
}, {
	...defaultNavigatorConfig,
	initialRouteName:'PlanList',
});

const MeNavigator = createStackNavigator({
	Me: {
		screen: Me,
		navigationOptions:{
			header:null,
			headerBackTitle:null,
		},
	},
	StarList:{
		screen: ProList,
		params:{
			type: 'star'
		},
		navigationOptions:{
			title:'我的收藏',
			headerBackTitle:null,
		},
	},
	PlanDetail: ProDetail,
	Message: {
		screen: Message,
		navigationOptions:{
			title:'我的消息',
			headerBackTitle:null,
		},
	},
	ShareRecord:{
		screen: ShareRecord,
		navigationOptions:{
			title: '分享记录',
		},
	},
	About:{
		screen: About,
		navigationOptions:{
			title: '关于我们'
		}
	}
},{
	...defaultNavigatorConfig,
	initialRouteName:'Me',
});

const ProductNavigator = createStackNavigator({
	ProList:{
		screen: ProList,
		params: {
			type:'pro'
		},
		navigationOptions:{
			title:'友助推荐',
			headerBackTitle:null,
		},
	},
	PlanDetail: ProDetail,
},{
	...defaultNavigatorConfig,
	initialRouteName:'ProList'
});

const HomeNavigator = createStackNavigator({
	Index: {
		screen: Index,
		navigationOptions:{
			header:null,
			headerBackTitle:null,
		}
	},
	AdPage: AdPage,
},{
	...defaultNavigatorConfig,
	initialRouteName:'Index',
});

const TabNavigator = createBottomTabNavigator({
		TabHome: {
			screen: HomeNavigator,
			navigationOptions:{ title: '首页'}
		},
		TabProduct: {
			screen: ProductNavigator,
			navigationOptions:{ title: '推荐'}
		},
		TabPlan: { 
			screen: PlanNavigator, 
			navigationOptions:{ title: '行程'}
		},
		TabMe: {
			screen: MeNavigator,
			navigationOptions:{ title: '我的' }
		}
	},{
		initialRouteName:'TabMe',
		// backBehavior:'none',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch(routeName){
        	case 'TabHome':
        		iconName = 'home';
        		break;
        	case 'TabProduct':
        		iconName = 'find';
        		break;
        	case 'TabPlan':
        		iconName = 'rocket1';
        		break;
        	case 'TabMe':
        		iconName = 'user';
        		break;
        }
      	return  <AntDesign name={iconName} size={25} color={tintColor} />;
      },
    }),
    // tabBarComponent: TabBarBottom,
    // tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    // animationEnabled: false,
    // swipeEnabled: false,
 });









export default createAppContainer(TabNavigator);