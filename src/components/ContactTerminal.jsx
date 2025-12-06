import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Field = ({ id, label, type = "text", placeholder, options = null, value, onChange, isFocused, onFocus, onBlur }) => (
  <div className="relative mb-8 group">
    {/* Label as metadata above */}
    <label
      htmlFor={id}
      className={`block font-mono text-xs tracking-[0.2em] mb-2 transition-colors duration-300 ${isFocused ? "text-[#009FE3]" : "text-gray-600"
        }`}
    >
      {`> ${label}`}
    </label>

    <div className="relative">
      {/* Input with background context */}
      {type === 'select' ? (
        <div className="relative">
          <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className="w-full bg-gray-900/30 border-b border-gray-700 text-white text-base font-mono p-4 focus:outline-none focus:bg-gray-900/60 transition-colors appearance-none cursor-pointer min-h-[56px]"
          >
            {options && options.map(opt => (
              <option key={opt.value} value={opt.value} className="bg-black text-white">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor">
              <path d="M1 1L5 5L9 1" strokeWidth="1" strokeLinecap="square" />
            </svg>
          </div>
        </div>
      ) : type === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          rows="4"
          className="w-full bg-gray-900/30 border-b border-gray-700 text-white text-base font-mono p-4 focus:outline-none focus:bg-gray-900/60 transition-colors resize-none placeholder-gray-700 min-h-[120px]"
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          className="w-full bg-gray-900/30 border-b border-gray-700 text-white text-base font-mono p-4 focus:outline-none focus:bg-gray-900/60 transition-colors placeholder-gray-700 min-h-[56px]"
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          autoComplete="off"
        />
      )}

      {/* Active scanning line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-[#009FE3]"
        initial={{ width: "0%" }}
        animate={{ width: isFocused ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
        style={{ boxShadow: `0 0 10px #009FE3` }}
      />

      {/* Corner accent */}
      <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r transition-colors duration-300 ${isFocused ? 'border-[#009FE3]' : 'border-gray-700'}`} />
    </div>
  </div>
);

export const ContactTerminal = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'INQUIRY',
    message: ''
  });

  const [status, setStatus] = useState('IDLE'); // IDLE, SENDING, SUCCESS, ERROR
  const [focusedField, setFocusedField] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    if (status === 'ERROR') setStatus('IDLE');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formState.name || !formState.email || !formState.message) {
      setStatus('ERROR');
      setErrorMessage('TÄYTÄ KAIKKI KENTÄT');
      setTimeout(() => setStatus('IDLE'), 2000);
      return;
    }

    setStatus('SENDING');

    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 2000));

    setStatus('SUCCESS');
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-1 md:p-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-hw-black/90 border border-signal-blue/30 rounded-lg overflow-hidden backdrop-blur-md shadow-[0_0_30px_rgba(2,153,225,0.1)]"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-signal-blue/20 bg-black/40">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>
          <div className="font-mono text-[10px] text-signal-blue tracking-widest opacity-70">
            OTA YHTEYTTÄ
          </div>
        </div>

        {/* Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[5] bg-[length:100%_4px,6px_100%] opacity-20"></div>

        <div className="p-6 md:p-8 relative z-10">
          <AnimatePresence mode="wait">
            {status === 'SUCCESS' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12 space-y-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 rounded-full border-2 border-green-500 flex items-center justify-center"
                >
                  <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <div className="text-center">
                  <h3 className="text-green-500 font-mono text-xl tracking-widest mb-2">VIESTI LÄHETETTY</h3>
                  <p className="text-white/50 font-mono text-sm">KIITOS YHTEYDENOTOSTASI.</p>
                </div>

                {/* Progress Bar */}
                <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mt-8">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
                  />
                </div>

                <button
                  onClick={() => {
                    setStatus('IDLE');
                    setFormState({ name: '', email: '', subject: 'INQUIRY', message: '' });
                  }}
                  className="mt-8 text-xs font-mono text-white/40 hover:text-signal-blue transition-colors uppercase tracking-widest"
                >
                  [ LÄHETÄ UUSI VIESTI ]
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">

                {/* Header Text */}
                <div className="mb-8 border-l-2 border-signal-blue pl-4">
                  <h2 className="text-white font-mono text-sm md:text-lg tracking-wider md:tracking-widest mb-1 break-words">
                    <span className="text-signal-blue mr-2">&gt;</span>
                    LÄHETÄ VIESTI
                  </h2>
                  <p className="text-white/40 font-mono text-xs">
                    TÄYTÄ TIEDOT ALLE
                  </p>
                </div>

                <Field
                  id="name"
                  label="NIMI"
                  placeholder="Nimesi..."
                  value={formState.name}
                  onChange={handleChange}
                  isFocused={focusedField === 'name'}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                />

                <Field
                  id="email"
                  label="SÄHKÖPOSTI"
                  type="email"
                  placeholder="Sähköpostiosoitteesi..."
                  value={formState.email}
                  onChange={handleChange}
                  isFocused={focusedField === 'email'}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />

                <Field
                  id="subject"
                  label="AIHE"
                  type="select"
                  options={[
                    { value: 'INQUIRY', label: 'PROJEKTI' },
                    { value: 'SUPPORT', label: 'TEKNINEN TUKI' },
                    { value: 'COLLAB', label: 'YHTEISTYÖ' },
                    { value: 'OTHER', label: 'MUU' }
                  ]}
                  value={formState.subject}
                  onChange={handleChange}
                  isFocused={focusedField === 'subject'}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                />

                <Field
                  id="message"
                  label="VIESTI"
                  type="textarea"
                  placeholder="Kerro lisää projektistasi..."
                  value={formState.message}
                  onChange={handleChange}
                  isFocused={focusedField === 'message'}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                />

                {/* Submit Button */}
                <div className="pt-4 relative">
                  {status === 'ERROR' && (
                    <div className="absolute -top-6 left-0 text-red-500 text-[10px] font-mono tracking-widest">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'SENDING'}
                    className="hologram-btn w-full group"
                  >
                    <span
                      className="text-[10px] md:text-sm"
                      data-text={status === 'SENDING' ? 'LÄHETETÄÄN...' : 'LÄHETÄ VIESTI'}
                    >
                      {status === 'SENDING' ? 'LÄHETETÄÄN...' : 'LÄHETÄ VIESTI'}
                    </span>
                    <div className="holo-scan-line"></div>
                    <div className="btn-border-t"></div>
                    <div className="btn-border-r"></div>
                    <div className="btn-border-b"></div>
                    <div className="btn-border-l"></div>
                  </button>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
