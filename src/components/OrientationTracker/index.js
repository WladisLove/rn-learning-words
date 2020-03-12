import React from 'react';
import {View, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {setIsPortraitOrientation} from '../../actions/orientation';

const OrientationTracker = ({isPortrait, setIsPortrait}) => {
  const setPortrait = () => {
    const {width, height} = Dimensions.get('window');
    const _isPortrait = height > width;
    isPortrait !== _isPortrait && setIsPortrait(_isPortrait);
  };

  if (isPortrait === undefined) {
    setPortrait();
  }

  const onLayout = () => {
    setPortrait();
  };

  return <View onLayout={onLayout} />;
};

const mapStateToProps = ({orientStore}) => ({
  isPortrait: orientStore.isPortrait,
});

const mapDispatchToProps = dispatch => ({
  setIsPortrait: fl => dispatch(setIsPortraitOrientation(fl)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrientationTracker);
