import { getStudyMaterials, saveStudyMaterials } from '../services/storage.js';
import { renderMaterialList } from '../components/MaterialList.js';
import { downloadFile } from './file.js';

export function handleDownload(materialId) {
  const materials = getStudyMaterials();
  const material = materials.find(m => m.id === materialId);
  
  if (material) {
    material.downloads += 1;
    saveStudyMaterials(materials);
    
    downloadFile(material.fileUrl, material.title);
    renderMaterialList();
  }
}