interface IState {
      boxModeAvatar?: boolean
      modeAvatarSee?: boolean
      modeAvatarUpdate?: boolean
      modeAvatarDelete?: boolean
      toast?: boolean
}

type OPEN_BOX_AVATAR = 'OPEN_BOX_AVATAR'
type CLOSE_BOX_AVATAR = 'CLOSE_BOX_AVATAR'
type OPEN_MODE_AVATAR_SEE = 'OPEN_MODE_AVATAR_SEE'
type CLOSE_MODE_AVATAR_SEE = 'CLOSE_MODE_AVATAR_SEE'
type OPEN_MODE_AVATAR_UPDATE = 'OPEN_MODE_AVATAR_UPDATE'
type CLOSE_MODE_AVATAR_UPDATE = 'CLOSE_MODE_AVATAR_UPDATE'
type OPEN_MODE_AVATAR_DELETE = 'OPEN_MODE_AVATAR_DELETE'
type CLOSE_MODE_AVATAR_DELETE = 'CLOSE_MODE_AVATAR_DELETE'

type TypeActions =
      | OPEN_BOX_AVATAR
      | CLOSE_BOX_AVATAR
      | OPEN_MODE_AVATAR_SEE
      | CLOSE_MODE_AVATAR_SEE
      | OPEN_MODE_AVATAR_UPDATE
      | CLOSE_MODE_AVATAR_UPDATE
      | OPEN_MODE_AVATAR_DELETE
      | CLOSE_MODE_AVATAR_DELETE

export type TAvatarActions = {
      type: TypeActions
      payload: IState
}

export const initialValue: IState = {
      boxModeAvatar: false,
      modeAvatarSee: false,
      modeAvatarUpdate: false,
      modeAvatarDelete: false,
      toast: false,
}

export const customerAccountReducer = (state: IState = initialValue, action: TAvatarActions) => {
      const { type, payload } = action
      console.log({ action })
      switch (type as TypeActions) {
            case 'OPEN_BOX_AVATAR': {
                  return {
                        ...state,
                        boxModeAvatar: payload.boxModeAvatar,
                  }
            }
            case 'CLOSE_BOX_AVATAR': {
                  return {
                        ...state,
                        boxModeAvatar: payload.boxModeAvatar,
                  }
            }
            case 'OPEN_MODE_AVATAR_SEE': {
                  return {
                        ...state,
                        modeAvatarSee: payload.modeAvatarSee,
                  }
            }

            case 'CLOSE_MODE_AVATAR_SEE': {
                  return {
                        ...state,
                        boxModeAvatar: payload.boxModeAvatar,

                        modeAvatarSee: payload.modeAvatarSee,
                  }
            }
            case 'OPEN_MODE_AVATAR_UPDATE': {
                  return {
                        ...state,
                        modeAvatarUpdate: payload.modeAvatarUpdate,
                  }
            }

            case 'CLOSE_MODE_AVATAR_UPDATE': {
                  return {
                        ...state,
                        boxModeAvatar: payload.boxModeAvatar,
                        modeAvatarUpdate: payload.modeAvatarUpdate,
                  }
            }

            case 'OPEN_MODE_AVATAR_DELETE': {
                  return {
                        ...state,
                        modeAvatarDelete: payload.modeAvatarDelete,
                  }
            }

            case 'CLOSE_MODE_AVATAR_DELETE': {
                  return {
                        ...state,
                        boxModeAvatar: payload.boxModeAvatar,
                        modeAvatarDelete: payload.modeAvatarDelete,
                  }
            }

            default:
                  return state
      }
}
