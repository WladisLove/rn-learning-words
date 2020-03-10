import {StyleSheet} from 'react-native';
import {gray, black, navy_dark} from '../../color';

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  text: {color: black, fontSize: 18, marginRight: 5},
  selectBtn: {
    borderBottomColor: gray,
    borderBottomWidth: 1,
    paddingVertical: 6,
    minWidth: 70,
    alignItems: 'center',
  },
  selectBtnText: {color: navy_dark, fontWeight: '700'},
  modalWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 10,
    paddingBottom: 6,
    minWidth: 200,
  },
  okBtnContainer: {alignItems: 'center'},
  pickerItem: {
    marginBottom: 4,
    paddingVertical: 7,
    paddingHorizontal: 7,
  },
  pickerItemText: {fontSize: 18},
});

export default styles;
