import {
	combineReducers,
	configureStore,
	getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
	reducer as editorReducer,
	EditorState,
} from './components/make/editorSlice';
import {
	reducer as fileLoaderReducer,
	FileLoaderState,
} from './components/FileLoader/fileLoaderSlice';

type AppState = {
	editor: EditorState;
	fileLoader: FileLoaderState;
};

const rootReducer = combineReducers({
	editor: editorReducer,
	fileLoader: fileLoaderReducer,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware({
		thunk: true,

		// these are debug only that do some sanity checks to make
		// sure the state is not being mutated and is serializable. but editor
		// state can get so large that they become extremely expensive to the point
		// the editor pretty much totally stops responding
		serializableCheck: false,
		immutableCheck: false,
	}),
});

const dispatch = store.dispatch;

export { store, dispatch };
export type { AppState };
