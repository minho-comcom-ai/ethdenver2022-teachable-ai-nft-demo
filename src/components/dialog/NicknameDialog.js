import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import { Button, Input, Text } from '@ainize/design-system';


const NicknameDialogContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 320px;
  box-sizing: border-box;
  background: #ffffff;
`;

const Header = styled.div``;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Warning = styled(Text)`
  color: #fe7474;
`;

// Don't start underbar because invalid docker image name rule.
const APP_NAME_REGEX = /^[a-z]+[a-z0-9_]*$/m;

const ERROR_PHRASE = {
  invalid: `This app name is invalid.`,
  exist: 'This app name already exists.',
};

const NicknameDialog = ({
  open,
  onClose,
  handleNicknameInfo,
  nickname,
  handleCheckExistAppName,
}) => {
  const [desiredNickname, setDesiredNickname] = useState(nickname || '');
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    async function checkExistAppName() {
      if (nickname) {
        await handleCheckExistAppName(appName, () => {
          setWarning('exist');
        });
      }
    }
    checkExistAppName();
  }, [nickname]);

  const handleInputDesiredNickname = (e) => {
    setDesiredNickname(e.target.value);
  };

  const handleValidateAppName = () => {
    return APP_NAME_REGEX.test(desiredNickname) && desiredNickname.length < 60;
  };

  return (
    <Dialog onClose={onClose} open={open} className="root">
      <NicknameDialogContainer>
        <Header>
          <Text size="h3" weight="bold" css={{ fontFamily: 'montserrat' }}>
            Set nickname
          </Text>
        </Header>
        <Content>
          <Text size="p">
            The nickname you set is used as an app name on the blockchain.
          </Text>
          <Text size="p">
            It can only contain lowercase English letters, numbers, and
            underscore.
          </Text>
          <InputContainer>
            <Input
              type="text"
              onChange={handleInputDesiredNickname}
              value={desiredNickname}
              danger={Boolean(warning)}
            />
            {warning && <Warning size="label">{ERROR_PHRASE[warning]}</Warning>}
          </InputContainer>
        </Content>
        <ButtonContainer>
          <Button
            onClick={async () => {
              if (!handleValidateAppName()) {
                setWarning('invalid');
                return;
              } else if (
                await handleCheckExistAppName(desiredNickname, () => {
                  setWarning('exist');
                })
              ) {
                return;
              } else {
                setWarning(null);
                handleNicknameInfo(desiredNickname);
                onClose();
              }
            }}
            size="medium"
            css={{
              display: 'flex',
              width: '100%',
            }}
          >
            Done
          </Button>
        </ButtonContainer>
      </NicknameDialogContainer>
    </Dialog>
  );
};

export default NicknameDialog;
