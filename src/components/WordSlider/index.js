import React, {useRef, useEffect} from 'react';
import {View, Animated, FlatList, PanResponder} from 'react-native';
import {connect} from 'react-redux';
import ButtonIcon from '../ButtonIcon';
import WordCard from './WordCard';
import arrowRight from '../../assets/arrow-right.png';
import {sliderStyles as styles, navBtnWidth} from './styles';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const WordSlider = ({
  index,
  data = [],
  onIndexChange = () => {},
  onEndReached,
  onEndReachedThreshold,
  screenW,
  isLandscape,
  ...props
}) => {
  let listRef;
  let panResponderRef = useRef({});
  // 120 and 30 - additional margin between btns and slide-area
  // 120px allow not to overflow screen (when 1 btn is hidden)
  const slideAreaWidth = screenW - navBtnWidth * 2 - (isLandscape ? 120 : 30);

  useEffect(() => {
    listRef && listRef.scrollToIndex({animated: false, index});
  }, [screenW, data.length]);

  const getRef = ref => ref && (listRef = ref._component || ref);

  const getItemLayout = (d, i) => ({
    offset: slideAreaWidth * i,
    length: slideAreaWidth,
    index: i,
  });

  const setIndex = (toNext, directIndex) => {
    const newIndex = Number.isInteger(directIndex)
      ? directIndex
      : toNext
      ? Math.min(index + 1, data.length - 1)
      : Math.max(index - 1, 0);

    listRef.scrollToIndex({index: newIndex, animated: true});
    index !== newIndex && onIndexChange(newIndex);
  };

  // PanResponder handlers
  const handlePanResponderMove = (e, {dx}) => {
    const curOffset = index * slideAreaWidth;
    const calcOffset = curOffset - dx;
    listRef.scrollToOffset({offset: calcOffset, animated: false});
  };

  const handlePanResponderRelease = (e, {dx}) => {
    // change index in cases when
    // user dragged more then 33% (20% in landscape mode) of scrollable area width
    // if not return to current index
    Math.abs(dx) > (isLandscape ? slideAreaWidth / 5 : slideAreaWidth / 3)
      ? setIndex(!(dx > 0))
      : setIndex(null, index);
  };

  panResponderRef.current = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: ({dx}) => dx * dx > 1,
    //onPanResponderGrant: this.handleGestureStart,
    onPanResponderMove: handlePanResponderMove,
    onPanResponderRelease: handlePanResponderRelease,
    onPanResponderTerminationRequest: () => false,
    onStartShouldSetPanResponderCapture: () => true,
    //onPanResponderTerminationRequest: this.handleGestureTerminationRequest,
  });

  return (
    <View style={styles.mainContainer}>
      <ButtonIcon
        src={arrowRight}
        onPress={setIndex.bind(null, false)}
        style={styles.navBtn}
        iconStyle={styles.navBtnIconLeft}
      />
      <View
        style={{width: slideAreaWidth}}
        {...panResponderRef.current.panHandlers}>
        <AnimatedFlatList
          horizontal
          data={data}
          getItemLayout={getItemLayout}
          initialScrollIndex={index}
          ref={getRef}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          onEndReached={onEndReached}
          onEndReachedThreshold={onEndReachedThreshold}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <WordCard
              item={item}
              slideAreaWidth={slideAreaWidth}
              isLandscape={isLandscape}
              {...props}
            />
          )}
        />
      </View>
      <ButtonIcon
        src={arrowRight}
        onPress={setIndex.bind(null, true)}
        style={styles.navBtn}
        iconStyle={styles.navBtnIcon}
      />
    </View>
  );
};

const mapStateToProps = ({orientStore: {isLandscape, screenW}}) => {
  return {
    isLandscape,
    screenW,
  };
};

export default connect(mapStateToProps)(WordSlider);
