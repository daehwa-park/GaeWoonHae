import styled from 'styled-components';

const Imagediv = styled.div`
    border: none;
    border-radius:4px;
    color:white;
    width: 100px;
    height: 100px;
`;

const Buttondiv = styled.div`
    border-color: #ddd;
    border-top-width: 1;
    border-bottom-width: 1;
    color:white;
    width: 100px;
    height: 100px;
    background-color: red;

`;


const StyledButton = styled.button`
    /*공통 스타일*/
    display: inline-flex;
    align-items: center;
    outline: none;
    border: none;
    border-radius: 4px;
    color: black;
    font-weight: bold;
    cursor: pointer;
    padding-left: 1rem;
    padding-right: 1rem;

    /*크기*/
    height: 2.25rem;
    font-size: 1rem;

    /*색상 */
    background: #228be6;
`;

function Button(props) {
    return (
        <StyledButton>{props.children}</StyledButton>
    )
}

// 로그인페이지 왼쪽 태그
function StyledLoginimage(props) {
    return (
        <Imagediv>{props.children}</Imagediv>
    )
}

// 로그인페이지 오른쪽 태그
function StyledLoginbutton(props) {
    return (
        <Buttondiv>{props.children}</Buttondiv>
    )
}





export { StyledLoginimage, StyledLoginbutton, Button };


