import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const VOWELS = ['a', 'e', 'i', 'o', 'u'];
const CONSONANTS = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z'];
const FORBIDDEN_COMBINATIONS = ['qu', 'th', 'ch', 'sh', 'ph']; // Can't have these combinations adjacent

export default function LevelSix() {
    const router = useRouter();
    const [letters, setLetters] = useState(Array(8).fill(""));
    const [focusedIndex, setFocusedIndex] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showPopup, setShowPopup] = useState({ show: false, index: -1, message: "" });
    const [loading, setLoading] = useState({ show: false, index: -1 });
    const [shakeIndex, setShakeIndex] = useState(-1);
    const [typingTooFast, setTypingTooFast] = useState(false);
    const [lastTypeTime, setLastTypeTime] = useState(Date.now());
    const [capsLockWarning, setCapsLockWarning] = useState(false);
    const [consecutiveAttempts, setConsecutiveAttempts] = useState({});
    const [letterFrequency, setLetterFrequency] = useState({});
    const [lastBackspace, setLastBackspace] = useState(Date.now());
    const inputRefs = useRef(Array(8).fill(null));
    const [letterHistory, setLetterHistory] = useState([]);

  // Define box types and constraints
  const boxTypes = [
    { type: "any", size: "normal" },
    { type: "vowel", size: "tiny" },
    { type: "consonant", size: "normal" },
    { type: "any", size: "tiny" },
    { type: "vowel", size: "normal" },
    { type: "consonant", size: "tiny" },
    { type: "any", size: "normal" },
    { type: "any", size: "tiny" }
  ];

  // Expanded popup messages
  const popupMessages = [
    "Are you absolutely certain about this letter?",
    "This letter seems suspicious...",
    "Have you considered using a different letter?",
    "Your letter choice is concerning...",
    "Please verify your letter selection",
    "This letter may cause existential problems",
    "Letter validation in progress...",
    "Checking letter authenticity...",
    "This letter appears too frequently",
    "Your typing pattern seems erratic",
    "Previous attempts suggest poor letter choices",
    "System suggests reconsidering this input",
    "Letter combination detected as problematic",
    "Historical data indicates potential issues",
    "Quantum letter validation required"
  ];

  // Validation functions
  const isVowel = (char) => VOWELS.includes(char.toLowerCase());
  const isConsonant = (char) => CONSONANTS.includes(char.toLowerCase());

  const validateInput = (value, index, allLetters) => {
    const boxType = boxTypes[index].type;
    const lowercaseValue = value.toLowerCase();

    // Basic type validation
    if (boxType === "vowel" && !isVowel(value)) return { valid: false, message: "This box only accepts vowels!" };
    if (boxType === "consonant" && !isConsonant(value)) return { valid: false, message: "This box only accepts consonants!" };

    // Check for forbidden combinations with adjacent letters
    if (index > 0) {
      const prevLetter = allLetters[index - 1].toLowerCase();
      const combination = prevLetter + lowercaseValue;
      if (FORBIDDEN_COMBINATIONS.includes(combination)) {
        return { valid: false, message: `'${combination}' is not allowed!` };
      }
    }

    // Check letter frequency
    const frequency = (letterFrequency[lowercaseValue] || 0) + 1;
    if (frequency > 2) {
      return { valid: false, message: "This letter appears too frequently!" };
    }

    // Check if letter was used in last 3 attempts
    if (letterHistory.slice(-3).includes(lowercaseValue)) {
      return { valid: false, message: "This letter was used too recently!" };
    }

    return { valid: true, message: "" };
  };

  useEffect(() => {
    // Random focus jumping (more frequent)
    const focusInterval = setInterval(() => {
      if (Math.random() < 0.4) { // Increased probability
        const newIndex = Math.floor(Math.random() * 8);
        setFocusedIndex(newIndex);
        inputRefs.current[newIndex]?.focus();
      }
    }, 1500); // Reduced interval

    // Random box clearing (more aggressive)
    const clearBoxInterval = setInterval(() => {
      if (Math.random() < 0.3) { // Increased probability
        const indexToClear = Math.floor(Math.random() * 8);
        setLetters(prev => prev.map((letter, i) => i === indexToClear ? "" : letter));
        setShakeIndex(indexToClear);
        setTimeout(() => setShakeIndex(-1), 500);
      }
    }, 2500); // Reduced interval

    // Random capslock warning
    const capsLockInterval = setInterval(() => {
      if (Math.random() < 0.2) {
        setCapsLockWarning(true);
        setTimeout(() => setCapsLockWarning(false), 2000);
      }
    }, 5000);

    // Clear consecutive attempts periodically
    const clearAttemptsInterval = setInterval(() => {
      setConsecutiveAttempts({});
    }, 10000);

    return () => {
      clearInterval(focusInterval);
      clearInterval(clearBoxInterval);
      clearInterval(capsLockInterval);
      clearInterval(clearAttemptsInterval);
    };
  }, []);

  const handleLetterChange = async (value, index) => {
    if (value.length > 1) return;

    // Typing speed check (more strict)
    const currentTime = Date.now();
    if (currentTime - lastTypeTime < 300) { // Increased minimum delay
      setTypingTooFast(true);
      setTimeout(() => setTypingTooFast(false), 2000);
      return;
    }
    setLastTypeTime(currentTime);

    // Validate input
    const validation = validateInput(value, index, letters);
    if (value && !validation.valid) {
      setShakeIndex(index);
      setShowPopup({
        show: true,
        index,
        message: validation.message
      });
      
      // Track consecutive attempts for the same position
      const attempts = (consecutiveAttempts[index] || 0) + 1;
      setConsecutiveAttempts({ ...consecutiveAttempts, [index]: attempts });
      
      // If too many attempts at the same position, clear random boxes
      if (attempts > 3) {
        const randomIndexes = Array.from({ length: 2 }, () => 
          Math.floor(Math.random() * 8)
        );
        setLetters(prev => prev.map((letter, i) => 
          randomIndexes.includes(i) ? "" : letter
        ));
      }

      setTimeout(() => {
        setShakeIndex(-1);
        setShowPopup({ show: false, index: -1, message: "" });
      }, 2000);
      return;
    }

    // Special character handling
    if (value) {
      // Special 'e' handling (longer delay)
      if (value.toLowerCase() === 'e') {
        setLoading({ show: true, index });
        await new Promise(resolve => setTimeout(resolve, 8000));
        setLoading({ show: false, index: -1 });
      }
      
      // Special handling for 's' - requires double verification
      if (value.toLowerCase() === 's') {
        const confirmed = window.confirm("Are you sure you want to use 's'? This is a significant decision.");
        if (!confirmed) return;
      }

      // Update letter history and frequency
      setLetterHistory(prev => [...prev, value.toLowerCase()]);
      setLetterFrequency(prev => ({
        ...prev,
        [value.toLowerCase()]: (prev[value.toLowerCase()] || 0) + 1
      }));
    }

    // Random verification popup (more frequent)
    if (Math.random() < 0.4) {
      const message = popupMessages[Math.floor(Math.random() * popupMessages.length)];
      setShowPopup({ show: true, index, message });
      setTimeout(() => setShowPopup({ show: false, index: -1, message: "" }), 2000);
    }

    // Update letters
    setLetters(prev => {
      const newLetters = [...prev];
      newLetters[index] = value;
      
      // Check completion
      if (newLetters.every(l => l) && !loading.show) {
        // Final validation of the complete word
        const hasValidCombination = !newLetters.some((letter, i) => 
          i > 0 && FORBIDDEN_COMBINATIONS.includes(
            (newLetters[i-1] + letter).toLowerCase()
          )
        );

        if (hasValidCombination) {
          setShowSuccess(true);
          setTimeout(() => {
            router.push('/level/7');
          }, 2000);
        } else {
          // Clear random letters if invalid combination found
          const randomIndexes = Array.from({ length: 3 }, () => 
            Math.floor(Math.random() * 8)
          );
          return prev.map((letter, i) => 
            randomIndexes.includes(i) ? "" : letter
          );
        }
      }
      return newLetters;
    });
  };

  return (
    <div className="relative w-full h-screen bg-black flex flex-col items-center justify-center">
      <AnimatePresence>
        {typingTooFast && (
          <motion.div
            className="absolute top-4 right-4 bg-red-500 text-white p-4 rounded"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            Please type slower! This is a bureaucracy!
          </motion.div>
        )}

        {capsLockWarning && (
          <motion.div
            className="absolute top-4 left-4 bg-yellow-500 text-black p-4 rounded"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            Warning: Potential CapsLock violation detected!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-4xl font-bold text-white mb-12">
        Please Enter Your Name
      </div>

      <div className="flex gap-2 mb-8">
        {letters.map((letter, index) => (
          <motion.div
            key={index}
            className="relative"
            animate={{
              scale: loading.show && loading.index === index ? [1, 1.1, 1] : 1,
              rotate: shakeIndex === index ? [-5, 5, -5, 5, 0] : 0
            }}
            transition={{
              scale: { duration: 0.5, repeat: loading.show ? Infinity : 0 },
              rotate: { duration: 0.4, ease: "easeInOut" }
            }}
          >
            <input
              ref={el => inputRefs.current[index] = el}
              type="text"
              value={letter}
              onChange={(e) => handleLetterChange(e.target.value, index)}
              onKeyDown={(e) => {
                if (e.key === 'Backspace') {
                  const now = Date.now();
                  if (now - lastBackspace < 500) {
                    e.preventDefault();
                    setShowPopup({
                      show: true,
                      index,
                      message: "Please wait before using backspace again!"
                    });
                  }
                  setLastBackspace(now);
                }
              }}
              className={`
                ${boxTypes[index].size === "tiny" ? "w-6 h-6 text-xs" : "w-12 h-12 text-lg"}
                text-center text-white bg-gray-800 rounded 
                ${focusedIndex === index ? 'border-2 border-blue-500' : 'border border-gray-600'}
                ${boxTypes[index].type === "vowel" ? 'bg-red-900/30' : 
                  boxTypes[index].type === "consonant" ? 'bg-blue-900/30' : ''}
                transition-all duration-200
                ${consecutiveAttempts[index] > 2 ? 'animate-pulse' : ''}
              `}
              maxLength={1}
              autoFocus={focusedIndex === index}
            />
            
            {loading.show && loading.index === index && (
              <motion.div 
                className="absolute -bottom-6 left-0 right-0 text-xs text-blue-400"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                Verifying 'e'...
              </motion.div>
            )}

            <AnimatePresence>
              {showPopup.show && showPopup.index === index && (
                <motion.div
                  className="absolute -top-12 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs p-2 rounded whitespace-nowrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  {showPopup.message}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="text-gray-400 text-sm text-center">
        <div>Red boxes: vowels only | Blue boxes: consonants only</div>
        <div className="mt-2">The letter 'e' requires extensive verification</div>
        <div className="mt-2">The letter 's' requires manual confirmation</div>
        <div className="mt-2 text-red-400">Please maintain appropriate typing speed</div>
        <div className="mt-2 text-yellow-400">Certain letter combinations are strictly forbidden</div>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
           <motion.div
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="text-6xl font-bold text-white text-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 10 }}
                >
                  <div>Level Complete! 🎉</div>
                  <motion.div
                    className="text-2xl mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Loading next challenge...
                  </motion.div>
                </motion.div>
              </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}