export type RoutePath = 'overview' | 'models' | 'philosophy' | 'specs' | 'about' | 'faq' | 'demo' | 'dashboard' | 'profile' | 'updates' | 'join';

export interface ModelSpec {
  id: string;
  name: string;
  tag: string;
  status: 'Available' | 'In Development' | 'Planned';
  params: string;
  domain: string;
  speed: string;
  context: string;
  highlight: string;
}

export interface GeometricMetric {
  code: string;
  value: string;
  label: string;
  desc: string;
}

export interface WaitlistRecord {
  id?: string;
  user_id?: string;
  email: string;
  full_name?: string;
  organization?: string;
  role?: string;
  intended_use?: string;
  delivery_channel: 'all' | 'hosted_api' | 'compiled_binary' | 'weights';
  preferred_hardware?: string;
  status: 'pending' | 'reviewing' | 'approved' | 'invited';
  position: number;
  created_at?: string;
}

export interface ProjectUpdate {
  id: string;
  title: string;
  version_tag: string;
  date: string;
  category: 'Milestone' | 'Research' | 'Architecture' | 'Delivery';
  summary: string;
  details: string[];
  is_pinned?: boolean;
}

