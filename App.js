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
import Geocoder from 'react-native-geocoder';

export default class App extends Component {

  componentDidMount(){
    var NY = {
      lat: -7.9275268,
      lng: 112.6019863
    };

    Geocoder.geocodePosition(NY).then(res => {
      console.log("Geocode position")
      console.log(res)
    })
    .catch(err => console.log(err))

    Geocoder.geocodeAddress('New York').then(res => {
      console.log("Geocode address")
      console.log(res)
    })
    .catch(err => console.log(err))

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
