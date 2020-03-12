import {Platform} from 'react-native';
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
  let newWords = [];
  if (words) {
    const wordIDs = Object.keys(words);
    newWords = wordIDs.reduce((acc, id) => {
      let word = words[id];
      word.word && word.meaning && acc.push(word);
      return acc;
    }, []);
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
