import {connect} from 'react-redux';
import LearnVocabulary from './LearnVocabulary';

const mapStateToProps = (
  {vocStore: {vocabularies}},
  {route: {params = {}}},
) => {
  const {vocabularyId} = params;
  const {words = {}} = vocabularies[vocabularyId] || {};
  const data = Object.values(words).sort((a, b) => 0.5 - Math.random());
  return {
    vocabularyId,
    data,
    onEndReachedThreshold: 0.9,
  };
};

export default connect(mapStateToProps)(LearnVocabulary);
