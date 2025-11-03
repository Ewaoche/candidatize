"use client"

import axios, {  AxiosInstance,  AxiosError } from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api/v1"

let axiosInstance: AxiosInstance | null = null

export const getApiClient = (): AxiosInstance => {
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    })

    // Request interceptor to add auth token
    axiosInstance.interceptors.request.use(
      (config) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error),
    )

    // Response interceptor to handle errors
    axiosInstance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("token")
            window.location.href = "/login"
          }
        }
        return Promise.reject(error)
      },
    )
  }

  return axiosInstance
}
