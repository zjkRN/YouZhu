
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Index from './views/home/Index';
import AdPage from './views/home/AdPage';

import ProList from './views/product/List';

import PlanList from './views/plan/List';
import PlanDetail from './views/plan/Detail';

import Me from './views/me/Me';

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
	      backgroundColor:'#3F51B5',
	    },
	    headerTintColor:'#fff',
	    headerTitleStyle:{
	      fontWeight:'bold'
	    }
	},
	cardStyle:{
		backgroundColor:'#f9f9f9'
	}
}

const PlanNavigator = createStackNavigator({
	PlanList: PlanList,
	PlanDetail: PlanDetail,
}, {
	...defaultNavigatorConfig,
	initialRouteName:'PlanList',
});

const MeNavigator = createStackNavigator({
	Me: Me
},{
	...defaultNavigatorConfig,
	initialRouteName:'Me',
});

const ProductNavigator = createStackNavigator({
	ProList:ProList
},{
	...defaultNavigatorConfig,
	initialRouteName:'ProList'
});

const HomeNavigator = createStackNavigator({
	Index: Index,
	AdPage: AdPage,
},{
	...defaultNavigatorConfig,
	initialRouteName:'Index',
	headerMode:'none',
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
		initialRouteName:'TabHome',
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