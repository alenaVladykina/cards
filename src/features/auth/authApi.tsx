import {ArgChangePassword, ArgLoginType, ArgRegistrationType, ChangeProfileType} from "./authTypes";
import {inst, instance} from "../../commons/api";

export const authApi = {
  login: (arg: ArgLoginType) => {
    return instance.post('auth/login', arg)
  },
  register: (arg: ArgRegistrationType) => {
    return instance.post('auth/register', arg)
  },
  forgotPassword: (arg: string) => {
    return inst.post('/auth/forgot',
      {
        email: arg,
        message: "<div style=background-color: lime; padding: 15px>Для восстановления пароля пройдите, пожалуйста, по ссылке <a href='https://alenasof.github.io/CardsProject/#/set-new-password/new-password/$token$'>link</a></div>"
      })
  },
  changePassword: (arg: ArgChangePassword) => {
    return inst.post('/auth/set-new-password', arg)
  },
  changeDateProfile: (arg: ChangeProfileType) => {
    return instance.put('/auth/me', {name: arg.name, avatar: arg.avatar})
  },
  me: () => {
    return instance.post('/auth/me', {})
  }
}



