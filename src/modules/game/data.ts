import { SeedGame } from "./schema";

export const dataGames: SeedGame[] = [
  {
    categorySlug: "marvel", // Tambahkan ini
    slug: "lego-marvel-super-heroes-2",
    name: "LEGO® Marvel Super Heroes 2",
    sku: "LG-MARVEL-02",
    price: 150000,
    stockQuantity: 25,
    imageUrl: "https://link-your-pic.com/marvel-2.jpg",
  },
  {
    categorySlug: "star-wars", // Tambahkan ini
    slug: "lego-star-wars-the-skywalker-saga",
    name: "LEGO® Star Wars™: The Skywalker Saga",
    sku: "LG-SW-SAGA",
    price: 450000,
    stockQuantity: 15,
    imageUrl: "https://link-your-pic.com/star-wars-saga.jpg",
  },
  {
    categorySlug: "harry-potter", // Tambahkan ini
    slug: "lego-harry-potter-collection",
    name: "LEGO® Harry Potter™ Collection",
    sku: "LG-HP-COLL",
    price: 250000,
    stockQuantity: 40,
    imageUrl: "https://link-your-pic.com/hp-collection.jpg",
  },
  {
    categorySlug: "city", // Tambahkan ini
    slug: "lego-city-undercover",
    name: "LEGO® City Undercover",
    sku: "LG-CITY-UC",
    price: 180000,
    stockQuantity: 10,
    imageUrl: "https://link-your-pic.com/city-undercover.jpg",
  },
  {
    categorySlug: "batman", // Tambahkan ini
    slug: "lego-batman-3-beyond-gotham",
    name: "LEGO® Batman™ 3: Beyond Gotham",
    sku: "LG-BAT-03",
    price: 125000,
    stockQuantity: 50,
    imageUrl: "https://link-your-pic.com/batman-3.jpg",
  },
];
