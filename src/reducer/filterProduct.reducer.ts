type ON_CHECKED_HIGH = 'ON_CHECKED_HIGH'
type ON_CHECKED_MID = 'ON_CHECKED_MID'
type ON_CHECKED_LOW = 'ON_CHECKED_LOW'
type ON_CHECKED_RESET = 'ON_CHECKED_RESET'

export type Actions = ON_CHECKED_HIGH | ON_CHECKED_MID | ON_CHECKED_LOW | ON_CHECKED_RESET

type InitialValue = {
      onCheckedHigh: boolean
      onCheckedMid: boolean
      onCheckedLow: boolean
      onMinValueVote: number
}

type Payload = {
      type: Actions
      payload?: InitialValue
}

export const initialValue: InitialValue = {
      onCheckedHigh: false,
      onCheckedMid: false,
      onCheckedLow: false,
      onMinValueVote: 5,
}
const filterProductReducer = (state: InitialValue = initialValue, payload: Payload) => {
      switch (payload.type) {
            case 'ON_CHECKED_HIGH':
                  return {
                        ...state,
                        onCheckedHigh: true,
                        onCheckedMid: false,
                        onCheckedLow: false,
                        onMinValueVote: 5,
                  }

            case 'ON_CHECKED_MID':
                  return {
                        ...state,
                        onCheckedHigh: false,
                        onCheckedMid: true,
                        onCheckedLow: false,
                        onMinValueVote: 4,
                  }

            case 'ON_CHECKED_LOW':
                  return {
                        ...state,
                        onCheckedHigh: false,
                        onCheckedMid: false,
                        onCheckedLow: true,
                        onMinValueVote: 3,
                  }

            case 'ON_CHECKED_RESET':
                  return {
                        ...state,
                        onCheckedHigh: false,
                        onCheckedMid: false,
                        onCheckedLow: false,
                        onMinValueVote: 5,
                  }

            default:
                  return state
      }
}

export default filterProductReducer
