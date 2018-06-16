import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
// 全局注册并注入mobx，其他地方都可以使用store
import {Provider} from 'mobx-react';
// 获取store实例
import store from './src/Mobx/RootStore';

import OneView from './src/Views/OneView';
import TwoView from './src/Views/TwoView';
import LoginView from './src/Views/LoginView'
import {Images} from './src/Images/'

export default class App extends Component<Props> {
    render () {
        return (
            <Provider rootStore={store}>

                <Navigator
                    onNavigationStateChange={(prevState, currentState) => {
                        // 只要切换tab,push,pop,这里一定走
                        console.log (prevState);
                        console.log (currentState);
                    }}
                />
            </Provider>
        );
    }

    componentDidMount = () => {
        console.disableYellowBox = true; //去除黄色弹框警告
    };
}

const Tab = TabNavigator (
    {
        OneView: {
            screen: OneView,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '首页',
                tabBarIcon: ({focused, tintColor}) => (
                    <Image
                        source={
                            focused
                                ? Images.tab.homePageActive
                                : Images.tab.homePage
                        }
                        style={{width: 25, height: 25}}
                    />
                ),
            }),
        },
        TwoView: {
            screen: TwoView,
            navigationOptions: ({navigation}) => ({
                tabBarLabel: '我的',
                tabBarIcon: ({focused, tintColor}) => (
                    <Image
                        source={
                            focused
                                ? Images.tab.mine_active
                                : Images.tab.mine
                        }
                        style={{width: 25, height: 25}}
                    />
                ),
            }),
        },
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: false,
        lazy: true,
        tabBarOptions: {
            activeTintColor: '#979797',
            inactiveTintColor: '#979797',
            style: {backgroundColor: '#ffffff'},
        },
    }
);

const Navigator = StackNavigator ({
    Tab: {
        screen: Tab,
    },
    LoginView: {
        screen: LoginView,
    }
});

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});