// Utility helper functions

/**
 * Format date to readable string
 */
export const formatDate = (date) => {
  if (!date) return 'N/A';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

/**
 * Format time to readable string
 */
export const formatTime = (time) => {
  if (!time) return 'N/A';
  return time;
};

/**
 * Calculate attendance percentage
 */
export const calculateAttendancePercentage = (present, total) => {
  if (!total || total === 0) return 0;
  return ((present / total) * 100).toFixed(1);
};

/**
 * Get status badge color class
 */
export const getStatusColor = (status) => {
  return status === 'present' ? 'text-green-600' : 'text-red-600';
};

/**
 * Capitalize first letter
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
