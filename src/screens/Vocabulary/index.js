import {connect} from 'react-redux';
import Vocabulary from './Vocabulary';
import {setVocabulary} from '../../actions/vocabulary';

const mapStateToProps = ({vocabularies}, {route: {params = {}}}) => {
  const {vocabularyId} = params;
  return {
    vocabulary: vocabularies[vocabularyId],
    vocabularyId,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    //setVocabulary: item => dispatch(setVocabulary(item)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Vocabulary);
