import { State } from 'store';

interface ActionObject {
  id: number | string;
  actionName: string;
}

type RequestActionTypes = Array<string | ActionObject>;

type GetLoadingSelectorType = (requestActionTypes: RequestActionTypes) => (state: State) => boolean;

export const getLoadingStatus: GetLoadingSelectorType = actions => state => {
  const strippedActions = actions.map(action => {
    const actionName = typeof action === 'object' ? action.actionName : action;
    
    const matches = /(.*)_(REQUEST)/.exec(actionName);
    if (!matches) {
      throw new Error('Invalid action type. Pass action types with following signature: *_REQUEST');
    }
    const requestName = matches[1];

    return requestName;
  });
  
  return strippedActions.some(action => state.loading[action]);
};
