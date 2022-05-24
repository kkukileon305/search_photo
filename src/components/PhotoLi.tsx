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

  h3 {
    width: 80%;
    height: 20px;
    margin: 0;
    overflow: hidden;
    font-size: 16px;
  }

  p {
    width: 50%;
    height: 20px;
    overflow: hidden;
  }
`;

export default PhotoLi;
