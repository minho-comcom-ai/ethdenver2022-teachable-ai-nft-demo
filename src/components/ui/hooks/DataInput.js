import styled from 'styled-components';
import React, { useMemo, memo } from 'react';
import { useSelector } from 'react-redux';

import TestModel from 'components/ui/hooks/TestModel';

const ModelWrapper = styled.div`
  width: 240px;
  position: relative;
`;

const Rectangle2 = styled.div`
  display: flex;
  flex-direction: column;

  width: 240px;
  height: 157px;

  box-sizing: border-box;
  border-radius: 8px;
  align-items: center;
  justify-content: space-between;

  font-family: Roboto;
  font-weight: 700;

  ${({ status }) =>
    status === 'api'
      ? `
        background: #FFFFFF;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
        padding: 36px 0px;
    `
      : `
      border: 2px dashed #DBDBDB;
      padding: 36px 0px 30px;
    `}
  .done {
    font-size: 16px;
    line-height: 24px;
    color: #333333;
  }

  .yet {
    font-size: 20px;
    line-height: 30px;
    color: #828282;
  }
`;

const IconImg = styled.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
`;

const DataInput = () => {
  const { taskObjs, currentTrainId } = useSelector(
    (state) => state.teachableNLPReducer,
  );

  const ModelOutputMemo = useMemo(() => {
    if (
      currentTrainId in taskObjs &&
      taskObjs[currentTrainId].status === 'api'
    ) {
      return (
        <Rectangle2 status={'api'}>
          <IconImg src={'/images/model.png'}></IconImg>
          <div className="done">
            {taskObjs[currentTrainId].modelName.slice(0, -4)}
          </div>
        </Rectangle2>
      );
    } else {
      return (
        <Rectangle2>
          <IconImg src={'/images/model.png'}></IconImg>
          <div className="yet">Model</div>
        </Rectangle2>
      );
    }
  }, [currentTrainId, taskObjs]);
  return (
    <ModelWrapper>
      {ModelOutputMemo}
      <TestModel />
    </ModelWrapper>
  );
};

export default memo(DataInput);
