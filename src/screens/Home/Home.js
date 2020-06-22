import React from 'react';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';
import AppMotto from '../../components/AppMotto';
import VocabularyList from '../../components/VocabularyList';
import VocabularyModal from '../../components/modals/VocabularyModal';
import ButtonIcon from '../../components/ButtonIcon';
import {routes} from '../index';
import {loadVocabulary} from '../../helpers';
import useModal from '../../helpers/useModal';
import addIcon from '../../assets/plus.png';
import uploadIcon from '../../assets/upload.png';
import styles from './styles';

const iBtnStyle = {
  style: styles.btnWithIcon,
  iconStyle: styles.iconInBtn,
};

const Home = ({vocabularies, setVocabulary, navigation}) => {
  const [modalVisible, showModal, closeModal] = useModal(false);

  const onPressVocabulary = vocabularyId =>
    navigation.navigate(routes.VOCABULARY, {vocabularyId});

  const onSaveVocabulary = voc => {
    setVocabulary(voc);
    closeModal();
  };

  const onLoadVoc = () => {
    // TODO: add loading state while processing new vocabulary
    const finishLoading = () => console.log('finished');
    loadVocabulary(Object.keys(vocabularies), setVocabulary, finishLoading);
  };

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
              onPress={onPressVocabulary}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <VocabularyModal
        visible={modalVisible}
        onSave={onSaveVocabulary}
        onClose={closeModal}
        items={vocabularies}
      />
    </>
  );
};

export default Home;
