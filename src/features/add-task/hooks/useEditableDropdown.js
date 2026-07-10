import { useState } from "react";

export default function useEditableDropdown({
  items = [],
  onSelect,
  onAdd,
  onEdit,
}) {
  // Dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  // Add New
  const [showAdd, setShowAdd] = useState(false);
  const [newValue, setNewValue] = useState("");

  // Edit
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  // -------------------------
  // Toggle Dropdown
  // -------------------------
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  // -------------------------
  // Close Everything
  // -------------------------
  const closeDropdown = () => {
    setShowDropdown(false);
    setShowAdd(false);

    setEditingId(null);
    setEditingValue("");
    setNewValue("");
  };

  // -------------------------
  // Select Existing Item
  // -------------------------
  const handleSelect = (item) => {
    onSelect?.(item);

    closeDropdown();
  };

  // -------------------------
  // Show Add Section
  // -------------------------
  const openAdd = () => {
    setEditingId(null);
    setEditingValue("");

    setShowAdd(true);
  };

  // -------------------------
  // Cancel Add
  // -------------------------
  const cancelAdd = () => {
    setShowAdd(false);
    setNewValue("");
  };

  // -------------------------
  // Add Item
  // -------------------------
  const handleAdd = () => {
    const value = newValue.trim();

    if (!value) return;

    // Prevent duplicate names
    const alreadyExists = items.some(
      (item) =>
        item.name.trim().toLowerCase() === value.toLowerCase()
    );

    if (alreadyExists) return;

    onAdd?.(value);

    setNewValue("");
    setShowAdd(false);
  };

  // -------------------------
  // Start Editing
  // -------------------------
  const startEdit = (item) => {
    setShowAdd(false);

    setEditingId(item.id);
    setEditingValue(item.name);
  };

  // -------------------------
  // Cancel Editing
  // -------------------------
  const cancelEdit = () => {
    setEditingId(null);
    setEditingValue("");
  };

  // -------------------------
  // Save Editing
  // -------------------------
  const handleSave = () => {
    const value = editingValue.trim();

    if (!value) return;

    onEdit?.(editingId, value);

    setEditingId(null);
    setEditingValue("");
  };

  return {
    // Dropdown
    showDropdown,
    setShowDropdown,
    toggleDropdown,
    closeDropdown,

    // Add
    showAdd,
    setShowAdd,
    openAdd,
    cancelAdd,
    newValue,
    setNewValue,
    handleAdd,

    // Edit
    editingId,
    editingValue,
    setEditingValue,
    startEdit,
    handleSave,
    cancelEdit,

    // Select
    handleSelect,
  };
}