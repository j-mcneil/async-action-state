import { MemoizedSelector, Selector } from '@ngrx/store';

export interface AsyncActionState {
  inProgress: boolean;
  error: any;
  success: boolean;
}

export const getInProgress = (state: AsyncActionState) => state.inProgress;
export const getError = (state: AsyncActionState) => state.error;
export const getSuccess = (state: AsyncActionState) => state.success;

type CS1<S, T, R> = (s1: Selector<S, T>, projector: (s1: T) => R) => MemoizedSelector<S, R>;
type CS3<S, T, R> = (
  s1: Selector<S, T>,
  s2: Selector<S, T>,
  s3: Selector<S, T>,
  projector: (s1: T, s2: T, s3: T) => R
) => MemoizedSelector<S, R>;

export function getSelectors<
  State extends {},
  FeatureState extends Record<Prop, AsyncActionState>,
  Prop extends string,
  Creator extends CS1<State, FeatureState, AsyncActionState> &
    CS1<State, AsyncActionState, boolean> &
    CS3<State, boolean, boolean>
>(createSelector: Creator, stateSelector: (state: State) => FeatureState, propName: Prop) {
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
