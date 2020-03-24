import { Tile, TileIndex } from './types'

type ActionType = {
  type:
    | 'start_game'
    | 'select_tile'
    | 'reset_selected'
    | 'check_pair'
    | 'got_pair'
  payload?: any
}

interface State {
  viewState: 'none_selected' | 'one_selected' | 'two_selected'
  tiles: Tile[]
  selected: TileIndex[]
  completed: TileIndex[]
  locked: boolean
}

export const initialState: State = {
  viewState: 'none_selected',
  tiles: [],
  selected: [],
  completed: [],
  locked: false,
}

export function reducer(
  state: State = initialState,
  action: ActionType
): State {
  switch (action.type) {
    case 'start_game': {
      return {
        ...initialState,
        tiles: action.payload,
      }
    }

    case 'select_tile': {
      if (state.selected.length === 0) {
        return {
          ...state,
          viewState: 'one_selected',
          selected: [action.payload],
        }
      } else if (state.selected.length === 1) {
        if (state.selected[0] !== action.payload) {
          return {
            ...state,
            viewState: 'two_selected',
            selected: [...state.selected, action.payload],
          }
        }
      }

      return state
    }

    case 'reset_selected': {
      return {
        ...state,
        viewState: 'none_selected',
        selected: [],
        locked: false,
      }
    }

    case 'got_pair': {
      return {
        ...state,
        completed: [...state.completed, ...action.payload],
      }
    }

    case 'check_pair': {
      return {
        ...state,
        locked: true,
      }
    }

    default:
      return state
  }
}
