import {
  ShieldCheck,
  AlertTriangle,
  FileCheck,
} from "lucide-react";

function RecentActivity() {
  return (
    <div className="bg-[#111827] rounded-2xl border border-gray-800 p-8">

      <h2 className="text-2xl font-bold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-6">

        <div className="flex gap-4">
          <ShieldCheck className="text-green-400"/>
          <p>Microsoft recruiter verified successfully.</p>
        </div>

        <div className="flex gap-4">
          <AlertTriangle className="text-red-400"/>
          <p>Fake Amazon job blocked.</p>
        </div>

        <div className="flex gap-4">
          <FileCheck className="text-blue-400"/>
          <p>Offer letter validated.</p>
        </div>

      </div>

    </div>
  );
}

export default RecentActivity;