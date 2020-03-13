import {connect} from 'react-redux';
import LearnVocabulary from './LearnVocabulary';

const mapStateToProps = (
  {vocStore: {vocabularies}, orientStore: {isLandscape}},
  {route: {params = {}}},
) => {
  const {vocabularyId} = params;
  const {words = {}} = vocabularies[vocabularyId] || {};
  const data = Object.values(words);
  return {
    vocabularyId,
    isLandscape,
    data,
    onEndReachedThreshold: 0.9,
  };
};

export default connect(mapStateToProps)(LearnVocabulary);
