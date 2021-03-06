export class NoteOverviewController {
  constructor(noteStorage) {
    this.noteStorage = noteStorage;

    this.noteTemplateCompiled = Handlebars.compile(
      document.getElementById("note_template").innerHTML
    );

    this.newNoteButton = document.getElementById("new_note");
    this.finishDateButton = document.getElementById("finish_date");
    this.importanceButton = document.getElementById("importance");
    this.hideFinishedButton = document.getElementById("hide_finished");
    this.clearFilterButton = document.getElementById("clear_filter");
    this.notesWrapper = document.getElementById("notes_wrapper");
    this.styleSelector = document.getElementById("style_selector");
  }

  renderNotes(notes) {
    this.notesWrapper.innerHTML = this.noteTemplateCompiled({
      notes: notes
    });
  }
   initEventHandlers() {
    this.newNoteButton.addEventListener(
      "click",
      () => (window.location.href = "../html/note_detail.html")
    );

    this.finishDateButton.addEventListener("click", async() => {
      const notes =  await this.noteStorage.getNotesOrderByFinishDate();
      this.renderNotes(notes);
    });

    this.importanceButton.addEventListener("click", () => {
      const notes = this.noteStorage.getNotesOrderByImportance();
      this.renderNotes(notes);
    });

    this.hideFinishedButton.addEventListener("click", () => {
      const notes = this.noteStorage.getNotesFilterFinished();
      this.renderNotes(notes);
    });

    this.clearFilterButton.addEventListener("click", async() => {
      const notes = await this.noteStorage.getAllNotes();
      this.renderNotes(notes);
    });

    this.notesWrapper.addEventListener("click", event => {
      if (event.target.className === "edit") {
        const noteId = event.target.parentElement.dataset.noteId;
        if (noteId) {
          window.location.href = "note_detail.html?id=" + noteId;
        }
      }
    });

    this.notesWrapper.addEventListener("change", async event => {
      const noteId = event.target.closest(".note").dataset.noteId;
      if (noteId) {
        const note =  await this.noteStorage.getNoteById(noteId);
        note.finished = event.target.checked ? true : false;
        await this.noteStorage.updateNote(note);
      }
    });

    this.styleSelector.addEventListener("change", event =>
      this.changeStyle(event.target.value)
    );
  }

  changeStyle(style) {
    document
      .getElementById("style_css")
      .setAttribute("href", "../stylesheets/" + style + ".css");
  }

  async noteAction() {
    this.changeStyle(document.getElementById("style_selector").value);
    this.renderNotes(await this.noteStorage.getAllNotes());
    this.initEventHandlers();
  }
}
