import {useState} from 'react';

const useModal = (isVisible = false) => {
  const [visible, setVisible] = useState(isVisible);
  const open = () => setVisible(true);
  const close = () => setVisible(false);

  return [visible, open, close];
};

export default useModal;
