import { IRun } from 'n8n-workflow';

export const getNodeResultData = (result: IRun, nodeName: string) => {
  return result.data.resultData.runData[nodeName];
};
