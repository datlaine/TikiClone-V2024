import axios, { type AxiosError } from 'axios'

export const checkAxiosError = <T>(error: unknown): error is AxiosError<T> => {
    return axios.isAxiosError(error)
}
