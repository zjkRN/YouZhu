
import React from 'react';

import Home from './views/Home';
import PlanList from './views/plan/List';
import PlanDetail from './views/plan/Detail';
import Me from './views/me/Me';

import AntDesign from 'react-native-vector-icons/AntDesign';

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
	Home: PlanList,
	Detail: PlanDetail,
}, {
	...defaultNavigatorConfig,
	initialRouteName:'Home',
});

const MeNavigator = createStackNavigator({
	Me: Me
},{
	...defaultNavigatorConfig,
	initialRouteName:'Me',
});

const HomeNavigator = createStackNavigator({
	Home:Home
},{
	...defaultNavigatorConfig,
	initialRouteName:'Home',
	headerMode:'none',
});

const TabNavigator = createBottomTabNavigator({
		TabHome: {
			screen: HomeNavigator,
			navigationOptions:{ title: '首页'}
		},
		TabPlan: { 
			screen: PlanNavigator, 
			navigationOptions:{ title: '计划'}
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
        if (routeName === 'TabHome') {
      		return <AntDesign name={'home'} size={25} color={tintColor} />;

        }
        if (routeName === 'TabPlan') {
      		return <AntDesign name={'rocket1'} size={25} color={tintColor} />;
        }

        if(routeName === 'TabMe'){
      		return <AntDesign name={'user'} size={25} color={tintColor} />;
        }
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