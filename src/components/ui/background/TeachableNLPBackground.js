import React from 'react';
import styled from 'styled-components';

const BgComp = styled.div`
  position: absolute;
  display: flex;
  z-index: -1;
  background-color: #FAFAFA;
`;

function Bg(props) {
    return (
      <>
        <BgComp />
      </>
    );
}

export default Bg;
