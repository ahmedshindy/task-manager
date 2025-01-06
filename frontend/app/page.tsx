"use client";
import { useEffect, useState } from "react";
import axios from "../axios";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Task;
    direction: "ascending" | "descending";
  } | null>(null);

  useEffect(() => {
    axios
      .get("/tasks")
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tasks!", error);
      });
  }, []);

  const handleSort = (key: keyof Task) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (!sortConfig) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const filteredTasks = sortedTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-slate-200">
        Tasks
      </h1>
      <div className="max-w-6xl mx-auto bg-slate-800 shadow-md rounded-lg p-6">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full p-2 border border-slate-600 rounded bg-slate-700 text-slate-200 placeholder-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-800">
              <tr>
                {["id", "title", "description", "status"].map((key) => (
                  <th
                    key={key}
                    onClick={() => handleSort(key as keyof Task)}
                    className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-700"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    {sortConfig?.key === key && (
                      <span className="ml-2">
                        {sortConfig.direction === "ascending" ? "↑" : "↓"}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-slate-800 divide-y divide-slate-700">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-700">
                  <td
                    className={`px-6 py-4 text-sm ${
                      task.status === "completed"
                        ? "line-through text-slate-500"
                        : "text-slate-300"
                    }`}
                  >
                    {task.id}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      task.status === "completed"
                        ? "line-through text-slate-500"
                        : "text-slate-300"
                    }`}
                  >
                    {task.title}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm ${
                      task.status === "completed"
                        ? "line-through text-slate-500"
                        : "text-slate-300"
                    }`}
                  >
                    {task.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <select
                      // value={task.status}
                      className={`border rounded p-1 text-slate-300 border-slate-600 ${
                        task.status === "completed"
                          ? "bg-emerald-900 border-emerald-700"
                          : task.status === "in-progress"
                          ? "bg-amber-900 border-orange-500"
                          : "bg-slate-700"
                      }`}
                      defaultValue={task.status}
                      disabled
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
