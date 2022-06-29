import styled from 'styled-components';
import { TopBtnProps } from '../utils/Props';
import { motion } from 'framer-motion';

const StyledBtn = styled(motion.button)`
  @font-face {
    font-family: 'noto sans';
    font-weight: 700;
    src: url(../fonts/noto-sans-kr-v27-latin-700.woff) format('woff');
  }

  font-family: 'noto sans';
  font-weight: 700;
  position: fixed;
  width: 50px;
  height: 50px;
  top: 20px;
  left: calc(50% - 25px);
  border: none;
  border-radius: 25px;
  z-index: 9999;
  background-color: #0d6efd;
  color: white;

  &::after {
    content: '';
    width: 16px;
    height: 16px;
    border-top: 6px solid white;
    border-left: 6px solid white;
    border-radius: 3px;
    position: absolute;
    top: calc(50% - 5px);
    left: calc(50% - 8px);
    transform: rotate(45deg);
  }
`;

const TopBtn = ({ onClick }: TopBtnProps) => {
  return (
    <StyledBtn //
      onClick={onClick}
      animate={{ transform: 'scale(1)' }}
      exit={{ transform: 'scale(0)' }}
      whileHover={{ transform: 'scale(1.2)' }}
    ></StyledBtn>
  );
};

export default TopBtn;
