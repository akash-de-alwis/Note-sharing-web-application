import { getStudyMaterials, saveStudyMaterials } from '../services/storage.js';
import { renderMaterialList } from './MaterialList.js';

export function setupAdminPanel() {
  const adminBtn = document.querySelector('#admin-toggle');
  const adminPassword = 'admin123'; // In a real app, use proper authentication

  adminBtn.addEventListener('click', () => {
    const password = prompt('Enter admin password:');
    if (password === adminPassword) {
      document.body.classList.toggle('is-admin');
      const isAdmin = document.body.classList.contains('is-admin');
      adminBtn.innerHTML = `<i class="fas ${isAdmin ? 'fa-unlock' : 'fa-lock'}"></i> ${isAdmin ? 'Exit Admin Mode' : 'Admin Panel'}`;
      renderMaterialList(isAdmin);
    } else {
      alert('Invalid password');
    }
  });
}

export function handleEdit(materialId) {
  const materials = getStudyMaterials();
  const material = materials.find(m => m.id === materialId);
  
  if (material) {
    const form = document.querySelector('#upload-form');
    form.title.value = material.title;
    form.description.value = material.description;
    form.faculty.value = material.faculty;
    form.year.value = material.year;
    form.semester.value = material.semester;
    form.subject.value = material.subject;
    form.author.value = material.author;
    
    // Store the ID being edited
    form.dataset.editId = materialId;
    
    // Change button text
    form.querySelector('#initial-submit').textContent = 'Update Material';
    
    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth' });
  }
}

export function handleDelete(materialId) {
  if (confirm('Are you sure you want to delete this material?')) {
    const materials = getStudyMaterials();
    const updatedMaterials = materials.filter(m => m.id !== materialId);
    saveStudyMaterials(updatedMaterials);
    renderMaterialList(true);
  }
}