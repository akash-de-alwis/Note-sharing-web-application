export function createMaterialCard(material, isAdmin = false) {
  const facultyNames = {
    'IT': 'Information Technology',
    'ENG': 'Engineering',
    'BM': 'Business Management',
    'HS': 'Humanity and Science',
    'ARCH': 'Architecture',
    'HC': 'Hospitality and Culinary'
  };

  return `
    <div class="material-card" data-id="${material.id}">
      <div class="card-header">
        <h3>${material.title}</h3>
        ${isAdmin ? `
          <div class="admin-actions">
            <button class="icon-btn edit-btn" onclick="window.handleEdit('${material.id}')">
              <i class="fas fa-edit"></i>
            </button>
            <button class="icon-btn delete-btn" onclick="window.handleDelete('${material.id}')">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        ` : ''}
      </div>
      <p class="description">${material.description}</p>
      <div class="material-meta">
        <div class="meta-row">
          <span><i class="fas fa-university"></i> ${facultyNames[material.faculty]}</span>
          <span><i class="fas fa-calendar"></i> Year ${material.year}, Semester ${material.semester}</span>
        </div>
        <div class="meta-row">
          <span><i class="fas fa-book"></i> ${material.subject}</span>
          <span><i class="fas fa-user"></i> ${material.author}</span>
        </div>
        <div class="meta-row">
          <span><i class="fas fa-clock"></i> ${new Date(material.uploadDate).toLocaleDateString()}</span>
          <span><i class="fas fa-download"></i> ${material.downloads} downloads</span>
        </div>
      </div>
      <button class="download-btn" onclick="window.handleDownload('${material.id}')">
        <i class="fas fa-download"></i> Download
      </button>
    </div>
  `;
}