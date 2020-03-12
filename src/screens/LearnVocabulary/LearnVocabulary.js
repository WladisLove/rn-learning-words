import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';
import WordSlider from '../../components/WordSlider';
import Picker from '../../components/Picker';
import Button from '../../components/Button';
import styles from './styles';

const showModes = ['Word', 'Meaning', 'All'];

const emptyCard = (
  <View style={[styles.card, styles.centeredCard]}>
    <View style={styles.minus} />
  </View>
);

const LearnVocabulary = ({data, navigation, ...props}) => {
  const [mode, setMode] = useState(showModes[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShown, setIsShown] = useState(false);

  const onChangeMode = m => setMode(m);
  const show = () => setIsShown(true);

  const word = data[currentIndex];

  const goBack = () => navigation.goBack();

  const handleChangeIndex = i => {
    setIsShown(false);
    setCurrentIndex(i);
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView bounces={false}>
        <View style={styles.backBtnWrapper}>
          <Button onPress={goBack}>Back</Button>
        </View>
        <Picker
          text="Show:"
          value={mode}
          onChange={onChangeMode}
          data={showModes}
        />
        <WordSlider
          data={data}
          mode={mode}
          isShown={isShown}
          index={currentIndex}
          onIndexChange={handleChangeIndex}
          onEndReachedThreshold={0.9}
        />
        <View style={[styles.centeredCard, styles.showRestMargings]}>
          <Button onPress={show}>Show rest</Button>
        </View>
        {(isShown || mode === 'All') && (
          <View style={styles.cardsWrapper}>
            <Text style={styles.title}>Synonyms</Text>
            {word.synonyms ? (
              <View style={styles.card}>
                <Text style={styles.text}>{word.synonyms}</Text>
              </View>
            ) : (
              emptyCard
            )}

            <Text style={styles.title}>Context</Text>
            {word.context ? (
              <View style={styles.card}>
                {word.context.split('\n').map(item => (
                  <Text key={item} style={styles.contextText}>
                    - {item}
                  </Text>
                ))}
              </View>
            ) : (
              emptyCard
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LearnVocabulary;
