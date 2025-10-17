import { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { motion } from 'framer-motion';

export const VoteButtons = ({ faqId, helpful = 0, notHelpful = 0, onVote }) => {
  const [voted, setVoted] = useState(null);

  const handleVote = (isHelpful) => {
    if (voted !== null) return; // Já votou

    onVote({ faqId, isHelpful });
    setVoted(isHelpful);
  };

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <p className="text-sm font-medium text-gray-700 mb-3">
        Essa resposta foi útil para você?
      </p>
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: voted === null ? 1.05 : 1 }}
          whileTap={{ scale: voted === null ? 0.95 : 1 }}
          onClick={() => handleVote(true)}
          disabled={voted !== null}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
            voted === true
              ? 'bg-green-500 border-green-500 text-white'
              : voted === false
              ? 'opacity-50 cursor-not-allowed border-gray-200 text-gray-400'
              : 'border-gray-200 text-gray-700 hover:border-green-500 hover:text-green-500'
          }`}
        >
          <ThumbsUp className="w-5 h-5" />
          <span className="font-medium">Sim</span>
          <span className="text-sm">({helpful})</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: voted === null ? 1.05 : 1 }}
          whileTap={{ scale: voted === null ? 0.95 : 1 }}
          onClick={() => handleVote(false)}
          disabled={voted !== null}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
            voted === false
              ? 'bg-red-500 border-red-500 text-white'
              : voted === true
              ? 'opacity-50 cursor-not-allowed border-gray-200 text-gray-400'
              : 'border-gray-200 text-gray-700 hover:border-red-500 hover:text-red-500'
          }`}
        >
          <ThumbsDown className="w-5 h-5" />
          <span className="font-medium">Não</span>
          <span className="text-sm">({notHelpful})</span>
        </motion.button>
      </div>
      {voted !== null && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-sm text-gray-600"
        >
          Obrigado pelo seu feedback!
        </motion.p>
      )}
    </div>
  );
};
