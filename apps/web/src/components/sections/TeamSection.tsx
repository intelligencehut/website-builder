'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { teamData } from '@/data/governance';
import type { TeamMember, SectionHeader } from '@website-builder/content-schema';

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const getCategoryTitle = (category: string) => {
  switch (category) {
    case 'executive':
      return 'Executive Committee';
    case 'general':
      return 'General Members';
    default:
      return '';
  }
};

const TeamMemberCard = ({ member }: { member: TeamMember }) => (
  <Card className='text-center hover:shadow-lg transition-shadow'>
    <CardHeader className='pb-4'>
      <div className='flex justify-center mb-4'>
        <Avatar className='size-16'>
          <AvatarFallback className='bg-orange-100 text-orange-600 text-lg font-medium'>
            {getInitials(member.name)}
          </AvatarFallback>
        </Avatar>
      </div>
    </CardHeader>
    <CardContent className='pt-0'>
      <h4 className='text-lg font-semibold text-gray-900 mb-2'>
        {member.name}
      </h4>
      <p className='text-orange-600 font-medium'>{member.position}</p>
    </CardContent>
  </Card>
);

interface Props {
  header?: SectionHeader;
  members?: TeamMember[];
}

export function TeamSection({ header, members = teamData }: Props) {
  const categories = ['executive', 'general'] as const;

  return (
    <section id='team' className='py-20 bg-white'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center space-y-6 mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900'>
            Team SEVAA
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Meet the dedicated individuals who guide our organization in serving
            communities across Bengal and beyond.
          </p>
        </div>

        <div className='space-y-16'>
          {categories.map(category => {
            const categoryMembers = members.filter(
              member => member.category === category
            );

            return (
              <div key={category} className='space-y-8'>
                <div className='text-center'>
                  <h3 className='text-2xl md:text-3xl font-bold text-gray-900 mb-2'>
                    {getCategoryTitle(category)}
                  </h3>
                  <div className='w-24 h-1 bg-orange-600 mx-auto rounded-full'></div>
                </div>

                <div
                  className={`grid gap-6 ${
                    category === 'general'
                      ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                      : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
                  }`}
                >
                  {categoryMembers.map((member, index) => (
                    <TeamMemberCard key={index} member={member} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
