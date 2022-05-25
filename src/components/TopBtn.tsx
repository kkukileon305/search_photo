import styled from 'styled-components';
import { TopBtnProps } from '../utils/Props';

const StyledBtn = styled.button`
  position: fixed;
  width: 40px;
  height: 40px;
  top: 20px;
  left: calc(50% - 20px);
  border: none;
  border-radius: 20px;
  z-index: 9999;
`;

const TopBtn = ({ page }: TopBtnProps) => {
  return <StyledBtn>{String(page).padStart(2, '0')}</StyledBtn>;
};

export default TopBtn;
