import { createGlobalStyle } from 'styled-components';
import { flexStartCol } from './flex';

const GlobalStyle = createGlobalStyle`
html {
  margin: 0;
  padding: 0;
  ${flexStartCol}
  overflow-x: hidden;
  overflow-y: auto;
}
  body {
    margin: 0;
    width: 100vw;
    height: 100vh;
    ${flexStartCol}
    padding: 0;
    padding-top: calc(30vh);
    
  }

  * {
    box-sizing: border-box;
    list-style: none;
  }
`;

export default GlobalStyle;
