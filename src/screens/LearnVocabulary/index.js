import {connect} from 'react-redux';
import LearnVocabulary from './LearnVocabulary';

const data = [
  {
    id: '1',
    content: '11',
    color: 'green',
  },
  {
    id: '2',
    content: '2 wqe',
    color: 'blue',
  },
  {
    id: '3',
    content: 'truy ryi 3',
    color: 'red',
  },
  {
    id: '4',
    content: '4',
    color: 'gray',
  },
  {
    id: '5',
    content: '5',
    color: 'green',
  },
  {
    id: '6',
    content: '6 qw zxcvbnm kldfgop',
    color: 'blue',
  },
  {
    id: '7',
    content: '7 777 777777',
    color: 'red',
  },
  {
    id: '8',
    content: '8',
    color: 'gray',
  },
  {
    id: '9',
    content: '9 e1e',
    color: 'green',
  },
  {
    id: '10',
    content: '10 ok?',
    color: 'blue',
  },
];

const mapStateToProps = ({vocabularies}, {route: {params = {}}}) => {
  const {vocabularyId} = params;
  return {
    vocabulary: vocabularies[vocabularyId],
    vocabularyId,
    data,
    onEndReachedThreshold: 0.9,
  };
};

export default connect(mapStateToProps)(LearnVocabulary);
