import React from 'react';
import {View, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {setOrientationInfo} from '../../actions/orientation';

const OrientationTracker = ({isLandscape, screenW, setInfoHandler}) => {
  const setInfo = () => {
    const {width, height} = Dimensions.get('window');
    const _isLandscape = width > height;
    isLandscape !== _isLandscape &&
      setInfoHandler({
        isLandscape: _isLandscape,
        screenW: width,
        screenH: height,
      });
  };

  if (isLandscape === undefined || !screenW) {
    setInfo();
  }

  const onLayout = () => {
    setInfo();
  };

  return <View onLayout={onLayout} />;
};

const mapStateToProps = ({orientStore}) => ({
  isLandscape: orientStore.isLandscape,
  screenW: orientStore.screenW,
});

const mapDispatchToProps = dispatch => ({
  setInfoHandler: info => dispatch(setOrientationInfo(info)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrientationTracker);
