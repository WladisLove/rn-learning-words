import {StyleSheet} from 'react-native';
import {green_light, silver} from '../../color';

const styles = StyleSheet.create({
  root: {backgroundColor: green_light, flex: 1},
  scrollViewContent: {
    paddingTop: 10,
    position: 'relative',
  },
  backBtnWrapper: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtnWrapperL: {marginTop: 5},
  showRestMarging: {marginTop: 15},
  secFieldsArea: {
    paddingHorizontal: 40,
    marginTop: 15,
  },
  secFieldsAreaL: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  cardWrapperL: {width: '48%'},
  title: {fontSize: 16, marginBottom: 5},
  card: {
    padding: 20,
    backgroundColor: silver,
    borderRadius: 5,
    marginBottom: 20,
  },
  centeredCard: {alignItems: 'center'},
  minus: {width: 30, height: 1, backgroundColor: 'black'},
  text: {fontSize: 18},
  contextText: {fontSize: 18},
  lvlBtn: {borderRadius: 5, marginRight: 10},
});

export default styles;
