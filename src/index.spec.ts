import { it, describe, beforeEach } from 'mocha';
import { expect } from 'chai';
import { MemoizedSelector } from '@ngrx/store';

import * as asyncActionState from '.';

interface ItemsState {
  loadItems: asyncActionState.AsyncActionState;
}

interface AppState {
  items: ItemsState;
}
const getItemsState = (appState: AppState) => {
  return appState.items;
};

describe('AsyncActionState', () => {
  describe('getSelectors', () => {
    let state: AppState;
    let getItemsLoading: MemoizedSelector<AppState, boolean>;
    let getItemsLoadError: MemoizedSelector<AppState, boolean>;
    let getItemsLoadSuccess: MemoizedSelector<AppState, boolean>;
    let getItemsLoadTriggered: MemoizedSelector<AppState, boolean>;
    let errorState: asyncActionState.AsyncActionState;

    describe('ngrx', () => {
      describe('initialState', () => {
        beforeEach(() => {
          state = {
            items: {
              loadItems: asyncActionState.initialState,
            },
          };

          ({
            getInProgress: getItemsLoading,
            getSuccess: getItemsLoadSuccess,
            getError: getItemsLoadError,
            getTriggered: getItemsLoadTriggered,
          } = asyncActionState.getSelectors(getItemsState, 'loadItems'));
        });

        describe('getInProgress', () => {
          describe('projector', () => {
            it('should return false', () => {
              expect(getItemsLoading.projector(asyncActionState.initialState)).equals(false);
            });
          });

          describe('selector', () => {
            it('should return false', () => {
              expect(getItemsLoading(state)).equals(false);
            });
          });
        });

        describe('getSuccess', () => {
          describe('projector', () => {
            it('should return false', () => {
              expect(getItemsLoadSuccess.projector(asyncActionState.initialState)).equals(false);
            });
          });

          describe('selector', () => {
            it('should return false', () => {
              expect(getItemsLoadSuccess(state)).equals(false);
            });
          });
        });

        describe('getError', () => {
          describe('projector', () => {
            it('should return undefined', () => {
              expect(getItemsLoadError.projector(asyncActionState.initialState)).equals(undefined);
            });
          });

          describe('selector', () => {
            it('should return undefined', () => {
              expect(getItemsLoadError(state)).equals(undefined);
            });
          });
        });

        describe('getTriggered', () => {
          describe('projector', () => {
            it('should return false', () => {
              expect(getItemsLoadTriggered.projector(false, undefined, false)).equals(false);
            });
          });

          describe('selector', () => {
            it('should return false', () => {
              expect(getItemsLoadTriggered(state)).equals(false);
            });
          });
        });
      });

      describe('inProgressState', () => {
        beforeEach(() => {
          state = {
            items: {
              loadItems: asyncActionState.inProgressState,
            },
          };

          ({
            getInProgress: getItemsLoading,
            getSuccess: getItemsLoadSuccess,
            getError: getItemsLoadError,
            getTriggered: getItemsLoadTriggered,
          } = asyncActionState.getSelectors(getItemsState, 'loadItems'));
        });

        describe('getInProgress', () => {
          describe('projector', () => {
            it('should return true', () => {
              expect(getItemsLoading.projector(asyncActionState.inProgressState)).equals(true);
            });
          });

          describe('selector', () => {
            it('should return true', () => {
              expect(getItemsLoading(state)).equals(true);
            });
          });
        });

        describe('getSuccess', () => {
          describe('projector', () => {
            it('should return false', () => {
              expect(getItemsLoadSuccess.projector(asyncActionState.inProgressState)).equals(false);
            });
          });

          describe('selector', () => {
            it('should return false', () => {
              expect(getItemsLoadSuccess(state)).equals(false);
            });
          });
        });

        describe('getError', () => {
          describe('projector', () => {
            it('should return undefined', () => {
              expect(getItemsLoadError.projector(asyncActionState.inProgressState)).equals(undefined);
            });
          });

          describe('selector', () => {
            it('should return undefined', () => {
              expect(getItemsLoadError(state)).equals(undefined);
            });
          });
        });

        describe('getTriggered', () => {
          describe('projector', () => {
            it('should return true', () => {
              expect(getItemsLoadTriggered.projector(true, undefined, false)).equals(true);
            });
          });

          describe('selector', () => {
            it('should return true', () => {
              expect(getItemsLoadTriggered(state)).equals(true);
            });
          });
        });
      });

      describe('successState', () => {
        beforeEach(() => {
          state = {
            items: {
              loadItems: asyncActionState.successState,
            },
          };

          ({
            getInProgress: getItemsLoading,
            getSuccess: getItemsLoadSuccess,
            getError: getItemsLoadError,
            getTriggered: getItemsLoadTriggered,
          } = asyncActionState.getSelectors(getItemsState, 'loadItems'));
        });

        describe('getInProgress', () => {
          describe('projector', () => {
            it('should return false', () => {
              expect(getItemsLoading.projector(asyncActionState.successState)).equals(false);
            });
          });

          describe('selector', () => {
            it('should return false', () => {
              expect(getItemsLoading(state)).equals(false);
            });
          });
        });

        describe('getSuccess', () => {
          describe('projector', () => {
            it('should return true', () => {
              expect(getItemsLoadSuccess.projector(asyncActionState.successState)).equals(true);
            });
          });

          describe('selector', () => {
            it('should return true', () => {
              expect(getItemsLoadSuccess(state)).equals(true);
            });
          });
        });

        describe('getError', () => {
          describe('projector', () => {
            it('should return undefined', () => {
              expect(getItemsLoadError.projector(asyncActionState.successState)).equals(undefined);
            });
          });

          describe('selector', () => {
            it('should return undefined', () => {
              expect(getItemsLoadError(state)).equals(undefined);
            });
          });
        });

        describe('getTriggered', () => {
          describe('projector', () => {
            it('should return true', () => {
              expect(getItemsLoadTriggered.projector(false, undefined, true)).equals(true);
            });
          });

          describe('selector', () => {
            it('should return true', () => {
              expect(getItemsLoadTriggered(state)).equals(true);
            });
          });
        });
      });

      describe('errorState', () => {
        beforeEach(() => {
          errorState = asyncActionState.errorState('something blew up');

          state = {
            items: {
              loadItems: errorState,
            },
          };

          ({
            getInProgress: getItemsLoading,
            getSuccess: getItemsLoadSuccess,
            getError: getItemsLoadError,
            getTriggered: getItemsLoadTriggered,
          } = asyncActionState.getSelectors(getItemsState, 'loadItems'));
        });

        describe('getInProgress', () => {
          describe('projector', () => {
            it('should return false', () => {
              expect(getItemsLoading.projector(errorState)).equals(false);
            });
          });

          describe('selector', () => {
            it('should return false', () => {
              expect(getItemsLoading(state)).equals(false);
            });
          });
        });

        describe('getSuccess', () => {
          describe('projector', () => {
            it('should return false', () => {
              expect(getItemsLoadSuccess.projector(errorState)).equals(false);
            });
          });

          describe('selector', () => {
            it('should return false', () => {
              expect(getItemsLoadSuccess(state)).equals(false);
            });
          });
        });

        describe('getError', () => {
          describe('projector', () => {
            it('should return the error', () => {
              expect(getItemsLoadError.projector(errorState)).equals('something blew up');
            });
          });

          describe('selector', () => {
            it('should return the eror', () => {
              expect(getItemsLoadError(state)).equals('something blew up');
            });
          });
        });

        describe('getTriggered', () => {
          describe('projector', () => {
            it('should return true', () => {
              expect(getItemsLoadTriggered.projector(false, 'something blew up', false)).equals(true);
            });
          });

          describe('selector', () => {
            it('should return true', () => {
              expect(getItemsLoadTriggered(state)).equals(true);
            });
          });
        });
      });
    });
  });
});
