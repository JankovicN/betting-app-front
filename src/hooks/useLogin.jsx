import { useMutation } from 'react-query'
import api from '../util/api'

const attemptLogin = (userInfo) => {
  return api.post(`/api/login`,userInfo)
}


export const useLogin = (onSuccess, onError, userInfo) => {
  const request = attemptLogin(userInfo);
  const loginMutation = useMutation(request);
  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isLoading,
    onSuccess: onSuccess,
    onError: onError,
  };
}

