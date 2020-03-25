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
  viewState: 'none_selected' | 'one_selected' | 'two_selected' | 'completed'
  tiles: Tile[]
  selected: TileIndex[]
  completed: TileIndex[]
  startTime: Date
  stopTime: Date
  locked: boolean
}

export const initialState: State = {
  viewState: 'none_selected',
  tiles: [],
  selected: [],
  completed: [],
  startTime: undefined,
  stopTime: undefined,
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
        startTime: undefined,
        stopTime: undefined,
      }
    }

    case 'select_tile': {
      let startTime = state.startTime || new Date()

      if (state.selected.length === 0) {
        return {
          ...state,
          startTime,
          viewState: 'one_selected',
          selected: [action.payload],
        }
      } else if (state.selected.length === 1) {
        if (state.selected[0] !== action.payload) {
          return {
            ...state,
            startTime,
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
        viewState:
          state.viewState !== 'completed' ? 'none_selected' : 'completed',
        selected: [],
        locked: false,
      }
    }

    case 'got_pair': {
      const completed = [...state.completed, ...action.payload]
      const gameCompleted =
        completed.length !== 0 && completed.length === state.tiles.length

      return {
        ...state,
        viewState: gameCompleted ? 'completed' : state.viewState,
        completed,
        stopTime: gameCompleted ? new Date() : undefined,
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
