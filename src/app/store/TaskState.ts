import { state } from "@angular/animations";
import { INotes, ITask,  } from "../core/models/common.model";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { NoteService } from "../core/services/note.service";
import { tap } from "rxjs";
import { TaskService } from "../core/services/task.service";

export class GetAllTask{
    static readonly type = '[Task] Get All';

}
export class GetCompletedTasks{
    static readonly type = '[Task] Get Completed'
}
export interface TaskStateModel{
    tasks:ITask[] | undefined;
    completed: ITask[] | undefined;
}

@State<TaskStateModel>({
    name: 'Task',
    defaults:{
        tasks:[],
        completed:[],
    }
    
})
@Injectable()
export class TaskState{
    constructor(private taskService: TaskService){}
    @Action(GetAllTask)
    getAlltask(ctx: StateContext<TaskStateModel>){
        return this.taskService.getAllTask().pipe(
            tap((response)=>{
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    tasks: response.data,
                    
                });
                
                
            })
            
            
        )
        
    }
    @Action(GetCompletedTasks)
    getCompletedtasks(ctx: StateContext<TaskStateModel>){
        return this.taskService.getCompletedTask().pipe(
            tap((response)=>{
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    completed: response.data
                })
            })
        )
    }
    
    
    
    @Selector([TaskState])
    static selectTask(state: TaskStateModel): ITask[] | undefined{
        return state.tasks
    }
    @Selector([TaskState])
    static completedTask(state: TaskStateModel): ITask[] | undefined{
        return state.completed
        
        
        
    }
    
}