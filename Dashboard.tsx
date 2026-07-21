import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  ShieldCheck,
  AlertTriangle,
  BadgeCheck,
  FileCheck,
  Brain,
  Search,
} from "lucide-react";

import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
import DashboardCharts from "../components/DashboardCharts";
import NotificationPanel from "../components/NotificationPanel";

function Dashboard() {

  const navigate = useNavigate();

  const [offerHistory, setOfferHistory] = useState<any[]>([]);

  const [recruiterHistory, setRecruiterHistory] = useState<any[]>([]);

  const [stats, setStats] = useState({
  totalJobs: 0,
  totalOffers: 0,
  totalRecruiters: 0,
  scamJobs: 0,
  fakeOffers: 0,
  verifiedRecruiters: 0,
  avgConfidence: 0,
  avgTrustScore: 0,
  aiRiskScore: 0,
});

  const [recentScans, setRecentScans] = useState<any[]>([]);

  const [notifications, setNotifications] = useState<
    { title: string; time: string }[]
  >([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadDashboard = async () => {
  try {
    const q = query(
      collection(db, "jobScans"),
      orderBy("createdAt", "desc"),
      limit(20)
    );

    const snapshot = await getDocs(q);

    const scans = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    let scam = 0;
    let recruiter = 0;
    let confidence = 0;
    let trust = 0;

    scans.forEach((job: any) => {
      if (job.scamDetected) scam++;

      if (job.recruiterVerified) recruiter++;

      confidence += Number(job.aiConfidence || 0);

      trust += Number(job.trustScore || 0);
    });

    // Offer Letter Data
    const offerSnapshot = await getDocs(
      collection(db, "offerLetterScans")
    );

    const offers = offerSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    let fakeOffers = 0;

    offers.forEach((offer: any) => {
      if (offer.scamDetected) fakeOffers++;
    });

    setOfferHistory(
      offers.slice(-5).reverse()
    );
    const recruiterSnapshot = await getDocs(
  collection(db, "recruiterScans")
);

const recruiters = recruiterSnapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data(),
}));

setRecruiterHistory(
  recruiters.slice(-5).reverse()
);

    setStats({
  totalJobs: scans.length,
  totalOffers: offers.length,
totalRecruiters: recruiters.length,
  scamJobs: scam,
  fakeOffers: fakeOffers,
  verifiedRecruiters: recruiter,
  avgConfidence:
    scans.length > 0
      ? Math.round(confidence / scans.length)
      : 0,
  avgTrustScore:
    scans.length > 0
      ? Math.round(trust / scans.length)
      : 0,

  aiRiskScore:
    scans.length > 0
      ? Math.round(
          ((scans.length - scam) / scans.length) * 100
        )
      : 0,
});

    setRecentScans(scans.slice(0, 4));

    const latestNotifications = scans
      .slice(0, 5)
      .map((job: any) => ({
        title: `${job.company} scanned (${job.risk})`,
        time: new Date().toLocaleString(),
      }));

    setNotifications(latestNotifications);

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

    loadDashboard();

  }, []);

  return (
    <div className="min-h-screen bg-[#050816] p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-10">

        <div>
          <h1 className="text-4xl font-bold text-white">
            AI Security Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Welcome back! Here's your hiring security overview.
          </p>
        </div>

        <button
          onClick={() => navigate("/verify-job")}
          className="bg-violet-600 hover:bg-violet-500 px-6 py-3 rounded-xl font-semibold transition"
        >
          + New Scan
        </button>

      </div>

      {/* Statistics */}

<div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

  <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-green-500 transition">

    <ShieldCheck
      className="text-green-400 mb-5"
      size={35}
    />

    <h2 className="text-4xl font-bold text-white">
      {loading ? "--" : stats.totalJobs}
    </h2>

    <p className="text-gray-400 mt-2">
      Verified Jobs
    </p>

  </div>

  <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-red-500 transition">

    <AlertTriangle
      className="text-red-500 mb-5"
      size={35}
    />

    <h2 className="text-4xl font-bold text-white">
      {loading ? "--" : stats.scamJobs}
    </h2>

    <p className="text-gray-400 mt-2">
      Fake Jobs Blocked
    </p>

  </div>
  <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-blue-500 transition">

  <FileCheck
    className="text-blue-500 mb-5"
    size={35}
  />

  <h2 className="text-4xl font-bold text-white">
    {loading ? "--" : stats.totalOffers}
  </h2>

  <p className="text-gray-400 mt-2">
    Offer Letters
  </p>

</div>
<div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-red-500 transition">

  <AlertTriangle
    className="text-red-500 mb-5"
    size={35}
  />

  <h2 className="text-4xl font-bold text-white">
    {loading ? "--" : stats.fakeOffers}
  </h2>

  <p className="text-gray-400 mt-2">
    Fake Offer Letters
  </p>

</div>

  <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-green-500 transition">

  <BadgeCheck
    className="text-green-400 mb-5"
    size={35}
  />

  <h2 className="text-4xl font-bold text-white">
    {loading ? "--" : stats.totalRecruiters}
  </h2>

  <p className="text-gray-400 mt-2">
    Recruiter Verifications
  </p>

</div>

  <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 hover:border-violet-500 transition">

    <Brain
      className="text-violet-400 mb-5"
      size={35}
    />

    <h2 className="text-4xl font-bold text-white">
      {loading ? "--" : `${stats.avgConfidence}%`}
    </h2>

    <p className="text-gray-400 mt-2">
      AI Confidence
    </p>

  </div>

</div>

      {/* Middle Section */}

      <div className="grid lg:grid-cols-3 gap-8 mb-10">

        {/* Recent Activity */}

        <div className="lg:col-span-2 bg-[#111827] border border-gray-800 rounded-3xl p-8">

  <h2 className="text-2xl font-bold text-white mb-8">
    Recent job Scans
  </h2>

  <div className="space-y-6">

    {recentScans.map((job: any) => (

      <div
        key={job.id}
        className="flex justify-between items-center border-b border-gray-800 pb-4"
      >

        <div>

          <h3 className="text-white font-semibold">
            {job.company}
          </h3>

          <p className="text-gray-500">
            Trust Score: {job.trustScore}/100
          </p>

        </div>

        <span
          className={`font-bold ${
            job.risk === "HIGH"
              ? "text-red-400"
              : job.risk === "MEDIUM"
              ? "text-yellow-400"
              : "text-green-400"
          }`}
        >
          {job.risk}
        </span>

      </div>

    ))}

  </div>
  <div className="mt-10 bg-[#111827] rounded-2xl p-6">

  <h2 className="text-2xl font-bold mb-8">
    Recent Offer Letter Scans
  </h2>

  <div className="space-y-4">

    {offerHistory.map((offer:any)=>(

      <div
        key={offer.id}
        className="flex justify-between border-b border-gray-700 pb-3"
      >


        <div>

          <p className="font-semibold">
            {offer.company}
          </p>

          <p className="text-gray-400 text-sm">
            Trust Score: {offer.trustScore}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            offer.scamDetected
              ? "bg-red-600"
              : "bg-green-600"
          }`}
        >
          {offer.risk}
        </span>

      </div>

    ))}

  </div>

</div>
<div className="mt-10 bg-[#111827] rounded-2xl p-6">

  <h2 className="text-2xl font-bold mb-6">
    Recent Recruiter Verifications
  </h2>

  <div className="space-y-4">

    {recruiterHistory.map((recruiter: any) => (

      <div
        key={recruiter.id}
        className="flex justify-between border-b border-gray-700 pb-3"
      >

        <div>

          <p className="font-semibold">
            {recruiter.name}
          </p>

          <p className="text-gray-400 text-sm">
            {recruiter.company}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm ${
            recruiter.risk === "HIGH"
              ? "bg-red-600"
              : recruiter.risk === "MEDIUM"
              ? "bg-yellow-600"
              : "bg-green-600"
          }`}
        >
          {recruiter.risk}
        </span>

      </div>

    ))}

  </div>

</div>

</div>

        {/* AI Risk Score */}

        <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8">

          <h2 className="text-2xl font-bold text-white mb-8">
            AI Risk Score
          </h2>

          <div className="flex justify-center">

            <div className="w-44 h-44 rounded-full border-8 border-violet-500 flex items-center justify-center">

              <div>

                <h2 className="text-5xl font-bold text-white text-center">                
                  {loading ? "--" : `${stats.aiRiskScore}%`}
                </h2>

                <p
                  className={`text-center mt-2 font-semibold ${
                    stats.aiRiskScore >= 80
                      ? "text-green-400"
                      : stats.aiRiskScore >= 50
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  {stats.aiRiskScore >= 80
                    ? "Safe"
                    : stats.aiRiskScore >= 50
                    ? "Medium Risk"
                    : "High Risk"}
                </p>

              </div>

            </div>

          </div>

          <p className="text-gray-400 mt-8 text-center leading-7">
            AI predicts a very low probability of recruitment fraud based
            on current platform activity.
          </p>

        </div>

      </div>

      <DashboardCharts stats={stats} />
      <div className="mt-10">
        <NotificationPanel notifications={notifications} />
      </div>
      {/* AI Insights */}

<div className="bg-[#111827] border border-gray-800 rounded-3xl p-8 mt-10">

  <h2 className="text-2xl font-bold text-white mb-8">
    AI Insights
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    <div className="bg-[#1f2937] rounded-2xl p-6">
      <h3 className="text-green-400 font-semibold mb-2">
        Verified Jobs
      </h3>

      <p className="text-3xl font-bold text-white">
        {stats.totalJobs}
      </p>

      <p className="text-gray-400 mt-2">
        Total job postings analyzed by AI.
      </p>
    </div>

    <div className="bg-[#1f2937] rounded-2xl p-6">
      <h3 className="text-red-400 font-semibold mb-2">
        Fake Jobs
      </h3>

      <p className="text-3xl font-bold text-white">
        {stats.scamJobs}
      </p>

      <p className="text-gray-400 mt-2">
        Scam job postings detected.
      </p>
    </div>

    <div className="bg-[#1f2937] rounded-2xl p-6">
      <h3 className="text-blue-400 font-semibold mb-2">
        Offer Letters
      </h3>

      <p className="text-3xl font-bold text-white">
        {stats.totalOffers}
      </p>

      <p className="text-gray-400 mt-2">
        AI verified offer letters.
      </p>
    </div>

    <div className="bg-[#1f2937] rounded-2xl p-6">
      <h3 className="text-yellow-400 font-semibold mb-2">
        Average Trust Score
      </h3>

      <p className="text-3xl font-bold text-white">
        {stats.avgTrustScore}%
      </p>

      <p className="text-gray-400 mt-2">
        Overall trust score generated by AI.
      </p>
    </div>

  </div>

</div>

      {/* Quick Actions */}

      <div className="bg-[#111827] border border-gray-800 rounded-3xl p-8">

        <h2 className="text-2xl font-bold text-white mb-8">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <button
            onClick={() => navigate("/verify-job")}
            className="bg-violet-600 hover:bg-violet-500 rounded-2xl p-6 transition hover:scale-105"
          >

            <Search
              size={34}
              className="mx-auto mb-4"
            />

            <span className="font-semibold">
              Verify Job
            </span>

          </button>

          <button
            onClick={() => navigate("/offer-letter")}
            className="bg-blue-600 hover:bg-blue-500 rounded-2xl p-6 transition hover:scale-105"
          >

            <FileCheck
              size={34}
              className="mx-auto mb-4"
            />

            <span className="font-semibold">
              Verify Offer Letter
            </span>

          </button>

          <button
            onClick={() => navigate("/recruiter-verification")}
            className="bg-green-600 hover:bg-green-500 rounded-2xl p-6 transition hover:scale-105"
          >

            <BadgeCheck
              size={34}
              className="mx-auto mb-4"
            />

            <span className="font-semibold">
              Recruiter Check
            </span>

          </button>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;