import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const filePath = path.join(__dirname, "../../../../data/Analytics_Test_Data.json");
  const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  console.log(`📂 Seeding ${jsonData.length} documents...`);

  for (const doc of jsonData) {
    await prisma.document.upsert({
      where: { id: doc._id },
      update: {},
      create: {
        id: doc._id,
        name: doc.name,
        filePath: doc.filePath,
        fileType: doc.fileType,
        fileSize: parseInt(doc.fileSize?.["$numberLong"] || "0"),
        status: doc.status,
        organizationId: doc.organizationId,
        departmentId: doc.departmentId,
        createdAt: new Date(doc.createdAt?.["$date"]),
        updatedAt: new Date(doc.updatedAt?.["$date"]),
      },
    });
  }

  console.log("✅ Document data seeded successfully!");
}

main()
  .catch((e) => console.error("❌ Error seeding:", e))
  .finally(async () => await prisma.$disconnect());
