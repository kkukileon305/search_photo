import styled from 'styled-components';
import { flexCenterCol } from '../styles/flex';

const StyledError = styled.div`
  width: 100%;
  height: 200px;
  ${flexCenterCol}
  font-size: 30px;
`;

const ErrorDiv = () => {
  return <StyledError>Please, try 1hours later...</StyledError>;
};

export default ErrorDiv;
