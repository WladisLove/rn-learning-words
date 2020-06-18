import {connect} from 'react-redux';
import LearnVocabulary from './LearnVocabulary';

const mapStateToProps = (
  {vocStore: {vocabularies}, orientStore: {isLandscape}},
  {route: {params = {}}},
) => {
  const {vocabularyId, wordsLvl} = params;
  const {words = {}} = vocabularies[vocabularyId] || {};
  const data =
    wordsLvl === 0
      ? Object.values(words)
      : Object.values(words).filter(({lvl = 2}) => lvl === wordsLvl);
  return {
    vocabularyId,
    isLandscape,
    data,
    onEndReachedThreshold: 0.9,
  };
};

export default connect(mapStateToProps)(LearnVocabulary);
