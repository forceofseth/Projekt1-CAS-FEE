export class NoteStorage {
  constructor() {
    const notes = JSON.parse(localStorage.getItem("notes"));
    this.notes = notes;
    this.filterdNotes;
  }

  getNotes() {
    return this.notes;
  }

  getNotesOrderByFinishDate() {
    this.filteredNotes = this.notes;
    return this.filteredNotes.sort(
      (a, b) => moment(a.dueDate) - moment(b.dueDate)
    );
  }

  getNotesOrderByImportance() {
    this.filteredNotes = this.notes;
    return this.filteredNotes.sort(
      (a, b) => Number(b.importanceData) - Number(a.importanceData)
    );
  }

  getNotesFilterFinished() {
    this.filteredNotes = this.notes;
    return this.filteredNotes.filter(note => note.finished === false);
  }

  getNoteById(id) {
    return this.notes.find(note => note.id === id);
  }

  addNote(note) {
    this.notes.push(note);
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }

  updateNote(note) {
    const index = this.notes.findIndex(e => e.id === note.id);
    if (index === -1) {
      //do nothing or throw error
    } else {
      this.notes[index] = note;
      localStorage.setItem("notes", JSON.stringify(this.notes));
    }
  }
}
