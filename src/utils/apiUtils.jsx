import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getInventoryItem = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/inventories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory item:', error);
    throw error;
  }
};

export const getAllInventories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/inventories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all inventories:', error);
    throw error;
  }
};

export const createInventoryItem = async (itemData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/inventories`, itemData);
    return response.data;
  } catch (error) {
    console.error('Error creating inventory item:', error);
    throw error;
  }
};

export const updateInventoryItem = async (id, itemData) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/inventories/${id}`, itemData);
    return response.data;
  } catch (error) {
    console.error('Error updating inventory item:', error);
    throw error;
  }
};