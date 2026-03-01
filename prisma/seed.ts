// prisma/seed.ts
import { prisma } from "../src/lib/prisma";
import { dataGames } from "../src/modules/game/data";
import { dataCategories } from "../src/modules/category/data";

async function main() {
  console.log("🚀 Memulai proses input data ke database...");

  // 1. Input Categories
  for (const cat of dataCategories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name },
      create: { name: cat.name, slug: cat.slug },
    });
  }

  // 2. Input Games & Hubungkan ke Category
  for (const game of dataGames) {
    const { categorySlug, ...gameBody } = game;

    const result = await prisma.game.upsert({
      where: { slug: game.slug },
      update: {
        ...gameBody,
        category: { connect: { slug: categorySlug } },
      },
      create: {
        ...gameBody,
        category: { connect: { slug: categorySlug } },
      },
    });
    console.log(`✅ Game Berhasil Masuk: ${result.name}`);
  }

  console.log("🏁 Semua data sudah masuk ke database!");
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
