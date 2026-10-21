import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Smooth cardiac heartbeat animation on load (1.8s golden standard)
    const minTimePromise = new Promise((resolve) => setTimeout(resolve, 1800));
    const loadPromise = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', resolve, { once: true });
      }
    });

    Promise.all([minTimePromise, loadPromise]).then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
        >
          <div className="preloader-heartbeat-box">
            <div className="preloader-logo-badge">
              <img src="/logo.jpeg" alt="The Stitch Room Loading" className="preloader-logo-img" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
