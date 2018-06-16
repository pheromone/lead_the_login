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


@inject('rootStore')
@observer
export default class LoginView extends Component<Props> {
    static navigationOptions = ({ navigation }) => ({
        header:null,
    });

    render() {
        return (
            <View style={styles.container}>
                <Text onPress={()=>this.loginAction()}>
                    登录
                </Text>

            </View>
        );
    }

    /**
     * 登录/注销 可以在store里面执行也可以直接在这里执行,看你习惯
     * */
    loginAction =() =>{
        //登录请求

        //成功之后,修改loginStatus.本地化数据等等
        this.props.rootStore.TwoStore.allDatas.loginStatus = true

        //返回上一个界面,并回调刷新
        this.props.navigation.goBack()
        this.props.navigation.state.params.callback();

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
