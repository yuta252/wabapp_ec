// Storeの初期状態の定義
const initialState = {
    products: {
        list: []
    },
    users: {
        cart: [],
        isSignedIn: false,
        orders: [],
        role: "",
        uid: "",
        username: ""
    }
};

export default initialState