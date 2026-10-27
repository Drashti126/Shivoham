import { Product, CategoryInfo } from "@/types";

export const BUSINESS_CONTACT = {
  brandName: "SHIVOHAM",
  tagline: "Timeless Heritage. Beautifully Indian.",
  subTagline: "Handcrafted Sarees, Dresses & Bespoke Ethnic Wear",
  phone: "9724984714",
  phoneFormatted: "+91 9724984714",
  whatsappUrl: "https://wa.me/919724984714",
  defaultGreeting:
    "Hi SHIVOHAM, I would like to inquire about your ethnic wear collections.",
};

// Available Currencies
export interface Currency {
  code: string;
  symbol: string;
  rate: number; // multiplier relative to INR
}

export const CURRENCIES: Currency[] = [
  { code: "INR", symbol: "₹", rate: 1 },
  { code: "USD", symbol: "$", rate: 0.012 },
  { code: "GBP", symbol: "£", rate: 0.0094 },
  { code: "AED", symbol: "AED", rate: 0.044 },
];

// Interactive Discount Coupons (Libas Style)
export interface Coupon {
  code: string;
  title: string;
  description: string;
  discountType: "percentage" | "flat";
  discountValue: number;
  minSpend: number;
}

export const ACTIVE_COUPONS: Coupon[] = [
  {
    code: "SHIVOHAM15",
    title: "15% WELCOME OFF",
    description: "Get 15% off on your first order above ₹1,999",
    discountType: "percentage",
    discountValue: 15,
    minSpend: 1999,
  },
  {
    code: "FESTIVE500",
    title: "FLAT ₹500 OFF",
    description: "Special celebratory off on shopping above ₹3,999",
    discountType: "flat",
    discountValue: 500,
    minSpend: 3999,
  },
  {
    code: "ROYAL1000",
    title: "FLAT ₹1,000 OFF",
    description: "Exclusive bridal & couture discount on orders above ₹8,999",
    discountType: "flat",
    discountValue: 1000,
    minSpend: 8999,
  },
];

// 3 Core Product Categories mapped to actual inventory folders
export const CATEGORIES: CategoryInfo[] = [
  {
    id: "Sarees",
    title: "Sarees",
    tagline: "Banarasi, Katan & Tussar Silks",
    image: "/images/saree/saree 10.png",
    itemCountLabel: "13 Exclusive Silks",
  },
  {
    id: "Dresses",
    title: "Dresses",
    tagline: "Contemporary Indo-Western & Anarkalis",
    image: "/images/dress/file_0000000006b0821191833494d124292f.png",
    itemCountLabel: "28 Signature Styles",
  },
  {
    id: "Kurtis",
    title: "Kurtis",
    tagline: "Chikankari & Handloom Tunics",
    image: "/images/kurtis/DocScanner 12 Oct 2026 10-51 am-1(201621346495824).jpg",
    itemCountLabel: "37 Handcrafted Pieces",
  },
];

// Surekhi-style Heritage Weave Stories
export interface HeritageCraft {
  id: string;
  name: string;
  origin: string;
  tagline: string;
  description: string;
  image: string;
  detail: string;
}

export const HERITAGE_CRAFTS: HeritageCraft[] = [
  {
    id: "banarasi",
    name: "Banaras Zari Brocade",
    origin: "Varanasi, Uttar Pradesh",
    tagline: "Woven with Real Silver & Gold Zari",
    description:
      "Celebrated across royal dynasties, each Banarasi drape takes up to 45 days on traditional jacquard pit looms.",
    image: "/images/saree/saree 12.png",
    detail: "Pure Katan Silk & Zari Jaal",
  },
  {
    id: "chikankari",
    name: "Lucknowi Shadow Chikankari",
    origin: "Lucknow, Awadh",
    tagline: "Centuries-old Needlecraft Art",
    description:
      "Delicate white-on-pastel floral jaal work handcrafted by master Awadhi artisans on breathable fine mulmul and georgette.",
    image: "/images/kurtis/DocScanner 12 Oct 2026 10-51 am-1(201621346495824).jpg",
    detail: "Shadow Work, Murri & Phanda",
  },
  {
    id: "chanderi",
    name: "Royal Chanderi Silk",
    origin: "Madhya Pradesh",
    tagline: "Airy Sheer Luxury with Shimmer",
    description:
      "Known for its gossamer lightness and golden zari borders, once patronized by Bundelkhand royalty for summer drapes.",
    image: "/images/dress/file_00000000088c8211afb7090795b09648.png",
    detail: "Silk-Cotton Weft with Gold Bootis",
  },
  {
    id: "bandhani",
    name: "Gujarati Bandhani & Patola",
    origin: "Gujarat",
    tagline: "Sacred Tie & Dye Mastercraft",
    description:
      "Thousands of meticulous micro-knots hand-tied on pure mulberry silk, radiating celebratory auspicious elegance.",
    image: "/images/saree/saree 3.png",
    detail: "Traditional Gharchola & Bandhej",
  },
];

// Product inventory lists
export const SAREE_PRODUCTS: Product[] = [
  {
    "id": "sh-sar-01",
    "name": "Royal Crimson Zari Banarasi Silk Saree",
    "category": "Sarees",
    "fabric": "Pure Katan Silk with Antique Zari",
    "price": 14999,
    "originalPrice": 18500,
    "image": "/images/saree/saree 10.png",
    "badge": "Bestseller",
    "description": "Masterfully handwoven drape showcasing traditional Indian textile craftsmanship. Complete with unstitched matching blouse piece.",
    "sizes": [
      "Free Size (6.3m with Blouse)"
    ],
    "isSample": false
  },
  {
    "id": "sh-sar-02",
    "name": "Forest Emerald Handwoven Banarasi Saree",
    "category": "Sarees",
    "fabric": "Chanderi & Katan Silk Blend",
    "price": 12500,
    "originalPrice": 15000,
    "image": "/images/saree/saree 11.png",
    "badge": "Trending",
    "description": "Masterfully handwoven drape showcasing traditional Indian textile craftsmanship. Complete with unstitched matching blouse piece.",
    "sizes": [
      "Free Size (6.3m with Blouse)"
    ],
    "isSample": false
  },
  {
    "id": "sh-sar-03",
    "name": "Golden Honey Brocade Katan Saree",
    "category": "Sarees",
    "fabric": "Pure Mulberry Silk with Antique Weave",
    "price": 16800,
    "originalPrice": 21000,
    "image": "/images/saree/saree 12.png",
    "badge": "Handcrafted",
    "description": "Masterfully handwoven drape showcasing traditional Indian textile craftsmanship. Complete with unstitched matching blouse piece.",
    "sizes": [
      "Free Size (6.3m with Blouse)"
    ],
    "isSample": false
  },
  {
    "id": "sh-sar-04",
    "name": "Sunlit Mustard Floral Jaal Saree",
    "category": "Sarees",
    "fabric": "Handloom Tussar Silk with Floral Bootis",
    "price": 11200,
    "originalPrice": 13500,
    "image": "/images/saree/saree 13.png",
    "badge": "Festive Edit",
    "description": "Masterfully handwoven drape showcasing traditional Indian textile craftsmanship. Complete with unstitched matching blouse piece.",
    "sizes": [
      "Free Size (6.3m with Blouse)"
    ],
    "isSample": false
  },
  {
    "id": "sh-sar-05",
    "name": "Peacock Blue Meenakari Zari Saree",
    "category": "Sarees",
    "fabric": "Pure Banarasi Silk with Meenakari Border",
    "price": 15400,
    "originalPrice": 19000,
    "image": "/images/saree/saree 2.png",
    "badge": "Exclusive",
    "description": "Masterfully handwoven drape showcasing traditional Indian textile craftsmanship. Complete with unstitched matching blouse piece.",
    "sizes": [
      "Free Size (6.3m with Blouse)"
    ],
    "isSample": false
  },
  {
    "id": "sh-sar-06",
    "name": "Rani Magenta Festive Katan Saree",
    "category": "Sarees",
    "fabric": "Pure Katan Silk with Rich Zari Pallu",
    "price": 13900,
    "originalPrice": 16500,
    "image": "/images/saree/saree 3.png",
    "badge": "New Arrival",
    "description": "Masterfully handwoven drape showcasing traditional Indian textile craftsmanship. Complete with unstitched matching blouse piece.",
    "sizes": [
      "Free Size (6.3m with Blouse)"
    ],
    "isSample": false
  },
  {
    "id": "sh-sar-07",
    "name": "Pastel Mint Organza Handcrafted Saree",
    "category": "Sarees",
    "fabric": "Lightweight Organza with Scalloped Zari",
    "price": 9800,
    "originalPrice": 12000,
    "image": "/images/saree/saree 4.png",
    "badge": "Artisan Made",
    "description": "Masterfully handwoven drape showcasing traditional Indian textile craftsmanship. Complete with unstitched matching blouse piece.",
    "sizes": [
      "Free Size (6.3m with Blouse)"
    ],
    "isSample": false
  },
  {
    "id": "sh-sar-08",
    "name": "Midnight Cobalt Heritage Silk Saree",
    "category": "Sarees",
    "fabric": "Handloom Raw Silk with Gold Motifs",
    "price": 14200,
    "originalPrice": 17000,
    "image": "/images/saree/saree 5.png",
    "badge": "Royal Weave",
    "description": "Masterfully handwoven drape showcasing traditional Indian textile craftsmanship. Complete with unstitched matching blouse piece.",
    "sizes": [
      "Free Size (6.3m with Blouse)"
    ],
    "isSample": false
  },
  {
    "id": "sh-sar-09",
    "name": "Blush Rose Dual-Tone Pure Silk Saree",
    "category": "Sarees",
    "fabric": "Mulberry Silk with Contrast Temple Border",
    "price": 15900,
    "originalPrice": 19500,
    "image": "/images/saree/saree 6 .png",
    "badge": "Popular",
    "description": "Masterfully handwoven drape showcasing traditional Indian textile craftsmanship. Complete with unstitched matching blouse piece.",
    "sizes": [
      "Free Size (6.3m with Blouse)"
    ],
    "isSample": false
  },
  {
    "id": "sh-sar-10",
    "name": "Varanasi Antique Brocade Heritage Saree",
    "category": "Sarees",
    "fabric": "Handwoven Jacquard Pit Loom Silk",
    "price": 17500,
    "originalPrice": 22000,
    "image": "/images/saree/saree 7.png",
    "badge": "Trending",
    "description": "Masterfully handwoven drape showcasing traditional Indian textile craftsmanship. Complete with unstitched matching blouse piece.",
    "sizes": [
      "Free Size (6.3m with Blouse)"
    ],
    "isSample": false
  },
  {
    "id": "sh-sar-11",
    "name": "Deep Wine Zari Bordered Festive Saree",
    "category": "Sarees",
    "fabric": "Pure Katan Silk with Intricate Selvedge",
    "price": 13500,
    "originalPrice": 16000,
    "image": "/images/saree/saree 8.png",
    "badge": "Exclusive",
    "description": "Masterfully handwoven drape showcasing traditional Indian textile craftsmanship. Complete with unstitched matching blouse piece.",
    "sizes": [
      "Free Size (6.3m with Blouse)"
    ],
    "isSample": false
  },
  {
    "id": "sh-sar-12",
    "name": "Ivory & Antique Zari Royal Saree",
    "category": "Sarees",
    "fabric": "Traditional Banarasi Brocade with Blouse",
    "price": 16200,
    "originalPrice": 20000,
    "image": "/images/saree/saree 9.png",
    "badge": "Bestseller",
    "description": "Masterfully handwoven drape showcasing traditional Indian textile craftsmanship. Complete with unstitched matching blouse piece.",
    "sizes": [
      "Free Size (6.3m with Blouse)"
    ],
    "isSample": false
  },
  {
    "id": "sh-sar-13",
    "name": "Olive Moss Tussar Temple Border Saree",
    "category": "Sarees",
    "fabric": "Handloom Tussar with Contrast Pallu",
    "price": 12800,
    "originalPrice": 15500,
    "image": "/images/saree/saree1.png",
    "badge": "Handloom",
    "description": "Masterfully handwoven drape showcasing traditional Indian textile craftsmanship. Complete with unstitched matching blouse piece.",
    "sizes": [
      "Free Size (6.3m with Blouse)"
    ],
    "isSample": false
  }
];

export const DRESS_PRODUCTS: Product[] = [
  {
    "id": "sh-dr-01",
    "name": "Flared Anarkali Festive Gown",
    "category": "Dresses",
    "fabric": "Pure Chanderi Silk with Organza Dupatta",
    "price": 3499,
    "originalPrice": 4400,
    "image": "/images/dress/file_0000000006b0821191833494d124292f.png",
    "badge": "New",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-02",
    "name": "Chanderi Layered Indo-Western Dress",
    "category": "Dresses",
    "fabric": "Georgette with Resham Embroidery",
    "price": 3729,
    "originalPrice": 4700,
    "image": "/images/dress/file_00000000088c8211afb7090795b09648.png",
    "badge": "Trending",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-03",
    "name": "Georgette Floral Tiered Maxi Dress",
    "category": "Dresses",
    "fabric": "Breathable Mulmul with Hand-Printed Motifs",
    "price": 3959,
    "originalPrice": 4900,
    "image": "/images/dress/file_000000000a408211b7083aa4b9643594.png",
    "badge": "Bestseller",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-04",
    "name": "Embroidered Yoke Angrakha Dress",
    "category": "Dresses",
    "fabric": "Handspun Raw Silk with Tonal Detailing",
    "price": 4189,
    "originalPrice": 5200,
    "image": "/images/dress/file_0000000011d88211a19edcb8dc63bb98.png",
    "badge": "Popular",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-05",
    "name": "Pastel Scalloped Festive Ensemble",
    "category": "Dresses",
    "fabric": "Chanderi Blend with Scalloped Borders",
    "price": 4419,
    "originalPrice": 5500,
    "image": "/images/dress/file_00000000149482118cafca2e068e6acc.png",
    "badge": "Festive Edit",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-06",
    "name": "Pure Mulmul Hand-Printed Tiered Dress",
    "category": "Dresses",
    "fabric": "Fine Cotton Mulmul with Gota Detailing",
    "price": 4649,
    "originalPrice": 5800,
    "image": "/images/dress/file_000000001d608211bf0c0dcebf475b6c.png",
    "badge": "Exclusive",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-07",
    "name": "Rose Pink Pleated Ethnic Gown",
    "category": "Dresses",
    "fabric": "Georgette with Sequin Highlights",
    "price": 4879,
    "originalPrice": 6100,
    "image": "/images/dress/file_000000001ddc821188dd2a40f3255950.png",
    "badge": "New",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-08",
    "name": "Forest Emerald Floor-Length Dress",
    "category": "Dresses",
    "fabric": "Pure Chanderi with Hand Needlework",
    "price": 5109,
    "originalPrice": 6400,
    "image": "/images/dress/file_00000000208882118242a2b699fa4f21.png",
    "badge": "Trending",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-09",
    "name": "Mustard Festive Kalidar Dress",
    "category": "Dresses",
    "fabric": "Pure Chanderi Silk with Organza Dupatta",
    "price": 5339,
    "originalPrice": 6700,
    "image": "/images/dress/file_0000000021cc8211b382790538bf24f5.png",
    "badge": "Bestseller",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-10",
    "name": "Wine Embellished Festive Gown",
    "category": "Dresses",
    "fabric": "Georgette with Resham Embroidery",
    "price": 5569,
    "originalPrice": 7000,
    "image": "/images/dress/file_000000003ba08211abe2582f258fcb37.png",
    "badge": "Popular",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-11",
    "name": "Ivory Resham Threadwork Dress",
    "category": "Dresses",
    "fabric": "Breathable Mulmul with Hand-Printed Motifs",
    "price": 5799,
    "originalPrice": 7200,
    "image": "/images/dress/file_0000000046b48211a105960caa550f6d.png",
    "badge": "Festive Edit",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-12",
    "name": "Sky Blue Mirror-Work Maxi Dress",
    "category": "Dresses",
    "fabric": "Handspun Raw Silk with Tonal Detailing",
    "price": 6029,
    "originalPrice": 7500,
    "image": "/images/dress/file_00000000559881f6b91068cae37ceaf4.png",
    "badge": "Exclusive",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-13",
    "name": "Sunset Peach Gathered Tunic Dress",
    "category": "Dresses",
    "fabric": "Chanderi Blend with Scalloped Borders",
    "price": 6259,
    "originalPrice": 7800,
    "image": "/images/dress/file_0000000059648211b8e5d56a56555bd2.png",
    "badge": "New",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-14",
    "name": "Royal Plum Embroidered Silhouette",
    "category": "Dresses",
    "fabric": "Fine Cotton Mulmul with Gota Detailing",
    "price": 6489,
    "originalPrice": 8100,
    "image": "/images/dress/file_000000005be88230bebc1fe0ae46f1a8.png",
    "badge": "Trending",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-15",
    "name": "Maroon Velvet Yoke Long Dress",
    "category": "Dresses",
    "fabric": "Georgette with Sequin Highlights",
    "price": 6719,
    "originalPrice": 8400,
    "image": "/images/dress/file_0000000065648211b047c0e3d18856b7.png",
    "badge": "Bestseller",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-16",
    "name": "Sage Green Botanical Print Gown",
    "category": "Dresses",
    "fabric": "Pure Chanderi with Hand Needlework",
    "price": 6949,
    "originalPrice": 8700,
    "image": "/images/dress/file_00000000767c8211b6fd6e603fc69047.png",
    "badge": "Popular",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-17",
    "name": "Dusty Rose Scalloped Border Dress",
    "category": "Dresses",
    "fabric": "Pure Chanderi Silk with Organza Dupatta",
    "price": 7179,
    "originalPrice": 9000,
    "image": "/images/dress/file_00000000873481f4b39e194c187ee674.png",
    "badge": "Festive Edit",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-18",
    "name": "Turquoise Blue Tiered Festive Dress",
    "category": "Dresses",
    "fabric": "Georgette with Resham Embroidery",
    "price": 7409,
    "originalPrice": 9300,
    "image": "/images/dress/file_00000000874c8211a2fcd0cd814f9dfd.png",
    "badge": "Exclusive",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-19",
    "name": "Champagne Gold Gota Patti Dress",
    "category": "Dresses",
    "fabric": "Breathable Mulmul with Hand-Printed Motifs",
    "price": 7639,
    "originalPrice": 9500,
    "image": "/images/dress/file_0000000096088211a89759a0262bb022.png",
    "badge": "New",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-20",
    "name": "Lavender Mist Silk Chiffon Dress",
    "category": "Dresses",
    "fabric": "Handspun Raw Silk with Tonal Detailing",
    "price": 7869,
    "originalPrice": 9800,
    "image": "/images/dress/file_00000000a3788211af21fb7981604886.png",
    "badge": "Trending",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-21",
    "name": "Rust Orange Traditional Kalidar Dress",
    "category": "Dresses",
    "fabric": "Chanderi Blend with Scalloped Borders",
    "price": 3599,
    "originalPrice": 4500,
    "image": "/images/dress/file_00000000ae4081f583fe6f203ed72bd7.png",
    "badge": "Bestseller",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-22",
    "name": "Teal Blue Asymmetrical Hem Dress",
    "category": "Dresses",
    "fabric": "Fine Cotton Mulmul with Gota Detailing",
    "price": 3829,
    "originalPrice": 4800,
    "image": "/images/dress/file_00000000b16c8211b02bf3ca4a23c700.png",
    "badge": "Popular",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-23",
    "name": "Coral Floral Handblock Print Dress",
    "category": "Dresses",
    "fabric": "Georgette with Sequin Highlights",
    "price": 4059,
    "originalPrice": 5100,
    "image": "/images/dress/file_00000000b6f88211b6909426b18102ab.png",
    "badge": "Festive Edit",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-24",
    "name": "Midnight Navy Sequinned Maxi Dress",
    "category": "Dresses",
    "fabric": "Pure Chanderi with Hand Needlework",
    "price": 4289,
    "originalPrice": 5400,
    "image": "/images/dress/file_00000000cd1082119eecc16e52638a88.png",
    "badge": "Exclusive",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-25",
    "name": "Powder Blue Embroidered Gown",
    "category": "Dresses",
    "fabric": "Pure Chanderi Silk with Organza Dupatta",
    "price": 4519,
    "originalPrice": 5600,
    "image": "/images/dress/file_00000000d59c8211ac292cbad22f23f8.png",
    "badge": "New",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-26",
    "name": "Charcoal Gold Embellished Dress",
    "category": "Dresses",
    "fabric": "Georgette with Resham Embroidery",
    "price": 4749,
    "originalPrice": 5900,
    "image": "/images/dress/file_00000000da6481f5ba5210433be4dac6.png",
    "badge": "Trending",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-27",
    "name": "Mauve Silk Flared Occasion Dress",
    "category": "Dresses",
    "fabric": "Breathable Mulmul with Hand-Printed Motifs",
    "price": 4979,
    "originalPrice": 6200,
    "image": "/images/dress/file_00000000dd4c820cbc5c685ea53702b3.png",
    "badge": "Bestseller",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  },
  {
    "id": "sh-dr-28",
    "name": "Classic Emerald Pleated Ethnic Gown",
    "category": "Dresses",
    "fabric": "Handspun Raw Silk with Tonal Detailing",
    "price": 5209,
    "originalPrice": 6500,
    "image": "/images/dress/file_00000000fe6881f58e4961abc52b90ec.png",
    "badge": "Popular",
    "description": "Contemporary ethnic silhouette combining classic craftsmanship with effortless modern elegance. Tailored for festive gatherings and celebrations.",
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isSample": false
  }
];

export const KURTI_PRODUCTS: Product[] = [
  {
    "id": "sh-kt-01",
    "name": "Lucknowi Shadow Chikankari Kurti",
    "category": "Kurtis",
    "fabric": "Breathable Mulmul with Shadow Needlework",
    "price": 1499,
    "originalPrice": 1900,
    "image": "/images/kurtis/DocScanner 12 Oct 2026 10-51 am-1(201621346495824).jpg",
    "badge": "Bestseller",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-02",
    "name": "Handloom Chanderi Kalidar Kurti",
    "category": "Kurtis",
    "fabric": "Pure Cotton with Handblock Prints",
    "price": 1629,
    "originalPrice": 2100,
    "image": "/images/kurtis/DocScanner 12 Oct 2026 10-54 am-1(201603894398192).jpg",
    "badge": "Trending",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-03",
    "name": "Pure Cotton Floral Handblock Kurti",
    "category": "Kurtis",
    "fabric": "Chanderi Silk with Resham Embroidery",
    "price": 1759,
    "originalPrice": 2300,
    "image": "/images/kurtis/DocScanner 12 Oct 2026 11-03 am-1(202046716074294).jpg",
    "badge": "Popular",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-04",
    "name": "Pastel Scalloped Neckline Tunic",
    "category": "Kurtis",
    "fabric": "Lightweight Linen Cotton Blend",
    "price": 1889,
    "originalPrice": 2500,
    "image": "/images/kurtis/file_0000000005188210b4f6324c92ec78a3.png",
    "badge": "Fresh Arrival",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-05",
    "name": "Zari Selvedge Straight Cut Kurti",
    "category": "Kurtis",
    "fabric": "Modal Silk with Scalloped Yoke",
    "price": 2019,
    "originalPrice": 2600,
    "image": "/images/kurtis/file_00000000116c8210bce9edbb297af161.png",
    "badge": "Handcrafted",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-06",
    "name": "Bandhani Printed Festive Kurti",
    "category": "Kurtis",
    "fabric": "Handloom Slub Cotton with Zari Piping",
    "price": 2149,
    "originalPrice": 2800,
    "image": "/images/kurtis/file_00000000167c81f5a70ecb86fb57fcc6.png",
    "badge": "New",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-07",
    "name": "Mulmul A-Line Embroidered Kurti",
    "category": "Kurtis",
    "fabric": "Breathable Mulmul with Shadow Needlework",
    "price": 2279,
    "originalPrice": 3000,
    "image": "/images/kurtis/file_000000001af481f5aa60d8523c647e3b.png",
    "badge": "Bestseller",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-08",
    "name": "V-Neck Floral Threadwork Kurti",
    "category": "Kurtis",
    "fabric": "Pure Cotton with Handblock Prints",
    "price": 2409,
    "originalPrice": 3100,
    "image": "/images/kurtis/file_0000000021f0821191c81e39f39fcb75.png",
    "badge": "Trending",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-09",
    "name": "Saffron Resham Work Straight Kurti",
    "category": "Kurtis",
    "fabric": "Chanderi Silk with Resham Embroidery",
    "price": 2539,
    "originalPrice": 3300,
    "image": "/images/kurtis/file_0000000031ac82118b59f28a18bb26ef.png",
    "badge": "Popular",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-10",
    "name": "Blush Pink Mirror Detailing Kurti",
    "category": "Kurtis",
    "fabric": "Lightweight Linen Cotton Blend",
    "price": 2669,
    "originalPrice": 3500,
    "image": "/images/kurtis/file_000000003c388210af30dc0a0c54053f.png",
    "badge": "Fresh Arrival",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-11",
    "name": "Deep Navy Gold Foil Kurti",
    "category": "Kurtis",
    "fabric": "Modal Silk with Scalloped Yoke",
    "price": 2799,
    "originalPrice": 3600,
    "image": "/images/kurtis/file_000000003f2481f4b0a1bd77c5a7c955.png",
    "badge": "Handcrafted",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-12",
    "name": "Olive Green Cotton Slub Kurti",
    "category": "Kurtis",
    "fabric": "Handloom Slub Cotton with Zari Piping",
    "price": 2929,
    "originalPrice": 3800,
    "image": "/images/kurtis/file_0000000046988211a3e1218b861bfd46.png",
    "badge": "New",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-13",
    "name": "Ivory Shadow Needlecraft Kurti",
    "category": "Kurtis",
    "fabric": "Breathable Mulmul with Shadow Needlework",
    "price": 3059,
    "originalPrice": 4000,
    "image": "/images/kurtis/file_0000000046a48211a7b0392da6ed99b7.png",
    "badge": "Bestseller",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-14",
    "name": "Mustard Floral Jaal Kalidar Kurti",
    "category": "Kurtis",
    "fabric": "Pure Cotton with Handblock Prints",
    "price": 3189,
    "originalPrice": 4100,
    "image": "/images/kurtis/file_0000000047b08211877e6ec3f473799f.png",
    "badge": "Trending",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-15",
    "name": "Sky Blue Scalloped Hem Kurti",
    "category": "Kurtis",
    "fabric": "Chanderi Silk with Resham Embroidery",
    "price": 3319,
    "originalPrice": 4300,
    "image": "/images/kurtis/file_00000000483c8210a78b53855b87f666.png",
    "badge": "Popular",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-16",
    "name": "Rose Quartz Pintuck Kurti",
    "category": "Kurtis",
    "fabric": "Lightweight Linen Cotton Blend",
    "price": 3449,
    "originalPrice": 4500,
    "image": "/images/kurtis/file_000000005b4482118aaed35afeb9a6aa.png",
    "badge": "Fresh Arrival",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-17",
    "name": "Peacock Teal Gota Patti Kurti",
    "category": "Kurtis",
    "fabric": "Modal Silk with Scalloped Yoke",
    "price": 3579,
    "originalPrice": 4700,
    "image": "/images/kurtis/file_000000006094821196be7697e11bdcf1.png",
    "badge": "Handcrafted",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-18",
    "name": "Lilac Pastel Embroidered Kurti",
    "category": "Kurtis",
    "fabric": "Handloom Slub Cotton with Zari Piping",
    "price": 3709,
    "originalPrice": 4800,
    "image": "/images/kurtis/file_0000000063ac81f895c778554d18dda4.png",
    "badge": "New",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-19",
    "name": "Rust Orange Traditional Tunic",
    "category": "Kurtis",
    "fabric": "Breathable Mulmul with Shadow Needlework",
    "price": 3839,
    "originalPrice": 5000,
    "image": "/images/kurtis/file_000000006dac824695ecf7b847a02f9e.png",
    "badge": "Bestseller",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-20",
    "name": "Mint Green Floral Breathable Kurti",
    "category": "Kurtis",
    "fabric": "Pure Cotton with Handblock Prints",
    "price": 3969,
    "originalPrice": 5200,
    "image": "/images/kurtis/file_00000000710c8211adc8554ca1d45220.png",
    "badge": "Trending",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-21",
    "name": "Classic Black & Gold Accent Kurti",
    "category": "Kurtis",
    "fabric": "Chanderi Silk with Resham Embroidery",
    "price": 1599,
    "originalPrice": 2100,
    "image": "/images/kurtis/file_0000000072e88211a9fde8474e438206.png",
    "badge": "Popular",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-22",
    "name": "Coral Peach Resham Embroidered Kurti",
    "category": "Kurtis",
    "fabric": "Lightweight Linen Cotton Blend",
    "price": 1729,
    "originalPrice": 2200,
    "image": "/images/kurtis/file_0000000079308211909318224f7e4696.png",
    "badge": "Fresh Arrival",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-23",
    "name": "Wine Red Festive Straight Kurti",
    "category": "Kurtis",
    "fabric": "Modal Silk with Scalloped Yoke",
    "price": 1859,
    "originalPrice": 2400,
    "image": "/images/kurtis/file_000000007e608211a270ec093a5b8d17.png",
    "badge": "Handcrafted",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-24",
    "name": "Sun Gold Handcrafted Kurti",
    "category": "Kurtis",
    "fabric": "Handloom Slub Cotton with Zari Piping",
    "price": 1989,
    "originalPrice": 2600,
    "image": "/images/kurtis/file_0000000083548210ae74b1e8564f3cef.png",
    "badge": "New",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-25",
    "name": "Powder Blue Handloom Cotton Kurti",
    "category": "Kurtis",
    "fabric": "Breathable Mulmul with Shadow Needlework",
    "price": 2119,
    "originalPrice": 2800,
    "image": "/images/kurtis/file_00000000888082108e96ad42a17d29c1.png",
    "badge": "Bestseller",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-26",
    "name": "Emerald Green Embroidered Kurti",
    "category": "Kurtis",
    "fabric": "Pure Cotton with Handblock Prints",
    "price": 2249,
    "originalPrice": 2900,
    "image": "/images/kurtis/file_000000008b7c8211964d43782bc48aa2.png",
    "badge": "Trending",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-27",
    "name": "Soft Lemon Chanderi Kurti",
    "category": "Kurtis",
    "fabric": "Chanderi Silk with Resham Embroidery",
    "price": 2379,
    "originalPrice": 3100,
    "image": "/images/kurtis/file_00000000a96c81f4b195644a57f48ef4.png",
    "badge": "Popular",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-28",
    "name": "Dusty Mauve Scalloped Neckline Kurti",
    "category": "Kurtis",
    "fabric": "Lightweight Linen Cotton Blend",
    "price": 2509,
    "originalPrice": 3300,
    "image": "/images/kurtis/file_00000000b87c82109e71f971d245887e.png",
    "badge": "Fresh Arrival",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-29",
    "name": "Ocean Teal Straight Cut Kurti",
    "category": "Kurtis",
    "fabric": "Modal Silk with Scalloped Yoke",
    "price": 2639,
    "originalPrice": 3400,
    "image": "/images/kurtis/file_00000000bd6081f5bc203a009a3dc075.png",
    "badge": "Handcrafted",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-30",
    "name": "Charcoal Grey Subtle Zari Kurti",
    "category": "Kurtis",
    "fabric": "Handloom Slub Cotton with Zari Piping",
    "price": 2769,
    "originalPrice": 3600,
    "image": "/images/kurtis/file_00000000c9cc8211987f7a2b2f7974f9.png",
    "badge": "New",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-31",
    "name": "Ruby Crimson Kalidar Kurti",
    "category": "Kurtis",
    "fabric": "Breathable Mulmul with Shadow Needlework",
    "price": 2899,
    "originalPrice": 3800,
    "image": "/images/kurtis/file_00000000cb9c8211b681cbf08c2f280c.png",
    "badge": "Bestseller",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-32",
    "name": "Natural Ivory Handblock Tunic",
    "category": "Kurtis",
    "fabric": "Pure Cotton with Handblock Prints",
    "price": 3029,
    "originalPrice": 3900,
    "image": "/images/kurtis/file_00000000d7508243ac1f4b6831910ad2.png",
    "badge": "Trending",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-33",
    "name": "Aqua Marine Floral Kurti",
    "category": "Kurtis",
    "fabric": "Chanderi Silk with Resham Embroidery",
    "price": 3159,
    "originalPrice": 4100,
    "image": "/images/kurtis/file_00000000dbf8820ebd13bc6562ecdf3c.png",
    "badge": "Popular",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-34",
    "name": "Tangerine Thread Embroidered Kurti",
    "category": "Kurtis",
    "fabric": "Lightweight Linen Cotton Blend",
    "price": 3289,
    "originalPrice": 4300,
    "image": "/images/kurtis/file_00000000ea408211b23e45797e68b790.png",
    "badge": "Fresh Arrival",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-35",
    "name": "Pistachio Green Everyday Kurti",
    "category": "Kurtis",
    "fabric": "Modal Silk with Scalloped Yoke",
    "price": 3419,
    "originalPrice": 4400,
    "image": "/images/kurtis/file_00000000eb6c8211995e39c13b7798e5.png",
    "badge": "Handcrafted",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-36",
    "name": "Golden Ochre Festive Kurti",
    "category": "Kurtis",
    "fabric": "Handloom Slub Cotton with Zari Piping",
    "price": 3549,
    "originalPrice": 4600,
    "image": "/images/kurtis/file_00000000fc8081fdba46bc73aeba0bac.png",
    "badge": "New",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  },
  {
    "id": "sh-kt-37",
    "name": "Midnight Indigo Handloom Kurti",
    "category": "Kurtis",
    "fabric": "Breathable Mulmul with Shadow Needlework",
    "price": 3679,
    "originalPrice": 4800,
    "image": "/images/kurtis/file_00000000ff8c81f5a3b564ac366534c9.png",
    "badge": "Bestseller",
    "description": "Artisan crafted ethnic kurti designed for airy all-day comfort and timeless Indian charm. Pairs beautifully with trousers, palazzos, or skirts.",
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "XXL",
      "3XL"
    ],
    "isSample": false
  }
];

// Complete Catalog of all 78 Products
export const ALL_PRODUCTS: Product[] = [
  ...SAREE_PRODUCTS,
  ...DRESS_PRODUCTS,
  ...KURTI_PRODUCTS,
];

// Sample/Featured subsets for hero and highlights
export const TRENDING_PRODUCTS: Product[] = [
  SAREE_PRODUCTS[0],
  DRESS_PRODUCTS[0],
  KURTI_PRODUCTS[0],
  SAREE_PRODUCTS[2],
  DRESS_PRODUCTS[1],
  KURTI_PRODUCTS[2],
  SAREE_PRODUCTS[9],
  DRESS_PRODUCTS[6],
];

export const FRESH_ARRIVALS_PRODUCTS: Product[] = [
  SAREE_PRODUCTS[1],
  DRESS_PRODUCTS[2],
  KURTI_PRODUCTS[1],
  SAREE_PRODUCTS[6],
];

export const SAMPLE_PRODUCTS: Product[] = ALL_PRODUCTS;

// Client Testimonials & Social Proof (#ShivohamDiaries)
export interface CustomerReview {
  id: string;
  name: string;
  city: string;
  rating: number;
  productTitle: string;
  comment: string;
  date: string;
}

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    name: "Roshni Mehta",
    city: "Ahmedabad",
    rating: 5,
    productTitle: "Royal Crimson Zari Banarasi Silk Saree",
    comment:
      "The zari craftsmanship is simply breathtaking! The fabric has a natural royal luster, and the unstitched blouse piece had ample fabric for custom designer tailoring.",
    date: "Verified Buyer • Oct 2026",
  },
  {
    id: "rev-2",
    name: "Pooja Trivedi",
    city: "Surat",
    rating: 5,
    productTitle: "Flared Anarkali Festive Gown",
    comment:
      "Ordered this for my brother's sangeet. The fit is phenomenal, and the draping adds such high-end boutique elegance. Shivoham is my new favorite brand!",
    date: "Verified Buyer • Oct 2026",
  },
  {
    id: "rev-3",
    name: "Ananya Sharma",
    city: "Mumbai",
    rating: 5,
    productTitle: "Lucknowi Shadow Chikankari Kurti",
    comment:
      "So lightweight and airy! You can immediately tell it is authentic handcrafted needlework. Fast delivery and luxury packaging too.",
    date: "Verified Buyer • Sep 2026",
  },
];
