import { createAction, handleActions } from 'redux-actions';
import { call, put } from 'redux-saga/effects';
import {
    getTags,
    addTag as addTagAPI,
    deleteTag as deleteTagAPI,
    addTagToTask as addTagToTaskAPI,
    removeTagFromTask as removeTagFromTaskAPI,
} from '../../../api/tag';
import { safeTakeEvery } from '../../../helpers/saga';
import { fetchAllLists } from '../duck';

export const FETCH_TAGS = 'tags/FETCH_TAGS';
export const FETCH_TAGS_SUCCESS = 'tags/FETCH_TAGS_SUCCESS';
export const ADD_TAG = 'tags/ADD_TAG';
export const ADD_TAG_TO_TASK = 'tags/ADD_TAG_TO_TASK';
export const DELETE_TAG = 'tags/DELETE_TAG';
export const VISIBLE_POPAP_ADD_TAG = 'tags/VISIBLE_POPAP_ADD_TAG';
export const REMOVE_TAG_FROM_TASK = 'tags/REMOVE_TAG_FROM_TASK';
export const GET_SELECTED_TAGS = 'tags/GET_SELECTED_TAGS';

const initialState = {
    tags: [],
    selectedTags: [],
    stringIdSelectedTag: '&tagId=',
    visible: false,
};

export const actions = {
    fetchTags: createAction(FETCH_TAGS),
    fetchTagsSuccess: createAction(FETCH_TAGS_SUCCESS),
    addTag: createAction(ADD_TAG),
    addTagToTask: createAction(ADD_TAG_TO_TASK),
    deleteTag: createAction(DELETE_TAG),
    visiblePopap: createAction(VISIBLE_POPAP_ADD_TAG),
    removeTagFromTask: createAction(REMOVE_TAG_FROM_TASK),
    getSelectedTags: createAction(GET_SELECTED_TAGS),
};

export const reducer = handleActions({
    [FETCH_TAGS_SUCCESS]: (state, action) => ({ ...state, tags: action.payload }),
    [GET_SELECTED_TAGS]: (state, action) => ({ ...state, selectedTags: action.payload }),
    [VISIBLE_POPAP_ADD_TAG]: state => ({ ...state, visible: !state.visible }),
}, initialState);

export function* fetchAllTags() {
    const tags = (yield call(getTags)).data;
    yield put(actions.fetchTagsSuccess(tags));
    yield call(fetchAllLists);
}

export function* addTag(action) {
    const { payload: { tagName, color } } = action;
    yield call(addTagAPI, { tagName, color });
    yield call(fetchAllTags);
}

export function* deleteTag(action) {
    const { payload: { id } } = action;
    yield call(deleteTagAPI, id);
    yield call(fetchAllTags);
}

export function* addTagToTask(action) {
    const { payload: { idTask, idTag } } = action;
    yield call(addTagToTaskAPI, idTag, idTask);
    yield call(fetchAllTags);
}

export function* removeTagFromTask(action) {
    const { payload: { idTask, idTag } } = action;
    yield call(removeTagFromTaskAPI, idTag, idTask);
    yield call(fetchAllTags);
}

export function* getSelectedTegInString() {
    yield call(fetchAllLists);
}

export function* saga() {
    yield safeTakeEvery(FETCH_TAGS, fetchAllTags);
    yield safeTakeEvery(ADD_TAG, addTag);
    yield safeTakeEvery(ADD_TAG_TO_TASK, addTagToTask);
    yield safeTakeEvery(DELETE_TAG, deleteTag);
    yield safeTakeEvery(REMOVE_TAG_FROM_TASK, removeTagFromTask);
    yield safeTakeEvery(GET_SELECTED_TAGS, getSelectedTegInString);
}
