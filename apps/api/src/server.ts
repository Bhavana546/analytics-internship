import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// 🩺 Health Check
app.get("/_health", (req, res) => res.json({ status: "ok" }));

// 📊 /stats — overall document statistics
// 📊 Document Analytics: Stats Overview
app.get("/stats", async (req, res) => {
  try {
    const totalDocuments = await prisma.document.count();
    const processedDocuments = await prisma.document.count({
      where: { status: "processed" },
    });
    const pendingDocuments = await prisma.document.count({
      where: { status: "pending" },
    });
    const avgFileSize = await prisma.document.aggregate({
      _avg: { fileSize: true },
    });

    res.json({
      totalDocuments,
      processedDocuments,
      pendingDocuments,
      avgFileSize: avgFileSize._avg.fileSize || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});


// 🗂 /file-types — group documents by type
app.get("/file-types", async (req, res) => {
  try {
    const fileTypes = await prisma.document.groupBy({
      by: ["fileType"],
      _count: { fileType: true },
    });
    res.json(fileTypes);
  } catch (err) {
    console.error("❌ /file-types error:", err);
    res.status(500).json({ error: "Failed to fetch file types" });
  }
});

// 📁 /status — count documents by status
app.get("/status", async (req, res) => {
  try {
    const statusData = await prisma.document.groupBy({
      by: ["status"],
      _count: { status: true },
    });
    res.json(statusData);
  } catch (err) {
    console.error("❌ /status error:", err);
    res.status(500).json({ error: "Failed to fetch status" });
  }
});

// 🕒 /recent — get the 10 most recent uploads
app.get("/recent", async (req, res) => {
  try {
    const recent = await prisma.document.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    res.json(recent);
  } catch (err) {
    console.error("❌ /recent error:", err);
    res.status(500).json({ error: "Failed to fetch recent documents" });
  }
});

// 🏢 /organizations — group by organizationId
app.get("/organizations", async (req, res) => {
  try {
    const orgs = await prisma.document.groupBy({
      by: ["organizationId"],
      _count: { organizationId: true },
    });
    res.json(orgs);
  } catch (err) {
    console.error("❌ /organizations error:", err);
    res.status(500).json({ error: "Failed to fetch organizations" });
  }
});

// 🧩 /departments — group by departmentId
app.get("/departments", async (req, res) => {
  try {
    const departments = await prisma.document.groupBy({
      by: ["departmentId"],
      _count: { departmentId: true },
    });
    res.json(departments);
  } catch (err) {
    console.error("❌ /departments error:", err);
    res.status(500).json({ error: "Failed to fetch departments" });
  }
});

// 📜 /documents — get all (paginated optional)
app.get("/documents", async (req, res) => {
  try {
    const docs = await prisma.document.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    res.json(docs);
  } catch (err) {
    console.error("❌ /documents error:", err);
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

// 🧠 /chat-with-data — placeholder for future AI
app.post("/chat-with-data", async (req, res) => {
  try {
    const { query } = req.body;
    const VANNA = process.env.VANNA_API_BASE_URL || "http://localhost:8000";
    const vRes = await axios.post(`${VANNA}/chat-with-data`, { query });
    res.json(vRes.data);
  } catch (err: any) {
    console.error("Vanna proxy error:", err.message);
    res.status(500).json({ error: "Chat with data failed" });
  }
});

// 🏠 Root route
app.get("/", (req, res) => {
  res.send("✅ Analytics API is running successfully!");
});

// 🚀 Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ API running on port ${PORT}`));
