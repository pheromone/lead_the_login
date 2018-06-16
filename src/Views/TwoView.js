/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { observer, inject } from 'mobx-react'
import { action, autorun, computed } from 'mobx'
import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Tab', params: {}})
    ]
})



@inject('rootStore')
@observer
export default class TwoView extends Component<Props> {

    static navigationOptions = ({ navigation }) => ({
        header:null,
        tabBarOnPress: (tab) => {    //让tabBar可点击,做前置登录
            // navigation.state.params.navigatePress()
            tab.jumpToIndex(tab.scene.index)
        },
    });

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    登录状态:{this.loginStatus ? '已经登录' : '未登录'}
                </Text>

                <Text onPress={()=>this.loginOutAction()}>
                    注销
                </Text>
            </View>
        );
    }

    @computed get loginStatus() {
        return this.props.rootStore.TwoStore.allDatas.loginStatus;
    }


    componentDidMount() {
        this.props.navigation.setParams({ navigatePress: this.needLogin() })  // 使用这个来调用this
    }

    /**
     * 判断是否需要登录
     * */
    needLogin =() =>{
        //判断登录
        console.log('loginStatus')
        console.log(this.loginStatus)
        if(this.loginStatus){
            //已经登录
            return;
        }else {
            //未登录 跳转至登录界面
            this.props.navigation.navigate('LoginView',{callback:()=>this.getPersonalInfo()})
        }
    }

    /**
     * 登录成功的回调方法
     * */
    getPersonalInfo =() =>{
        // 请求数据赋值即可
    }


    loginOutAction =() =>{
        //注销登录 清空本地化数据 和 重置store中的loginStatus
        this.props.rootStore.TwoStore.allDatas.loginStatus = false
        this.props.navigation.dispatch(resetAction);
    }


}

const styles = StyleSheet.create({
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
