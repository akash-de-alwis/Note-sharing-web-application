import { StudyMaterial } from '../models/StudyMaterial.js';
import { getStudyMaterials, saveStudyMaterials } from '../services/storage.js';
import { renderMaterialList } from './MaterialList.js';
import { createFileUrl } from '../utils/file.js';

export function setupUploadForm(updateSubjectOptions) {
  const form = document.querySelector('#upload-form');
  const confirmationDialog = document.querySelector('#confirmation-dialog');
  const initialSubmitBtn = document.querySelector('#initial-submit');
  const finalSubmitBtn = document.querySelector('#final-submit');
  const cancelBtn = document.querySelector('.cancel-btn');
  const confirmCheck = document.querySelector('#confirm-check');
  const countdownElement = document.querySelector('#countdown');
  
  let countdownTimer;
  
  function startCountdown() {
    let seconds = 10;
    countdownElement.textContent = seconds;
    
    countdownTimer = setInterval(() => {
      seconds--;
      countdownElement.textContent = seconds;
      
      if (seconds <= 0) {
        clearInterval(countdownTimer);
        finalSubmitBtn.disabled = false;
      }
    }, 1000);
  }
  
  function showConfirmationDialog() {
    confirmationDialog.classList.remove('hidden');
    startCountdown();
  }
  
  function hideConfirmationDialog() {
    confirmationDialog.classList.add('hidden');
    clearInterval(countdownTimer);
    finalSubmitBtn.disabled = true;
    confirmCheck.checked = false;
  }
  
  initialSubmitBtn.addEventListener('click', (e) => {
    if (form.checkValidity()) {
      showConfirmationDialog();
    } else {
      form.reportValidity();
    }
  });
  
  cancelBtn.addEventListener('click', hideConfirmationDialog);
  
  confirmCheck.addEventListener('change', (e) => {
    if (!e.target.checked) {
      finalSubmitBtn.disabled = true;
    } else if (countdownElement.textContent === '0') {
      finalSubmitBtn.disabled = false;
    }
  });
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!confirmCheck.checked) {
      return;
    }
    
    const formData = new FormData(form);
    const editId = form.dataset.editId;
    
    if (editId) {
      // Update existing material
      const materials = getStudyMaterials();
      const materialIndex = materials.findIndex(m => m.id === editId);
      
      if (materialIndex !== -1) {
        const file = formData.get('file');
        materials[materialIndex] = {
          ...materials[materialIndex],
          title: formData.get('title'),
          description: formData.get('description'),
          faculty: formData.get('faculty'),
          year: formData.get('year'),
          semester: formData.get('semester'),
          subject: formData.get('subject'),
          author: formData.get('author'),
          fileUrl: file.size > 0 ? await createFileUrl(file) : materials[materialIndex].fileUrl
        };
        
        saveStudyMaterials(materials);
      }
    } else {
      // Create new material
      const file = formData.get('file');
      const fileUrl = await createFileUrl(file);
      
      const material = new StudyMaterial(
        formData.get('title'),
        formData.get('description'),
        formData.get('faculty'),
        formData.get('year'),
        formData.get('semester'),
        formData.get('subject'),
        fileUrl,
        formData.get('author')
      );
      
      const materials = getStudyMaterials();
      materials.push(material);
      saveStudyMaterials(materials);
    }
    
    // Reset form and update UI
    form.reset();
    delete form.dataset.editId;
    initialSubmitBtn.textContent = 'Upload Material';
    updateSubjectOptions(); // Update subject options in search
    renderMaterialList(document.body.classList.contains('is-admin'));
    
    hideConfirmationDialog();
  });
}