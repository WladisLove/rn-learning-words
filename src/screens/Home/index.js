import {connect} from 'react-redux';
import Home from './Home';
import {
  setVocabulary,
  deleteVocabulary,
  changeVocabularyName,
} from '../../actions/vocabulary';

const mapStateToProps = ({vocStore: {vocabularies}}) => ({
  vocabularies,
});

const mapDispatchToProps = dispatch => {
  return {
    setVoc: item => dispatch(setVocabulary(item)),
    deleteVoc: id => dispatch(deleteVocabulary(id)),
    changeVocName: (vocId, {id: newId, name}) =>
      dispatch(changeVocabularyName(vocId, newId, name)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
