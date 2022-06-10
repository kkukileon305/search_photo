import { motion } from 'framer-motion';
import { ModalPhotoProps } from '../utils/Props';

const PhotoModal = ({ photoURL, setModalState }: ModalPhotoProps) => {
  return (
    <motion.div
      style={{
        position: 'fixed', //
        background: 'rgba(0,0,0,0.5)',
        width: '100vw',
        height: '100vh',
        left: 0,
        top: 0,
        zIndex: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={() => setModalState(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div
        style={{
          background: `url(${photoURL})`, //
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '70vw',
          height: '70vh',
        }}
      ></div>
    </motion.div>
  );
};

export default PhotoModal;
