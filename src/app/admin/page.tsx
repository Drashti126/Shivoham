"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  ShoppingBag,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Check,
  X,
  Upload,
  ArrowRight,
  ExternalLink,
  LogOut,
  RefreshCw,
  AlertCircle,
  Clock,
  Sparkles,
  Phone,
  Calendar,
  Layers,
  CheckCircle2,
  Mail,
} from "lucide-react";
import LogoPlaceholder from "@/components/LogoPlaceholder";
import { Product, Order, ProductCategory } from "@/types";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"products" | "orders">("products");

  // Authentication & Loading
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [adminEmail, setAdminEmail] = useState<string>("");

  // Data
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [stockFilter, setStockFilter] = useState<string>("All");
  const [publishFilter, setPublishFilter] = useState<string>("All");
  const [orderSearchQuery, setOrderSearchQuery] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("All");

  // Product Modal (Add / Edit)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [modalForm, setModalForm] = useState({
    name: "",
    category: "Sarees" as ProductCategory,
    fabric: "",
    price: "",
    originalPrice: "",
    image: "",
    secondaryImage: "",
    gallery: [] as string[],
    badge: "",
    description: "",
    sizes: ["Free Size"],
    isPublished: true,
    inStock: true,
  });

  const [customImageUrl, setCustomImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);
  const [savingProduct, setSavingProduct] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const modalImages = useMemo(() => {
    const list: string[] = [];
    if (modalForm.image) list.push(modalForm.image);
    if (modalForm.secondaryImage && !list.includes(modalForm.secondaryImage)) {
      list.push(modalForm.secondaryImage);
    }
    if (Array.isArray(modalForm.gallery)) {
      modalForm.gallery.forEach((g) => {
        if (g && !list.includes(g)) list.push(g);
      });
    }
    return list;
  }, [modalForm.image, modalForm.secondaryImage, modalForm.gallery]);

  // Check authentication
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/me");
        const data = await res.json();
        if (res.ok && data.authenticated) {
          setAdminEmail(data.user?.email || "admin@shivoham.com");
          setCheckingAuth(false);
          loadProducts();
          loadOrders();
        } else {
          router.push("/admin/login");
        }
      } catch {
        router.push("/admin/login");
      }
    }
    checkAuth();
  }, [router]);

  // Load products from DB
  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch("/api/products?includeUnpublished=true");
      const data = await res.json();
      if (res.ok && data.success) {
        setProducts(data.products || []);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Load orders from DB
  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      if (res.ok && data.success) {
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    }
  };

  // Quick Toggles
  const handleTogglePublished = async (product: Product) => {
    const nextVal = !(product.isPublished !== false);
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: nextVal }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === product.id ? { ...p, isPublished: nextVal } : p
          )
        );
      }
    } catch (err) {
      console.error("Toggle publish failed:", err);
    }
  };

  const handleToggleStock = async (product: Product) => {
    const nextVal = !(product.inStock !== false);
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inStock: nextVal }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) => (p.id === product.id ? { ...p, inStock: nextVal } : p))
        );
      }
    } catch (err) {
      console.error("Toggle stock failed:", err);
    }
  };

  // Delete product
  const handleDeleteProduct = async (product: Product) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${product.name}"? This action cannot be undone.`
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== product.id));
      } else {
        alert("Failed to delete product. Please try again.");
      }
    } catch (err) {
      console.error("Delete product error:", err);
    }
  };

  // Image Helpers
  const handleSetPrimaryImage = (img: string) => {
    setModalForm((prev) => {
      const remaining = modalImages.filter((x) => x !== img);
      return {
        ...prev,
        image: img,
        secondaryImage: remaining[0] || "",
        gallery: remaining.slice(1),
      };
    });
  };

  const handleRemoveImage = (img: string) => {
    setModalForm((prev) => {
      const remaining = modalImages.filter((x) => x !== img);
      return {
        ...prev,
        image: remaining[0] || "",
        secondaryImage: remaining[1] || "",
        gallery: remaining.slice(2),
      };
    });
  };

  const handleAddImageUrl = () => {
    if (!customImageUrl.trim()) return;
    const url = customImageUrl.trim();
    setModalForm((prev) => {
      if (modalImages.includes(url)) return prev;
      if (!prev.image) {
        return { ...prev, image: url };
      }
      if (!prev.secondaryImage) {
        return { ...prev, secondaryImage: url };
      }
      return {
        ...prev,
        gallery: [...(prev.gallery || []), url],
      };
    });
    setCustomImageUrl("");
  };

  // Open Add Modal
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setCustomImageUrl("");
    setModalForm({
      name: "",
      category: "Sarees",
      fabric: "Pure Banarasi Silk",
      price: "",
      originalPrice: "",
      image: "",
      secondaryImage: "",
      gallery: [],
      badge: "New Arrival",
      description:
        "Masterfully crafted Indian ethnic design. Detailed with exquisite needlecraft and rich border work.",
      sizes: ["Free Size"],
      isPublished: true,
      inStock: true,
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setCustomImageUrl("");
    setModalForm({
      name: product.name,
      category: product.category,
      fabric: product.fabric,
      price: String(product.price),
      originalPrice: product.originalPrice ? String(product.originalPrice) : "",
      image: product.image,
      secondaryImage: product.secondaryImage || "",
      gallery: Array.isArray(product.gallery) ? product.gallery : [],
      badge: product.badge || "",
      description: product.description || "",
      sizes: product.sizes || ["Free Size"],
      isPublished: product.isPublished !== false,
      inStock: product.inStock !== false,
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  // File Upload (Direct from computer/mobile)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingImage(true);
    setModalError(null);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success && Array.isArray(data.urls) && data.urls.length > 0) {
        setModalForm((prev) => {
          const current = [prev.image, prev.secondaryImage, ...(prev.gallery || [])].filter(Boolean);
          const merged = Array.from(new Set([...current, ...data.urls]));
          return {
            ...prev,
            image: merged[0] || "",
            secondaryImage: merged[1] || "",
            gallery: merged.slice(2),
          };
        });
      } else {
        setModalError(data.error || "Failed to upload image");
      }
    } catch {
      setModalError("Network error during file upload");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Save Product (Add or Edit)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);

    if (!modalForm.name.trim()) {
      setModalError("Product name is required");
      return;
    }
    if (!modalForm.price || Number(modalForm.price) <= 0) {
      setModalError("Please enter a valid price");
      return;
    }
    if (!modalForm.image.trim()) {
      setModalError("Please provide at least one product image or upload one");
      return;
    }

    setSavingProduct(true);

    try {
      const payload = {
        name: modalForm.name.trim(),
        category: modalForm.category,
        fabric: modalForm.fabric.trim() || "Handloom Silk",
        price: Number(modalForm.price),
        originalPrice: modalForm.originalPrice ? Number(modalForm.originalPrice) : undefined,
        image: modalForm.image.trim(),
        secondaryImage: modalForm.secondaryImage.trim() || undefined,
        gallery: modalForm.gallery && modalForm.gallery.length > 0 ? modalForm.gallery : undefined,
        badge: modalForm.badge.trim() || undefined,
        description: modalForm.description.trim(),
        sizes: modalForm.sizes,
        isPublished: modalForm.isPublished,
        inStock: modalForm.inStock,
      };

      if (editingProduct) {
        // Edit existing
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setProducts((prev) =>
            prev.map((p) => (p.id === editingProduct.id ? data.product : p))
          );
          setIsModalOpen(false);
        } else {
          setModalError(data.error || "Failed to update product");
        }
      } else {
        // Create new
        const res = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          setProducts((prev) => [data.product, ...prev]);
          setIsModalOpen(false);
        } else {
          setModalError(data.error || "Failed to create product");
        }
      }
    } catch {
      setModalError("An error occurred while saving product");
    } finally {
      setSavingProduct(false);
    }
  };

  // Order status update
  const handleUpdateOrderStatus = async (orderId: string, newStatus: Order["status"]) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (err) {
      console.error("Order status update failed:", err);
    }
  };

  const handleUpdateOrderTracking = async (orderId: string, trackingNumber: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingNumber }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, trackingNumber } : o))
        );
      }
    } catch (err) {
      console.error("Order tracking update failed:", err);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const q = orderSearchQuery.toLowerCase().trim();
      const matchSearch =
        q === "" ||
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerPhone.includes(q) ||
        (o.customerEmail && o.customerEmail.toLowerCase().includes(q));

      const matchStatus =
        orderStatusFilter === "All" || o.status === orderStatusFilter;

      return matchSearch && matchStatus;
    });
  }, [orders, orderSearchQuery, orderStatusFilter]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        categoryFilter === "All" ||
        p.category === categoryFilter ||
        (categoryFilter === "Suits" && (p.category as string) === "Dresses");

      const matchStock =
        stockFilter === "All" ||
        (stockFilter === "InStock" && p.inStock !== false) ||
        (stockFilter === "OutOfStock" && p.inStock === false);

      const matchPublish =
        publishFilter === "All" ||
        (publishFilter === "Published" && p.isPublished !== false) ||
        (publishFilter === "Unpublished" && p.isPublished === false);

      return matchSearch && matchCategory && matchStock && matchPublish;
    });
  }, [products, searchQuery, categoryFilter, stockFilter, publishFilter]);

  // Metrics
  const metrics = useMemo(() => {
    const total = products.length;
    const sarees = products.filter((p) => p.category === "Sarees").length;
    const kurtis = products.filter((p) => p.category === "Kurtis").length;
    const suits = products.filter(
      (p) => p.category === "Suits" || (p.category as string) === "Dresses"
    ).length;
    const published = products.filter((p) => p.isPublished !== false).length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

    return { total, sarees, suits, dresses: suits, kurtis, published, totalOrders: orders.length, totalRevenue };
  }, [products, orders]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center text-[#173D2B]">
        <div className="text-center space-y-3">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#B89A5A]" />
          <p className="font-serif text-lg">Authenticating SHIVOHAM Admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#242424] flex flex-col">
      {/* Top Navbar */}
      <header className="bg-[#143426] text-[#FAF7F0] sticky top-0 z-40 border-b border-[#B89A5A]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-[#B89A5A]/40 bg-[#FAF7F0]">
              <Image
                src="/images/logo/shivoham-logo.jpeg"
                alt="SHIVOHAM"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <div>
              <span className="font-serif text-base sm:text-lg font-semibold tracking-wider text-[#FAF7F0] block leading-tight">
                SHIVOHAM ADMIN
              </span>
              <span className="text-[10px] text-[#E5D2A5] tracking-widest uppercase block">
                Boutique Portal • {adminEmail}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF7F0]/15 hover:bg-[#FAF7F0]/25 text-[#FAF7F0] text-xs font-medium uppercase tracking-wider rounded-xs transition-colors"
              title="Open public customer storefront in new tab"
            >
              <span>View Storefront</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#B89A5A]" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#801426]/90 hover:bg-[#801426] text-[#FAF7F0] text-xs font-medium uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
              title="Sign out of admin portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Metrics Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="bg-[#FFFFFF] border border-[#F3EBDD] p-4 shadow-2xs">
            <span className="text-[10px] uppercase tracking-wider text-[#B89A5A] font-semibold block">
              Total Products
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-medium text-[#173D2B]">
              {metrics.total}
            </span>
            <span className="text-[10px] text-[#242424]/60 block mt-0.5">
              {metrics.published} Published
            </span>
          </div>

          <div className="bg-[#FFFFFF] border border-[#F3EBDD] p-4 shadow-2xs">
            <span className="text-[10px] uppercase tracking-wider text-[#B89A5A] font-semibold block">
              Sarees
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-medium text-[#173D2B]">
              {metrics.sarees}
            </span>
            <span className="text-[10px] text-[#242424]/60 block mt-0.5">
              Pure Silk Drapes
            </span>
          </div>

          <div className="bg-[#FFFFFF] border border-[#F3EBDD] p-4 shadow-2xs">
            <span className="text-[10px] uppercase tracking-wider text-[#B89A5A] font-semibold block">
              Suits
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-medium text-[#173D2B]">
              {metrics.suits}
            </span>
            <span className="text-[10px] text-[#242424]/60 block mt-0.5">
              2 &amp; 3-Piece Sets
            </span>
          </div>

          <div className="bg-[#FFFFFF] border border-[#F3EBDD] p-4 shadow-2xs">
            <span className="text-[10px] uppercase tracking-wider text-[#B89A5A] font-semibold block">
              Kurtis
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-medium text-[#173D2B]">
              {metrics.kurtis}
            </span>
            <span className="text-[10px] text-[#242424]/60 block mt-0.5">
              Handcrafted Tunics
            </span>
          </div>

          <div className="bg-[#FFFFFF] border border-[#F3EBDD] p-4 shadow-2xs">
            <span className="text-[10px] uppercase tracking-wider text-[#B89A5A] font-semibold block">
              Customer Orders
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-medium text-[#173D2B]">
              {metrics.totalOrders}
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
              Live Tracker
            </span>
          </div>

          <div className="bg-[#FFFFFF] border border-[#F3EBDD] p-4 shadow-2xs">
            <span className="text-[10px] uppercase tracking-wider text-[#B89A5A] font-semibold block">
              Order Value
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-medium text-[#173D2B]">
              ₹{metrics.totalRevenue.toLocaleString("en-IN")}
            </span>
            <span className="text-[10px] text-[#242424]/60 block mt-0.5">
              Gross Volume
            </span>
          </div>
        </div>

        {/* Primary Tab Navigation */}
        <div className="flex items-center justify-between border-b border-[#F3EBDD] pb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("products")}
              className={`px-5 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all rounded-xs cursor-pointer flex items-center gap-2 ${
                activeTab === "products"
                  ? "bg-[#173D2B] text-[#FAF7F0] shadow-sm"
                  : "bg-[#FFFFFF] text-[#242424] border border-[#F3EBDD] hover:border-[#173D2B]"
              }`}
            >
              <Package className="w-4 h-4 text-[#B89A5A]" />
              <span>Products Catalog ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`px-5 py-2.5 text-xs uppercase tracking-widest font-semibold transition-all rounded-xs cursor-pointer flex items-center gap-2 ${
                activeTab === "orders"
                  ? "bg-[#173D2B] text-[#FAF7F0] shadow-sm"
                  : "bg-[#FFFFFF] text-[#242424] border border-[#F3EBDD] hover:border-[#173D2B]"
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-[#B89A5A]" />
              <span>Customer Orders ({orders.length})</span>
            </button>
          </div>

          {activeTab === "products" && (
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2.5 bg-[#173D2B] hover:bg-[#0f291d] text-[#FAF7F0] text-xs uppercase tracking-wider font-semibold rounded-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#B89A5A]" />
              <span>Add New Product</span>
            </button>
          )}
        </div>

        {/* TAB 1: PRODUCTS MANAGEMENT */}
        {activeTab === "products" && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="bg-[#FFFFFF] border border-[#F3EBDD] p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-2xs">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-[#B89A5A] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by title, fabric, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Category Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs text-[#242424] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  <option value="Sarees">Sarees ({metrics.sarees})</option>
                  <option value="Kurtis">Kurtis ({metrics.kurtis})</option>
                  <option value="Suits">Suits ({metrics.suits})</option>
                </select>

                {/* Stock Filter */}
                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs text-[#242424] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="All">All Stock Status</option>
                  <option value="InStock">In Stock</option>
                  <option value="OutOfStock">Out of Stock</option>
                </select>

                {/* Publish Filter */}
                <select
                  value={publishFilter}
                  onChange={(e) => setPublishFilter(e.target.value)}
                  className="px-3 py-2 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs text-[#242424] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="All">All Visibility</option>
                  <option value="Published">Published (Public)</option>
                  <option value="Unpublished">Unpublished (Hidden)</option>
                </select>

                <button
                  onClick={loadProducts}
                  className="p-2 border border-[#F3EBDD] hover:bg-[#FAF7F0] text-[#173D2B] rounded-xs transition-colors cursor-pointer"
                  title="Refresh products from database"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="bg-[#FFFFFF] border border-[#F3EBDD] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F0] border-b border-[#F3EBDD] uppercase text-[10px] tracking-wider text-[#173D2B] font-semibold">
                    <tr>
                      <th className="py-3 px-4">Image</th>
                      <th className="py-3 px-4">Title &amp; Fabric</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price / MRP</th>
                      <th className="py-3 px-4 text-center">In Stock</th>
                      <th className="py-3 px-4 text-center">Published</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F3EBDD]/70">
                    {loadingProducts ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-[#242424]/60">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#B89A5A] mb-2" />
                          <span>Loading products from database...</span>
                        </td>
                      </tr>
                    ) : filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-[#242424]/60">
                          <p className="font-serif text-base text-[#173D2B]">No products found</p>
                          <p className="text-xs mt-1">Try adjusting your filters or search keywords.</p>
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((product) => {
                        const isPublished = product.isPublished !== false;
                        const inStock = product.inStock !== false;

                        return (
                          <tr key={product.id} className="hover:bg-[#FAF7F0]/50 transition-colors">
                            {/* Image Thumbnail */}
                            <td className="py-3 px-4">
                              <div className="relative w-14 h-18 bg-[#F3EBDD] overflow-hidden border border-[#F3EBDD]">
                                <Image
                                  src={encodeURI(product.image)}
                                  alt={product.name}
                                  fill
                                  sizes="56px"
                                  className="object-cover"
                                />
                              </div>
                            </td>

                            {/* Title & Fabric */}
                            <td className="py-3 px-4 max-w-xs">
                              <span className="font-medium text-[#173D2B] block text-sm line-clamp-1">
                                {product.name}
                              </span>
                              <span className="text-[11px] text-[#B89A5A] font-semibold uppercase block truncate">
                                {product.fabric}
                              </span>
                              <span className="text-[10px] text-[#242424]/50 font-mono block">
                                ID: {product.id}
                              </span>
                            </td>

                            {/* Category Pill */}
                            <td className="py-3 px-4">
                              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#FAF7F0] border border-[#F3EBDD] text-[#173D2B]">
                                {product.category}
                              </span>
                            </td>

                            {/* Price / MRP */}
                            <td className="py-3 px-4">
                              <span className="font-semibold text-sm text-[#173D2B] block">
                                ₹{product.price.toLocaleString("en-IN")}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-[#242424]/50 line-through block">
                                  ₹{product.originalPrice.toLocaleString("en-IN")}
                                </span>
                              )}
                            </td>

                            {/* In Stock Quick Toggle */}
                            <td className="py-3 px-4 text-center">
                              <button
                                onClick={() => handleToggleStock(product)}
                                className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-colors cursor-pointer ${
                                  inStock
                                    ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                                    : "bg-red-100 text-red-800 hover:bg-red-200"
                                }`}
                                title="Click to toggle availability"
                              >
                                {inStock ? "In Stock" : "Out of Stock"}
                              </button>
                            </td>

                            {/* Published Quick Toggle */}
                            <td className="py-3 px-4 text-center">
                              <button
                                onClick={() => handleTogglePublished(product)}
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-colors cursor-pointer ${
                                  isPublished
                                    ? "bg-[#173D2B] text-[#FAF7F0]"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                                title="Click to toggle publish status"
                              >
                                {isPublished ? (
                                  <>
                                    <Eye className="w-3 h-3 text-[#B89A5A]" />
                                    <span>Visible</span>
                                  </>
                                ) : (
                                  <>
                                    <EyeOff className="w-3 h-3" />
                                    <span>Hidden</span>
                                  </>
                                )}
                              </button>
                            </td>

                            {/* Action Buttons */}
                            <td className="py-3 px-4 text-right space-x-1">
                              <button
                                onClick={() => handleOpenEditModal(product)}
                                className="p-1.5 text-[#173D2B] hover:bg-[#F3EBDD] rounded-xs transition-colors cursor-pointer"
                                title="Edit Product"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product)}
                                className="p-1.5 text-[#801426] hover:bg-red-50 rounded-xs transition-colors cursor-pointer"
                                title="Delete Product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGEMENT */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            <div className="bg-[#FFFFFF] border border-[#F3EBDD] p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-2xs">
              <div>
                <h3 className="font-serif text-lg text-[#173D2B]">Customer Orders</h3>
                <p className="text-xs text-[#242424]/70">
                  Track and manage customer website orders, payment verification, and dispatch.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Search orders */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#B89A5A] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by ID, Name, Phone..."
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
                  />
                </div>

                {/* Status filter */}
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs text-[#242424] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="All">All Statuses ({orders.length})</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <button
                  onClick={loadOrders}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#F3EBDD] hover:bg-[#FAF7F0] text-xs font-semibold text-[#173D2B] rounded-xs cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {loadingOrders ? (
              <div className="text-center py-16 text-[#242424]/60 bg-[#FFFFFF] border border-[#F3EBDD]">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#B89A5A] mb-2" />
                <span>Loading customer orders...</span>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-16 bg-[#FFFFFF] border border-[#F3EBDD] space-y-2">
                <ShoppingBag className="w-10 h-10 text-[#B89A5A] mx-auto opacity-70" />
                <h4 className="font-serif text-lg text-[#173D2B]">No Matching Customer Orders</h4>
                <p className="text-xs text-[#242424]/60 max-w-sm mx-auto">
                  When customers complete checkout or submit their cart on the website, their orders will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-[#FFFFFF] border border-[#F3EBDD] p-5 shadow-2xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F3EBDD] pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-[#173D2B]">
                            {order.id}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              order.status === "Delivered"
                                ? "bg-emerald-100 text-emerald-800"
                                : order.status === "Shipped"
                                ? "bg-blue-100 text-blue-800"
                                : order.status === "Confirmed"
                                ? "bg-purple-100 text-purple-800"
                                : order.status === "Cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {order.status}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 bg-[#FAF7F0] border border-[#F3EBDD] rounded-full text-[#173D2B] font-medium">
                            {order.paymentMethod === "COD" ? "Cash on Delivery" : "Online Gateway"} •{" "}
                            <strong className={order.paymentStatus === "Paid" ? "text-emerald-700" : "text-amber-800"}>
                              {order.paymentStatus || "Pending"}
                            </strong>
                          </span>
                        </div>
                        <span className="text-[11px] text-[#242424]/60 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3 text-[#B89A5A]" />
                          {new Date(order.createdAt).toLocaleString("en-IN")}
                        </span>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-[#242424]/70 font-medium">Update Status:</span>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleUpdateOrderStatus(order.id, e.target.value as any)
                          }
                          className="px-2.5 py-1 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs font-semibold text-[#173D2B] focus:outline-none cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Customer Details & Items */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      {/* Customer info */}
                      <div className="md:col-span-4 bg-[#FAF7F0] p-3.5 border border-[#F3EBDD] space-y-1.5 text-xs">
                        <span className="text-[10px] uppercase tracking-wider text-[#B89A5A] font-semibold block">
                          Customer Delivery Info
                        </span>
                        <p className="font-semibold text-sm text-[#173D2B]">{order.customerName}</p>
                        <p className="flex items-center gap-1.5 text-[#242424]/80">
                          <Phone className="w-3.5 h-3.5 text-[#B89A5A]" />
                          <span>+91 {order.customerPhone}</span>
                        </p>
                        {order.customerEmail && (
                          <p className="text-[#242424]/75 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-[#B89A5A]" />
                            <span>{order.customerEmail}</span>
                          </p>
                        )}
                        {order.customerAddress && (
                          <p className="text-[#242424]/70 line-clamp-3">
                            Address: {order.customerAddress}
                          </p>
                        )}
                        {order.notes && (
                          <p className="text-xs italic text-[#801426] pt-1">
                            Note: {order.notes}
                          </p>
                        )}

                        {/* AWB Tracking input */}
                        <div className="pt-2 border-t border-[#F3EBDD] space-y-1">
                          <label className="text-[10px] uppercase font-semibold text-[#173D2B] block">
                            Courier AWB Tracking Number:
                          </label>
                          <div className="flex gap-1">
                            <input
                              type="text"
                              defaultValue={order.trackingNumber || ""}
                              placeholder="e.g. BLUEDART-123456"
                              id={`awb-${order.id}`}
                              className="px-2 py-1 text-xs bg-white border border-[#F3EBDD] rounded-xs flex-1"
                            />
                            <button
                              onClick={() => {
                                const input = document.getElementById(`awb-${order.id}`) as HTMLInputElement;
                                if (input) {
                                  handleUpdateOrderTracking(order.id, input.value.trim());
                                  alert("Tracking number updated!");
                                }
                              }}
                              className="px-2 py-1 bg-[#173D2B] text-white text-[10px] uppercase font-semibold rounded-xs"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Items Ordered */}
                      <div className="md:col-span-8 space-y-2">
                        <span className="text-[10px] uppercase tracking-wider text-[#B89A5A] font-semibold block">
                          Ordered Items ({order.items.length})
                        </span>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {order.items.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between gap-3 p-2 border border-[#F3EBDD] bg-[#FFFFFF] text-xs"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="relative w-10 h-12 bg-[#F3EBDD] shrink-0 overflow-hidden">
                                  <Image
                                    src={encodeURI(item.image)}
                                    alt={item.productName}
                                    fill
                                    sizes="40px"
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <span className="font-medium text-[#173D2B] block line-clamp-1">
                                    {item.productName}
                                  </span>
                                  <span className="text-[10px] text-[#B89A5A] font-semibold">
                                    Size: {item.selectedSize} • Qty: {item.quantity}
                                  </span>
                                </div>
                              </div>
                              <span className="font-semibold text-[#173D2B]">
                                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Order Total */}
                        <div className="pt-2 border-t border-[#F3EBDD] flex justify-between items-center text-xs">
                          <span className="font-semibold text-[#173D2B]">Total Order Value:</span>
                          <span className="font-serif text-base font-bold text-[#173D2B]">
                            ₹{order.totalAmount.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#143426]/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
        >
          <div
            className="fixed inset-0"
            onClick={() => !savingProduct && setIsModalOpen(false)}
          />

          <div className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#F3EBDD] shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#F3EBDD] bg-[#FAF7F0]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B89A5A]" />
                <h3 className="font-serif text-lg font-medium text-[#173D2B]">
                  {editingProduct ? "Edit Product Details" : "Add New Product to SHIVOHAM"}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={savingProduct}
                className="p-1 text-[#242424]/60 hover:text-[#173D2B] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-5 flex-1">
              {modalError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 rounded-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-8">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={modalForm.name}
                    onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                    placeholder="e.g. Royal Crimson Zari Banarasi Silk Saree"
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
                  />
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
                    Category *
                  </label>
                  <select
                    value={modalForm.category}
                    onChange={(e) =>
                      setModalForm({
                        ...modalForm,
                        category: e.target.value as ProductCategory,
                      })
                    }
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B] cursor-pointer font-medium"
                  >
                    <option value="Sarees">Sarees</option>
                    <option value="Dresses">Dresses</option>
                    <option value="Kurtis">Kurtis</option>
                    <option value="Suits">Suits</option>
                    <option value="Co-ord Sets">Co-ord Sets</option>
                  </select>
                </div>
              </div>

              {/* Fabric & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
                    Fabric / Craft Description
                  </label>
                  <input
                    type="text"
                    value={modalForm.fabric}
                    onChange={(e) => setModalForm({ ...modalForm, fabric: e.target.value })}
                    placeholder="e.g. Pure Katan Silk with Antique Zari"
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
                    Badge Tag (Optional)
                  </label>
                  <input
                    type="text"
                    value={modalForm.badge}
                    onChange={(e) => setModalForm({ ...modalForm, badge: e.target.value })}
                    placeholder="e.g. Bestseller, Trending, Festive Edit"
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
                  />
                </div>
              </div>

              {/* Price & Original Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
                    Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={modalForm.price}
                    onChange={(e) => setModalForm({ ...modalForm, price: e.target.value })}
                    placeholder="14999"
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B] font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
                    Original MRP (₹) (Optional strikethrough)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={modalForm.originalPrice}
                    onChange={(e) => setModalForm({ ...modalForm, originalPrice: e.target.value })}
                    placeholder="18500"
                    className="w-full px-3 py-2 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
                  />
                </div>
              </div>

              {/* Product Images (Multiple Upload & URL) */}
              <div className="space-y-3 border border-[#F3EBDD] bg-[#FAF7F0] p-4 rounded-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <label className="text-xs uppercase tracking-wider font-semibold text-[#173D2B] block">
                      Product Images *
                    </label>
                    <span className="text-[11px] text-[#242424]/70">
                      Upload photos from your computer or mobile, or paste direct URLs.
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#173D2B] hover:bg-[#0f291d] text-[#FAF7F0] text-xs font-semibold uppercase tracking-wider rounded-xs cursor-pointer shadow-xs disabled:opacity-60 transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#B89A5A]" />
                      <span>{uploadingImage ? "Uploading..." : "Upload from Device"}</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Add by URL input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    placeholder="Or paste image URL (https://... or /images/...)"
                    className="flex-1 px-3 py-1.5 text-xs bg-[#FFFFFF] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-3 py-1.5 bg-[#FAF7F0] hover:bg-[#F3EBDD] text-[#173D2B] border border-[#F3EBDD] text-xs font-semibold rounded-xs transition-colors cursor-pointer"
                  >
                    + Add URL
                  </button>
                </div>

                {/* Gallery Thumbnails List */}
                {modalImages.length > 0 ? (
                  <div className="space-y-2 pt-2 border-t border-[#F3EBDD]">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider text-[#B89A5A] font-semibold">
                        Attached Images ({modalImages.length})
                      </span>
                      <span className="text-[10px] text-[#242424]/60">
                        First image is Primary (cover photo).
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {modalImages.map((img, idx) => {
                        const isPrimary = idx === 0;
                        const isSecondary = idx === 1;

                        return (
                          <div
                            key={`${img}-${idx}`}
                            className="group relative bg-[#FFFFFF] border border-[#F3EBDD] rounded-xs overflow-hidden p-1.5 flex flex-col items-center shadow-2xs"
                          >
                            <div className="relative w-full aspect-[3/4] bg-[#F3EBDD] overflow-hidden rounded-xs">
                              <Image
                                src={encodeURI(img)}
                                alt={`Image ${idx + 1}`}
                                fill
                                sizes="120px"
                                className="object-cover"
                              />

                              {/* Badge */}
                              <span
                                className={`absolute top-1 left-1 text-[8px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-2xs ${
                                  isPrimary
                                    ? "bg-[#173D2B] text-[#FAF7F0]"
                                    : isSecondary
                                    ? "bg-[#B89A5A] text-[#173D2B]"
                                    : "bg-black/60 text-white"
                                }`}
                              >
                                {isPrimary ? "Primary" : isSecondary ? "Hover / Detail" : `Angle #${idx + 1}`}
                              </span>

                              {/* Delete button */}
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(img)}
                                className="absolute top-1 right-1 w-5 h-5 bg-red-600/80 hover:bg-red-600 text-white flex items-center justify-center rounded-2xs cursor-pointer shadow-xs transition-colors"
                                title="Remove image"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Actions under image */}
                            <div className="w-full mt-1.5 flex items-center justify-between text-[10px]">
                              {!isPrimary && (
                                <button
                                  type="button"
                                  onClick={() => handleSetPrimaryImage(img)}
                                  className="text-[#173D2B] hover:text-[#B89A5A] font-medium underline text-[9px] cursor-pointer"
                                >
                                  Make Primary
                                </button>
                              )}
                              <span className="text-[9px] text-gray-400 truncate ml-auto max-w-[80px]">
                                {img.startsWith("data:") ? "Base64" : img.split("/").pop()}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 text-center border border-dashed border-[#F3EBDD] bg-white rounded-xs">
                    <p className="text-xs text-[#242424]/60">
                      No images added yet. Click &ldquo;Upload from Device&rdquo; or paste an image URL above.
                    </p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  value={modalForm.description}
                  onChange={(e) => setModalForm({ ...modalForm, description: e.target.value })}
                  placeholder="Masterfully handwoven drape showcasing traditional craftsmanship..."
                  className="w-full px-3 py-2 text-xs bg-[#FAF7F0] border border-[#F3EBDD] rounded-xs focus:outline-none focus:border-[#173D2B]"
                />
              </div>

              {/* Sizing Tags */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#173D2B] mb-1">
                  Available Sizes
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Free Size",
                    "XS",
                    "S",
                    "M",
                    "L",
                    "XL",
                    "XXL",
                    "3XL",
                  ].map((sz) => {
                    const selected = modalForm.sizes.includes(sz);
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => {
                          if (selected) {
                            setModalForm({
                              ...modalForm,
                              sizes: modalForm.sizes.filter((s) => s !== sz),
                            });
                          } else {
                            setModalForm({
                              ...modalForm,
                              sizes: [...modalForm.sizes, sz],
                            });
                          }
                        }}
                        className={`px-3 py-1 text-xs border rounded-xs transition-colors cursor-pointer ${
                          selected
                            ? "bg-[#173D2B] text-[#FAF7F0] border-[#173D2B] font-semibold"
                            : "bg-[#FAF7F0] text-[#242424] border-[#F3EBDD]"
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-2 border-t border-[#F3EBDD] flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={modalForm.inStock}
                    onChange={(e) => setModalForm({ ...modalForm, inStock: e.target.checked })}
                    className="w-4 h-4 accent-[#173D2B]"
                  />
                  <span className="text-xs font-semibold text-[#173D2B]">
                    Mark as In Stock
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={modalForm.isPublished}
                    onChange={(e) => setModalForm({ ...modalForm, isPublished: e.target.checked })}
                    className="w-4 h-4 accent-[#173D2B]"
                  />
                  <span className="text-xs font-semibold text-[#173D2B]">
                    Publish to Public Website
                  </span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-[#F3EBDD] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={savingProduct}
                  className="px-4 py-2.5 border border-[#F3EBDD] hover:bg-[#FAF7F0] text-xs font-semibold uppercase tracking-wider text-[#242424] rounded-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProduct}
                  className="px-6 py-2.5 bg-[#173D2B] hover:bg-[#0f291d] text-[#FAF7F0] text-xs font-semibold uppercase tracking-wider rounded-xs cursor-pointer shadow-md disabled:opacity-60 flex items-center gap-2"
                >
                  {savingProduct ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#B89A5A]" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingProduct ? "Update Product" : "Save & Publish"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
