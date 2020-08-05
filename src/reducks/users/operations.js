// 複雑な処理を記述（非同期処理の制御）

import { signInAction } from "./actions";
import { push } from 'connected-react-router';


export const signIn = (email, password) => {
    // dispatch : Actionsを呼び出す
    // getState: 現在のstoreのstateを呼び出す
    return async (dispatch, getState) => {
        const state = getState()
        const isSignedIn = state.users.isSignedIn

        if (!isSignedIn) {
            const url = "https://api.github.com/users/yuta252"
            const response = await fetch(url).then(res => res.json()).catch( () => null )
            const username = response.login
            // const userData = await emailSignIn(email, password)
            dispatch(signInAction({
                isSignedIn: true,
                uid: "00001",
                username: username
            }))
            dispatch(push('/'))
        }
    }
}
