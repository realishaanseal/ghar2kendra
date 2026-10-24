import { createClient } from '@supabase/supabase-js';
import { MOCK_ISSUES } from '../data/mockIssues';

// =====================================================================
// 1. SUPABASE CLIENT & ENVIRONMENT CONFIGURATION
// =====================================================================
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://your-project.supabase.co' &&
  !supabaseUrl.includes('placeholder')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// =====================================================================
// 2. OFFLINE / DEMO REACTIVE STORE (Zero-Latency Local Persistence)
// =====================================================================
const LOCAL_STORAGE_KEY = 'civic_connect_issues_v3';
const CLOCK_OFFSET_KEY = 'civic_connect_clock_offset_hrs';

function getStoredIssues() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.warn('Failed to read issues from localStorage', err);
  }
  // Initialize with seed data
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(MOCK_ISSUES));
  return [...MOCK_ISSUES];
}

function saveStoredIssues(issues) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(issues));
    window.dispatchEvent(new CustomEvent('civic-issues-updated', { detail: issues }));
  } catch (err) {
    console.error('Failed to save issues to localStorage', err);
  }
}

export function getClockOffsetHours() {
  try {
    const raw = localStorage.getItem(CLOCK_OFFSET_KEY);
    return raw ? parseFloat(raw) : 0;
  } catch {
    return 0;
  }
}

export function setClockOffsetHours(hours) {
  try {
    localStorage.setItem(CLOCK_OFFSET_KEY, String(hours));
    window.dispatchEvent(new CustomEvent('civic-clock-advanced', { detail: hours }));
  } catch (err) {
    console.error('Failed to update clock offset', err);
  }
}

// Calculate distance between two lat/lng coordinates in meters (Haversine formula)
function calculateDistanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // Earth radius in meters
  const toRad = (x) => (x * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// =====================================================================
// 3. CITIZEN API METHODS (Matching Dev 2 backend/20261020000002_api.sql)
// =====================================================================

/**
 * Spatial deduplication: Finds issues within radius (default 50m) matching category.
 */
export async function findNearbyIssues(lat, lng, category = null, radiusMeters = 50) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.rpc('find_nearby_issues', {
        p_lat: lat,
        p_lng: lng,
        p_category: category,
        p_radius_meters: radiusMeters,
      });
      if (!error && data) return data;
    } catch (err) {
      console.warn('Supabase find_nearby_issues failed, using spatial filter', err);
    }
  }

  const issues = getStoredIssues();
  return issues.filter((item) => {
    if (category && item.category !== category) return false;
    if (item.status === 'resolved' || item.status === 'verified') return false;
    const dist = calculateDistanceMeters(lat, lng, item.lat, item.lng);
    return dist <= radiusMeters;
  });
}

/**
 * Report a new civic grievance with AI visual triage tags and GPS coordinates.
 */
export async function reportIssue(issuePayload) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.rpc('report_issue', {
        p_category: issuePayload.category || 'roads',
        p_severity: issuePayload.severity || 'medium',
        p_title: issuePayload.title || 'Civic Defect',
        p_description: issuePayload.description || '',
        p_lat: issuePayload.lat || 28.6139,
        p_lng: issuePayload.lng || 77.2090,
        p_address: issuePayload.address || 'Reported Location',
        p_photo_url: issuePayload.imageUrl || issuePayload.photoUrl || null,
        p_ai_suggested_category: issuePayload.aiSuggestedCategory || issuePayload.category || null,
        p_ai_suggested_severity: issuePayload.aiSuggestedSeverity || issuePayload.severity || null,
        p_ai_confidence: issuePayload.aiConfidence || 95.0,
      });
      if (!error && data) return data;
    } catch (err) {
      console.warn('Supabase report_issue failed, using reactive store', err);
    }
  }

  const issues = getStoredIssues();
  const created = {
    id: `G2K-2026-${String(Math.floor(1000 + Math.random() * 9000))}`,
    title: issuePayload.title || 'Civic Defect Report',
    description: issuePayload.description || '',
    category: issuePayload.category || 'roads',
    severity: issuePayload.severity || 'medium',
    address: issuePayload.address || 'Reported Location',
    ward: issuePayload.ward || 'Ward 14 (South Extension)',
    department: issuePayload.department || 'Public Works Dept (PWD)',
    assignedOfficer: 'Unassigned (Awaiting Triage)',
    contractor: 'Pending Allocation',
    status: 'submitted',
    upvotes: 1,
    commentsCount: 0,
    slaRemainingHours: issuePayload.severity === 'critical' ? 12 : issuePayload.severity === 'high' ? 24 : 48,
    lat: issuePayload.lat || 28.6139,
    lng: issuePayload.lng || 77.2090,
    imageUrl: issuePayload.imageUrl || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800&auto=format&fit=crop&q=80',
    resolvedPhotoUrl: null,
    createdAt: 'Just now',
    reportedAt: new Date().toISOString(),
    timelineStep: 1,
    reportedBy: issuePayload.reportedBy || 'Citizen',
    timeline: [
      {
        step: 'Grievance Logged',
        date: 'Just now',
        note: `AI visual scan confirmed ${issuePayload.category || 'civic'} issue. Logged to triage queue.`,
        officer: 'Automated AI Dispatch',
      },
    ],
  };

  issues.unshift(created);
  saveStoredIssues(issues);
  return created;
}

/**
 * Support an existing issue ("Upvote & Merge" with optional evidence photo).
 */
export async function supportIssue(issueId, photoUrl = null) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.rpc('support_issue', {
        p_issue_id: issueId,
        p_photo_url: photoUrl,
      });
      if (!error && data) return data;
    } catch (err) {
      console.warn('Supabase support_issue failed, using local store', err);
    }
  }

  const issues = getStoredIssues();
  const idx = issues.findIndex((i) => i.id === issueId);
  if (idx !== -1) {
    issues[idx].upvotes = (issues[idx].upvotes || 0) + 1;
    saveStoredIssues(issues);
    return issues[idx];
  }
  return null;
}

/**
 * Toggle upvote on a grievance card.
 */
export async function toggleUpvote(issueId) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.rpc('toggle_upvote', {
        p_issue_id: issueId,
      });
      if (!error && typeof data === 'number') return data;
    } catch (err) {
      console.warn('Supabase toggle_upvote failed, using local store', err);
    }
  }

  const issues = getStoredIssues();
  const idx = issues.findIndex((i) => i.id === issueId);
  if (idx !== -1) {
    issues[idx].upvotes = (issues[idx].upvotes || 0) + 1;
    saveStoredIssues(issues);
    return issues[idx].upvotes;
  }
  return 0;
}

/**
 * Fetch issue feed (supports modes: 'latest', 'trending', 'near').
 */
export async function getFeed({ mode = 'latest', category = null, search = '' } = {}) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.rpc('get_feed', {
        p_mode: mode,
        p_category: category === 'all' ? null : category,
      });
      if (!error && data) return data;
    } catch (err) {
      console.warn('Supabase get_feed failed, falling back to local store', err);
    }
  }

  const issues = getStoredIssues();
  const offset = getClockOffsetHours();

  return issues
    .map((issue) => {
      if (issue.status === 'resolved' || issue.status === 'verified') {
        return { ...issue, slaRemainingHours: 0, isBreached: false };
      }
      const adjustedSla = (issue.slaRemainingHours ?? 24) - offset;
      return {
        ...issue,
        slaRemainingHours: adjustedSla,
        isBreached: adjustedSla <= 0,
      };
    })
    .filter((issue) => {
      if (category && category !== 'all' && issue.category !== category) return false;
      if (search && search.trim()) {
        const q = search.toLowerCase();
        const matchesTitle = issue.title?.toLowerCase().includes(q);
        const matchesAddress = issue.address?.toLowerCase().includes(q);
        const matchesId = issue.id?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesAddress && !matchesId) return false;
      }
      return true;
    });
}

/**
 * Fetch issues within a geographic map viewport bounding box.
 */
export async function getMapIssues(bounds) {
  const issues = await getFeed();
  if (!bounds) return issues;
  return issues.filter(
    (item) =>
      item.lat >= bounds.minLat &&
      item.lat <= bounds.maxLat &&
      item.lng >= bounds.minLng &&
      item.lng <= bounds.maxLng
  );
}

/**
 * Fetch a single issue by ID with timeline and resolution proof.
 */
export async function getIssue(issueId) {
  const issues = await getFeed();
  return issues.find((item) => item.id === issueId) || null;
}

/**
 * Merge extra fields into a stored issue (used by the civic modules for links and metadata).
 */
export function updateIssue(issueId, patch) {
  const issues = getStoredIssues();
  const idx = issues.findIndex((i) => i.id === issueId);
  if (idx === -1) return null;
  issues[idx] = { ...issues[idx], ...patch };
  saveStoredIssues(issues);
  return issues[idx];
}

/**
 * Citizen Ground Reality Verification: Confirm resolution or dispute incomplete work.
 */
export async function verifyResolution(issueId, confirmed = true, rating = 5, comment = '') {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase.rpc('verify_resolution', {
        p_issue_id: issueId,
        p_confirmed: confirmed,
        p_rating: rating,
        p_comment: comment,
      });
      if (!error && data) return data;
    } catch (err) {
      console.warn('Supabase verify_resolution failed, using local store', err);
    }
  }

  const issues = getStoredIssues();
  const idx = issues.findIndex((i) => i.id === issueId);
  if (idx !== -1) {
    if (confirmed) {
      issues[idx].status = 'verified';
      issues[idx].verifiedAt = new Date().toISOString();
      issues[idx].timelineStep = 4;
      issues[idx].timeline = issues[idx].timeline || [];
      issues[idx].timeline.push({
        step: 'Citizen Ground Reality Confirmed',
        date: 'Today, Just now',
        note: comment || 'Citizen confirmed on ground that problem is resolved. +50 Karma credited.',
        officer: 'Citizen Verifier',
      });
    } else {
      issues[idx].status = 'in_progress';
      issues[idx].timelineStep = 3;
      issues[idx].timeline = issues[idx].timeline || [];
      issues[idx].timeline.push({
        step: 'Repair Disputed by Citizen',
        date: 'Today, Just now',
        note: `Ground fix rejected: "${comment || 'Incomplete repair'}". Escalated to Executive Engineer.`,
        officer: 'Third-Party Audit Desk',
      });
    }
    saveStoredIssues(issues);
    return issues[idx];
  }
  return null;
}

/**
 * Reverse geocode latitude and longitude to street address and ward.
 * Uses the app's own /api/reverse-geocode route, with a direct Nominatim fallback.
 */
export async function reverseGeocode(lat, lng) {
  // 1. Try the app's /api route first (same origin locally and on Vercel)
  try {
    const res = await fetch(`/api/reverse-geocode?lat=${lat}&lon=${lng}`);
    if (res && res.ok) {
      const data = await res.json();
      if (data && data.address) {
        return {
          address: data.address,
          ward: 'Ward 14 (South Extension)',
          city: 'New Delhi',
        };
      }
    }
  } catch (err) {
    console.warn('/api/reverse-geocode unavailable, falling back', err);
  }

  // 2. Direct Nominatim fallback
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
      { headers: { 'User-Agent': 'Ghar2Kendra/1.0 (contact@ghar2kendra.gov.in)' } }
    );
    if (res.ok) {
      const data = await res.json();
      return {
        address: data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        ward: data.address?.suburb || data.address?.neighbourhood || 'Ward 14 (South Extension)',
        city: data.address?.city || data.address?.state_district || 'New Delhi',
      };
    }
  } catch (err) {
    console.warn('Nominatim geocoding fallback', err);
  }

  return {
    address: `Near Metro Junction, Coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
    ward: 'Ward 14 (South Extension)',
    city: 'New Delhi',
  };
}

/**
 * Downscale a photo before upload. Phone photos are often 5–12 MB, while Vercel Functions
 * accept request bodies only up to 4.5 MB; 1600 px JPEG keeps plenty of detail for triage.
 */
async function compressImage(blob, maxDim = 1600, quality = 0.82) {
  try {
    if (typeof createImageBitmap !== 'function') return blob;
    const bitmap = await createImageBitmap(blob);
    const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close?.();
    const out = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
    return out && out.size < blob.size ? out : blob;
  } catch (err) {
    console.warn('Image compression failed, uploading original', err);
    return blob;
  }
}

/**
 * AI Multimodal Defect Analysis:
 * Calls the app's Gemini Vision route (/api/analyze-image), with a local fallback.
 */
export async function analyzePhoto(fileOrBlob) {
  // 1. Try the /api/analyze-image route (Gemini Vision, server-side key)
  try {
    let fileToSend = fileOrBlob;
    if (typeof fileOrBlob === 'string' && (fileOrBlob.startsWith('blob:') || fileOrBlob.startsWith('data:'))) {
      const blobRes = await fetch(fileOrBlob);
      fileToSend = await blobRes.blob();
    }

    if (fileToSend) {
      const formData = new FormData();
      formData.append('image', await compressImage(fileToSend), 'grievance.jpg');

      const res = await fetch('/api/analyze-image', {
        method: 'POST',
        body: formData,
      });

      if (res && res.ok) {
        const data = await res.json();
        let cat = 'roads';
        const rawCat = (data.category || '').toLowerCase();
        if (rawCat.includes('pothole') || rawCat.includes('road')) cat = 'roads';
        else if (rawCat.includes('garbage') || rawCat.includes('waste')) cat = 'waste';
        else if (rawCat.includes('water') || rawCat.includes('drain')) cat = 'water';
        else if (rawCat.includes('light') || rawCat.includes('electric') || rawCat.includes('wire')) cat = 'electricity';
        else if (rawCat.includes('safe') || rawCat.includes('hazard')) cat = 'safety';
        else if (rawCat === 'none') cat = 'other';

        // Map urgency level from AI response
        let urgency = 'medium';
        const rawUrgency = (data.urgency || data.severity || '').toLowerCase();
        if (rawUrgency.includes('critical')) urgency = 'critical';
        else if (rawUrgency.includes('high')) urgency = 'high';
        else if (rawUrgency.includes('low')) urgency = 'low';
        else if (data.confidence && data.confidence > 0.95) urgency = 'high';

        const fallbackTitles = {
          waste: 'Overflowing municipal garbage heap on public walkway',
          roads: 'Severe asphalt road crater on outer carriageway',
          water: 'Potable water pipeline leakage and street waterlogging',
          electricity: 'Exposed live cable and non-functional street lamp',
          safety: 'Uncovered storm drain manhole creating imminent fall hazard',
          other: 'Reported public infrastructure defect',
        };

        const fallbackDetails = {
          waste: 'Unsegregated municipal solid waste and plastic debris overflowing onto pedestrian footpath, causing severe sanitation hazard and foul odor.',
          roads: 'Deep asphalt surface crater following seasonal wear. Poses severe skid and rollover risk for two-wheelers and pedestrians.',
          water: 'Continuous potable water overflow from damaged distribution pipe, resulting in local street flooding and water pressure loss.',
          electricity: 'Damaged power feeder box with uninsulated wire dangling at pedestrian head height, posing shock risk during rain.',
          safety: 'Missing or dislodged concrete manhole cover on busy street, creating immediate vehicular and pedestrian fall hazard.',
          other: 'Citizen documented civic defect requiring municipal engineering inspection and repair crew allocation.',
        };

        return {
          category: cat,
          severity: urgency,
          urgency: urgency,
          title: data.title || fallbackTitles[cat] || 'Reported Civic Defect',
          description: data.details || data.description || fallbackDetails[cat],
          confidence: Math.round((data.confidence || 0.94) * 1000) / 10,
        };
      }
    }
  } catch (err) {
    console.warn('/api/analyze-image unavailable, falling back', err);
  }

  // Graceful fallback inspection
  return {
    category: 'roads',
    severity: 'high',
    title: 'Severe asphalt road crater on outer carriageway',
    description: 'Deep road crater following seasonal rain near bus shelter. Two-wheelers frequently losing balance.',
    confidence: 98.4,
  };
}

// =====================================================================
// 4. MUNICIPAL & PANCHAYAT ADMIN APIS (admin.*)
// =====================================================================
export const admin = {
  /**
   * Fetch admin triage queue ordered by breached SLA first.
   */
  async getQueue({ department = null, status = null, severity = null } = {}) {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.rpc('admin_queue', {
          p_department: department === 'all' ? null : department,
          p_status: status === 'all' ? null : status,
          p_severity: severity === 'all' ? null : severity,
        });
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase admin_queue failed, using local store', err);
      }
    }
    return getFeed({ category: department });
  },

  /**
   * Fetch executive KPI metrics (Total active, breached, MTTR, by category).
   */
  async getKpis(department = null) {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.rpc('admin_kpis', {
          p_department: department,
        });
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase admin_kpis failed, calculating locally', err);
      }
    }
    const issues = await getFeed();
    const active = issues.filter((i) => i.status !== 'resolved' && i.status !== 'verified').length;
    const breached = issues.filter((i) => i.isBreached).length;
    const resolved = issues.filter((i) => i.status === 'resolved' || i.status === 'verified').length;

    return {
      activeCount: active,
      breachedCount: breached,
      resolvedCount: resolved,
      avgMttrHours: 28.4,
    };
  },

  /**
   * Triage grievance: override AI-suggested category, severity, or department.
   */
  async triageIssue(issueId, { category, severity, department, note = '' }) {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.rpc('triage_issue', {
          p_issue_id: issueId,
          p_category: category,
          p_severity: severity,
          p_department: department,
          p_note: note,
        });
      } catch (err) {
        console.warn('Supabase triage_issue failed', err);
      }
    }

    const issues = getStoredIssues();
    const idx = issues.findIndex((i) => i.id === issueId);
    if (idx !== -1) {
      if (category) issues[idx].category = category;
      if (severity) issues[idx].severity = severity;
      if (department) issues[idx].department = department;
      issues[idx].status = 'triaged';
      saveStoredIssues(issues);
      return issues[idx];
    }
    return null;
  },

  /**
   * Assign work order to contractor or officer (moves ticket to in_progress).
   */
  async assignIssue(issueId, { contractor, assignedOfficer, slaHours = 24, note = '' }) {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.rpc('assign_issue', {
          p_issue_id: issueId,
          p_note: note,
        });
      } catch (err) {
        console.warn('Supabase assign_issue failed', err);
      }
    }

    const issues = getStoredIssues();
    const idx = issues.findIndex((i) => i.id === issueId);
    if (idx !== -1) {
      issues[idx].status = 'in_progress';
      issues[idx].contractor = contractor || issues[idx].contractor;
      issues[idx].assignedOfficer = assignedOfficer || issues[idx].assignedOfficer;
      issues[idx].slaRemainingHours = slaHours;
      issues[idx].timelineStep = 3;
      issues[idx].timeline = issues[idx].timeline || [];
      issues[idx].timeline.push({
        step: 'Work Order Dispatched',
        date: 'Today, Just now',
        note: note || `Dispatched to ${contractor}. Supervising: ${assignedOfficer}.`,
        officer: assignedOfficer || 'Ward Command Center',
      });
      saveStoredIssues(issues);
      return issues[idx];
    }
    return null;
  },

  /**
   * Mark issue resolved with mandatory after-fix photo proof and completion note.
   */
  async resolveIssue(issueId, { resolvedPhotoUrl, resolutionProof, officerName = 'Ward Officer', invoiceId = '' }) {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.rpc('resolve_issue', {
          p_issue_id: issueId,
          p_after_photo_url: resolvedPhotoUrl,
          p_note: resolutionProof,
        });
      } catch (err) {
        console.warn('Supabase resolve_issue failed', err);
      }
    }

    const issues = getStoredIssues();
    const idx = issues.findIndex((i) => i.id === issueId);
    if (idx !== -1) {
      issues[idx].status = 'resolved';
      issues[idx].resolvedPhotoUrl = resolvedPhotoUrl;
      issues[idx].resolutionProof = resolutionProof || 'Contractor work verified on ground.';
      issues[idx].resolvedAt = new Date().toISOString();
      issues[idx].slaRemainingHours = 0;
      issues[idx].timelineStep = 4;
      issues[idx].timeline = issues[idx].timeline || [];
      issues[idx].timeline.push({
        step: 'Marked Resolved with Proof',
        date: 'Today, Just now',
        note: `${resolutionProof || 'Repairs completed.'} (Invoice: ${invoiceId || 'INV-2026-OK'})`,
        officer: officerName,
      });
      saveStoredIssues(issues);
      return issues[idx];
    }
    return null;
  },

  /**
   * Reject issue (spam, duplicate, out-of-jurisdiction).
   */
  async rejectIssue(issueId, reason = 'Duplicate report', duplicateOfId = null) {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.rpc('reject_issue', {
          p_issue_id: issueId,
          p_reason: reason,
          p_duplicate_of: duplicateOfId,
        });
      } catch (err) {
        console.warn('Supabase reject_issue failed', err);
      }
    }

    const issues = getStoredIssues();
    const idx = issues.findIndex((i) => i.id === issueId);
    if (idx !== -1) {
      issues[idx].status = 'rejected';
      saveStoredIssues(issues);
      return issues[idx];
    }
    return null;
  },

  /**
   * Fast-forward simulation clock (+12h, +24h, +48h) to demonstrate SLA breaches live.
   */
  simulateTime(hours = 48) {
    const current = getClockOffsetHours();
    const next = current + hours;
    setClockOffsetHours(next);
    return next;
  },

  /**
   * Reset simulation clock back to real-time.
   */
  resetDemoClock() {
    setClockOffsetHours(0);
    return 0;
  },
};

// =====================================================================
// 5. UNIFIED GHAR2KENDRA API (With CivicAPI backward compatibility alias)
// =====================================================================
export const Ghar2KendraAPI = {
  getIssues: () => getFeed(),
  getIssueById: (id) => getIssue(id),
  reportIssue: (data) => reportIssue(data),
  analyzePhoto: (file) => analyzePhoto(file),
  reverseGeocode: (lat, lng) => reverseGeocode(lat, lng),
  upvoteIssue: (id) => toggleUpvote(id),
  assignWorkOrder: (id, payload) => admin.assignIssue(id, payload),
  resolveIssueWithProof: (id, payload) => admin.resolveIssue(id, payload),
  verifyIssueResolution: (id) => verifyResolution(id, true),
  simulateAdvanceClock: (hours) => admin.simulateTime(hours),
  resetClock: () => admin.resetDemoClock(),
  resetToDefault() {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem(CLOCK_OFFSET_KEY);
    // Civic module stores reseed themselves on next read.
    ['g2k_proofs_v1', 'g2k_missions_v1', 'g2k_radar_places_v1', 'g2k_workspaces_v1'].forEach((key) =>
      localStorage.removeItem(key)
    );
    saveStoredIssues(MOCK_ISSUES);
    setClockOffsetHours(0);
    return [...MOCK_ISSUES];
  },
};

export const CivicAPI = Ghar2KendraAPI;
