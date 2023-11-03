import { useQuery } from 'react-query'
import api from '../util/api'

const fetchAllLeagues = () => {
  return api.get(`/api/league/get/all`)
}

export const useFetchAllLeaguesData = (onSuccess, onError) => {
  return useQuery('all-leagues', fetchAllLeagues, {
    onSuccess,
    onError
  })
}