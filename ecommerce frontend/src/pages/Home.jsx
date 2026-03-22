
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import banner from "../assets/banner.webp";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.png";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch first 4 items from FakeStore, then map to your product model
  useEffect(() => {
    fetch("https://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.slice(0, 4).map((item) => ({
          id: item.id,
          name: item.title,
          oldPrice: item.price * 1.25,
          price: item.price,
          discount: 20,
          rating: Math.round(item.rating?.rate ?? 0),
          image: item.image,
        }));
        setProducts(formatted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Home fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h3 className="text-center my-4">Loading featured products…</h3>;
  }

  return (
    <div className="container">
      {/* Banner */}
      <img src={banner} className="img-fluid w-100 mb-4" alt="Store Banner" />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Featured Products</h2>
        {/* Link to full ProductList page */}
        <a href="/products" className="btn btn-outline-primary">
          View More Products
        </a>
      </div>

      <div className="row">
        {products.map((p) => (
          <div key={p.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {/* Extra banners (if you use them) */}
      <div className="row g-3 mt-2">
        <div className="col-md-6">
          <img src={banner2} className="img-fluid w-100" alt="Promo 1" />
        </div>
        <div className="col-md-6">
          <img src={banner3} className="img-fluid w-100" alt="Promo 2" />
        </div>
      </div>
    </div>
  );
};

export default Home;
