import {connect} from 'react-redux';
import Home from './Home';
import {setVocabulary, deleteVocabulary} from '../../actions/vocabulary';

const mapStateToProps = ({vocStore: {vocabularies}}) => ({
  vocabularies,
});

const mapDispatchToProps = dispatch => {
  return {
    setVoc: item => dispatch(setVocabulary(item)),
    deleteVoc: id => dispatch(deleteVocabulary(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
