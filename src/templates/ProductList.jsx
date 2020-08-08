import React, { useEffect } from 'react';
import { ProductCard } from '../components/Products';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../reducks/products/operations';
import { getProducts } from '../reducks/products/selectors';


const ProductList = () => {
    // 商品情報をデータベースから取得しstoreにいれる
    const dispatch = useDispatch()
    // 商品情報をstoreから取得
    const selector = useSelector( (state) => state );
    const products = getProducts(selector);

    // URLのクエリ取得
    const query = selector.router.location.search;
    const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : "";
    const category = /^\?category=/.test(query) ? query.split('?category=')[1] : "";

    useEffect( () => {
        // 取得したクエリで条件をwhereで絞る
        // クエリが変更するたびに実行
        dispatch(fetchProducts(gender, category))
    }, [query]);

    console.log(products);

    return (
        <section className="c-section-wrapin">
            <div>商品一覧</div>
            <div className="p-grid__row">
                {products.length > 0 && (
                    products.map(product => (
                        <ProductCard 
                            key={product.id} id={product.id} name={product.name}
                            images={product.images} price={product.price}
                        />
                    ))
                )}
            </div>
        </section>
    )
}

export default ProductList