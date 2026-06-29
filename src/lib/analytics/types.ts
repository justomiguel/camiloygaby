export type VisitDeviceType = "mobile" | "tablet" | "desktop" | "unknown";

export type SiteVisitRow = {
  id: string;
  session_id: string;
  country_code: string | null;
  country_name: string | null;
  city: string | null;
  region: string | null;
  referrer: string | null;
  path: string;
  user_agent: string | null;
  device_type: VisitDeviceType | null;
  created_at: string;
};

export type CountryStat = {
  code: string;
  name: string;
  visits: number;
  sessions: number;
};

export type DayStat = {
  date: string;
  visits: number;
  sessions: number;
};

export type HourStat = {
  hour: number;
  visits: number;
};

export type DeviceStat = {
  device: VisitDeviceType;
  count: number;
};

export type ReferrerStat = {
  source: string;
  count: number;
};

export type AdminStats = {
  totals: {
    visits: number;
    uniqueSessions: number;
    countries: number;
    today: number;
    yesterday: number;
    thisWeek: number;
    mobileShare: number;
  };
  byCountry: CountryStat[];
  byDay: DayStat[];
  byHour: HourStat[];
  byDevice: DeviceStat[];
  topReferrers: ReferrerStat[];
  recentVisits: SiteVisitRow[];
  rsvp: {
    total: number;
    attending: number;
    notAttending: number;
    vegetarian: number;
    wantsToSing: number;
  };
};
