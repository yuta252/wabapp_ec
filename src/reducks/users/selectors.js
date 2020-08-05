import {createSelector} from 'reselect';

const usersSelector = (state) => state.users;

// 特定のstateをStoreから取り出す関数にする
export const getUserId = createSelector(
    [usersSelector], 
    state => state.uid
)

export const getUserName = createSelector(
    [usersSelector],
    state => state.username
)