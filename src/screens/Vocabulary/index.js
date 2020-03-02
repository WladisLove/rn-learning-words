import {connect} from 'react-redux';
import Vocabulary from './Vocabulary';
import {deleteVocabulary, setWord} from '../../actions/vocabulary';

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
    setWord: (word, vocId) => dispatch(setWord(word, vocId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Vocabulary);
