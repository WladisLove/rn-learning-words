import React from 'react';
import {View, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {setIsLandscapeOrientation} from '../../actions/orientation';

const OrientationTracker = ({isLandscape, setIsLandscape}) => {
  const setLandscape = () => {
    const {width, height} = Dimensions.get('window');
    const _isLandscape = width > height;
    isLandscape !== _isLandscape && setIsLandscape(_isLandscape);
  };

  if (isLandscape === undefined) {
    setLandscape();
  }

  const onLayout = () => {
    setLandscape();
  };

  return <View onLayout={onLayout} />;
};

const mapStateToProps = ({orientStore}) => ({
  isLandscape: orientStore.isLandscape,
});

const mapDispatchToProps = dispatch => ({
  setIsLandscape: fl => dispatch(setIsLandscapeOrientation(fl)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrientationTracker);
