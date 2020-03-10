import Home from './Home';
import Vocabulary from './Vocabulary';
import LearnVocabulary from './LearnVocabulary';

export const routes = {
  HOME: 'Home',
  VOCABULARY: 'Vocabulary',
  LEARN_VOCABULARY: 'LearnVocabulary',
};

export const screens = [
  {
    name: routes.HOME,
    component: Home,
  },
  {
    name: routes.VOCABULARY,
    component: Vocabulary,
  },
  {
    name: routes.LEARN_VOCABULARY,
    component: LearnVocabulary,
  },
];
