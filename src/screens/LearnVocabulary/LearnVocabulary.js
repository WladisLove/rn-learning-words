import React, {useState} from 'react';
import {SafeAreaView} from 'react-native';
import WordSlider from '../../components/WordSlider';
import Picker from '../../components/Picker';

const showModes = ['Word', 'Meaning', 'All'];

const LearnVocabulary = ({data, ...props}) => {
  const [mode, setMode] = useState(showModes[0]);
  return (
    <SafeAreaView>
      <Picker text="Show:" value={mode} onChange={setMode} data={showModes} />
      <WordSlider
        data={data}
        onIndexChange={index => console.log('index is changed to', index)}
        onEndReachedThreshold={0.9}
      />
    </SafeAreaView>
  );
};

export default LearnVocabulary;
