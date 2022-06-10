import styled from 'styled-components';
import { flexStartCol } from '../styles/flex';
import { PhotoLiProps } from '../utils/Props';

const PhotoLi = styled.li<PhotoLiProps>`
  width: calc((100% - 60px) / 3);
  height: 300px;
  ${flexStartCol}
  align-items: flex-start;
  gap: 20px;
  transition: 0.3s;
  position: relative;

  @media screen and (max-width: 1024px) {
    width: calc((100% - 30px) / 2);
  }

  @media screen and (max-width: 570px) {
    width: calc(100%);
  }

  div {
    width: 100%;
    height: 200px;
    background: url(${(props) => props.photoData.urls.regular});
    background-position: center;
    background-size: cover;
    cursor: pointer;
  }
`;

export default PhotoLi;
