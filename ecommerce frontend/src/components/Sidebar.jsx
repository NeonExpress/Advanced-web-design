/* eslint-disable react/prop-types */
import { useCallback } from 'react';

const clamp = (val, min, max) => {
  const n = Number(val);
  if (Number.isNaN(n)) return min;
  return Math.min(Math.max(n, min), max);
};

const Sidebar = ({
  categories = [],
  selectedCategory = '',
  onCategoryChange = () => {},
  priceRange = { min: 0, max: 0 },
  priceBounds = { min: 0, max: 0 },
  onPriceChange = () => {},
  onClearFilters = () => {}
}) => {
  const handleMinChange = useCallback(
    (e) => {
      const nextMin = clamp(e.target.value, priceBounds.min, priceBounds.max);
      // keep max at least min
      const coercedMax = Math.max(nextMin, Number(priceRange.max));
      onPriceChange({ min: nextMin, max: coercedMax });
    },
    [onPriceChange, priceBounds, priceRange]
  );

  const handleMaxChange = useCallback(
    (e) => {
      const nextMax = clamp(e.target.value, priceBounds.min, priceBounds.max);
      // keep min at most max
      const coercedMin = Math.min(Number(priceRange.min), nextMax);
      onPriceChange({ min: coercedMin, max: nextMax });
    },
    [onPriceChange, priceBounds, priceRange]
  );

  return (
    <aside>
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">Filters</h5>

          {/* Category */}
          <div className="mb-3">
            <label className="form-label">Category</label>
            
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            >
            <option value="">All Categories</option>
            {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
            ))}
          </select>

          </div>

          {/* Price */}
          <div className="mb-3">
            <label className="form-label">Price range</label>
            <div className="d-flex align-items-center gap-2">
              <input
                type="number"
                className="form-control"
                placeholder="Min"
                min={priceBounds.min}
                max={priceBounds.max}
                value={priceRange.min}
                onChange={handleMinChange}
              />
              <span className="text-muted">—</span>
              <input
                type="number"
                className="form-control"
                placeholder="Max"
                min={priceBounds.min}
                max={priceBounds.max}
                value={priceRange.max}
                onChange={handleMaxChange}
              />
            </div>
            <div className="form-text">
              Bounds: {priceBounds.min} – {priceBounds.max}
            </div>
          </div>

          <div className="d-grid">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              onClick={onClearFilters}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
``