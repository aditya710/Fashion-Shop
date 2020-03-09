import styled from 'styled-components';

export const ButtonContainer = styled.button`
text-transform: capitalize;
font-size: 2.4rem;
background: transparent;
border: 0.25rem solid var(--lightBlue);
border-radius: 0.5rem;
padding: 0.2rem 0.5rem;
cursor:pointer;
margin: 0.2rem 0.5rem 0.2rem 0;
transition:all 0.5s ease-in-out;
&:hover{
    background:#b2ff59 !important;
    color:var(--mainBlack) !important;
    font-size:2.8rem; 
    border:none; 
}
&:focus{
    outline:none;
}
`;