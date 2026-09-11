import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  ShieldCheck,
  AlertTriangle,
  BadgeCheck,
  FileCheck,
  Brain,
  Search,
  TrendingUp,
  ArrowRight,
  Activity,
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

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  color,
  borderColor,
  loading,
}: {
  icon: any;
  label: string;
  value: string | number;
  color: string;
  borderColor: string;
  loading: boolean;
}) {
  return (
    <div
      className={`bg-[#0f1829] border border-gray-800 rounded-2xl p-5 hover:${borderColor} transition-all duration-200 group`}
    >
      <div className={`w-10 h-10 rounded-xl ${color.replace("text-", "bg-").replace("400", "500/10").replace("500", "500/10")} flex items-center justify-center mb-4`}>
        <Icon size={20} className={color} />
      </div>
      <p className="text-2xl font-bold text-white">
        {loading ? (
          <span className="inline-block w-10 h-7 bg-gray-800 rounded animate-pulse" />
        ) : (
          value
        )}
      </p>
      <p className="text-gray-500 text-sm mt-1">{label}</p>
    </div>
  );
}

// ── Risk Badge ────────────────────────────────────────────────────────────────
function RiskBadge({ risk }: { risk: string }) {
  const cls =
    risk === "HIGH"
      ? "bg-red-500/10 text-red-400 border-red-500/20"
      : risk === "MEDIUM"
      ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      : "bg-green-500/10 text-green-400 border-green-500/20";
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${cls}`}>
      {risk ?? "—"}
    </span>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
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
  const [notifications, setNotifications] = useState<{ title: string; time: string }[]>([]);
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
        const scans = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        let scam = 0, recruiter = 0, confidence = 0, trust = 0;
        scans.forEach((job: any) => {
          if (job.scamDetected) scam++;
          if (job.recruiterVerified) recruiter++;
          confidence += Number(job.aiConfidence || 0);
          trust += Number(job.trustScore || 0);
        });

        const offerSnapshot = await getDocs(collection(db, "offerLetterScans"));
        const offers = offerSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        let fakeOffers = 0;
        offers.forEach((o: any) => { if (o.scamDetected) fakeOffers++; });
        setOfferHistory(offers.slice(-5).reverse());

        const recruiterSnapshot = await getDocs(collection(db, "recruiterScans"));
        const recruiters = recruiterSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRecruiterHistory(recruiters.slice(-5).reverse());

        setStats({
          totalJobs: scans.length,
          totalOffers: offers.length,
          totalRecruiters: recruiters.length,
          scamJobs: scam,
          fakeOffers,
          verifiedRecruiters: recruiter,
          avgConfidence: scans.length > 0 ? Math.round(confidence / scans.length) : 0,
          avgTrustScore: scans.length > 0 ? Math.round(trust / scans.length) : 0,
          aiRiskScore: scans.length > 0 ? Math.round(((scans.length - scam) / scans.length) * 100) : 0,
        });

        setRecentScans(scans.slice(0, 5));
        setNotifications(
          scans.slice(0, 5).map((job: any) => ({
            title: `${job.company} scanned — ${job.risk} risk`,
            time: new Date().toLocaleTimeString(),
          }))
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="text-white space-y-8">

      {/* ── Page Header ─────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Security Overview</h1>
          <p className="text-gray-500 text-sm mt-1">
            Real-time hiring fraud intelligence across all your scans.
          </p>
        </div>
        <button
          onClick={() => navigate("/verify-job")}
          className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 transition px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-violet-500/20"
        >
          <Search size={16} />
          New Scan
        </button>
      </div>

      {/* ── Stats Grid ──────────────────────────────── */}
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard icon={ShieldCheck}  label="Jobs Verified"         value={stats.totalJobs}          color="text-green-400"  borderColor="border-green-500/40"  loading={loading} />
        <StatCard icon={AlertTriangle} label="Fake Jobs Blocked"    value={stats.scamJobs}           color="text-red-400"    borderColor="border-red-500/40"    loading={loading} />
        <StatCard icon={FileCheck}    label="Offer Letters"         value={stats.totalOffers}        color="text-blue-400"   borderColor="border-blue-500/40"   loading={loading} />
        <StatCard icon={AlertTriangle} label="Fake Offers Flagged"  value={stats.fakeOffers}         color="text-orange-400" borderColor="border-orange-500/40" loading={loading} />
        <StatCard icon={BadgeCheck}   label="Recruiter Checks"      value={stats.totalRecruiters}    color="text-teal-400"   borderColor="border-teal-500/40"   loading={loading} />
        <StatCard icon={Brain}        label="Avg AI Confidence"     value={`${stats.avgConfidence}%`} color="text-violet-400" borderColor="border-violet-500/40" loading={loading} />
      </div>

      {/* ── Middle: Scans + Risk Gauge ───────────────── */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Recent Job Scans */}
        <div className="lg:col-span-2 bg-[#0f1829] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <Activity size={18} className="text-violet-400" />
              Recent Job Scans
            </h2>
            <button
              onClick={() => navigate("/scan-history")}
              className="text-xs text-gray-500 hover:text-violet-400 flex items-center gap-1 transition"
            >
              View all <ArrowRight size={13} />
            </button>
          </div>

          {recentScans.length === 0 && !loading && (
            <p className="text-gray-600 text-sm text-center py-8">No scans yet. Start by verifying a job.</p>
          )}

          <div className="space-y-3">
            {recentScans.map((job: any) => (
              <div
                key={job.id}
                className="flex items-center justify-between py-3 border-b border-gray-800/60 last:border-0"
              >
                <div>
                  <p className="font-semibold text-sm text-white">{job.company || "Unknown"}</p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    Trust Score:{" "}
                    <span className={
                      job.trustScore >= 80 ? "text-green-400" : job.trustScore >= 50 ? "text-yellow-400" : "text-red-400"
                    }>
                      {job.trustScore}/100
                    </span>
                  </p>
                </div>
                <RiskBadge risk={job.risk} />
              </div>
            ))}
          </div>
        </div>

        {/* AI Risk Gauge */}
        <div className="bg-[#0f1829] border border-gray-800 rounded-2xl p-6 flex flex-col">
          <h2 className="font-bold text-lg flex items-center gap-2 mb-6">
            <TrendingUp size={18} className="text-violet-400" />
            Platform Safety
          </h2>

          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            {/* Circular gauge */}
            <div
              className={`w-36 h-36 rounded-full border-[10px] flex items-center justify-center ${
                stats.aiRiskScore >= 80
                  ? "border-green-500"
                  : stats.aiRiskScore >= 50
                  ? "border-yellow-500"
                  : "border-red-500"
              }`}
            >
              <div className="text-center">
                <p className="text-4xl font-bold text-white">
                  {loading ? "--" : `${stats.aiRiskScore}%`}
                </p>
                <p className={`text-xs font-semibold mt-1 ${
                  stats.aiRiskScore >= 80 ? "text-green-400" : stats.aiRiskScore >= 50 ? "text-yellow-400" : "text-red-400"
                }`}>
                  {stats.aiRiskScore >= 80 ? "Safe" : stats.aiRiskScore >= 50 ? "Medium" : "High Risk"}
                </p>
              </div>
            </div>

            <p className="text-gray-500 text-xs text-center leading-5 max-w-[180px]">
              Percentage of legitimate jobs across all scans on this platform.
            </p>
          </div>

          {/* Mini stats */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-gray-800/40 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-white">{stats.avgTrustScore}%</p>
              <p className="text-gray-500 text-xs mt-0.5">Avg Trust</p>
            </div>
            <div className="bg-gray-800/40 rounded-xl p-3 text-center">
              <p className="text-lg font-bold text-white">{stats.avgConfidence}%</p>
              <p className="text-gray-500 text-xs mt-0.5">AI Confidence</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Charts ──────────────────────────────────── */}
      <DashboardCharts stats={stats} />

      {/* ── Offer + Recruiter History ─────────────── */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Offer Letter History */}
        <div className="bg-[#0f1829] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-base flex items-center gap-2">
              <FileCheck size={17} className="text-blue-400" />
              Recent Offer Letters
            </h2>
            <button onClick={() => navigate("/offer-letter")} className="text-xs text-gray-500 hover:text-blue-400 flex items-center gap-1 transition">
              Scan new <ArrowRight size={13} />
            </button>
          </div>
          {offerHistory.length === 0 ? (
            <p className="text-gray-600 text-sm text-center py-6">No offer letters scanned yet.</p>
          ) : (
            <div className="space-y-3">
              {offerHistory.map((offer: any) => (
                <div key={offer.id} className="flex items-center justify-between py-2.5 border-b border-gray-800/50 last:border-0">
                  <div>
                    <p className="font-semibold text-sm">{offer.company || "Unknown"}</p>
                    <p className="text-gray-500 text-xs">Trust: {offer.trustScore}/100</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                    offer.scamDetected
                      ? "bg-red-500/10 text-red-400 border-red-500/20"
                      : "bg-green-500/10 text-green-400 border-green-500/20"
                  }`}>
                    {offer.scamDetected ? "FAKE" : "LEGIT"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recruiter History */}
        <div className="bg-[#0f1829] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-base flex items-center gap-2">
              <BadgeCheck size={17} className="text-teal-400" />
              Recent Recruiter Checks
            </h2>
            <button onClick={() => navigate("/recruiter-verification")} className="text-xs text-gray-500 hover:text-teal-400 flex items-center gap-1 transition">
              Verify new <ArrowRight size={13} />
            </button>
          </div>
          {recruiterHistory.length === 0 ? (
            <p className="text-gray-600 text-sm text-center py-6">No recruiters verified yet.</p>
          ) : (
            <div className="space-y-3">
              {recruiterHistory.map((r: any) => (
                <div key={r.id} className="flex items-center justify-between py-2.5 border-b border-gray-800/50 last:border-0">
                  <div>
                    <p className="font-semibold text-sm">{r.name || "Unknown"}</p>
                    <p className="text-gray-500 text-xs">{r.company}</p>
                  </div>
                  <RiskBadge risk={r.risk} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Notifications ────────────────────────────── */}
      <NotificationPanel notifications={notifications} />

      {/* ── Quick Actions ────────────────────────────── */}
      <div className="bg-[#0f1829] border border-gray-800 rounded-2xl p-6">
        <h2 className="font-bold text-lg mb-5">Quick Actions</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: "Verify Job", sub: "Analyze a job posting for fraud", icon: Search, color: "violet", path: "/verify-job" },
            { label: "Verify Offer Letter", sub: "Upload and scan an offer letter", icon: FileCheck, color: "blue", path: "/offer-letter" },
            { label: "Check Recruiter", sub: "Verify recruiter identity via AI", icon: BadgeCheck, color: "green", path: "/recruiter-verification" },
          ].map(({ label, sub, icon: Icon, color, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex items-start gap-4 text-left p-4 rounded-xl border transition-all duration-200 bg-${color}-500/5 border-${color}-500/20 hover:border-${color}-500/50 hover:bg-${color}-500/10 group`}
            >
              <div className={`w-10 h-10 rounded-xl bg-${color}-500/10 flex items-center justify-center shrink-0 group-hover:bg-${color}-500/20 transition`}>
                <Icon size={20} className={`text-${color}-400`} />
              </div>
              <div>
                <p className="font-semibold text-sm text-white">{label}</p>
                <p className="text-gray-500 text-xs mt-0.5 leading-4">{sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Dashboard;