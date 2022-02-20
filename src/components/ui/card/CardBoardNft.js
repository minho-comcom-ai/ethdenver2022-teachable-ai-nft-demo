// TODO(hyeonwoong): DO NOT COMBINE BEFORE EXTRACTING ALL LOGICS FROM THE COMPONENT DESIGN.

import React from 'react';
import styled from 'styled-components';

const CardBoardContainer = styled.div`
  width: 240px;
  height: 308px;
  background: ${({ isActivate }) => (isActivate ? '#FFFFFF' : '#F1F1F1')};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const CardBoardHeader = styled.div`
  height: 36px;
  border-bottom: 1px solid #dadada;
  box-sizing: border-box;
  padding: 0px 12px;
  font-family: Roboto;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: ${({ isActivate }) => (isActivate ? '#333333' : '#828282')};

  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    display: flex;
    align-items: center;
  }
`;

const CardBoardContent = styled.div`
  padding: 16px;
  flex: 1;
`;

const CardBoardNft = ({
  title,
  menu,
  isActivate,
  children,
  tooltipIcon,
  tooltip,
  onboardingTooltip,
}) => {
  return (
    <div>
      <CardBoardContainer isActivate={isActivate}>
        <CardBoardHeader isActivate={isActivate}>
          <span>
            {title}
            {tooltipIcon}
          </span>
          {menu}
        </CardBoardHeader>
        <CardBoardContent>{children}</CardBoardContent>
      </CardBoardContainer>
      {onboardingTooltip}
      {tooltip}
    </div>
  );
};

export default CardBoardNft;
