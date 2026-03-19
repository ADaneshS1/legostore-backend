import { prisma } from "../src/lib/prisma";
import { dataGames } from "../src/modules/game/data";
import { dataCategories } from "../src/modules/category/data";

async function main() {
  console.log("🚀 Starting data seeding process...");

  // 1. Input Categories
  for (const category of dataCategories) {
    const upsertedCategory = await prisma.category.upsert({
      where: { slug: category.slug },
      update: { name: category.name },
      create: { name: category.name, slug: category.slug },
    });

    console.log(`Category: ${upsertedCategory.name}`);
  }

  // 2. Input Games & Connect to Category
  for (const game of dataGames) {
    const { categorySlug, ...gameBody } = game;

    const upsertedGame = await prisma.game.upsert({
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

    console.log(`🎮 Game: ${upsertedGame.name}`);
  }
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
