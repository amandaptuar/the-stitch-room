import React from 'react';

export default function MarqueeRibbon() {
  const items = [
    'Trusted by 150+ Schools & Colleges across South India',
    'Japanese Tajima Automated High-Density Embroidery',
    'Reactive Vat-Dyed Fabrics with Zero Bleed',
    'Pre-Shrunk & Sanforized Guarantee (<1.2% variance)',
    'On-Site Student Sizing Camps & Alteration Support',
    'Medical Grade Anti-Microbial Fluid-Repellent Scrubs',
    'Guaranteed Delivery Before Academic Reopening Dates',
    'Bespoke Woven Ties, Belts, Badges & House T-Shirts',
  ];

  return (
    <div className="marquee-ribbon" aria-label="Key differentiators ribbon">
      <div className="marquee-track">
        {/* Double items to create continuous loop */}
        {[...items, ...items].map((item, index) => (
          <div key={index} className="marquee-item">
            <span className="marquee-dot"></span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
