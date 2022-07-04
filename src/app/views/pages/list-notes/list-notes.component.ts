import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/services/@types/note';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css']
})
export class ListNotesComponent implements OnInit {

  notes = [] as Note[];

  subscription: Subscription; 
  //injetando a dependência do service 
  constructor(private noteService: NoteService) {
    console.log("Passando no construtor da lista");
    this.subscription = this.noteService.newNoteProvider.subscribe({
      next: (note: Note) => {
        // this.getApiNotes();
        this.notes.push(note);
      },
      error: () => {}
    });
    this.getApiNotes();
   }

  //método do ciclo de vida do componente
  ngOnInit(): void {
//    this.notes = this.noteService.getNotes();
    this.getApiNotes();
  }

  getApiNotes(){
    this.noteService.getNotes().subscribe({
      next: (apiNotes) => this.notes = apiNotes
    });
  }

  removeNote(noteId: number){
    this.noteService.removeNote(noteId).subscribe(
      () => this.getApiNotes()
    ); 
  }

}
