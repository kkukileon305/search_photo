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
      onClick={(e) => {
        const photoModal = (e.target as HTMLDivElement).closest('div.modalPhoto');
        !photoModal && setModalState(false);
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className='modalPhoto'
        style={{
          background: `url(${photoURL})`, //
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '70vw',
          height: '70vh',
        }}
        initial={{ transform: 'scale(0)' }}
        animate={{ transform: 'scale(1)' }}
      ></motion.div>
    </motion.div>
  );
};

export default PhotoModal;
