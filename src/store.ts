import {
	combineReducers,
	configureStore,
	getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
	reducer as editorReducer,
	EditorState,
} from './components/editor/editorSlice';
import {
	reducer as fileLoaderReducer,
	FileLoaderState,
} from './components/FileLoader/fileLoaderSlice';
import {
	reducer as tilesReducer,
	TilesState,
} from './components/tiles/tilesSlice';
import {
	reducer as palettesReducer,
	PalettesState,
} from './components/palettes/palettesSlice';
import {
	reducer as profileReducer,
	ProfileState,
} from './components/profile/profileSlice';
import {
	reducer as hexTreeReducer,
	HexTreeState,
} from './components/hex-tree/hexTreeSlice';
import {
	reducer as levelsReducer,
	LevelsState,
} from './components/levels/levelsSlice';
import {
	reducer as romLayoutReducer,
	RomLayoutState,
} from './components/rom-layout/romLayoutSlice';
import {
	reducer as experimentsReducer,
	ExperimentsState,
} from './components/editor/Editor/experiments/experimentsSlice';

type AppState = {
	editor: EditorState;
	fileLoader: FileLoaderState;
	tiles: TilesState;
	palettes: PalettesState;
	profile: ProfileState;
	hexTree: HexTreeState;
	levels: LevelsState;
	romLayout: RomLayoutState;
	experiments: ExperimentsState;
};

const rootReducer = combineReducers({
	editor: editorReducer,
	fileLoader: fileLoaderReducer,
	tiles: tilesReducer,
	palettes: palettesReducer,
	profile: profileReducer,
	hexTree: hexTreeReducer,
	levels: levelsReducer,
	romLayout: romLayoutReducer,
	experiments: experimentsReducer,
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
