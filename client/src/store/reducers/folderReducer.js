import actionTypes from "../actions/actionTypes";
import * as helpers from "../../helpers";

const initialState = {
   list: null,
   current: null,
   namesList: []
};

const reducer = (prevState = initialState, action) => {
   switch(action.type){
      case actionTypes.GET_FOLDERS: return {...prevState, list: action.folders, namesList: helpers.extractProperty("name", action.folders)};
      case actionTypes.CLEAR_FOLDERS: return {...prevState, list: null};
      case actionTypes.OPEN_FOLDER: return {...prevState, current: action.folder};
      case actionTypes.CLOSE_FOLDER: return {...prevState, current: null};
      case actionTypes.CREATE_FOLDER: return {
         ...prevState, 
         list: prevState.list.concat(action.newFolder),
         namesList: prevState.namesList.concat(action.newFolder.name)
      };
      case actionTypes.UPDATE_FOLDER: return {
         ...prevState,
         list: helpers.updateItem(action.editedFolder, prevState.list),
         namesList: prevState.namesList.map(name => (name === helpers.findById(action.editedFolder._id, prevState.list).name) ? action.editedFolder.name : name)
      };
      case actionTypes.DELETE_FOLDER: return {
         ...prevState,
         list: helpers.removeById(action.folderId, prevState.list),
         namesList: prevState.namesList.filter(name => (name !== helpers.findById(action.folderId, prevState.list).name))
      };
      case actionTypes.ADD_NEW_FILE: return {
         ...prevState,
         list: prevState.list.map(folder => folder._id === prevState.current._id ? {...folder, files: folder.files.concat(action.newFile)} : folder),
         current: {
            ...prevState.current,
            files: prevState.current.files.concat(action.newFile)
         }
      };
      case actionTypes.UPDATE_FILE: return {
         ...prevState,
         current: {
            ...prevState.current,
            files: helpers.updateItem(action.editedFile, prevState.current.files)
         }
      };
      case actionTypes.REMOVE_FILE: return {
         ...prevState,
         list: prevState.list.map(folder => folder._id === prevState.current._id ? {...folder, files: helpers.removeById(action.fileId, folder.files)} : folder),
         current: {
            ...prevState.current,
            files: helpers.removeById(action.fileId, prevState.current.files)
         }
      };
      default: return prevState;
   }
};

export default reducer;