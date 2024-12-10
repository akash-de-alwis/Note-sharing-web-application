import './style.css';
import { setupUploadForm } from './components/UploadForm.js';
import { renderMaterialList } from './components/MaterialList.js';
import { handleDownload } from './utils/download.js';
import { setupAdminPanel, handleEdit, handleDelete } from './components/AdminPanel.js';
import { setupSearchBar } from './components/SearchBar.js';

// Make handlers available globally
window.handleDownload = handleDownload;
window.handleEdit = handleEdit;
window.handleDelete = handleDelete;

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  const updateSubjectOptions = setupSearchBar();
  setupUploadForm(updateSubjectOptions);
  setupAdminPanel();
  renderMaterialList();
});