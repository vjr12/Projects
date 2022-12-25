import { useEffect } from "react";
import { useState } from "react";
import "./styles.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products/?limit=40");
    const json = await response.json();
    if (!!json && json?.products?.length) setProducts(json?.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePageClick = (index) => {
    if (index >= 1 && index <= products.length / 10 && page !== index)
      setPage(index);
  };

  return (
    <div>
      {!!products.length && (
        <div className="products">
          {products
            .slice(page * 10 - 10, page * 10)
            .map(({ id, thumbnail, title }) => {
              return (
                <span className="product" key={id}>
                  <img src={thumbnail} alt={title} />
                  <span>{title}</span>
                </span>
              );
            })}
        </div>
      )}
      {!!products.length && (
        <div className="pagination">
          <span
            className={page <= 1 ? "disabled" : ""}
            onClick={() => handlePageClick(page - 1)}
          >
            &#60;
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                className={i + 1 === page ? "selected" : ""}
                onClick={() => handlePageClick(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page >= products.length / 10 ? "disabled" : ""}
            onClick={() => handlePageClick(page + 1)}
          >
            &#62;
          </span>
        </div>
      )}
    </div>
  );
}

export default App;