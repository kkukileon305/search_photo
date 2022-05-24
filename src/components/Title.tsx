import styled from 'styled-components';
import { TitleProps } from '../utils/Props';

const StyledTitle = styled.h1``;

const Title = ({ children }: TitleProps) => {
  return <StyledTitle>{children}</StyledTitle>;
};

export default Title;
