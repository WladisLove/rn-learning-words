import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import VocabularyNameForm from './VocabularyNameForm';
import ButtonIcon from '../ButtonIcon';
import SearchInput from '../SearchInput';
import {isIOS} from '../../helpers';
import arrowRight from '../../assets/arrow-right.png';
import editIcon from '../../assets/edit.png';
import deleteIcon from '../../assets/delete.png';
import runIcon from '../../assets/run.png';
import findIcon from '../../assets/find.png';
import downloadIcon from '../../assets/download.png';

import {headerStyles as styles} from './styles';

const iconBtnStyle = {
  style: styles.btn,
  iconStyle: styles.btnIcon,
};

const VocabularyScreenHeader = ({
  vocabulary = {},
  onBack,
  onEdit,
  onDelete,
  onDownload,
  onRun,
  searchQuery,
  setSearchQuery,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const turnEditableOn = () => setIsEditable(true);
  const turnEditableOff = () => setIsEditable(false);

  const turnFindModeOn = () => setSearchQuery('');

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
              {searchQuery === null ? (
                <>
                  <ButtonIcon
                    src={editIcon}
                    onPress={turnEditableOn}
                    {...iconBtnStyle}
                  />
                  <ButtonIcon src={runIcon} onPress={onRun} {...iconBtnStyle} />
                  <ButtonIcon
                    src={findIcon}
                    onPress={turnFindModeOn}
                    {...iconBtnStyle}
                  />
                  {!isIOS && (
                    <ButtonIcon
                      src={downloadIcon}
                      onPress={onDownload}
                      {...iconBtnStyle}
                    />
                  )}
                  <ButtonIcon
                    src={deleteIcon}
                    onPress={onDelete}
                    {...iconBtnStyle}
                  />
                </>
              ) : (
                <SearchInput
                  setSearchQuery={setSearchQuery}
                  searchQuery={searchQuery}
                />
              )}
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default VocabularyScreenHeader;
