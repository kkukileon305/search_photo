import styled from 'styled-components';
import { flexCenterRow } from '../styles/flex';
import { RiEmotionSadLine } from 'react-icons/ri';

const StyledDone = styled.div`
  width: 100%;
  height: 200px;
  ${flexCenterRow}
  font-size: 30px;
  gap: 20px;
`;

const Done = () => {
  return (
    <StyledDone>
      <RiEmotionSadLine />
      There is no more photo...
    </StyledDone>
  );
};

export default Done;
