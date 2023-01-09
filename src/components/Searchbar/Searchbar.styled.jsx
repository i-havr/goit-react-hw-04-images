import styled from 'styled-components';

export const SearchbarStyled = styled.header`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  /* background-color: #3f51b5; */
  background-image: repeating-linear-gradient(
    -45deg,
    #606dbc,
    #606dbc 10px,
    #465298 10px,
    #465298 20px
  );
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

export const SearchFormStyled = styled.form`
  /* display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden; */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  // flex-direction: column;
  width: 350px;
`;

// export const SearchFormButtonStyled = styled.button`
//   display: inline-block;
//   width: 48px;
//   height: 48px;
//   border: 0;
//   background-image: url('https://image.flaticon.com/icons/svg/149/149852.svg');
//   background-size: 40%;
//   background-repeat: no-repeat;
//   background-position: center;
//   opacity: 0.6;
//   transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
//   cursor: pointer;
//   outline: none;

//   &: hover {
//     opacity: 1;
//   } ;
// `;

// export const SearchFormButtonLabelStyled = styled.span`
//   position: absolute;
//   width: 1px;
//   height: 1px;
//   padding: 0;
//   overflow: hidden;
//   clip: rect(0, 0, 0, 0);
//   white-space: nowrap;
//   clip-path: inset(50%);
//   border: 0;
// `;

export const SearchFormInputStyled = styled.input`
  /* display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 20px;
  border: none;
  outline: none;
  padding-left: 4px;
  padding-right: 4px;

  &::placeholder {
    font: inherit;
    font-size: 18px;
  } */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  padding-left: 16px;
  padding-right: 48px;
  // margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.25;
  letter-spacing: 0.03em;
  color: #212121;
  border: 1px solid rgba(255, 255, 255, 0.3);
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15));
  border-radius: 4px;
  background-color: #ffffff;
`;
