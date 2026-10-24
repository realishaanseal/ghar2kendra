export const CITIES = [
  { id: 'delhi', name: 'New Delhi (NCT)', wards: '250 Wards Active' },
  { id: 'mumbai', name: 'Mumbai (BMC)', wards: '227 Wards Active' },
  { id: 'bengaluru', name: 'Bengaluru (BBMP)', wards: '198 Wards Active' },
  { id: 'hyderabad', name: 'Hyderabad (GHMC)', wards: '150 Wards Active' },
];

export const CATEGORIES = [
  { id: 'all', name: 'All Complaints', icon: '🏛️', count: 6, color: 'from-violet-500 to-indigo-600' },
  { id: 'roads', name: 'Roads & Potholes', icon: '🛣️', count: 2, color: 'from-amber-500 to-orange-600' },
  { id: 'electricity', name: 'Power & Lights', icon: '⚡', count: 1, color: 'from-yellow-400 to-amber-500' },
  { id: 'water', name: 'Water & Sewage', icon: '💧', count: 1, color: 'from-cyan-500 to-teal-600' },
  { id: 'waste', name: 'Solid Waste', icon: '🗑️', count: 1, color: 'from-emerald-500 to-green-600' },
  { id: 'safety', name: 'Public Hazards', icon: '🚨', count: 1, color: 'from-rose-500 to-red-600' },
];

export const MOCK_ISSUES = [
  {
    id: 'G2K-2026-0814',
    title: 'Severe asphalt road crater on outer carriageway',
    description: 'Deep road crater following seasonal rain near bus shelter. Two-wheelers frequently losing balance during peak traffic hours.',
    category: 'roads',
    severity: 'critical', // critical | high | medium | low
    address: 'Near Metro Pillar 142, Outer Ring Road, Ward 14',
    ward: 'Ward 14 (South Extension)',
    department: 'Public Works Dept (PWD Division 2)',
    assignedOfficer: 'Er. Rajesh Varma (Junior Engineer, PWD)',
    contractor: 'Apex Infra Roadworks Pvt Ltd',
    status: 'in_progress', // NOT resolved yet! Should NOT show after image!
    upvotes: 84,
    commentsCount: 14,
    slaRemainingHours: 18,
    lat: 28.6139,
    lng: 77.2090,
    // Real Indian road pothole image
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80',
    resolvedPhotoUrl: null, // NOT fixed yet!
    createdAt: '2 hours ago',
    timelineStep: 3, // 1: Logged, 2: Triaged, 3: Work Order Raised, 4: Resolved
    reportedBy: 'Aarav Sharma',
    timeline: [
      { step: 'Grievance Logged', date: 'Today, 09:15 AM', note: 'AI inspected visual evidence. Priority marked High.', officer: 'System Engine' },
      { step: 'Triaged by Ward Officer', date: 'Today, 10:00 AM', note: 'Reviewed and allocated to Road Repair Sub-division.', officer: 'Ward 14 Nodal Officer' },
      { step: 'Work Order Dispatched', date: 'Today, 11:30 AM', note: 'Crew dispatched with asphalt cold-mix vehicle.', officer: 'Er. Rajesh Varma (PWD)' },
    ],
  },
  {
    id: 'G2K-2026-0792',
    title: 'Open transformer door with dangling high-voltage live wire',
    description: 'Sparks observed during light drizzle. Uninsulated cable hanging 6 feet above children park walking pavement.',
    category: 'electricity',
    severity: 'critical',
    address: 'Opposite Community Park, 4th Cross, Indiranagar',
    ward: 'Ward 8 (Indiranagar)',
    department: 'DISCOM / Power Grid Emergency Unit',
    assignedOfficer: 'Er. K. Natarajan (Grid Superintendent)',
    contractor: 'Emergency Grid Squad',
    status: 'submitted', // NOT resolved yet!
    upvotes: 112,
    commentsCount: 29,
    slaRemainingHours: 6,
    lat: 28.6250,
    lng: 77.2150,
    // Real electrical pole & dangling wire image
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=80',
    resolvedPhotoUrl: null,
    createdAt: '45 mins ago',
    timelineStep: 1,
    reportedBy: 'Priya Narang',
    timeline: [
      { step: 'Grievance Logged', date: 'Today, 11:00 AM', note: 'Critical electrical hazard flagged. Auto-routed to Emergency Grid squad.', officer: 'System AI' }
    ],
  },
  {
    id: 'G2K-2026-0641',
    title: 'Main underground water pipeline rupture flooding residential street',
    description: 'High-pressure treated drinking water pipeline burst. Street completely waterlogged with water supply disrupted to 40 surrounding households.',
    category: 'water',
    severity: 'high',
    address: 'Lane 3, Pocket B, Rohini Sector 15',
    ward: 'Ward 22 (Rohini North)',
    department: 'Delhi Jal Board (Water & Sewerage)',
    assignedOfficer: 'Er. Manish Duggal',
    contractor: 'Jal Board Emergency Pipeline Cell',
    status: 'in_progress', // NOT resolved yet!
    upvotes: 73,
    commentsCount: 8,
    slaRemainingHours: 24,
    lat: 28.6320,
    lng: 77.2020,
    // Real gushing water / street flooding image
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=800&auto=format&fit=crop&q=80',
    resolvedPhotoUrl: null,
    createdAt: '4 hours ago',
    timelineStep: 3,
    reportedBy: 'Vikram Seth',
    timeline: [
      { step: 'Grievance Logged', date: 'Today, 08:00 AM', note: 'Pipeline rupture confirmed by citizen video.', officer: 'System Engine' },
      { step: 'Valve Shut-off Dispatched', date: 'Today, 09:30 AM', note: 'Main feeder valve isolated to stop wastage.', officer: 'Jal Board Central Cell' },
      { step: 'Excavation & Pipe Replacement', date: 'Today, 11:00 AM', note: 'Excavator and 300mm ductile iron sleeve delivered on site.', officer: 'Er. Manish Duggal' }
    ],
  },
  {
    id: 'G2K-2026-0518',
    title: 'Overflowing commercial market garbage dump & scattered debris',
    description: 'Community dumpster uncollected for 6 days. Organic waste and plastic litter spilled onto pedestrian walkway.',
    category: 'waste',
    severity: 'medium',
    address: 'Main Sabzi Mandi Gate, Lajpat Nagar Central',
    ward: 'Ward 6 (Lajpat Nagar)',
    department: 'Municipal Solid Waste Management',
    assignedOfficer: 'Chief Sanitary Inspector S. Chawla',
    contractor: 'EcoClean Municipal Concessionaire',
    status: 'resolved', // RESOLVED! HAS AFTER IMAGE!
    upvotes: 49,
    commentsCount: 12,
    slaRemainingHours: 0,
    lat: 28.6080,
    lng: 77.2200,
    // Real garbage pile photo
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80',
    // Real clean, cleared, sanitized street after photo
    resolvedPhotoUrl: 'https://images.unsplash.com/photo-1582408921715-18e7806365c1?w=800&auto=format&fit=crop&q=80',
    createdAt: '1 day ago',
    timelineStep: 4,
    reportedBy: 'Sunita Mehra',
    resolutionProof: 'Waste cleared, bin sanitized, and photo evidence verified by Ward Inspector.',
    timeline: [
      { step: 'Grievance Logged', date: 'Yesterday, 07:00 AM', note: 'Sanitation complaint lodged with geotag.', officer: 'Citizen App' },
      { step: 'Compactor Truck Dispatched', date: 'Yesterday, 10:30 AM', note: 'Hydraulic compactor truck dispatched for clearing.', officer: 'CSI S. Chawla' },
      { step: 'Deep Clean & Sanitization', date: 'Yesterday, 03:00 PM', note: 'Bin emptied, bleached and sprayed with disinfectant.', officer: 'EcoClean Concessionaire' },
      { step: 'Marked Resolved with Proof', date: 'Yesterday, 05:30 PM', note: 'Completion photo uploaded. Awaiting citizen confirmation.', officer: 'CSI S. Chawla' }
    ],
  },
  {
    id: 'G2K-2026-0422',
    title: 'Damaged sidewalk tiles & deep pothole repaired with fresh asphalt',
    description: 'Broken pedestrian paving repaired and fresh asphalt cold-mix laid to eliminate tripping hazards.',
    category: 'roads',
    severity: 'low',
    address: 'Outside Gate 2, Hauz Khas Village Market',
    ward: 'Ward 18 (Hauz Khas)',
    department: 'Public Works Dept (Roads)',
    assignedOfficer: 'Er. A. K. Joshi',
    contractor: 'South Delhi Paving Contractors',
    status: 'resolved', // RESOLVED! HAS AFTER IMAGE!
    upvotes: 62,
    commentsCount: 7,
    slaRemainingHours: 0,
    lat: 28.5494,
    lng: 77.2001,
    // Real broken road
    imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&auto=format&fit=crop&q=80',
    // Real smooth newly laid asphalt road
    resolvedPhotoUrl: 'https://images.unsplash.com/photo-1578885136359-16c8bd4d3a8e?w=800&auto=format&fit=crop&q=80',
    createdAt: '2 days ago',
    timelineStep: 4,
    reportedBy: 'Devika Nair',
    resolutionProof: 'Fresh bitumen hot-mix laid and rolled. Walkway smooth and leveled.',
    timeline: [
      { step: 'Grievance Logged', date: '2 days ago, 10:00 AM', note: 'Sidewalk hazard registered.', officer: 'Citizen App' },
      { step: 'Repair Crew Dispatched', date: 'Yesterday, 11:00 AM', note: 'Paving crew on site.', officer: 'Er. A. K. Joshi' },
      { step: 'Work Completed & Sealed', date: 'Yesterday, 04:00 PM', note: 'Bitumen rolled and sealed.', officer: 'Contractor Crew' }
    ],
  },
  {
    id: 'G2K-2026-0499',
    title: 'Open storm sewer manhole cover on unlit residential curve',
    description: 'Cover removed during excavation and left uncovered with zero warning signage. Severe fall danger in night hours.',
    category: 'safety',
    severity: 'critical',
    address: 'Back Gate, Karol Bagh Girls College Road',
    ward: 'Ward 3 (Karol Bagh)',
    department: 'Drainage & Sewerage Division',
    assignedOfficer: 'Er. R. K. Singhal',
    contractor: 'PWD Stormwater Maintenance',
    status: 'submitted', // NOT resolved yet!
    upvotes: 95,
    commentsCount: 16,
    slaRemainingHours: 12,
    lat: 28.6400,
    lng: 77.1900,
    // Real open manhole / road hazard photo
    imageUrl: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=800&auto=format&fit=crop&q=80',
    resolvedPhotoUrl: null,
    createdAt: '3 hours ago',
    timelineStep: 1,
    reportedBy: 'Rajesh K.',
    timeline: [
      { step: 'Grievance Logged', date: 'Today, 09:30 AM', note: 'Life safety hazard logged. Escalated to Executive Engineer.', officer: 'System AI' }
    ],
  }
];
