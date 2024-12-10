import { getStudyMaterials } from '../services/storage.js';
import { renderFilteredMaterials } from './MaterialList.js';

export function setupSearchBar() {
  const searchForm = document.querySelector('#search-form');
  
  searchForm.addEventListener('submit', (e) => e.preventDefault());
  
  const searchInput = document.querySelector('#search-input');
  const searchSubject = document.querySelector('#search-subject');
  
  // Get unique subjects for the dropdown
  function updateSubjectOptions() {
    const materials = getStudyMaterials();
    const subjects = [...new Set(materials.map(m => m.subject))];
    
    searchSubject.innerHTML = `
      <option value="">All Subjects</option>
      ${subjects.map(subject => `<option value="${subject}">${subject}</option>`).join('')}
    `;
  }
  
  // Handle search input changes
  function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedSubject = searchSubject.value;
    
    const materials = getStudyMaterials();
    const filteredMaterials = materials.filter(material => {
      const matchesSearch = material.title.toLowerCase().includes(searchTerm) ||
                          material.description.toLowerCase().includes(searchTerm) ||
                          material.author.toLowerCase().includes(searchTerm);
      
      const matchesSubject = !selectedSubject || material.subject === selectedSubject;
      
      return matchesSearch && matchesSubject;
    });
    
    renderFilteredMaterials(filteredMaterials);
  }
  
  searchInput.addEventListener('input', handleSearch);
  searchSubject.addEventListener('change', handleSearch);
  
  // Initialize subject options
  updateSubjectOptions();
  
  // Return the update function to be called when new materials are added
  return updateSubjectOptions;
}