import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';
import WordSlider from '../../components/WordSlider';
import Picker from '../../components/Picker';
import Button from '../../components/Button';
import ButtonLvl from '../../components/ButtonLvl';
import WordLvlPopup from '../../components/popups/WordLvlPopup';
import useModal from '../../helpers/useModal';
import styles from './styles';
import arrowRight from '../../assets/arrow-right.png';

const showModes = ['Word', 'Meaning', 'All'];

const emptyCard = (
  <View style={[styles.card, styles.centeredCard]}>
    <View style={styles.minus} />
  </View>
);

const shuffleArr = arr => {
  for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr
}

const LearnVocabulary = ({data = [], navigation, isLandscape, ...props}) => {
  const [mode, setMode] = useState(showModes[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShown, setIsShown] = useState(false);
  const [lvlModalVisible, openLvlModal, closeLvlModal] = useModal(false);
  // don't change random order, when redux store is changed
  const [_data, _setData] = useState(shuffleArr(data.slice()));

  const onChangeMode = m => {
    setMode(m);
    setIsShown(false);
  };
  const show = () => setIsShown(true);

  const word = _data[currentIndex];
  const wordLvl = word.lvl || 2;

  const goBack = () => navigation.goBack();

  const handleChangeIndex = i => {
    setIsShown(false);
    setCurrentIndex(i);
  };

  const changeWordLvl = lvl => {
    props.setWord({...word, lvl}, props.vocabularyId);
    setIsShown(false);
    closeLvlModal();
    if (props.wordsLvl === 0) {
      // change word from array when all lvl words is displayed
      _data[currentIndex] = {..._data[currentIndex], lvl};
    } else {
      if (_data.length === 1) {
        goBack();
        return;
      }
      // remove word from array if lvl doesn't match with displayed
      currentIndex === _data.length - 1
        ? (setCurrentIndex(prev => prev - 1), _setData(_data.slice(0, -1)))
        : _setData([
            ..._data.slice(0, currentIndex),
            ..._data.slice(currentIndex + 1),
          ]);
    }
  };

  const isShownAll = isShown || mode === 'All';

  return (
    <>
      <SafeAreaView style={styles.root}>
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.scrollViewContent}>
          <View
            style={[
              styles.backBtnWrapper,
              isLandscape && styles.backBtnWrapperL,
            ]}>
            <Button
              onPress={goBack}
              icon={arrowRight}
              textStyle={styles.backBtnText}
              iconStyle={styles.backBtnIcon}>
              Back
            </Button>
            <Picker
              text="Show:"
              value={mode}
              onChange={onChangeMode}
              data={showModes}
            />
            <ButtonLvl
              lvl={wordLvl}
              onPress={openLvlModal}
              style={styles.lvlBtn}
            />
          </View>

          <WordSlider
            data={_data}
            mode={mode}
            isShownAll={isShownAll}
            index={currentIndex}
            onIndexChange={handleChangeIndex}
            onEndReachedThreshold={0.9}
          />
          {isShownAll ? (
            <View
              style={[
                styles.secFieldsArea,
                isLandscape && styles.secFieldsAreaL,
              ]}>
              <View style={isLandscape && styles.cardWrapperL}>
                <Text style={styles.title}>Synonyms</Text>
                {word.synonyms ? (
                  <View style={styles.card}>
                    <Text style={styles.text} selectable>
                      {word.synonyms}
                    </Text>
                  </View>
                ) : (
                  emptyCard
                )}
              </View>

              <View style={isLandscape && styles.cardWrapperL}>
                <Text style={styles.title}>Context</Text>
                {word.context ? (
                  <View style={styles.card}>
                    {word.context.split('\n').map(item => (
                      <Text key={item} style={styles.contextText} selectable>
                        - {item}
                      </Text>
                    ))}
                  </View>
                ) : (
                  emptyCard
                )}
              </View>
            </View>
          ) : (
            <View style={[styles.centeredCard, styles.showRestMarging]}>
              <Button onPress={show}>Show rest</Button>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>

      <WordLvlPopup
        visible={lvlModalVisible}
        onClose={closeLvlModal}
        onSetLvl={changeWordLvl}
        wordLvl={wordLvl}
      />
    </>
  );
};

export default LearnVocabulary;
