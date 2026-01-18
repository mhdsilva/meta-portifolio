import { motion } from 'framer-motion'

export default function SkeletonView() {
  return (
    <div className="space-y-4 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-12 bg-gray-700 rounded-lg animate-pulse"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="h-64 bg-gray-700 rounded-lg animate-pulse"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="h-32 bg-gray-700 rounded-lg animate-pulse"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="h-16 bg-gray-700 rounded-lg animate-pulse"
      />
    </div>
  )
}
