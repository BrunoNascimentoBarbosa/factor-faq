import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { YouTubeEmbed } from '@/components/common/YouTubeEmbed/YouTubeEmbed';
import { VoteButtons } from '@/components/faq/VoteButtons/VoteButtons';

export const FAQItem = ({ faq, onVote }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="bg-white rounded-lg shadow-md p-6 mb-4 transition-all hover:shadow-lg">
      <div
        className="flex justify-between items-start cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold text-gray-800 flex-1 pr-4">
          {faq.title}
        </h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
        </motion.div>
      </div>

      <div className="flex gap-2 mt-3 flex-wrap">
        {faq.categories?.map((cat) => (
          <span
            key={cat}
            className="px-3 py-1 bg-primary text-white text-sm rounded-full capitalize"
          >
            {cat}
          </span>
        ))}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4">
              <div
                className="prose prose-sm max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />

              {faq.youtubeUrl && (
                <div className="mt-4">
                  <YouTubeEmbed url={faq.youtubeUrl} />
                </div>
              )}

              <VoteButtons
                faqId={faq._id}
                helpful={faq.helpful}
                notHelpful={faq.notHelpful}
                onVote={onVote}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};
