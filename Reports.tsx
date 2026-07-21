import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import {
  FileText,
  Briefcase,
} from "lucide-react";

function Reports() {
  const [jobReports, setJobReports] = useState<any[]>([]);
  const [offerReports, setOfferReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const jobsSnapshot = await getDocs(
          query(
            collection(db, "jobScans"),
            orderBy("createdAt", "desc")
          )
        );

        const offersSnapshot = await getDocs(
          query(
            collection(db, "offerLetterScans"),
            orderBy("createdAt", "desc")
          )
        );

        setJobReports(
          jobsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );

        setOfferReports(
          offersSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (error) {
        console.error("Reports Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  return (
    <div className="min-h-screen bg-[#050816] text-white p-8">

      <h1 className="text-4xl font-bold mb-2">
        Reports
      </h1>

      <p className="text-gray-400 mb-10">
        AI generated reports from Job Verification and Offer Letter Analysis.
      </p>

      {/* Job Reports */}

      <div className="bg-[#111827] rounded-2xl border border-gray-800 p-6 mb-10">

        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="text-violet-400" />
          <h2 className="text-2xl font-bold">
            Job Verification Reports
          </h2>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : jobReports.length === 0 ? (
          <p className="text-gray-400">
            No Job Reports Found.
          </p>
        ) : (
          <div className="space-y-4">

            {jobReports.map((job: any) => (

              <div
                key={job.id}
                className="bg-[#1F2937] rounded-xl p-6 flex justify-between items-center"
              >

                <div>

                  <h3 className="font-bold text-xl">
                    {job.company}
                  </h3>

                  <p className="text-gray-400">
                    Trust Score: {job.trustScore}
                  </p>

                </div>

                <span
                  className={`px-5 py-2 rounded-full font-bold ${
                    job.risk === "HIGH"
                      ? "bg-red-600"
                      : job.risk === "MEDIUM"
                      ? "bg-yellow-500 text-black"
                      : "bg-green-600"
                  }`}
                >
                  {job.risk}
                </span>

              </div>

            ))}

          </div>
        )}

      </div>

      {/* Offer Letter Reports */}

      <div className="bg-[#111827] rounded-2xl border border-gray-800 p-6">

        <div className="flex items-center gap-3 mb-6">
          <FileText className="text-blue-400" />
          <h2 className="text-2xl font-bold">
            Offer Letter Reports
          </h2>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : offerReports.length === 0 ? (
          <p className="text-gray-400">
            No Offer Letter Reports Found.
          </p>
        ) : (
          <div className="space-y-4">

            {offerReports.map((offer: any) => (

              <div
                key={offer.id}
                className="bg-[#1F2937] rounded-xl p-6 flex justify-between items-center"
              >

                <div>

                  <p className="font-bold text-xl">
                    {offer.company}
                  </p>

                  <p className="text-gray-400">
                    Trust Score: {offer.trustScore}
                  </p>

                </div>

                <span
                  className={`px-5 py-2 rounded-full font-bold ${
                    offer.scamDetected
                      ? "bg-red-600"
                      : "bg-green-600"
                  }`}
                >
                  {offer.scamDetected ? "SCAM" : "SAFE"}
                </span>

              </div>

            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Reports;