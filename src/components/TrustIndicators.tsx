import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Shield, DollarSign } from 'lucide-react';

interface TrustIndicator {
  icon: React.ReactNode;
  text: string;
  description?: string;
}

const TrustIndicators: React.FC = () => {
  const indicators: TrustIndicator[] = [
    {
      icon: <Shield className="w-6 h-6" />,
      text: 'NHVR Compliant',
      description: 'Meets all national standards',
    },
    {
      icon: <Truck className="w-6 h-6" />,
      text: 'Termite-Proof Steel',
      description: 'Built to last decades',
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      text: 'Finance Ready',
      description: 'Approved by major lenders',
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-center items-center">
      {indicators.map((indicator, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 + idx * 0.1 }}
          className="flex items-center gap-3 text-white"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-off-white flex-shrink-0 shadow-lg"
          >
            {indicator.icon}
          </motion.div>
          <div className="text-left">
            <p className="text-sm md:text-base font-semibold">{indicator.text}</p>
            {indicator.description && (
              <p className="text-xs text-gray-300">{indicator.description}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TrustIndicators;
