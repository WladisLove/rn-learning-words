import {connect} from 'react-redux';
import Home from './Home';
import {setVocabulary} from '../../actions/vocabulary';

const mapStateToProps = ({vocabularies}) => {
  return {
    vocabularies,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setVocabulary: item => dispatch(setVocabulary(item)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
