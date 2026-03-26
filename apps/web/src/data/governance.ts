export interface ExecutiveMember {
  name: string;
  position: string;
}

export interface TeamMember {
  name: string;
  position: string;
  category: 'executive' | 'general';
}

export const executiveCommittee: ExecutiveMember[] = [
  { name: 'Dibes BERA', position: 'President' },
  { name: 'Dibya Gopal Ghatak', position: 'Vice President' },
  { name: 'Samir Nayak', position: 'Vice President' },
  { name: 'Narayan Tatachari', position: 'Secretary' },
  { name: 'Pradip De', position: 'Assistant Secretary' },
  { name: 'Pradip Mukherjee', position: 'Treasurer' },
  { name: 'Gautam Banerjee', position: 'Assistant Treasurer' },
  { name: 'Asoke Punjabi', position: 'Executive Member' },
  { name: 'Bikas Baran Ghosh', position: 'Executive Member' },
  { name: 'Sajal Das', position: 'Executive Member' },
  { name: 'Krishnendu Das', position: 'Executive Member' },
];

export const generalMembers: TeamMember[] = [
  { name: 'Asit Baran Giri', position: 'General Member', category: 'general' },
  { name: 'Bikash Ghosh', position: 'General Member', category: 'general' },
  { name: 'Buddhadeb Midya', position: 'General Member', category: 'general' },
  { name: 'Debashis Bose', position: 'General Member', category: 'general' },
  {
    name: 'Debashis Chakraborty',
    position: 'General Member',
    category: 'general',
  },
  { name: 'Dilip Kar', position: 'General Member', category: 'general' },
  { name: 'Jyotirmoy Guha', position: 'General Member', category: 'general' },
  {
    name: 'Pralay Chakraborty',
    position: 'General Member',
    category: 'general',
  },
  { name: 'Pranab Mukherjee', position: 'General Member', category: 'general' },
  { name: 'Somnath Roy', position: 'General Member', category: 'general' },
  { name: 'Subrata Dhar', position: 'General Member', category: 'general' },
  { name: 'Sushil Mondal', position: 'General Member', category: 'general' },
  { name: 'Swaraj Bose', position: 'General Member', category: 'general' },
  { name: 'Tapas Samanta', position: 'General Member', category: 'general' },
];

// Convert executive committee to team member format for TeamSection
export const executiveTeamMembers: TeamMember[] = executiveCommittee.map(
  member => ({
    ...member,
    category: 'executive' as const,
  })
);

// Combined team data for TeamSection
export const teamData: TeamMember[] = [
  ...executiveTeamMembers,
  ...generalMembers,
];
