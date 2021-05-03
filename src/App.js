import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {View, StatusBar, Text, TouchableOpacity, DevSettings} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
import codePush from "react-native-code-push";
import StackNavigator from './components/StackNavigator';
import OrientationTracker from './components/OrientationTracker';
import {persistor, store} from './store';
import {routes, screens} from './screens';
import {green_light} from './color';

class App extends React.Component {
  state = {
    installMode: codePush.InstallMode.ON_NEXT_RESUME
  }
  // useEffect(() => {
  //   SplashScreen && SplashScreen.hide();
  //   codePush.sync({
  //     installMode: codePush.InstallMode.IMMEDIATE
  // });
  // }, []);
  componentDidMount(){
    SplashScreen && SplashScreen.hide();
    this.sync()
  }

  sync = () => {
    codePush.sync({
      checkFrequency: codePush.CheckFrequency.ON_APP_START,
      installMode: codePush.InstallMode.ON_NEXT_RESUME
    },
    this.codePushStatusDidChange.bind(this),
    this.codePushDownloadDidProgress.bind(this)
    );
  }
  syncImmediate = () => {
    codePush.sync(
      { installMode: codePush.InstallMode.IMMEDIATE, updateDialog: true },
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this)
    );
  }

  codePushStatusDidChange(syncStatus) {
    switch(syncStatus) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('codePushStatusDidChange - CHECKING_FOR_UPDATE')
        this.setState({ syncMessage: "Checking for update." });
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('codePushStatusDidChange - DOWNLOADING_PACKAGE', new Date())
        this.setState({ syncMessage: "Downloading package." });
        break;
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        console.log('codePushStatusDidChange - AWAITING_USER_ACTION')
        this.setState({ syncMessage: "Awaiting user action." });
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('codePushStatusDidChange - INSTALLING_UPDATE')
        this.setState({ syncMessage: "Installing update." });
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        console.log('codePushStatusDidChange - UP_TO_DATE')
        this.setState({ syncMessage: "App up to date.", progress: false });
        break;
      case codePush.SyncStatus.UPDATE_IGNORED:
        console.log('codePushStatusDidChange - UPDATE_IGNORED')
        this.setState({ syncMessage: "Update cancelled by user.", progress: false });
        break;
      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('codePushStatusDidChange - UPDATE_INSTALLED', new Date())
        // codePush.sync({
        //   checkFrequency: codePush.CheckFrequency.ON_APP_START,
        //   installMode: codePush.InstallMode.IMMEDIATE
        // },
        // this.codePushStatusDidChange.bind(this),
        // this.codePushDownloadDidProgress.bind(this)
        // );
        codePush.restartApp()
        this.setState({ syncMessage: "Update installed and will be applied on restart.", progress: false });
        break;
      case codePush.SyncStatus.UNKNOWN_ERROR:
        console.log('codePushStatusDidChange - UNKNOWN_ERROR')
        this.setState({ syncMessage: "An unknown error occurred.", progress: false });
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    console.log('[codePushDownloadDidProgress]', progress, JSON.stringify(progress))
    this.setState({ progress });
  }

  render(){
    return (
      <Provider store={store}>
        <PersistGate loading={<View />} persistor={persistor}>
          <TouchableOpacity onPress={this.sync}>
            <Text>Sync BTN111</Text>
          </TouchableOpacity>
          <Text>{this.state?.syncMessage}</Text>
          <Text>{this.state?.progress?.receivedBytes} of {this.state?.progress?.totalBytes} bytes received</Text>
          <StatusBar backgroundColor={green_light} barStyle="dark-content" />
          <StackNavigator screens={screens} initialRouteName={routes.HOME} />
          <OrientationTracker />
        </PersistGate>
      </Provider>
    );
  }
};

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.ON_NEXT_RESUME
};

export default codePush()(App);
