import {connect} from 'react-redux';
import Vocabulary from './Vocabulary';
import {
  deleteVocabulary,
  changeVocabularyName,
  setWord,
  deleteWord,
  moveWord,
} from '../../actions/vocabulary';

const mapStateToProps = (
  {vocStore: {vocabularies}, orientStore: {isLandscape}},
  {route: {params = {}}},
) => {
  const {vocabularyId} = params;
  const vocList = Object.entries(vocabularies).reduce((acc, [id, voc]) => {
    return vocabularyId === id ? acc : [...acc, {id, name: voc.name}];
  }, []).sort();
  return {
    vocabulary: vocabularies[vocabularyId],
    vocabularyId,
    vocList,
    isLandscape,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteVocabulary: id => dispatch(deleteVocabulary(id)),
    changeVocabularyName: (vocId, vocNewId, name) =>
      dispatch(changeVocabularyName(vocId, vocNewId, name)),
    setWord: (word, vocId) => dispatch(setWord(word, vocId)),
    deleteWord: (wordId, vocId) => dispatch(deleteWord(wordId, vocId)),
    moveWord: (id, fromVocId, toVocId) =>
      dispatch(moveWord(id, fromVocId, toVocId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Vocabulary);
