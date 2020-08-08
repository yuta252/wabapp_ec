import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsSignedIn } from './reducks/users/selectors';
import { listenAuthState } from './reducks/users/operations';

const Auth = ({children}) => {
    /**
     * ユーザーがサインインしているか判定して
     * サインインしていない場合：listenAuthStateを呼び出す
     */
    const dispatch = useDispatch();
    const selector = useSelector( (state) => state );
    const isSignedIn = getIsSignedIn(selector);

     // ComponentDidMout
     // Render後に実行する関数
    useEffect( () => {
        if (!isSignedIn) {
            console.log("listenAuthState is called")
            // サインインしていない場合にサインイン情報をリッスンする
            dispatch(listenAuthState())
        }

    }, [])

    if (!isSignedIn) {
        return <></>
    }else{
        return children
    }
}

export default Auth