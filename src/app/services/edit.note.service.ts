import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from './@types/note';

@Injectable({
  providedIn: 'root'
})
export class EditNoteService {

private apiUrl: string;

private editNoteSource = new Subject<Note>();
editNoteProvider = this.editNoteSource.asObservable();

constructor(private http: HttpClient) { 
  this.apiUrl = "https://fiap-notes-api.herokuapp.com";
}
  
  notifyNewNoteEdited(note: Note){
    this.editNoteSource.next(note);
  }

  putNote(note: Note){
    var nota = { id : note.id, text : note.text};
    console.log(`${this.apiUrl}/notes/${note.id}`, {text: note.text});
    return this.http.put<Note>(`${this.apiUrl}/notes/${note.id}`, nota)
  }

  getNotes(noteId: number){
    return this.http.get<Note>(`${this.apiUrl}/notes/${noteId}`);
  }

}
