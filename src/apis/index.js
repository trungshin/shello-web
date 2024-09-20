import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// Boards
export const fetchBoardsDetailAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}

export const updateBoardsDetailAPI = async (boardId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
  return response.data
}

export const updateCardToDifferentColumnAPI = async (updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/boards/update_card/different_column`, updateData)
  return response.data
}

// Columns
export const createColumnAPI = async (newColumnData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns`, newColumnData)
  return response.data
}

export const updateColumnDetailAPI = async (columnId, updateData) => {
  const response = await axios.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
  return response.data
}

export const deleteColumnAPI = async (columnId) => {
  const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`)
  return response.data
}

// Cards
export const createCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards`, newCardData)
  return response.data
}