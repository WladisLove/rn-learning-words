import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, Animated} from 'react-native';
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
import ellipsisIcon from '../../assets/ellipsis.png';
import addIcon from '../../assets/plus.png';

import {headerStyles as styles, iconBtnCompleteWidth} from './styles';

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
  onAdd,
}) => {
  const [isEditable, setIsEditable] = useState(false);
  const turnEditableOn = () => setIsEditable(true);
  const turnEditableOff = () => setIsEditable(false);

  const [animatingVal] = useState(new Animated.Value(0));

  const [isActionsShown, setActionsShown] = useState(false);
  const showMoreActions = () => {
    setActionsShown(true);
    Animated.timing(animatingVal, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const turnFindModeOn = () => setSearchQuery('');

  const editHandler = (name, id) => {
    onEdit(name, id);
    turnEditableOff();
  };

  const additionalActions = [
    {key: 'edit', src: editIcon, onPress: turnEditableOn},
    {key: 'delete', src: deleteIcon, onPress: onDelete},
  ];
  if (!isIOS) {
    additionalActions.push({
      key: 'download',
      src: downloadIcon,
      onPress: onDownload,
    });
  }

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
                  <ButtonIcon src={runIcon} onPress={onRun} {...iconBtnStyle} />
                  <ButtonIcon
                    src={findIcon}
                    onPress={turnFindModeOn}
                    {...iconBtnStyle}
                  />
                  <ButtonIcon src={addIcon} onPress={onAdd} {...iconBtnStyle} />
                  <View style={styles.verticalSeparator} />
                  {isActionsShown && (
                    <Animated.View
                      style={[
                        styles.vocActionsContainer,
                        {
                          marginTop: 0,
                          transform: [
                            {
                              translateX: animatingVal.interpolate({
                                inputRange: [0, 1],
                                outputRange: [
                                  -additionalActions.length *
                                    iconBtnCompleteWidth,
                                  0,
                                ],
                              }),
                            },
                          ],
                          opacity: animatingVal.interpolate({
                            inputRange: [0, 0.4, 1],
                            outputRange: [0, 0, 1],
                          }),
                        },
                      ]}>
                      {additionalActions.map(el => (
                        <ButtonIcon {...el} {...iconBtnStyle} />
                      ))}
                    </Animated.View>
                  )}
                  <Animated.View
                    style={[
                      styles.vocActionsContainer,
                      {
                        marginTop: 0,
                        opacity: animatingVal.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 0],
                        }),
                      },
                      isActionsShown && {
                        transform: [
                          {
                            translateX: animatingVal.interpolate({
                              inputRange: [0, 1],
                              outputRange: [
                                -additionalActions.length *
                                  iconBtnCompleteWidth,
                                0,
                              ],
                            }),
                          },
                        ],
                      },
                    ]}>
                    <ButtonIcon
                      src={ellipsisIcon}
                      onPress={showMoreActions}
                      {...iconBtnStyle}
                    />
                  </Animated.View>
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
