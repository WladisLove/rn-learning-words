import {connect} from 'react-redux';
import LearnVocabulary from './LearnVocabulary';
import {setWord} from '../../actions/vocabulary';

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
    wordsLvl,
    isLandscape,
    data,
    onEndReachedThreshold: 0.9,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setWord: (word, vocId) => dispatch(setWord(word, vocId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LearnVocabulary);
