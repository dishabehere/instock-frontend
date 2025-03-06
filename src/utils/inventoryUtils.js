import axios from 'axios';

export async function fetchInventoryItem(id) {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/inventories/${id}`
    );
    return data;
  } catch (error) {
    console.error('Error fetching inventory item:', error);
    throw error;
  }
}