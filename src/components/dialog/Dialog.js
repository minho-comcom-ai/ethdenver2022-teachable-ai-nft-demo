import React from 'react';

import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';

const CustomDialog = styled(Dialog)`
  box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.2);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 384px;

  padding: 37px 23px 29px;
  background: #FFFFFF;
  box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.2);

  font-family: Roboto;
`;

const Icon = styled.img`
  width: 65px;
  height: 65px;
`;

const Title = styled.div`
  font-size: 22px;
  font-style: normal;
  font-weight: bold;
  line-height: 32px;
  letter-spacing: 0px;
  text-align: center;
  color: #000000;

  margin-top: 16px;
`;

const Description = styled.div`
  margin-top: 7px;
  text-align: center;
  white-space: pre-line;
`;

const Button = styled.div`
  margin-top: 47px;
  display: flex;
  justify-content: center;
`;

const ICON = {
  warning: '/images/Warning@2x.png',
  question: ''
}

const DialogComponent = ({ 
  title, 
  description, 
  button, 
  type, 
  open,
  onClose
}) => {
  return (
    <CustomDialog 
      open={open}
      onClose={onClose}
    >
      <Wrapper>
        <Icon 
          src={ICON[type]}
        />
        <Title>
          {title}
        </Title>
        <Description>
          {description}
        </Description>
        <Button>
          {button}
        </Button>
      </Wrapper>
    </CustomDialog>
  )
}

export default DialogComponent;