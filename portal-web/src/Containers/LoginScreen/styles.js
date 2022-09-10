import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Montserrat', sans-serif;
        scr: url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
        font-weight: 400;
        font-style: normal;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;

export const ContainerBody = styled.div`
    width: 100%;
    margin: 0 auto;
`;

export const ContainerLogin = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 15px;
    background-color: #00C6C1;
`;

export const WrapLogin = styled.div`
    width: 390px;
    background-color: #FFF;
    border-radius: 10px;
    overflow: hidden;
    padding: 0px 55px 33px 55px;
    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.2);
`;

export const Form = styled.form`
    width: 100%;
`;

export const WrapImg = styled.div`
    display: flex;
    width: 100;
    justify-content: center;
`;

export const SpanTitle = styled.span`
    font-family: 'Montserrat', sans-serif;
    display: block;
    font-size: 30px;
    color: #1B406A;
    line-height: 1.2;
    text-align: center;
    margin-bottom: 30px;
    margin-top: 50px;
`;

export const Img = styled.img`
    width: 150px;
`;

export const WarpInput = styled.div`
    width: 100%;
    position: relative;
    border: 2px solid #d3d3d3;
    border-radius: 4px;
    margin-bottom: 37px;
`;

export const Input = styled.input`
    font-size: 15px;
    color: black;
    line-height: 1.2;
    border: none;
    display: block;
    width: 100%;
    height: 45px;
    background-color: transparent;
    padding: 0 5px;

    &:focus {
        outline: 0;
        box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.2);
    }
`;

export const SpanErrorMessage = styled.span`
    font-family: 'Montserrat', sans-serif;
    display: block;
    font-size: 14px;
    color: #FD3737;
    line-height: 1.2;
    text-align: center;
    margin-bottom: 30px;
`;

export const ContainerButtonSubmit = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: 13px;
`;

export const ButtonSubmit = styled.div`
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    border: none;
    border-radius: 10px;
    color: #fff;
    line-height: 1.2;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    background: #1B406A;

    &:hover {
        box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.3);
    }
`;

export const ContainerTextAnchor = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const TextAnchor = styled.a`
    font-size: 16px;
    color: #00C6C1;
    line-height: 1.5;
    text-decoration: none;
    margin-top: 10px
`;