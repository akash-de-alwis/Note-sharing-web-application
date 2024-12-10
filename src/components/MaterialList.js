import { getStudyMaterials } from '../services/storage.js';
import { createMaterialCard } from './MaterialCard.js';

export function renderMaterialList(isAdmin = false) {
  const materials = getStudyMaterials();
  renderFilteredMaterials(materials, isAdmin);
}

export function renderFilteredMaterials(materials, isAdmin = false) {
  const materialsList = document.querySelector('#materials-list');
  
  if (materials.length === 0) {
    materialsList.innerHTML = `
      <div class="no-results">
        <i class="fas fa-search"></i>
        <p>No materials found matching your search criteria</p>
      </div>
    `;
    return;
  }
  
  materialsList.innerHTML = materials.map(material => createMaterialCard(material, isAdmin)).join('');
}