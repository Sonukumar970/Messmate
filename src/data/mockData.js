export const hostelInfo = {
  name: "MessMate Hostel",
  subtitle: "Hostel Food Management",
  studentName: "Sonu",
  hostelName: "Boys Hostel",
};

export const mealSlots = [
  {
    id: "morning",
    name: "Morning",
    time: "07:30 AM – 09:00 AM",
    icon: "Sunrise",
    description: "Start your day with a fresh breakfast.",
    items: ["Poha", "Bread & Butter", "Banana", "Tea"],
  },
  {
    id: "afternoon",
    name: "Afternoon",
    time: "12:30 PM – 02:00 PM",
    icon: "Sun",
    description: "A balanced and filling lunch.",
    items: ["Rice", "Dal Tadka", "Roti", "Seasonal Sabzi"],
  },
  {
    id: "evening",
    name: "Evening",
    time: "04:30 PM – 05:30 PM",
    icon: "Coffee",
    description: "Take a break with evening snacks.",
    items: ["Samosa", "Green Chutney", "Tea"],
  },
  {
    id: "night",
    name: "Night",
    time: "08:00 PM – 09:30 PM",
    icon: "Moon",
    description: "Enjoy a comforting dinner.",
    items: ["Roti", "Jeera Rice", "Dal", "Paneer Sabzi"],
  },
];

export const recentFeedback = [
  {
    id: 1,
    name: "Rahul Sharma",
    meal: "Afternoon",
    rating: 5,
    comment: "Food was tasty and fresh.",
  },
  {
    id: 2,
    name: "Aman Kumar",
    meal: "Morning",
    rating: 4,
    comment: "Breakfast was good today.",
  },
  {
    id: 3,
    name: "Priya Singh",
    meal: "Night",
    rating: 3,
    comment: "Food quality can be improved.",
  },
];

export const initialComplaints = [
  {
    id: "CMP-101",
    category: "Food Quality",
    description: "The food was cold during dinner.",
    status: "In Progress",
    date: "Today",
  },
  {
    id: "CMP-102",
    category: "Cleanliness",
    description: "Dining tables need better cleaning.",
    status: "Pending",
    date: "Yesterday",
  },
];