import React, {useRef} from 'react';
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
  let panResponderRef = useRef({});

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
      <View style={styles.listWrapper} {...panResponderRef.current.panHandlers}>
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

// class WordSlider extends React.Component {
//   listRef;
//   panResponderRef = {};

//   state = {};

//   componentDidMount() {
//     console.log('[did mount]', this.panResponderRef);

//     // setTimeout(() => {
//     //   console.log('start force update')
//     //   this.forceUpdate(() => console.log('forceUpdate'))
//     // }, 500);

//     this.panResponderRef = PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onMoveShouldSetPanResponder: ({dx}) => dx * dx > 1,
//       //onPanResponderGrant: () => setMainScrollEnabled(false),
//       onPanResponderMove: this.handlePanResponderMove,
//       onPanResponderRelease: this.handlePanResponderRelease,

//       onPanResponderTerminationRequest: () => false,
//       onStartShouldSetPanResponderCapture: () => true,

//       //onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
//       //onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
//       //onPanResponderTerminationRequest: this.handleGestureTerminationRequest,
//     });
//   }

//   static getDerivedStateFromProps(props, state) {
//     console.log('[getDerivedStateFromProps]', this.panResponderRef);
//     return null;
//   }

//   componentDidUpdate() {
//     console.log('[did update]', this.panResponderRef);
//   }

//   getRef = ref => ref && (this.listRef = ref._component || ref);

//   getItemLayout = (d, i) => ({
//     offset: itemWidth * i,
//     length: itemWidth,
//     index: i,
//   });

//   setIndex = (toNext, directIndex) => {
//     const {index, data = [], onIndexChange = () => {}} = this.props;

//     const newIndex = Number.isInteger(directIndex)
//       ? directIndex
//       : toNext
//       ? Math.min(index + 1, data.length - 1)
//       : Math.max(index - 1, 0);

//     this.listRef.scrollToIndex({index: newIndex, animated: true});
//     index !== newIndex && onIndexChange(newIndex);
//   };

//   // PanResponder handlers
//   handlePanResponderMove = (e, {dx}) => {
//     const curOffset = this.props.index * itemWidth;
//     const calcOffset = curOffset - dx;
//     this.listRef.scrollToOffset({offset: calcOffset, animated: false});
//   };

//   handlePanResponderRelease = (e, {dx}) => {
//     //setMainScrollEnabled(true);
//     // change index in cases when
//     // user dragged more then 33% of scrollable area width
//     // if not return to current index
//     Math.abs(dx) > scrollableAreaWidth / 3
//       ? this.setIndex(!(dx > 0))
//       : this.setIndex(null, this.props.index);
//   };

//   render() {
//     const {
//       index,
//       data = [],
//       onIndexChange = () => {},
//       onEndReached,
//       onEndReachedThreshold,
//       //setMainScrollEnabled = () => {},
//       ...props
//     } = this.props;

//     return (
//       <View style={styles.mainContainer}>
//         <ButtonIcon
//           src={arrowRight}
//           onPress={this.setIndex.bind(null, false)}
//           style={styles.navBtn}
//           iconStyle={styles.navBtnIconLeft}
//         />
//         <View style={styles.listWrapper} {...this.panResponderRef.panHandlers}>
//           <AnimatedFlatList
//             horizontal
//             data={data}
//             getItemLayout={this.getItemLayout}
//             initialScrollIndex={index}
//             ref={this.getRef}
//             scrollEnabled={false}
//             showsHorizontalScrollIndicator={false}
//             onEndReached={onEndReached}
//             onEndReachedThreshold={onEndReachedThreshold}
//             keyExtractor={item => item.id}
//             renderItem={({item}) => <WordCard item={item} {...props} />}
//           />
//         </View>
//         <ButtonIcon
//           src={arrowRight}
//           onPress={this.setIndex.bind(null, true)}
//           style={styles.navBtn}
//           iconStyle={styles.navBtnIcon}
//         />
//       </View>
//     );
//   }
// }

export default WordSlider;
