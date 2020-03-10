import React, {useState} from 'react';
import {View, Text, Animated, FlatList, PanResponder} from 'react-native';
import ButtonIcon from '../ButtonIcon';
import arrowRight from '../../assets/arrow-right.png';
import styles, {itemWidth, scrollableAreaWidth} from './styles';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const WordSlider = ({
  index,
  data = [],
  onIndexChange = () => {},
  onEndReached,
  onEndReachedThreshold,
}) => {
  const [currentIndex, setCurrentIndex] = useState(index || 0);
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
      ? Math.min(currentIndex + 1, data.length - 1)
      : Math.max(currentIndex - 1, 0);

    listRef.scrollToIndex({index: newIndex, animated: true});
    currentIndex !== newIndex &&
      (setCurrentIndex(newIndex), onIndexChange(newIndex));
  };

  // PanResponder handlers
  const handlePanResponderMove = (e, {dx}) => {
    const curOffset = currentIndex * itemWidth;
    const calcOffset = curOffset - dx;
    listRef.scrollToOffset({offset: calcOffset, animated: false});
  };

  const handlePanResponderRelease = (e, {dx}) => {
    // change index in cases when
    // user dragged more then 33% of scrollable area width
    // if not return to current index
    Math.abs(dx) > scrollableAreaWidth / 3
      ? setIndex(!(dx > 0))
      : setIndex(null, currentIndex);
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
          initialScrollIndex={currentIndex}
          ref={getRef}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          onEndReached={onEndReached}
          onEndReachedThreshold={onEndReachedThreshold}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <View style={[styles.wordCard, {backgroundColor: item.color}]}>
                <Text>{item.content}</Text>
              </View>
            );
          }}
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
