import { v4 as uuidv4 } from 'uuid';

export class StudyMaterial {
  constructor(title, description, faculty, year, semester, subject, fileUrl, author) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.faculty = faculty;
    this.year = year;
    this.semester = semester;
    this.subject = subject;
    this.fileUrl = fileUrl;
    this.author = author;
    this.uploadDate = new Date().toISOString();
    this.downloads = 0;
  }
}