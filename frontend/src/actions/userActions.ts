import { AppDispatch } from "../store"
import { loginUserServiceApi, registerUserServiceApi } from '../api/userServiceApi'
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from "../constants/userConstants"
import { IUser } from "../models/lebonson/User"

const loginUser = (userData: IUser) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST, payload: null })

    const data = await loginUserServiceApi(userData)    

    if(!data) return

    localStorage.setItem('token', JSON.stringify(data.token))
    localStorage.setItem('user', JSON.stringify(data.user))

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data })

  } catch (error: any) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    
    dispatch({ type: USER_LOGIN_FAIL, payload: message })
  }
}

const registerUser = (userData: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST, payload: null })

    const data = await registerUserServiceApi(userData)    

    if(!data) return    

    localStorage.setItem('token', JSON.stringify(data.token))
    localStorage.setItem('user', JSON.stringify(data.user))

    dispatch({ 
      type: USER_REGISTER_SUCCESS, 
      payload: data
    })

  } catch (error: any) {
    const message = (
      error.response && 
      error.response.data && 
      error.response.data.message
    ) || error.message || error.toString()
    
    dispatch({ type: USER_REGISTER_FAIL, payload: message })
  }
}

const logOutUser = () => async (dispatch: AppDispatch) => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  dispatch({ type: USER_LOGOUT, payload: null })
}

const userActions = {
  loginUser,
  logOutUser,
  registerUser
}

export default userActions
