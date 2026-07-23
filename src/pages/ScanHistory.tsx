import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import {
  ShieldCheck,
  AlertTriangle,
  Building2,
  Calendar,
} from "lucide-react";

function ScanHistory() {
  const [history, setHistory] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      const q = query(
        collection(db, "jobScans"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const jobs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setHistory(jobs);
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8">

      <h1 className="text-4xl font-bold mb-10">
        Scan History
      </h1>
      <div className="mb-8">

  <input
    type="text"
    placeholder="Search company..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full bg-[#111827] border border-gray-700 rounded-xl px-5 py-4 text-white outline-none focus:border-violet-500"
  />

</div>

      <div className="grid gap-6">

        {history
         .filter((job: any) =>
           job.company
             ?.toLowerCase()
             .includes(search.toLowerCase())
         )
         .map((job: any) => (

          <div
            key={job.id}
            className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-violet-500 transition"
          >

            <div className="flex justify-between">

              <div>

                <div className="flex items-center gap-3">

                  <Building2
                    className="text-blue-400"
                    size={24}
                  />

                  <h2 className="text-2xl font-bold">
                    {job.company}
                  </h2>

                </div>

                <div className="mt-6 space-y-3">

                  <div className="flex items-center gap-3">

                    <ShieldCheck
                      className="text-green-400"
                      size={20}
                    />

                    <p>
                      Trust Score:
                      <span className="text-green-400 font-bold ml-2">
                        {job.trustScore}/100
                      </span>
                    </p>

                  </div>

                  <div className="flex items-center gap-3">

                    <AlertTriangle
                      className="text-yellow-400"
                      size={20}
                    />

                    <p>
                      Risk:
                      <span
                        className={`ml-2 font-bold ${
                          job.risk === "HIGH"
                            ? "text-red-500"
                            : job.risk === "MEDIUM"
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                      >
                        {job.risk}
                      </span>
                    </p>

                  </div>

                  <div className="flex items-center gap-3">

                    <Calendar
                      className="text-violet-400"
                      size={20}
                    />

                    <p>
                      {job.createdAt?.toDate
                        ? job.createdAt.toDate().toLocaleString()
                        : "Unknown"}
                    </p>

                  </div>

                </div>

              </div>

              <div className="flex items-end">

                <button
                  onClick={() =>
                    alert(
                      `Company: ${job.company}
                
                Trust Score: ${job.trustScore}/100

                Risk: ${job.risk}

                AI Confidence: ${job.aiConfidence || 0}%`
                    )
                  }
                  className="bg-violet-600 hover:bg-violet-500 px-6 py-3 rounded-xl"
                >
                  View Report
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ScanHistory;