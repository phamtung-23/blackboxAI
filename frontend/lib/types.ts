export type Format = "5-a-side" | "7-a-side" | "11-a-side";
export type Level = "Casual" | "Amateur" | "Semi-pro" | "Competitive";
export type Position =
  | "GK"
  | "CB"
  | "LB"
  | "RB"
  | "CDM"
  | "CM"
  | "CAM"
  | "LW"
  | "RW"
  | "ST";

export type Foot = "Left" | "Right" | "Both";

export interface Achievement {
  year: number;
  title: string;
}

export interface Team {
  id: string;
  slug: string;
  name: string;
  vnName: string;
  logo: string;
  cover: string;
  city: string;
  country: string;
  format: Format;
  level: Level;
  founded: number;
  rating: number;
  members: number;
  capacity: number;
  openSlots: number;
  bio: string;
  bioVi: string;
  schedule: string;
  achievements: Achievement[];
  recentForm: ("W" | "D" | "L")[];
  captainId: string;
  memberIds: string[];
}

export interface PlayerStats {
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
  stamina: number;
  goalkeeping?: number;
}

export interface MatchEntry {
  date: string;
  opponent: string;
  result: "W" | "D" | "L";
  score: string;
  goals?: number;
  assists?: number;
}

export interface Player {
  id: string;
  slug: string;
  name: string;
  username: string;
  avatar: string;
  cover: string;
  city: string;
  country: string;
  position: Position;
  altPositions: Position[];
  foot: Foot;
  height: number;
  weight: number;
  age: number;
  yearsPlaying: number;
  rating: number;
  stats: PlayerStats;
  bio: string;
  bioVi: string;
  teamId?: string;
  availability: ("Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun")[];
  achievements: Achievement[];
  matchHistory: MatchEntry[];
}
