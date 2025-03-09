import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getAllWarehouses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/warehouses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all warehouses:', error);
  }
};

export const getInventoryItem = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/inventories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory item:', error);
  }
};

export const getAllInventories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/inventories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all inventories:', error);
  }
};

export const createInventoryItem = async (formattedData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/inventories`, formattedData);
    return response.data;
  } catch (error) {
    console.error('Error creating inventory item:', error);
  }
};

export const updateInventoryItem = async (id, formattedData) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/inventories/${id}`, formattedData);
    return response.data;
  } catch (error) {
    console.error('Error updating inventory item:', error);
  }
};

export const deleteInventory = async (id) => {
  try {
    await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/inventories/${id}`);
    return true; 
  } catch (error) {
    console.error("Error deleting inventory:", error);
    return false; 
  }
};