import {connect} from 'react-redux';
import Vocabulary from './Vocabulary';
import {
  deleteVocabulary,
  changeVocabularyName,
  setWord,
  deleteWord,
} from '../../actions/vocabulary';

const mapStateToProps = ({vocabularies}, {route: {params = {}}}) => {
  const {vocabularyId} = params;
  return {
    vocabulary: vocabularies[vocabularyId],
    vocabularyId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteVocabulary: id => dispatch(deleteVocabulary(id)),
    changeVocabularyName: (vocId, vocNewId, name) =>
      dispatch(changeVocabularyName(vocId, vocNewId, name)),
    setWord: (word, vocId) => dispatch(setWord(word, vocId)),
    deleteWord: (wordId, vocId) => dispatch(deleteWord(wordId, vocId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Vocabulary);
