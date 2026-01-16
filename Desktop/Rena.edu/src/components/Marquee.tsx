"use client";

export default function Marquee() {
  const items = [
    "Weekly language classes",
    "Certification programs",
    "Skills workshops",
    "Professional training",
    "Test-prep sessions",
    "Short-term intensives",
    "Dance School",
    "Theatre Class",
    "Corporate Training",
  ];

  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items];

  return (
    <div className="overflow-hidden py-6 bg-[#f7f4f1]">
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {duplicatedItems.map((item, index) => (
            <span key={index} className="text-lg text-[#2B2B2B]/70 leading-relaxed">
              {item}
              {index < duplicatedItems.length - 1 && (
                <span className="mx-6">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

