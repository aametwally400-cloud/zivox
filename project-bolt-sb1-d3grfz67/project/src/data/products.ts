export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  images: string[];
  category: string;
  rating: number;
  stockCount: number;
  features?: string[];
  specifications?: Record<string, string>;
}

export const products: Product[] = [
  {
    id: 1,
    name: "هودي أزرق فاتح - Skilz Store",
    description: "هودي عصري باللون الأزرق الفاتح مع تصميم أنيق وخامة عالية الجودة. مثالي للإطلالات الكاجوال اليومية.",
    price: 450,
    oldPrice: 550,
    images: [
      "/files_4725149-1750797314656-image.png"
    ],
    category: "hoodies",
    rating: 4.8,
    stockCount: 15,
    features: [
      "خامة قطنية عالية الجودة",
      "تصميم عصري ومريح",
      "متوفر بمقاسات مختلفة",
      "مناسب للفصول الباردة"
    ],
    specifications: {
      "العلامة التجارية": "Skilz Store",
      "المادة": "قطن مخلوط",
      "اللون": "أزرق فاتح",
      "المقاس": "متوسط",
      "العناية": "غسيل آلي"
    }
  },
  {
    id: 2,
    name: "هودي أسود كلاسيكي - Skilz Store",
    description: "هودي أسود أنيق بتصميم كلاسيكي مع شعار العلامة التجارية. قطعة أساسية في خزانة كل شخص عصري.",
    price: 420,
    oldPrice: 500,
    images: [
      "/files_4725149-1750797344849-image.png"
    ],
    category: "hoodies",
    rating: 4.9,
    stockCount: 20,
    features: [
      "لون أسود كلاسيكي",
      "تصميم بسيط وأنيق",
      "خامة مريحة ودافئة",
      "شعار العلامة التجارية"
    ],
    specifications: {
      "العلامة التجارية": "Skilz Store",
      "المادة": "قطن مخلوط",
      "اللون": "أسود",
      "المقاس": "متوسط",
      "العناية": "غسيل آلي"
    }
  },
  {
    id: 3,
    name: "هودي أسود مع طباعة خلفية - Skilz Store",
    description: "هودي أسود مميز مع طباعة فنية على الظهر ونص إنجليزي. تصميم فريد يجمع بين الأناقة والتميز.",
    price: 480,
    oldPrice: 580,
    images: [
      "/files_4725149-1750797358216-image.png"
    ],
    category: "hoodies",
    rating: 4.7,
    stockCount: 12,
    features: [
      "طباعة فنية مميزة على الظهر",
      "تصميم فريد وعصري",
      "خامة عالية الجودة",
      "مناسب للشباب العصري"
    ],
    specifications: {
      "العلامة التجارية": "Skilz Store",
      "المادة": "قطن مخلوط",
      "اللون": "أسود مع طباعة",
      "المقاس": "متوسط",
      "العناية": "غسيل آلي"
    }
  },
  {
    id: 4,
    name: "هودي أسود مع تصميم النار - Skilz Store",
    description: "هودي أسود بتصميم النار الأبيض المميز. قطعة جريئة وعصرية تناسب محبي التصاميم المختلفة.",
    price: 500,
    oldPrice: 600,
    images: [
      "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "hoodies",
    rating: 4.6,
    stockCount: 8,
    features: [
      "تصميم النار المميز",
      "طباعة عالية الجودة",
      "خامة مريحة ودافئة",
      "تصميم جريء وعصري"
    ],
    specifications: {
      "العلامة التجارية": "Skilz Store",
      "المادة": "قطن مخلوط",
      "اللون": "أسود مع طباعة بيضاء",
      "المقاس": "متوسط",
      "العناية": "غسيل آلي"
    }
  },
  {
    id: 5,
    name: "طقم رياضي أسود - Skilz Store",
    description: "طقم رياضي أنيق باللون الأسود يتكون من سويت شيرت وبنطلون رياضي. مثالي للرياضة والإطلالات الكاجوال.",
    price: 650,
    oldPrice: 750,
    images: [
      "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "sets",
    rating: 4.8,
    stockCount: 10,
    features: [
      "طقم كامل (توب + بنطلون)",
      "خامة رياضية مريحة",
      "تصميم عصري وأنيق",
      "مناسب للرياضة والكاجوال"
    ],
    specifications: {
      "العلامة التجارية": "Skilz Store",
      "المادة": "قطن رياضي",
      "اللون": "أسود",
      "المقاس": "متوسط",
      "العناية": "غسيل آلي"
    }
  },
  {
    id: 6,
    name: "تيشيرت أسود بسيط - Skilz Store",
    description: "تيشيرت أسود بسيط وأنيق، قطعة أساسية في خزانة الملابس. خامة قطنية مريحة ومناسبة لجميع المناسبات.",
    price: 180,
    images: [
      "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "tshirts",
    rating: 4.5,
    stockCount: 25,
    features: [
      "تصميم بسيط وكلاسيكي",
      "خامة قطنية 100%",
      "مريح للارتداء اليومي",
      "سهل التنسيق"
    ],
    specifications: {
      "العلامة التجارية": "Skilz Store",
      "المادة": "قطن 100%",
      "اللون": "أسود",
      "المقاس": "متوسط",
      "العناية": "غسيل آلي"
    }
  },
  {
    id: 7,
    name: "جينز أسود سليم فيت - Skilz Store",
    description: "بنطلون جينز أسود بقصة سليم فيت عصرية. خامة دنيم عالية الجودة مع تصميم مريح وأنيق.",
    price: 320,
    oldPrice: 400,
    images: [
      "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "pants",
    rating: 4.7,
    stockCount: 18,
    features: [
      "قصة سليم فيت عصرية",
      "خامة دنيم عالية الجودة",
      "لون أسود كلاسيكي",
      "مريح ومرن"
    ],
    specifications: {
      "العلامة التجارية": "Skilz Store",
      "المادة": "دنيم مخلوط",
      "اللون": "أسود",
      "المقاس": "32",
      "العناية": "غسيل آلي"
    }
  },
  {
    id: 8,
    name: "جاكيت جينز أزرق - Skilz Store",
    description: "جاكيت جينز كلاسيكي باللون الأزرق. قطعة خالدة تناسب جميع الفصول وتضيف لمسة عصرية لأي إطلالة.",
    price: 380,
    images: [
      "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "jackets",
    rating: 4.6,
    stockCount: 14,
    features: [
      "تصميم كلاسيكي خالد",
      "خامة دنيم متينة",
      "مناسب لجميع الفصول",
      "سهل التنسيق"
    ],
    specifications: {
      "العلامة التجارية": "Skilz Store",
      "المادة": "دنيم 100%",
      "اللون": "أزرق",
      "المقاس": "متوسط",
      "العناية": "غسيل آلي"
    }
  },
  {
    id: 9,
    name: "كاب أسود - Skilz Store",
    description: "كاب أسود أنيق مع شعار العلامة التجارية. إكسسوار مثالي لإكمال الإطلالة العصرية.",
    price: 120,
    images: [
      "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "accessories",
    rating: 4.4,
    stockCount: 30,
    features: [
      "تصميم بسيط وأنيق",
      "خامة عالية الجودة",
      "قابل للتعديل",
      "مناسب لجميع الأعمار"
    ],
    specifications: {
      "العلامة التجارية": "Skilz Store",
      "المادة": "قطن مخلوط",
      "اللون": "أسود",
      "المقاس": "قابل للتعديل",
      "العناية": "غسيل يدوي"
    }
  },
  {
    id: 10,
    name: "حقيبة ظهر سوداء - Skilz Store",
    description: "حقيبة ظهر عملية وأنيقة باللون الأسود. مثالية للجامعة، العمل، أو الاستخدام اليومي.",
    price: 280,
    oldPrice: 350,
    images: [
      "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    ],
    category: "accessories",
    rating: 4.7,
    stockCount: 12,
    features: [
      "تصميم عملي ومريح",
      "عدة جيوب للتنظيم",
      "خامة متينة ومقاومة للماء",
      "مناسبة للاستخدام اليومي"
    ],
    specifications: {
      "العلامة التجارية": "Skilz Store",
      "المادة": "نايلون مقاوم للماء",
      "اللون": "أسود",
      "السعة": "25 لتر",
      "العناية": "تنظيف بقطعة قماش مبللة"
    }
  }
];

// Helper function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

// Helper function to get a single product by ID
export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

// Helper function to get featured products (those with high ratings)
export const getFeaturedProducts = (limit = 4): Product[] => {
  return [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

// Helper function to get discounted products
export const getDiscountedProducts = (limit = 4): Product[] => {
  return products
    .filter(product => product.oldPrice !== undefined)
    .slice(0, limit);
};

// Get all available categories
export const getCategories = (): string[] => {
  const categoriesSet = new Set(products.map(product => product.category));
  return Array.from(categoriesSet);
};