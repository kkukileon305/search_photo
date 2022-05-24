import styled from 'styled-components';
import { flexStartCol } from '../styles/flex';
import { PhotoLiProps } from '../utils/Props';

const PhotoLi = styled.li<PhotoLiProps>`
  width: calc((100% - 30px) / 2);
  height: 300px;
  ${flexStartCol}
  align-items: flex-start;
  gap: 20px;

  div {
    width: 100%;
    height: 200px;
    background: url(${(props) => props.photoData.urls.regular});
    background-position: center;
    background-size: cover;
  }
`;

export default PhotoLi;
