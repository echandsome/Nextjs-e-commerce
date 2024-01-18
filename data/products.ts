import { TProductCard } from "@/types/common";
import { TProduct } from "@/types/product";

export const ProductsData: TProductCard[] = [
  {
    name: "Apple Airpods Pro",
    imgUrl: "/images/products/airpods1.jpg",
    price: 129.99,
    specs: ["Built-In Microphone", "3rd generation", "Water Resistant"],
    url: "",
  },
  {
    name: "Apple Watch Ultra 2",
    imgUrl: "/images/products/appleWatch1.jpg",
    price: 799.0,
    specs: ["GPS + Cellular", "Titanium", "49mm"],
    url: "",
  },
  {
    name: "ASUS ROG Laptop",
    imgUrl: "/images/products/asusRog1.jpg",
    price: 2499.99,
    dealPrice: 2149.99,
    specs: ["32GB RAM", "17inch display", "OLED Display"],
    url: "",
  },
  {
    name: "PS5 Controller",
    imgUrl: "/images/products/ps5Controller1.jpg",
    price: 69,
    specs: ["Bluetooth", "Version 2"],
    url: "",
  },
  {
    name: "Sony Alpha 7RV",
    imgUrl: "/images/products/sonyAlpha7_1.jpg",
    price: 4499,
    specs: ["Full Frame", "Body", "40MP"],
    dealPrice: 3699,
    url: "",
  },
  {
    name: "ASUS ROG Laptop",
    imgUrl: "/images/products/asusRog1.jpg",
    price: 2499.99,
    specs: ["32GB RAM", "17inch display", "OLED Display"],
    url: "",
  },
  {
    name: "Apple Airpods Pro",
    imgUrl: "/images/products/airpods1.jpg",
    price: 129.99,
    specs: ["Built-In Microphone", "3rd generation", "Water Resistant"],
    url: "",
  },
];

export const OneProduct: TProduct = {
  path: [
    { label: "Home", url: "/" },
    { label: "Products", url: "/category/" },
    { label: "Mobile", url: "/category/1" },
  ],
  board: {
    name: "Sony - PlayStation 5 - DualSense Wireless Controller - White",
    shortDesc: "Apple iPhone 12 Pro Max A2412 Dual SIM 256GB Mobile Phone",
    price: 215.99,
    dealDate: new Date("1970-01-01T12:40:00"),
    dealPrice: 185.95,
    options: [
      {
        optionName: "Storage Capacity:",
        options: ["64GB", "128GB", "256GB"],
        optionSelectedId: 0,
        type: "text",
      },
      {
        optionName: "",
        options: ["#484848", "#388EDD", "#7AC38F", "#ED4A4A", "#DD9D24"],
        optionSelectedId: 1,
        type: "color",
      },
    ],
  },
  specification: [
    {
      groupName: "Overall",
      specs: [
        {
          label: "Dimension",
          data: ["160.8 x 78.1 x 7.4 mm"],
        },
        {
          label: "SimCard",
          data: ["Nano Sim Cards (8.8 × 12.3 mm)"],
        },
        {
          label: "Weight",
          data: ["228 gram"],
        },
        {
          label: "Body Spec",
          data: [
            "Metal and Glass",
            "IP68 Standard",
            "Gorilla Glass",
            "Cover for display",
          ],
        },
        {
          label: "Special Features",
          data: [
            "Great for: Gaming, Photography, Selfie, Waterproof, Resistance Body, Face detection sensor",
          ],
        },
      ],
    },
    {
      groupName: "Display",
      specs: [
        {
          label: "Colored display",
          data: ["Yes"],
        },
        {
          label: "Touchscreen",
          data: ["Yes"],
        },
      ],
    },
    {
      groupName: "Camera",
      specs: [
        {
          label: "Front Camera",
          data: ["18MP", "CMOS Sensor"],
        },
        {
          label: "Back Camera",
          data: ["48MP"],
        },
      ],
    },
  ],
  gallery: [
    "ps5Controller1.jpg",
    "ps5Controller2.jpg",
    "ps5Controller3.jpg",
    "ps5Controller4.jpg",
  ],
  reviews: [
    {
      userName: "T. Mihai",
      userImage: "/images/icons/profileIcon.svg",
      date: new Date("1970-08-25"),
      likeNumber: 0,
      dislikeNumber: 0,
      isVerified: true,
      text: `It took awhile to find the right pillow. All of the ones I have tried were not "true" memory foam. Memory foam is dense and not light weight. So all of the other pillows were too soft and did not support my head correctly. I have slept so well on this pillow that am waking up in more pain because my apine is re-adjusting to its proper position`,
      advantages: ["Good Camera", "High quality", "OLED display"],
      disAdvantages: ["Have not a charger", "Bad quality Battery"],
    },
  ],
};
