import { createSelector } from '@ngrx/store';

export interface AsyncActionState {
  inProgress: boolean;
  error: any;
  success: boolean;
}

export const getInProgress = (state: AsyncActionState) => state.inProgress;
export const getError = (state: AsyncActionState) => state.error;
export const getSuccess = (state: AsyncActionState) => state.success;

export function getSelectors<
  State extends {},
  FeatureState extends Record<Prop, AsyncActionState>,
  Prop extends string
>(stateSelector: (state: State) => FeatureState, propName: Prop) {
  const getAsyncActionState = createSelector(stateSelector, state => state[propName]);

  const getInProgressSelector = createSelector(getAsyncActionState, getInProgress);
  const getErrorSelector = createSelector(getAsyncActionState, getError);
  const getSuccessSelector = createSelector(getAsyncActionState, getSuccess);

  return {
    getInProgress: getInProgressSelector,
    getError: getErrorSelector,
    getSuccess: getSuccessSelector,
    getTriggered: createSelector(
      getInProgressSelector,
      getErrorSelector,
      getSuccessSelector,
      (inProgress, error, success) => inProgress || !!error || success
    ),
  };
}

export const initialState: AsyncActionState = {
  inProgress: false,
  error: undefined,
  success: false,
};

export const inProgressState: AsyncActionState = {
  inProgress: true,
  error: undefined,
  success: false,
};

export const errorState = (error: any) => ({
  inProgress: false,
  error,
  success: false,
});

export const successState = {
  inProgress: false,
  error: undefined,
  success: true,
};
