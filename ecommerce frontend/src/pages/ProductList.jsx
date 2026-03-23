import { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';

// If you use a Vite proxy, you can switch to '' and call /api/...
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

// normalize helper used in comparisons
const norm = (s) =>
  String(s ?? '')
    .replace(/_/g, ' ')
    .trim()
    .toLowerCase();

const ProductList = () => {
  // data
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // ui state
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceBounds, setPriceBounds] = useState({ min: 0, max: 0 });
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });

  // NEW: sorting
  const [sortOption, setSortOption] = useState(''); // '', 'price-asc', 'price-desc', 'name-asc', 'rating-desc'

  // fetch products
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => {
          // normalize category (string)
          let category = '';
          if (typeof item?.category === 'string') {
            category = item.category;
          } else if (Array.isArray(item?.categories)) {
            category = item.categories[0] ?? '';
          } else if (typeof item?.categories === 'string') {
            category = item.categories.split(',')[0]?.trim() ?? '';
          }
          category = category.replace(/_/g, ' ').trim();

          // rating: accept number or { rate }
          const rawRating =
            typeof item?.rating === 'number'
              ? item.rating
              : typeof item?.rating?.rate === 'number'
              ? item.rating.rate
              : 0;
          const rating = Math.max(0, Math.min(5, Math.round(Number(rawRating))));

          const priceNum = Number(item.price);
          const oldPriceNum = Number.isFinite(Number(item.oldPrice))
            ? Number(item.oldPrice)
            : (Number.isFinite(priceNum) ? priceNum * 1.25 : 0);

          return {
            id:
              item.id ??
              `${(item.name ?? item.title ?? '').slice(0, 20)}-${Math.random()
                .toString(36)
                .slice(2)}`,
            name: item.title ?? item.name ?? item.productName ?? '',
            oldPrice: oldPriceNum,
            price: Number.isFinite(priceNum) ? priceNum : 0,
            discount: Number.isFinite(Number(item.discount)) ? Number(item.discount) : 0,
            rating,
            image: item.image ?? '',
            category,
          };
        });

        setProducts(formatted);

        // compute price bounds
        const prices = formatted
          .map((p) => Number(p.price))
          .filter((n) => !Number.isNaN(n));
        const min = prices.length ? Math.min(...prices) : 0;
        const max = prices.length ? Math.max(...prices) : 0;
        setPriceBounds({ min, max });
        setPriceRange({ min, max });

        setLoading(false);
      })
      .catch((err) => {
        console.error('API Fetch Error (products):', err);
        setLoading(false);
      });
  }, []);

  // fetch categories (from backend /api/categories)
  useEffect(() => {
    fetch(`${API_BASE}/api/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch((err) => console.error('API Fetch Error (categories):', err));
  }, []);

  // derived list: search + category + price + SORT
  const filteredProducts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    // 1) filters
    let list = products
      // SEARCH
      .filter((p) => {
        if (!q) return true;
        return (p.name ?? '').toString().toLowerCase().includes(q);
      })
      // CATEGORY
      .filter((p) => {
        if (!selectedCategory) return true;
        return norm(p.category) === norm(selectedCategory);
      })
      // PRICE
      .filter((p) => {
        const price = Number(p.price);
        return price >= Number(priceRange.min) && price <= Number(priceRange.max);
      });

    // 2) sort (on a copy)
    const sorted = [...list];

    switch (sortOption) {
      case 'price-asc':
        sorted.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-desc':
        sorted.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case 'name-asc':
        sorted.sort((a, b) => String(a.name).localeCompare(String(b.name)));
        break;
      case 'rating-desc':
        sorted.sort((a, b) => Number(b.rating) - Number(a.rating));
        break;
      default:
        // no sorting
        break;
    }

    return sorted;
  }, [products, searchTerm, selectedCategory, priceRange, sortOption]);

    if (loading) {
      return (
        <div className="container">
          <div className="row">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="col-lg-3 col-md-4 col-sm-6">
            <div className="skeleton-card skeleton"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }


  return (
    <div className="container">
      <div className="row">
        {/* sidebar */}
        <div className="col-lg-2 col-md-3 mb-4">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={(val) => {
              setSelectedCategory(val);
              setPriceRange(priceBounds); // reset price bounds when category changes
            }}
            priceRange={priceRange}
            priceBounds={priceBounds}
            onPriceChange={setPriceRange}
            onClearFilters={() => {
              setSelectedCategory('');
              setPriceRange(priceBounds);
            }}
          />
        </div>

        {/* Products */}
        <div className="col-lg-10 col-md-9">
          <div className="d-flex flex-wrap justify-content-between align-items-center mb-3 gap-2">
            <h2 className="mb-0">All Products</h2>

            {/* Right controls: Search + Sort */}
            <div className="d-flex align-items-center gap-2" style={{ minWidth: 260 }}>
              {/* Search bar (Products page only) */}
              <input
                type="search"
                className="form-control"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Sort by */}
              <div className="d-flex align-items-center gap-1">
                <label className="form-label mb-0 small text-muted">Sort</label>
                <select
                  className="form-select form-select-sm"
                  style={{ minWidth: 180 }}
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="">None</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A → Z</option>
                  <option value="rating-desc">Rating: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Empty state */}
          {filteredProducts.length === 0 && (
            <p className="text-muted">No products found.</p>
          )}

          <div className="row">
            {filteredProducts.map((p, idx) => (
              <div
                key={p.id ?? `${p.name}-${idx}`}
                className="col-lg-3 col-md-4 col-sm-6 mb-4"
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductList;