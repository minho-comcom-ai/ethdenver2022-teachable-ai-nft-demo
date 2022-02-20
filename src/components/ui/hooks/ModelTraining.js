import React from 'react';

import ModelSetting from './ModelSetting';
import ModelTrainingProgress from './ModelTrainingProgress';

const ModelTraining = ({
  status,
  progress,
  jobType,
  currentJobType,
  handleJobType,
  handleRequestAinftTraining,
}) => {
  return (
    <>
      {status === 'request' || status === 'init' || status === 'signing' ? (
        <ModelSetting
          status={status}
          jobType={jobType}
          currentJobType={currentJobType}
          handleJobType={handleJobType}
          handleRequestAinftTraining={handleRequestAinftTraining}
        />
      ) : (
        <ModelTrainingProgress
          status={status}
          progress={progress}
          currentJobType={currentJobType}
        />
      )}
    </>
  );
};

export default ModelTraining;
