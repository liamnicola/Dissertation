import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

body {
    background-color: #121212;
    padding-top: 0;
    margin: 0;
    color: white;
};

h1 {
    text-align: center
}

:-webkit-any-link {
}
`;

export default GlobalStyles;
