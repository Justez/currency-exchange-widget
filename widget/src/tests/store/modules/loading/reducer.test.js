import reducer, { defaultState } from 'store/modules/loading/reducer';

describe('loading reducer', () => {
  const actionName = 'TEST/GET_TESTED';
  const requestAction = { type: 'TEST/GET_TESTED_REQUEST' };
  const failureAction = { type: 'TEST/GET_TESTED_FAILURE' };
  const successAction = { type: 'TEST/GET_TESTED_SUCCESS' };

  it('should return default state if action is irrelevant', () => {
    const state = reducer(undefined, { type: 'test' });

    expect(state).toEqual(defaultState);
  });

  it('should handle any "*_REQUEST" action', () => {
    const expectedState = { [actionName]: true };
    const state = reducer(undefined, requestAction);

    expect(state).toEqual(expectedState);
  });

  it('should handle any "*_FAILURE" action', () => {
    const initialState = { [actionName]: true };
    const state = reducer(initialState, failureAction);

    expect(state).toEqual({});
  });

  it('should handle any "*_SUCCESS" action', () => {
    const initialState = { [actionName]: true };
    const state = reducer(initialState, successAction);

    expect(state).toEqual({});
  });
});
