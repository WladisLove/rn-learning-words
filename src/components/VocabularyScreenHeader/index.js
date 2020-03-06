import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import VocabularyNameForm from './VocabularyNameForm';
import Button from '../Button';
import arrowRight from '../../assets/arrow-right.png';
import {headerStyles as styles} from './styles';

const VocabularyScreenHeader = ({
  vocabulary = {},
  onBack,
  onEdit,
  onDelete,
  onDownload,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const turnEditableOn = () => setIsEditable(true);
  const turnEditableOff = () => setIsEditable(false);

  const editHandler = (name, id) => {
    onEdit(name, id);
    turnEditableOff();
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onBack} style={styles.iconWrapper}>
        <Image source={arrowRight} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.vocInfoContainer}>
        {isEditable ? (
          <VocabularyNameForm
            vocabulary={vocabulary}
            onSave={editHandler}
            onCancel={turnEditableOff}
          />
        ) : (
          <>
            <Text style={styles.title}>{vocabulary.name}</Text>
            <View style={styles.vocActionsContainer}>
              <Button onPress={turnEditableOn}>Edit</Button>
              <Button onPress={onDelete}>Delete</Button>
              <Button onPress={() => {}}>Run</Button>
              <Button onPress={onDownload}>Download</Button>
            </View>
            <Text>Find word</Text>
          </>
        )}
      </View>
    </View>
  );
};

export default VocabularyScreenHeader;