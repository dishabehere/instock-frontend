import "./InventoryList.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import searchIcon from "../../assets/icons/search-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import chevron from "../../assets/icons/chevron_right-24px.svg";
import sort from "../../assets/icons/sort-24px.svg";

function InventoryList() {
  const [inventories, setInventories] = useState([]);

  useEffect(() => {
    const fetchInventories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/inventories`
        );
        setInventories(response.data);
      } catch (error) {
        console.error("Error fetching inventories:", error);
      }
    };

    fetchInventories();
  }, []);

