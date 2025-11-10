"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";


interface Stats {
  totalDocuments: number;
  processedDocuments: number;
  pendingDocuments: number;
  avgFileSize: number;
}

interface FileType {
  fileType: string;
  _count: { fileType: number };
}

interface OrgGroup {
  organizationId: string;
  _count: { organizationId: number };
}

interface DepartmentGroup {
  departmentId: string;
  _count: { departmentId: number };
}

interface Document {
  id: string;
  name: string;
  fileType: string;
  fileSize: number;
  status: string;
  createdAt: string;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [fileTypes, setFileTypes] = useState<FileType[]>([]);
  const [organizations, setOrganizations] = useState<OrgGroup[]>([]);
  const [departments, setDepartments] = useState<DepartmentGroup[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [statsRes, fileRes, orgRes, deptRes, docsRes] = await Promise.all([
          axios.get(`${API_BASE}/stats`),
          axios.get(`${API_BASE}/file-types`),
          axios.get(`${API_BASE}/organizations`),
          axios.get(`${API_BASE}/departments`),
          axios.get(`${API_BASE}/recent`),
        ]);
        setStats(statsRes.data);
        setFileTypes(fileRes.data);
        setOrganizations(orgRes.data);
        setDepartments(deptRes.data);
        setDocuments(docsRes.data);
      } catch (err) {
        console.error("Error loading dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) return <div className="p-10 text-center text-lg font-semibold">Loading Document Dashboard...</div>;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        📊 Document Analytics Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-gray-500">Total Documents</p>
          <h2 className="text-2xl font-bold">{stats?.totalDocuments ?? 0}</h2>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-gray-500">Processed</p>
          <h2 className="text-2xl font-bold">{stats?.processedDocuments ?? 0}</h2>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-gray-500">Pending</p>
          <h2 className="text-2xl font-bold">{stats?.pendingDocuments ?? 0}</h2>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <p className="text-gray-500">Avg File Size</p>
          <h2 className="text-2xl font-bold">{Math.round((stats?.avgFileSize ?? 0) / 1024)} KB</h2>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
        {/* File Type Distribution */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">File Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={fileTypes.map(f => ({
                  name: f.fileType,
                  value: f._count.fileType,
                }))}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {fileTypes.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF"][index % 5]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Organizations */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Documents by Organization</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={organizations.map(o => ({
              name: o.organizationId || "Unknown",
              count: o._count.organizationId,
            }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#4BC0C0" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Chart */}
      <div className="bg-white rounded-xl shadow p-6 mb-10">
        <h3 className="text-lg font-semibold mb-4">Documents by Department</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={departments.map(d => ({
            name: d.departmentId || "Unknown",
            count: d._count.departmentId,
          }))}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#9966FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Document Table */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Documents</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Type</th>
                <th className="py-2 px-4 border">Size (KB)</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Created</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border">{doc.name}</td>
                  <td className="py-2 px-4 border">{doc.fileType}</td>
                  <td className="py-2 px-4 border">{Math.round(doc.fileSize / 1024)}</td>
                  <td className="py-2 px-4 border">{doc.status}</td>
                  <td className="py-2 px-4 border">{new Date(doc.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
