import { createGlobalStyle } from 'styled-components';
import { flexStartCol } from './flex';

const GlobalStyle = createGlobalStyle`
html {
  margin: 0;
  padding: 0;
  ${flexStartCol}
  overflow-x: hidden;
}
  body {
    margin: 0;
    width: 100vw;
    ${flexStartCol}
    padding: 0;
    padding-top: 10vh;
    overflow-y: auto;

  }

  * {
    box-sizing: border-box;
    list-style: none;
  }
`;

export default GlobalStyle;
