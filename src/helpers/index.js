import {PermissionsAndroid, Platform} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

export const isIOS = Platform.OS === 'ios';

export const generateVocabularyID = name =>
  name.toLowerCase().replace(/ /gi, '-');

export const generateWordID = word => {
  const idStr = word.toLowerCase().replace(/ /gi, '-');
  const idDate = Date.now()
    .toString()
    .slice(-7, -2);
  return `${idStr}-${idDate}`;
};

const checkVocabularyStructure = voc => {
  if (!voc.name) {
    throw Error("Vocabulary doesn't have name field");
  }
  if (voc.words && typeof voc.words !== 'object') {
    throw Error("Vocabulary's word field isn't object");
  }
};

const processWordsStructure = ({words}) => {
  let newWords = {};
  if (words) {
    const wordIDs = Object.keys(words);
    newWords = wordIDs.reduce((acc, id) => {
      let word = words[id];
      if (word.word && word.meaning) {
        return {...acc, [id]: word};
      }
      return acc;
    }, {});
  }
  return newWords;
};

export const isVocIdUnique = (id, idsArray = []) => !idsArray.includes(id);

const processVocabularyNameAndID = ({name: vocName}, vocIDs) => {
  const name = vocName;
  const id = generateVocabularyID(vocName);

  const similarIDs = vocIDs.reduce((acc, curID) => {
    curID.toString().indexOf(id) === 0 && acc.push(curID);
    return acc;
  }, []);

  if (similarIDs.length) {
    if (isVocIdUnique(id, similarIDs)) {
      return {name, id};
    }

    let i = 1;
    while (true) {
      let newName = `${vocName} (${i})`;
      let newId = generateVocabularyID(newName);
      if (isVocIdUnique(newId, similarIDs)) {
        return {name: newName, id: newId};
      }
      i++;
    }
  }

  return {name, id};
};

export const loadVocabulary = async (
  vocIDs = [],
  setVocabulary = () => {},
  finishLoading = () => {},
) => {
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });
    const fileBody = await RNFS.readFile(res.uri, 'utf8');
    const voc = JSON.parse(fileBody);
    // vocabulary structure
    checkVocabularyStructure(voc);
    voc.words = processWordsStructure(voc);
    // vocabulary unique name
    const {name, id} = processVocabularyNameAndID(voc, vocIDs);
    setVocabulary({...voc, name, id});
    finishLoading();
  } catch (err) {
    console.log(err);
    finishLoading();
  }
};

export const downloadVocabulary = async (voc, onSuccess, onError) => {
  // TODO: set correct directory for saving

  if (!isIOS) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Learning Word App Storage Permission',
          message:
            'Learning Word App needs access to Download directory to download vocabulary',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const name = voc.name.replace(/ /g, '-').toLowerCase();
        // RNFS.DownloadDirectoryPath - Android only
        let path = `${RNFS.DownloadDirectoryPath}/${name}-vocabulary.json`;
        //let path = RNFS.DocumentDirectoryPath;
        //let path = '/Users/uklimiankou/Documents' + '/test2.json';
        // RNFS.mkdir(path)
        //   .then(result => {
        //     console.log('result', result);
        RNFS.writeFile(path, JSON.stringify(voc), 'utf8')
          .then(success => onSuccess(`path: ${path}`))
          .catch(err => onError(`write error: ${err.message}`));
        // })
        // .catch(err => {
        //   console.warn('err', err);
        // });
      } else {
        onError('Error. Permission denied');
      }
    } catch (error) {
      onError(`Permission error: ${error.message}`);
    }
  }
};
