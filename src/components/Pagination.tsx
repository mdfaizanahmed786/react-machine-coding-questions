import { useEffect, useState } from "react"

export default function Pagination() {
  const [products, setProducts] = useState({
    total: 0,
    productItems: []
  });

  const [page, setPage] = useState(1)
  const [errorMessage, setErrorMessage] = useState("")

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`)
      if (!response.ok) {
        setErrorMessage("Something went wrong")
        return;
      }
      const data = await response.json();
      if (data) {
        setProducts({ ...products, total: data.total, productItems: data.products })
      }
    }
    catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [page])
  return <div>

    {products.productItems && <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
      {products.productItems.map((prod: any) => (
        <div key={prod.id} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p>{prod.id}</p>
          <img style={{ width: '180px' }} src={prod.thumbnail} />
          <p style={{ textAlign: 'center' }}>{prod.title}</p>
          <strong>{prod.price}</strong>
        </div>

      ))}
    </div>}



    {products.total !== 0 && (
      <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={prevPage} style={{ padding: "10px 20px", display: `${page == 1 ? "none" : "block"}`, borderRadius: "5px", border: "none" }}>
          Previous
        </button>
        {Array.from({ length: Math.min(5, Math.ceil(products.total / 10)) }).map((_item, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            style={{
              background: `${page === index + 1 ? "green" : "gray"}`,
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none"
            }}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={nextPage} style={{ padding: "10px 20px", display: `${page == Math.ceil(products.total / 10) ? "none" : "block"}`, borderRadius: "5px", border: "none" }}>
          Next
        </button>
      </div>
    )}
  </div>
}
