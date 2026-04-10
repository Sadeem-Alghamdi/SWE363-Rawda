import { useState } from "react";
import { Plus, Edit, Trash2, Search, Filter, Upload, X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  image?: string;
  description?: string;
}

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Monstera Deliciosa",
      category: "Indoor Plants",
      price: 45.99,
      stock: 12,
      status: "In Stock",
      description: "Beautiful tropical plant",
    },
    {
      id: "2",
      name: "Snake Plant",
      category: "Indoor Plants",
      price: 29.99,
      stock: 5,
      status: "Low Stock",
    },
    {
      id: "3",
      name: "Lavender",
      category: "Outdoor Plants",
      price: 15.99,
      stock: 0,
      status: "Out of Stock",
    },
    {
      id: "4",
      name: "Organic Fertilizer",
      category: "Supplies",
      price: 12.50,
      stock: 25,
      status: "In Stock",
    },
  ]);

  const handleAddProduct = () => {
    setModalMode("add");
    setFormData({ name: "", category: "", price: "", stock: "", description: "" });
    setFormErrors({});
    setImagePreview(null);
    setShowModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setModalMode("edit");
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      description: product.description || "",
    });
    setFormErrors({});
    setShowModal(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      showToast("Product deleted successfully");
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      errors.name = "Product name cannot be empty.";
    }
    if (!formData.category.trim()) {
      errors.category = "Category is required.";
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      errors.price = "Price must be a positive number.";
    }
    if (!formData.stock || parseInt(formData.stock) < 0) {
      errors.stock = "Stock cannot be negative.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const price = parseFloat(formData.price);
    const stock = parseInt(formData.stock);
    const status = stock === 0 ? "Out of Stock" : stock < 10 ? "Low Stock" : "In Stock";

    if (modalMode === "add") {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category,
        price,
        stock,
        status,
        description: formData.description,
      };
      setProducts((prev) => [...prev, newProduct]);
      showToast("Product added successfully.");
    } else if (selectedProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === selectedProduct.id
            ? { ...p, name: formData.name, category: formData.category, price, stock, status, description: formData.description }
            : p
        )
      );
      showToast("Product updated successfully.");
    }

    setShowModal(false);
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">Manage your inventory</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-600">{product.category}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900 font-medium">${product.price.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-600">{product.stock}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.status === "In Stock"
                          ? "bg-green-100 text-green-700"
                          : product.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {modalMode === "add" ? "Add New Product" : "Edit Product"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    formErrors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    formErrors.category ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {formErrors.category && <p className="text-red-500 text-sm mt-1">{formErrors.category}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      formErrors.price ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.price && <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      formErrors.stock ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.stock && <p className="text-red-500 text-sm mt-1">{formErrors.stock}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                {imagePreview ? (
                  <div className="relative w-full h-32 border border-gray-300 rounded-lg flex items-center justify-center">
                    <img src={imagePreview} alt="Preview" className="max-h-28 object-contain" />
                    <button
                      onClick={() => setImagePreview(null)}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-orange-500">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Click to upload image</span>
                    <input type="file" accept="image/*" className="hidden" />
                  </label>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                {modalMode === "add" ? "Add Product" : "Update Product"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-8 right-8 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in z-50">
          {toast}
        </div>
      )}
    </div>
  );
}
