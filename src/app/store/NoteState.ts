import { state } from "@angular/animations";
import { INote, INotes} from "../core/models/common.model";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { NoteService } from "../core/services/note.service";
import { tap } from "rxjs";

export class GetAllNote{
    static readonly type = '[Note] Get All';

}
export class GetPinnedNotes{
    static readonly type = '[Note] Get Pinned'
}
export class GetNote{
    static readonly type = '[Note] Display Note'
    
    constructor(public id:string,
        ){}
}
export class GetDeletedNotes{
    static readonly type = '[Note] Get Deleted'
}
export class AddNote{
    static readonly type = '[Note] Add Note'
    constructor(public data:INote,
        ){}
}
export class DeleteNote{
    static readonly type = '[Note] Delete Note'
    constructor(public id:string){}
}

export interface NoteStateModel{
    notes:INotes[] | undefined;
    pins: INotes[] | undefined;
    note:INotes | null;
    deleted:INotes[] | undefined
    delete:INotes | null
}

@State<NoteStateModel>({
    name: 'Note',
    defaults:{
        notes:[],
        pins:[],
        note: null,
        deleted:[],
        delete:null
    }
    
})
@Injectable()
export class NoteState{
    
    constructor(private noteService: NoteService){}
    @Action(GetAllNote)
    getAllNote(ctx: StateContext<NoteStateModel>){
        return this.noteService.getAllNotes().pipe(
            tap((response)=>{
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    notes: response.data,
                })
            })
        )
    }
    @Action(GetDeletedNotes)
    getDeletedNote(ctx: StateContext<NoteStateModel>){
        return this.noteService.getDeletedNotes().pipe(
            tap((response)=>{
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    deleted: response.data,
                })
            })
        )
    }
   
    @Action(DeleteNote)
    deleteNote(ctx: StateContext<NoteStateModel>,{id}:DeleteNote){
        return this.noteService.deleteNote(id).pipe(
            tap((response)=>{
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    delete: response.data
                })
            })
        )
    }
    @Action(GetPinnedNotes)
    getPinnedNote(ctx: StateContext<NoteStateModel>){
        return this.noteService.getPinnedNotes().pipe(
            tap((response)=>{
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    pins: response.data
                })
            })
        )
    }
    @Action(GetNote)
    getNote(ctx: StateContext<NoteStateModel>,{id}:GetNote){
        const state = ctx.getState();
                const Allnotes = state.notes
                const index = Allnotes.findIndex(userNote=>userNote._id===id)
                
                ctx.setState({
                    ...state,
                    note: Allnotes[index]
                })
    }
    @Action(AddNote)
    addNote(ctx: StateContext<NoteStateModel>,{data}:AddNote){
        
    }
    
    
    
    @Selector([NoteState])
    static selectNotes(state: NoteStateModel): INotes[] | undefined{
        return state.notes
    }
    @Selector([NoteState])
    static deletedNotes(state: NoteStateModel): INotes[] | undefined{
        return state.deleted
    }
    @Selector([NoteState])
    static displayNote(state: NoteStateModel): INotes | undefined{
        return state.note
    }
    @Selector([NoteState])
    static deleteselectedNote(state: NoteStateModel): INotes | undefined{
        return state.delete
    }
    @Selector([NoteState])
    static pinnedNotes(state: NoteStateModel): INotes[] | undefined{
        return state.pins
        
        
        
    }
    
}