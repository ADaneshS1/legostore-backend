import { Hono } from "hono";

export const legoGameRoute = new Hono();

legoGameRoute.get("/", (c) => {
  return c.json([
    {
      id: "LEGO-001",
      slug: "lego-marvel-super-heroes-2",
      name: "LEGO® Marvel Super Heroes 2",
      sku: "LG-MARVEL-02",
      price: 150000,
      stockQuantity: 25,
      imageUrl: "https://link-your-pic.com/marvel-2.jpg",
      createdAt: "2024-05-20T10:00:00Z",
      updatedAt: "2024-05-20T10:00:00Z",
    },
    {
      id: "LEGO-002",
      slug: "lego-star-wars-the-skywalker-saga",
      name: "LEGO® Star Wars™: The Skywalker Saga",
      sku: "LG-SW-SAGA",
      price: 450000,
      stockQuantity: 15,
      imageUrl: "https://link-your-pic.com/star-wars-saga.jpg",
      createdAt: "2024-06-10T09:00:00Z",
      updatedAt: "2024-06-10T09:00:00Z",
    },
    {
      id: "LEGO-003",
      slug: "lego-harry-potter-collection",
      name: "LEGO® Harry Potter™ Collection",
      sku: "LG-HP-COLL",
      price: 250000,
      stockQuantity: 40,
      imageUrl: "https://link-your-pic.com/hp-collection.jpg",
      createdAt: "2024-06-12T14:30:00Z",
      updatedAt: "2024-06-12T14:30:00Z",
    },
    {
      id: "LEGO-004",
      slug: "lego-city-undercover",
      name: "LEGO® City Undercover",
      sku: "LG-CITY-UC",
      price: 180000,
      stockQuantity: 10,
      imageUrl: "https://link-your-pic.com/city-undercover.jpg",
      createdAt: "2024-06-15T08:15:00Z",
      updatedAt: "2024-06-15T08:15:00Z",
    },
    {
      id: "LEGO-005",
      slug: "lego-batman-3-beyond-gotham",
      name: "LEGO® Batman™ 3: Beyond Gotham",
      sku: "LG-BAT-03",
      price: 125000,
      stockQuantity: 50,
      imageUrl: "https://link-your-pic.com/batman-3.jpg",
      createdAt: "2024-06-18T11:00:00Z",
      updatedAt: "2024-06-18T11:00:00Z",
    },
  ]);
});
