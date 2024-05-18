import { useEffect, useState } from "react"

export default function LoadMore() {
  const [products, setProducts] = useState<{ products: any[], total: number }>({
    products: [],
    total: 0
  })
  const [loading, setLoading] = useState(false)
  const [currPage, setCurrPage] = useState(0)

  const fetchProducts = async () => {
    let nextData = 10 * currPage
    if (nextData > products.total) return;

    try {
      setLoading(true)
      const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${nextData}`);
      const data = await response.json();

      console.log(data);
      setProducts(prev => ({ ...prev, products: [...prev.products, ...data.products], total: data.total }))

    }
    catch (err) {
      console.log(err)
    }
    finally {

      setLoading(false)
    }

  }



  useEffect(() => {
    fetchProducts();
  }, [currPage])




  return (
    <div style={{ maxWidth: "83rem", margin: "0 auto", overflow: "hidden" }}>
      <div style={{ display: 'grid', gridTemplateColumns: "1fr 1fr 1fr", width: "100%", gap: "5px", }}>
        {products.products.length !== 0 && products.products.map((item: any, i) => (
          <div key={item.id}>
            <img style={{ width: "250px", height: "250px", objectFit: "contain" }} src={item.thumbnail} alt={item.title} />
            <p>{item.title}</p>

            <p>{item.price}</p>

          </div>
        ))}
      </div>
      {products.total > products.products.length && products.products.length !== 0 && <div style={{ textAlign: "center" }}>
        <button disabled={loading} onClick={() => {


          setCurrPage(p => p + 1)


        }}>{loading ? "Loading..." : "Load More"}</button>

      </div>}
    </div>
  )
}