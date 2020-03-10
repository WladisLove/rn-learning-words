import React from 'react';
import {SafeAreaView} from 'react-native';
import WordSlider from '../../components/WordSlider';

const LearnVocabulary = ({data, ...props}) => {
  return (
    <SafeAreaView>
      <WordSlider
        data={data}
        onIndexChange={index => console.log('index is changed to', index)}
        onEndReachedThreshold={0.9}
      />
    </SafeAreaView>
  );
};

export default LearnVocabulary;
