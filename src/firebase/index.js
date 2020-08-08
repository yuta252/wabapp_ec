import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/functions'
import { firebaseConfig } from './config';

// firebaseConfigの初期化
firebase.initializeApp(firebaseConfig);

// firebaseの便利な関数を定数化
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const functions = firebase.functions();
// サーバーのタイムスタンプ（データ作成日時）を取得
export const FirebaseTimestamp = firebase.firestore.Timestamp;