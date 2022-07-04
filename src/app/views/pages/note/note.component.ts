import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/app/services/@types/note';
import { EditNoteService } from 'src/app/services/edit.note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input()
  noteProp = {} as Note;

  @Input()
  titleProp:any

  @Output()
  notify = new EventEmitter();

  constructor(private editNoteService: EditNoteService) {}

  ngOnInit(): void {
  }

  removeNote(){
    if (confirm("Deseja realmente apagar?"))
      this.notify.emit();
  }

  editaNota(){
    console.log("Editando a nota: " + this.noteProp.id);
    console.log("Texto da nota: " + this.noteProp.text);
    this.editNoteService.notifyNewNoteEdited(this.noteProp);
  }
  




}
