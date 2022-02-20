import React from "react";

import styled, { keyframes } from "styled-components";
import ClearIcon from "@material-ui/icons/Clear";


const showTooltip = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 0.9;
    }
`;

const hideTooltip = keyframes`
    from {
        opacity: 0.9;
    }
    to {
        opacity: 0;
    }
`;

const Wrapper = styled.div`
  position: relative;
  z-index: 101;
  display: flex;
  flex-direction: column;
  display: ${(props) => (props.visible ? "block" : "none")};
  animation: ${(props) => (props.visible ? showTooltip : hideTooltip)} 0.2s
    ease-in-out;
  -webkit-transition: -webkit-visibility 0.2s ease-in-out;
  transition: visibility 0.2s ease-in-out;
  margin-top: 10px;
`;

const Arrow = styled.div`
  width: 0;
  height: 0;
  margin-left: 10%;
  border-left: 12px solid transparent;
  border-bottom: 12px solid #6f3bd5;
  border-right: 12px solid transparent;
`;

const TextContainer = styled.div`
  /* max-width: 188px; */
  padding: 28px 30px 10px 15px;
  border-radius: 10px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.25);
  background-color: #6f3bd5;
  font-size: 12px;
  line-height: 20px;
  text-align: left;
  color: #ffffff;
  white-space: normal;
  word-wrap: break-word;
  width: 240px;

  @media only screen and (min-width: ${(props) => props.theme.layout.teachableNlpMinWidthDesktop}) {
    font-size: 12px;
    width: 240px;
  }

  .icon-button {
    position: absolute;
    top: 20px;
    right: 8px;
    :hover {
      cursor: pointer;
    }
  }
`;

export const Description = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 10px;
`;

const TooltipIconWrapper = styled.div`
  
  display: inline-block;

  img {
    width: 10px;
    margin-left: 5px; 
    z-index: 110;
  }
  :hover {
    cursor: pointer;
  }
`;

export const TooltipIcon = (props) => {
  const { handleVisible, nextStatus } = props; 

  return (
    <TooltipIconWrapper>
      <img className='icon' src='/images/tooltip-mark@2x.png' 
      onClick={() => handleVisible(true)}/>
    </TooltipIconWrapper>
  )
}

const TeachableTooltip = (props) => {
  const { tooltip } = props
  const { handleVisible, tooltipVisible, content } = tooltip;
  
  return (
    <Wrapper visible={tooltipVisible}>
      <Arrow />
      <TextContainer>
        <ClearIcon
          fontSize="small"
          className='icon-button'
          onClick={()=>handleVisible(false)}
        />
        {content}
      </TextContainer>
    </Wrapper>
  );
};

export default TeachableTooltip;

export const FileItemNFT = styled.div`
    margin-left: 14px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 16.67px;
    color: white;

    a:visited {
        color: white;
        text-decoration: none;
    }
    a:link {
        color: white;
        text-decoration: none;
    }

    a:hover {
        color: white;
        text-decoration: none;
    }
`;

export const FileText = styled.div`
    margin: auto 0px auto 5px;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    display: flex;
    align-items: center;
    text-align: center;
    text-decoration-line: underline;
    :hover {
        cursor: pointer;
    }
`;
