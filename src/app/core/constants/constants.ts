export const constants= {
    CURRENT_TOKEN : 'CURRENT_TOKEN',
}


const APIURL = 'http://localhost:5000';

export const apiEndpoint = {
    AuthEndpoint:{
        login: `${APIURL}/auth/login`,
        logout: `${APIURL}/auth/logout`,
        me: `${APIURL}/auth/me`,
        googlelogin: `${APIURL}/auth/googlelogin`
        
    },
    NoteEndpoint:`${APIURL}/notes`,
    UserEndpoint:`${APIURL}/users`,
    pinnedNoteEndpoint:`${APIURL}/pinnednotes`,
    completedTaskEndpoint:`${APIURL}/completedtasks`,
    TaskEndpoint:`${APIURL}/tasks`,
    deletedNotesEndpoint:`${APIURL}/deletednotes`
    

}