/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  Text,
  View
} from 'react-native';
import FCM, { FCMEvent } from "react-native-fcm";

export default class App extends Component {

  componentDidMount(){
    FCM.requestPermissions()
    FCM.getInitialNotification()
    .then((notif) => {
      console.log('Initial notification', notif)
    })

    this.notificationListener = FCM.on(FCMEvent.Notification, (notif) => {
      if(notif && notif.local_notification) {
        return
      }

      if(Platform.OS == 'android') {
        this.displayNotificationAndroid(notif)
      }
    })
  }

  componentWillUnMount(){
    this.notificationListener()
  }

  displayNotificationAndroid(notif) {
    console.log('isi notif', notif)
    FCM.presentLocalNotification({
      title: notif.fcm.title,
      body: notif.fcm.body,
      priority: 'high',
      click_action: notif.fcm.click_action,
      show_in_foreground: true,
      local: true
    })
  }

  render() {
    return (
      <View>
        <Text>test</Text>
      </View>
    );
  }
}
