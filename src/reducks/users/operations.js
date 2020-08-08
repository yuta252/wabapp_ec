// 複雑な処理を記述（非同期処理の制御）
import { fetchOrdersHistoryAction, fetchProductsInCartAction, signInAction, signOutAction } from "./actions";
import { push } from 'connected-react-router';
import { auth, FirebaseTimestamp, db } from '../../firebase/index';

// 商品をカートに追加する
export const addProductToCart = (addedProduct) => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        const cartRef = db.collection('users').doc(uid).collection('cart').doc();
        // カートにIdを持たせる
        addedProduct['cartId'] = cartRef.id;
        await cartRef.set(addedProduct)
        dispatch(push('/'))
    }
}

export const fetchOrdersHistory = () => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid;
        const list = [];

        db.collection('users').doc(uid)
            .collection('orders')
            .orderBy('updated_at', 'desc')
            .get()
            .then( (snapshots) => {
                snapshots.forEach( snapshot => {
                    const data = snapshot.data()
                    list.push(data)
                })
                dispatch(fetchOrdersHistoryAction(list))
            })
    }
}

export const fetchProductsInCart = (products) => {
    return async (dispatch) => {
        dispatch(fetchProductsInCartAction(products))
    }
}

export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged( user => {
            if (user) {
                console.log("onAuthStateChanged: user existed.")
                // 認証情報が存在する場合
                const uid = user.uid
                db.collection('users').doc(uid).get()
                    .then(snapshot => {
                        const data = snapshot.data()
                        dispatch(signInAction({
                            isSignedIn: true,
                            role: data.role,
                            uid: uid,
                            username: data.username
                        }))
                    })
            }else{
                // 認証情報がない場合ログインページへ
                dispatch(push('/signin'))
            }
        })
    }
}

export const resetPassword = (email) => {
    return async (dispatch) => {
        if (email == "") {
            alert("必須項目が未入力です")
            return false
        } else {
            auth.sendPasswordResetEmail(email)
                .then( () => {
                    alert("入力されたアドレスにパスワードリセット用のメールをお送りしました。")
                    dispatch(push('/signin'))
                }).catch( () => {
                    alert("パスワードリセットに失敗しました。")
                })
        }
    }
}


export const signIn = (email, password) => {
    // dispatch : Actionsを呼び出す
    // getState: 現在のstoreのstateを呼び出す
    return async (dispatch) => {
        // Validation
        if (email === "" || password === ""){
            alert("必須項目が未入力です")
            return false
        }

        // firebaseの認証処理
        auth.signInWithEmailAndPassword(email, password)
            .then( result => {
                const user = result.user

                if (user) {
                    const uid = user.uid

                    db.collection('users').doc(uid).get()
                        .then(snapshot => {
                            const data = snapshot.data()
                            dispatch(signInAction({
                                isSignedIn: true,
                                role: data.role,
                                uid: uid,
                                username: data.username
                            }))
                            dispatch(push('/'))
                        })
                }
            })
    }
}

export const signUp = (username, email, password, confirmPassword) => {
    return async (dispatch) => {
        // Validation
        // 全て入力されているか確認するバリデーション
        if (username === "" || email === "" || password === "" | confirmPassword === ""){
            alert("必須項目が未入力です")
            return false
        }
        // メールアドレスと確認用のアドレスが同じか確認する
        if (password !== confirmPassword){
            alert("パスワードが一致しません。もう1度お試しください。")
            return false
        }

        // firebaseのユーザーを作成するメソッド
        return auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                // Firebase Auth登録成功時の処理
                const user = result.user

                if(user) {
                    const uid = user.uid
                    const timestamp = FirebaseTimestamp.now()

                    const userInitialData = {
                        created_at: timestamp,
                        email: email,
                        role: "customer",
                        uid: uid,
                        updated_at: timestamp,
                        username: username
                    }
                    // データベースへの登録
                    db.collection('users').doc(uid).set(userInitialData)
                        .then( () => {
                            // 登録成功時の処理
                            dispatch(push('/'))
                        })
                }
            })
    }
}

export const signOut = () => {
    return async (dispatch) => {
        auth.signOut()
            .then( () => {
                dispatch(signOutAction())
                dispatch(push('/signin'))
            })
    }
}
