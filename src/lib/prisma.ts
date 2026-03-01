import "dotenv/config";
import { Pool } from "pg"; // Tambahkan ini
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma"; // Hapus "/client" di ujungnya

const connectionString = `${process.env.DATABASE_URL}`;

// Adapter PG biasanya membutuhkan instance Pool
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export { prisma };
