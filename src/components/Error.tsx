import { RiEmotionSadLine } from 'react-icons/ri';
import styled from 'styled-components';
import { flexCenterRow } from '../styles/flex';

const StyledError = styled.div`
  width: 100%;
  height: 200px;
  ${flexCenterRow}
  font-size: 30px;
  gap: 20px;
`;

const ErrorDiv = () => {
  return (
    <StyledError>
      <RiEmotionSadLine />
      Please, try 1hours later...
    </StyledError>
  );
};

export default ErrorDiv;
