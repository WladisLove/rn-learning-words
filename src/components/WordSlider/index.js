import React from 'react';
import {View, Animated, FlatList, PanResponder} from 'react-native';
import ButtonIcon from '../ButtonIcon';
import WordCard from './WordCard';
import arrowRight from '../../assets/arrow-right.png';
import {sliderStyles as styles, itemWidth, scrollableAreaWidth} from './styles';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const WordSlider = ({
  index,
  data = [],
  onIndexChange = () => {},
  onEndReached,
  onEndReachedThreshold,
  ...props
}) => {
  let listRef;

  const getRef = ref => ref && (listRef = ref._component || ref);

  const getItemLayout = (d, i) => ({
    offset: itemWidth * i,
    length: itemWidth,
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
    const curOffset = index * itemWidth;
    const calcOffset = curOffset - dx;
    listRef.scrollToOffset({offset: calcOffset, animated: false});
  };

  const handlePanResponderRelease = (e, {dx}) => {
    // change index in cases when
    // user dragged more then 33% of scrollable area width
    // if not return to current index
    Math.abs(dx) > scrollableAreaWidth / 3
      ? setIndex(!(dx > 0))
      : setIndex(null, index);
  };

  const panResponderRef = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: ({dx}) => dx * dx > 1,
    //onPanResponderGrant: this.handleGestureStart,
    onPanResponderMove: handlePanResponderMove,
    onPanResponderRelease: handlePanResponderRelease,
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
      <View style={styles.listWrapper} {...panResponderRef.panHandlers}>
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
          renderItem={({item}) => <WordCard item={item} {...props} />}
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

export default WordSlider;
