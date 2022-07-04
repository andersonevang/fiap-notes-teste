import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';
import { Subscription } from 'rxjs';
import { EditNoteService } from 'src/app/services/edit.note.service';
import { Note } from 'src/app/services/@types/note';

@Component({
  selector: 'app-form-note',
  templateUrl: './form-note.component.html',
  styleUrls: ['./form-note.component.css']
})
export class FormNoteComponent implements OnInit {

  title = "FIAP Notes"
  logoImage = "/assets/logo.png";

  checkoutForm: FormGroup; 
  isEditing: boolean;
  id: number;
  noteText =  "";

  noteForm = {} as Note;
  
  
  subscription: Subscription;
  constructor(private formBuilder: FormBuilder, private noteService: NoteService, private editNoteService: EditNoteService) {
    this.isEditing = false;
    this.id = 0;
    // this.noteText = '';
    console.log("isEditing inicial: " + this.isEditing);
    this.checkoutForm = this.formBuilder.group({
      textNote: ['', [Validators.required, Validators.minLength(5)]],
    });
    this.subscription = this.editNoteService.editNoteProvider.subscribe({
      next: (note: Note) => {
        this.isEditing = true;
        this.noteText = note.text;
        console.log("isEditing do Construtor: " + this.isEditing);
        this.noteForm = note;
        this.id = note.id;
      },
      error: () => {}
    });
  }

  ngOnInit(): void {
  }

  sendNote(){
    console.log("isEditing antes do checkout: " + this.isEditing);
    if(this.checkoutForm.valid){
      console.log("isEditing do Send: " + this.isEditing);
      if (!this.isEditing){
        console.log("Estou enviado o Send");
        this.noteService.postNotes(this.checkoutForm.value.textNote).subscribe(
          (note) => {
            this.checkoutForm.reset();
            this.noteService.notifyNewNoteAdded(note);
          }
        )
      } 
      if (this.isEditing){
        console.log("Estou enviado o PUT");
        // this.editNoteService.putNote(this.id, this.checkoutForm.value.textNote);
        this.noteForm.text = this.checkoutForm.value.textNote; 
        console.log("Thi.Noteform.ID: " + this.noteForm.id);
        console.log("Thi.Noteform.TEXT: " + this.noteForm.text);
        this.editNoteService.putNote(this.noteForm).subscribe(
          (note) => {
            this.checkoutForm.reset();
            this.isEditing = false;   
            this.editNoteService.notifyNewNoteEdited(note); 
          }
        )

        // this.notesUpdated = this.editNoteService.getNotes(this.id);
        // this.editNoteService.notifyNewNoteEdited(this.editNoteService.getNotes(this.id));
        // this.notesUpdated = this.noteService.getNotes();
        // this.noteService.getNotes().subscribe(
        //   (note) => {
        //     this.noteService.notifyNewNoteAdded(note);
        //   }
        // )

        // this.editNoteService.editNoteProvider.subscribe(
        //   (noteEdit) => {
        //     console.log("Indo para o NotifyEdit: ");
        //     this.editNoteService.notifyNewNoteEdited(noteEdit);
        //   }
        // )
      } 
    }
  }

  get textNote(){
    return this.checkoutForm.get('textNote');
  }

}
