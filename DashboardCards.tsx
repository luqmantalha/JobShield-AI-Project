import {
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Brain,
} from "lucide-react";

const cards = [
  {
    title: "Jobs Verified",
    value: "1,248",
    icon: ShieldCheck,
    color: "text-green-400",
  },
  {
    title: "Fake Jobs",
    value: "317",
    icon: AlertTriangle,
    color: "text-red-400",
  },
  {
    title: "Offer Letters",
    value: "642",
    icon: FileCheck,
    color: "text-blue-400",
  },
  {
    title: "AI Accuracy",
    value: "98.6%",
    icon: Brain,
    color: "text-violet-400",
  },
];

function DashboardCards() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-[#111827] rounded-2xl border border-gray-800 p-6 hover:border-violet-500 transition"
          >
            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-400">
                  {card.title}
                </p>

                <h2 className="text-4xl font-bold mt-3">
                  {card.value}
                </h2>

              </div>

              <Icon
                className={card.color}
                size={45}
              />

            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DashboardCards;