// components/FadeInSection.tsx
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export default function FadeInSection({ children, delay = 0, className = '' }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
      viewport={{ once: true, amount: 0.3 }} // amount controls how much needs to be visible to trigger
    >
      {children}
    </motion.div>
  );
}
