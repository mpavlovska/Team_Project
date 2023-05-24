import { useEffect, useState } from 'react';

import Loader from 'components/Loader';
import { GithubCorner, GithubStarButton } from 'components/Github';
import Filter from 'components/Filter';
import Products from 'components/Products';
import Cart from 'components/Cart';
import axios from 'axios';

import { useProducts } from 'contexts/products-context';

import * as S from './style';

const baseUrl = "localhost:8181/login"

function App() {
  const [post, setPost] = useState(null);
  const { isFetching, products, fetchProducts } = useProducts();
  
  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setPost(response.data);
    })
  }, [])

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <S.Container>
      {isFetching && <Loader />}
      <GithubCorner />
      <S.TwoColumnGrid>
        <S.Side>
          <Filter />
          <GithubStarButton />
        </S.Side>
        <S.Main>
          <S.MainHeader>
            <p>{products?.length} Производ(и)</p>
          </S.MainHeader>
          <Products products={products} />
        </S.Main>
      </S.TwoColumnGrid>
      <Cart />
    </S.Container>
  );
}

export default App;

