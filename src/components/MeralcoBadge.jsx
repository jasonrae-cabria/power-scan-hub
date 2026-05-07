export default function MeralcoBadge({ rate }) {
  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8">
      <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 text-xs font-semibold text-cyan-400 shadow-lg shadow-cyan-500/20 backdrop-blur-xl">
        Current Meralco Rate: ₱{rate}/kWh
      </div>
    </div>
  );
}
