import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight, Zap } from 'lucide-react';

interface SiteEligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SiteEligibilityModal: React.FC<SiteEligibilityModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    propertyType: '',
    councilArea: '',
    existingDwelling: '',
    utilitiesAccess: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step < 3) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setStep(1);
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        propertyType: '',
        councilArea: '',
        existingDwelling: '',
        utilitiesAccess: '',
      });
    }, 3000);
  };

  const progressPercentage = (step / 3) * 100;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full space-y-5"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-off-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Smith"
                className="w-full px-4 py-3 bg-off-white text-charcoal rounded-lg border-2 border-transparent focus:border-burnt-orange focus:outline-none transition-colors duration-200 placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-off-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3 bg-off-white text-charcoal rounded-lg border-2 border-transparent focus:border-burnt-orange focus:outline-none transition-colors duration-200 placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-off-white mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(02) 1234 5678"
                className="w-full px-4 py-3 bg-off-white text-charcoal rounded-lg border-2 border-transparent focus:border-burnt-orange focus:outline-none transition-colors duration-200 placeholder-gray-400"
              />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full space-y-5"
          >
            <div>
              <label htmlFor="address" className="block text-sm font-semibold text-off-white mb-2">
                Property Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main Street, Sydney NSW 2000"
                className="w-full px-4 py-3 bg-off-white text-charcoal rounded-lg border-2 border-transparent focus:border-burnt-orange focus:outline-none transition-colors duration-200 placeholder-gray-400"
                required
              />
            </div>
            <div>
              <label htmlFor="propertyType" className="block text-sm font-semibold text-off-white mb-2">
                Property Type
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-off-white text-charcoal rounded-lg border-2 border-transparent focus:border-burnt-orange focus:outline-none transition-colors duration-200"
                required
              >
                <option value="">Select property type...</option>
                <option value="residential">Residential</option>
                <option value="rural">Rural/Acreage</option>
                <option value="commercial">Commercial</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="councilArea" className="block text-sm font-semibold text-off-white mb-2">
                Local Council Area
              </label>
              <input
                type="text"
                id="councilArea"
                name="councilArea"
                value={formData.councilArea}
                onChange={handleChange}
                placeholder="e.g., Sutherland Shire, Wollondilly"
                className="w-full px-4 py-3 bg-off-white text-charcoal rounded-lg border-2 border-transparent focus:border-burnt-orange focus:outline-none transition-colors duration-200 placeholder-gray-400"
                required
              />
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full space-y-5"
          >
            <div>
              <label htmlFor="existingDwelling" className="block text-sm font-semibold text-off-white mb-2">
                Is there an existing dwelling on the property?
              </label>
              <select
                id="existingDwelling"
                name="existingDwelling"
                value={formData.existingDwelling}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-off-white text-charcoal rounded-lg border-2 border-transparent focus:border-burnt-orange focus:outline-none transition-colors duration-200"
                required
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label htmlFor="utilitiesAccess" className="block text-sm font-semibold text-off-white mb-2">
                Do you have access to essential utilities?
              </label>
              <p className="text-xs text-gray-300 mb-3">(Water, power, sewage/septic)</p>
              <select
                id="utilitiesAccess"
                name="utilitiesAccess"
                value={formData.utilitiesAccess}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-off-white text-charcoal rounded-lg border-2 border-transparent focus:border-burnt-orange focus:outline-none transition-colors duration-200"
                required
              >
                <option value="">Select...</option>
                <option value="yes">Yes - All utilities available</option>
                <option value="partial">Partial - Some utilities available</option>
                <option value="no">No - Need to arrange utilities</option>
              </select>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-charcoal rounded-2xl shadow-2xl max-w-2xl w-full relative border border-burnt-orange/30 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-off-white hover:text-burnt-orange transition-colors duration-200 z-10"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Success State */}
            {submitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-96"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="mb-6"
                >
                  <CheckCircle className="w-16 h-16 text-burnt-orange" />
                </motion.div>
                <h3 className="text-3xl font-bold text-off-white mb-3">Perfect!</h3>
                <p className="text-gray-300 text-lg mb-2">Your site eligibility check has been submitted.</p>
                <p className="text-gray-400 text-sm">We'll review your property and send you a personalized site report within 24 hours, including council approval guidance.</p>
              </motion.div>
            ) : (
              <>
                {/* Header with Value Proposition */}
                <div className="px-6 md:px-8 pt-8 pb-6 border-b border-burnt-orange/20 bg-gradient-to-r from-charcoal to-charcoal/80">
                  <div className="flex items-start gap-3 mb-4">
                    <Zap className="w-5 h-5 text-burnt-orange flex-shrink-0 mt-1" />
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-off-white mb-2">
                        Get Your Free Site Report
                      </h2>
                      <p className="text-gray-300 text-sm md:text-base">
                        Discover if your property is perfect for a Forged by Fire home. Personalized guidance delivered in 24 hours.
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 h-1.5 bg-charcoal rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-burnt-orange to-copper"
                      initial={{ width: '0%' }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Step {step} of 3</p>
                </div>

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="p-6 md:p-8">
                  <AnimatePresence mode="wait">
                    {renderStep()}
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex gap-3 mt-8 pt-6 border-t border-burnt-orange/20">
                    {step > 1 && (
                      <motion.button
                        type="button"
                        onClick={prevStep}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 px-4 py-3 border-2 border-burnt-orange/50 text-off-white font-semibold rounded-lg hover:border-burnt-orange hover:bg-burnt-orange/5 transition-all duration-200"
                      >
                        Back
                      </motion.button>
                    )}
                    <motion.button
                      type={step === 3 ? 'submit' : 'button'}
                      onClick={step === 3 ? undefined : nextStep}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-burnt-orange to-copper text-off-white font-semibold rounded-lg hover:shadow-lg hover:shadow-burnt-orange/50 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      {step === 3 ? (
                        <>
                          <span>Get My Report</span>
                          <CheckCircle className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          <span>Next</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SiteEligibilityModal;
