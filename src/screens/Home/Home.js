import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AppMotto from '../../components/AppMotto';
import VocabularyList from '../../components/VocabularyList';
import VocabularyModal from '../../components/modals/VocabularyModal';
import ButtonIcon from '../../components/ButtonIcon';
import Popup from '../../components/popups/Popup';
import {routes} from '../index';
import {loadVocabulary, isIOS} from '../../helpers';
import useModal from '../../helpers/useModal';
import addIcon from '../../assets/plus.png';
import uploadIcon from '../../assets/upload.png';
import styles from './styles';

const iBtnStyle = {
  style: styles.btnWithIcon,
  iconStyle: styles.iconInBtn,
};

const Home = ({vocabularies, setVoc, deleteVoc, changeVocName, navigation}) => {
  const [modalVisible, showModal, closeModal] = useModal(false);
  const [popupVisible, openPopup, closePopup] = useModal(false);
  const [selectedVocId, setVocId] = useState(null);

  const onClosePopup = () => {
    closePopup();
    setVocId(null);
  };

  const onPressVoc = vocabularyId =>
    navigation.navigate(routes.VOCABULARY, {vocabularyId});

  const onLongPressVoc = vocId => {
    openPopup();
    setVocId(vocId);
  };

  const onSaveVoc = voc => {
    selectedVocId ? changeVocName(selectedVocId, voc) : setVoc(voc);
    closeModal();
    setVocId(null);
  };

  const onLoadVoc = () => {
    // TODO: add loading state while processing new vocabulary
    const finishLoading = () => console.log('finished');
    loadVocabulary(Object.keys(vocabularies), setVoc, finishLoading);
  };

  const deleteVocHandler = () => {
    deleteVoc(selectedVocId);
    onClosePopup();
  };

  const onRenameVoc = () => {
    closePopup();
    showModal();
  };

  const onDeleteVoc = () =>
    Alert.alert(
      'Do you want to delete vocabulary?',
      vocabularies[selectedVocId]?.name,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: deleteVocHandler},
      ],
    );

  return (
    <>
      <SafeAreaView style={styles.root}>
        <ScrollView bounces={false} style={styles.scrollView}>
          <AppMotto />
          <View style={styles.body}>
            <View style={styles.headlineContainer}>
              <View style={styles.iconBtnContainer}>
                <ButtonIcon src={addIcon} onPress={showModal} {...iBtnStyle} />
                <ButtonIcon
                  src={uploadIcon}
                  onPress={onLoadVoc}
                  {...iBtnStyle}
                />
              </View>
              <Text style={styles.headerText}>Your Vocabularies</Text>
            </View>
            <View style={styles.splitLine} />
            <VocabularyList
              vocabularies={vocabularies}
              onPress={onPressVoc}
              onLongPress={onLongPressVoc}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <Popup visible={popupVisible} onClose={onClosePopup}>
        <Text style={styles.popupHeaderText}>
          Actions with vocabulary{' '}
          <Text style={{fontWeight: '700'}}>
            {vocabularies[selectedVocId]?.name}
          </Text>
        </Text>
        <TouchableOpacity onPress={onRenameVoc} style={styles.popupItem}>
          <Text style={styles.popupItemText}>Rename</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDeleteVoc} style={styles.popupItem}>
          <Text style={styles.popupItemText}>Delete</Text>
        </TouchableOpacity>
        {!isIOS && (
          <TouchableOpacity style={styles.popupItem}>
            <Text style={styles.popupItemText}>Download</Text>
          </TouchableOpacity>
        )}
      </Popup>
      <VocabularyModal
        visible={modalVisible}
        onSave={onSaveVoc}
        onClose={closeModal}
        items={vocabularies}
        initialValues={{name: vocabularies[selectedVocId]?.name}}
      />
    </>
  );
};

export default Home;
