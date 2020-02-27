import Home from './Home';
import Vocabulary from './Vocabulary';

export const routes = {
  HOME: 'Home',
  VOCABULARY: 'Vocabulary',
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
];
