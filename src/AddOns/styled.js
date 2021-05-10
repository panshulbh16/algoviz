import styled from 'styled-components'
export const Styles = styled.div`
color: white;
input[type="range"] {
    -webkit-appearance: none;
   }
   
   input[type="range"]:focus {
    outline: none;
   }
input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 15px;
    width: 15px;
    background: white;
    margin-top: -5px;
    border-radius: 50%;
   }
   
   input[type="range"]::-moz-range-thumb {
    height: 15px;
    width: 15px;
    background: lightpink;
    margin-top: -5px;
    border-radius: 50%;
   }
   input[type="range"]::-webkit-slider-runnable-track {
    background: lightpink;
    height: 5px;
   }
   
   input[type="range"]::-moz-range-track {
    background: tomato;
    height: 5px;
   }
`;
{};