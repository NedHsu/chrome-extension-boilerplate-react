import { createSlice } from '@reduxjs/toolkit';
import { updateObject } from '../utils/utility';
import { createAsyncThunk } from '@reduxjs/toolkit';
import keys from '../store/key';

const storage = chrome.storage.sync;
const runtime = chrome.runtime;

export const recordWordAsync = createAsyncThunk('popup/recordWordAsync',
    async (text, thunkAPI) => {
        console.log(text);
        thunkAPI.dispatch(actions.setSelection(text));
        const data = await storage.get(keys.recentWords);
        const recentWords = [text, ...(data && data[keys.recentWords]?.length > 0 && !data[keys.recentWords][text]
            ? data[keys.recentWords].slice(-4) : [])]
        await storage.set({
            [keys.recentWords]: recentWords
        });
        thunkAPI.dispatch(actions.recordWord(recentWords));
    }
)

export const reloadRecentWords = createAsyncThunk('popup/reloadRecentWords',
    async (_, thunkAPI) => {
        const data = await storage.get(keys.recentWords);
        const recentWords = data[keys.recentWords] ?? [];
        thunkAPI.dispatch(actions.recordWord(recentWords));
    });

export const sendMessageAsync = createAsyncThunk('popup/sendMessage',
    async (message) => {
        runtime.sendMessage(message, (response) => { console.log(response); });
    });

const popupSlice = createSlice({
    name: 'popup',
    initialState: {
        recentWords: [],
        selection: '',
    },
    reducers: {
        recordWord(state, action) {
            console.log(state, action)
            return updateObject(state, {
                recentWords: action.payload
            });
        },
        setSelection(state, action) {
            return updateObject(state, {
                selection: action.payload
            });
        },
    },
    extraReducers: {
        [recordWordAsync.pending]: (state, action) => {

        },
        [recordWordAsync.fulfilled]: (state, action) => {

        },
    }
});

export const { actions, reducer } = popupSlice;
export default reducer;
