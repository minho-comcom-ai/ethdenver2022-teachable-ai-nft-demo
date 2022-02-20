import styled from 'styled-components';
import React from 'react';

import { Text } from '@ainize/design-system';

const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ModelInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProgressContainer = styled.div``;

const Progress = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  border-radius: 2px;
  background: #f1f1f1;
`;

const ProgressBar = styled.div`
  ${({ progress }) => {
    return `
      background: ${progress >= 100 ? '#2AC37A' : '#A56BEE'};
      width: ${progress}%;
    `;
  }};
  height: 10px;
  border-radius: 2px;
  transition: 0.4s width;
  position: absolute;
`;

const ProgressInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ProgressText = styled(Text)`
  ${({ progress }) => {
    return `
      color: ${progress >= 100 ? '#2AC37A' : '#A56BEE'};
    `;
  }};
`;

const ModelTrainingProgress = ({ progress, currentJobType }) => {
  return (
    <CardWrapper>
      <ModelInfo>
        <Text size="p" color="2">
          Language: EN
        </Text>
        <Text size="p" color="2">
          Type: {currentJobType.label}
        </Text>
      </ModelInfo>
      <ProgressContainer>
        <ProgressInfo>
          <ProgressText progress={progress} size="p">
            {progress >= 100 ? 'AINFT has been created' : 'Request Training'}
          </ProgressText>
          <ProgressText progress={progress} size="p">
            {progress}%
          </ProgressText>
        </ProgressInfo>
        <Progress>
          <ProgressBar progress={progress} />
        </Progress>
      </ProgressContainer>
    </CardWrapper>
  );
};

export default ModelTrainingProgress;
