export const saveStudyMaterials = (materials) => {
  localStorage.setItem('studyMaterials', JSON.stringify(materials));
};

export const getStudyMaterials = () => {
  const materials = localStorage.getItem('studyMaterials');
  return materials ? JSON.parse(materials) : [];
};