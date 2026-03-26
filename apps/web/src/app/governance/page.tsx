import { Metadata } from 'next';
import { Header } from '@/components/layout';
import { InViewAnimation } from '@/components/common';
import {
  Users,
  Crown,
  UserCheck,
  User,
  Building,
  Handshake,
  GraduationCap,
  Heart,
  Briefcase,
  BookOpen,
  Monitor,
  HeartHandshake,
  MapPin,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generatePageMetadata } from '@/lib/seo';
import { executiveCommittee } from '@/data/governance';

export const metadata: Metadata = generatePageMetadata({
  title: 'Governance',
  description:
    "SEVAA's governance structure including Executive Committee, Members, Associate Members, Friends, and Partners working together to serve communities.",
  keywords: [
    'governance',
    'executive committee',
    'sevaa members',
    'associate members',
    'sevaa friends',
    'sevaa partners',
    'organization structure',
    'leadership',
  ],
  url: '/governance',
});

// Helper function to restructure executive committee data for display
const getExecutiveCommitteeDisplay = () => {
  return {
    president:
      executiveCommittee.find(member => member.position === 'President')
        ?.name || '',
    vicePresidents: executiveCommittee
      .filter(member => member.position === 'Vice President')
      .map(member => member.name),
    secretary:
      executiveCommittee.find(member => member.position === 'Secretary')
        ?.name || '',
    assistantSecretary:
      executiveCommittee.find(
        member => member.position === 'Assistant Secretary'
      )?.name || '',
    treasurer:
      executiveCommittee.find(member => member.position === 'Treasurer')
        ?.name || '',
    assistantTreasurer:
      executiveCommittee.find(
        member => member.position === 'Assistant Treasurer'
      )?.name || '',
    members: executiveCommittee
      .filter(member => member.position === 'Executive Member')
      .map(member => member.name),
  };
};

const sevaaMembers = [
  'Asit Baran Giri',
  'Bikash Ghosh',
  'Buddhadeb Midya',
  'Debashis Bose',
  'Debashis Chakraborty',
  'Dilip Kar',
  'Jyotirmoy Guha',
  'Pralay Chakraborty',
  'Pranab Mukherjee',
  'Somnath Roy',
  'Subrata Dhar',
  'Sushil Mondal',
  'Swaraj Bose',
  'Tapas Samanta',
];

const sevaaAssocMembers = [
  'Adrija Bannerjee',
  'Ahana Bera',
  'Dipankar Dan',
  'Krishnendu Kundu',
  'Ranita Ghosh Dastidar',
  'Santosh Mandal',
  'Tapas Kumar Haldar',
  'Tarun Ghatak',
  'Dr Tapas Mondal',
  'Dr Srishti Nayak',
  'Dilip kr Som',
  'Maloy Chakraborty',
  'Shukdev Das',
  'Ushakanta Kundu',
  'Jitendranath Jana',
];

const sevaaFriends: string[] = [
  // Placeholder - to be populated based on existing data
];

const sevaaPartners: string[] = [
  // Placeholder - to be populated based on existing data
];

// Subcommittees
const subcommittees = [
  {
    name: 'Education Subcommittee',
    description: 'Focuses on educational initiatives and literacy programs',
    leader: 'Dibya Gopal Ghatak',
    assistantLeader: 'Samir Nayak',
    members: [
      'Ratan Ghosh Dastidar',
      'Swapan Maity',
      'Ahana Bera',
      'Asit Baran Giri',
      'Sudesna Giri',
      'Bina Punjabi',
      'Bisweswar Ghosh',
    ],
    icon: 'GraduationCap',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    name: 'We Support Sub committee',
    description: 'Coordinates support activities and community assistance',
    leader: 'Asoke Punjabi',
    assistantLeader: 'Samir Nayak',
    members: [],
    icon: 'Heart',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
  },
  {
    name: 'Livelihood Sub Committee',
    description:
      'Develops livelihood programs and skill development initiatives',
    leader: 'Krishnendu Das',
    assistantLeader: 'Pradip De',
    members: ['Siddharth Maity', 'Tapas Halder'],
    icon: 'Briefcase',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    name: 'Health Sub Committee',
    description: 'Manages health programs and medical assistance initiatives',
    leader: 'Bikas Baran Ghosh',
    assistantLeader: 'Saikat Das',
    members: [
      'Dr. Netai Dutta',
      'Dr. M M Ghatak',
      'Jaydev De',
      'Debasis Chowdhury',
    ],
    icon: 'HeartHandshake',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
  },
  {
    name: 'Cultural & Publication Sub Committee',
    description: 'Oversees cultural activities and publication initiatives',
    leader: 'Gautam Banerjee',
    assistantLeader: 'Swapan Maity',
    members: ['Subrata Dhar', 'Bikas Baran Ghosh', 'Saikat Das'],
    icon: 'BookOpen',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  {
    name: 'Tech-Support & Website Sub Committee',
    description: 'Manages technical infrastructure and website development',
    leader: 'Sajal Das',
    assistantLeader: 'Ratan Ghosh Dastidar',
    members: [
      'Ramit Kumar Ray',
      'Aadrita Banerjee',
      'Amit Das',
      'Gautam Banerjee',
      'Samir Nayak',
    ],
    icon: 'Monitor',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
  },
];

const landDonors = [
  'Ganesh Murmu, S/O Lt. Dhaniram Murmu',
  'Sudhir Murmu, S/O Lt. Mansaram Murmu',
  'Joysingh Murmu, S/O Lt. Mansaram Murmu',
  'Jamiswar Murmu, S/O Lt. Rasik Murmu',
  'Matal Murmu, S/O Lt. Rasik Murmu',
  'Buddhadeb Murmu, S/O Lt. Shankar Murmu',
];

export default function GovernancePage() {
  const executiveCommitteeDisplay = getExecutiveCommitteeDisplay();
  return (
    <>
      <Header />
      <div className='min-h-screen bg-gradient-to-br from-accent to-white pt-16'>
        {/* Hero Section */}
        <section className='bg-accent py-8'>
          <div className='container mx-auto px-8 md:px-4'>
            <InViewAnimation>
              <div className='text-center max-w-4xl mx-auto space-y-4'>
                <h1 className='font-display text-4xl md:text-5xl font-light leading-tight text-text-primary mb-4'>
                  Governance
                </h1>
                <p className='text-lg text-secondary leading-relaxed'>
                  Our organizational structure and the dedicated individuals who
                  guide SEVAA&apos;s mission
                </p>
              </div>
            </InViewAnimation>
          </div>
        </section>

        {/* Overview */}
        <section className='py-10'>
          <div className='container mx-auto px-8 md:px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <Card className='bg-white border border-border shadow-md hover:shadow-lg transition-shadow duration-300 mb-16'>
                  <CardContent className='p-8 md:p-12'>
                    <h2 className='font-display text-5xl md:text-4xl font-light text-text-primary mb-8 text-center flex items-center justify-center gap-3'>
                      <Building className='h-8 w-8 text-primary' />
                      SEVAA Governance Structure
                    </h2>
                    <div className='space-y-6 text-base font-light leading-relaxed text-secondary'>
                      <p>
                        SEVAA operates through a comprehensive governance
                        structure designed to ensure effective leadership,
                        transparent decision-making, and broad community
                        engagement. Our organization is built on the foundation
                        of Swami Vivekananda&apos;s ideals of service and social
                        transformation.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* Executive Committee */}
        <section id='executive-committee' className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <div className='text-center mb-12'>
                  <h2 className='font-display text-3xl font-light text-text-primary mb-4 flex items-center justify-center gap-3'>
                    <UserCheck className='h-8 w-8 text-primary' />
                    Executive Committee
                  </h2>
                  <p className='text-lg text-secondary max-w-3xl mx-auto'>
                    Our leadership team responsible for day-to-day operations
                    and strategic implementation
                  </p>
                </div>
              </InViewAnimation>

              <div className='space-y-8'>
                {/* President */}
                <InViewAnimation delay={0.1}>
                  <Card className='bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20'>
                    <CardContent className='pt-6'>
                      <div className='text-center'>
                        <div className='w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4'>
                          <Crown className='h-8 w-8 text-primary' />
                        </div>
                        <h3 className='text-xl font-bold text-text-primary mb-1'>
                          {executiveCommitteeDisplay.president}
                        </h3>
                        <p className='text-primary font-semibold'>President</p>
                      </div>
                    </CardContent>
                  </Card>
                </InViewAnimation>

                {/* Vice Presidents */}
                <div className='grid md:grid-cols-2 gap-6'>
                  {executiveCommitteeDisplay.vicePresidents.map(
                    (name, index) => (
                      <InViewAnimation key={name} delay={0.2 + index * 0.1}>
                        <Card className='bg-white hover:shadow-lg transition-all'>
                          <CardContent className='pt-6 pb-4'>
                            <div className='text-center'>
                              <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                                <UserCheck className='h-6 w-6 text-primary' />
                              </div>
                              <h3 className='font-semibold text-text-primary'>
                                {name}
                              </h3>
                              <p className='text-sm text-primary font-medium mt-1'>
                                Vice President
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </InViewAnimation>
                    )
                  )}
                </div>

                {/* Secretary and Treasurer Row */}
                <div className='grid md:grid-cols-2 gap-6'>
                  <InViewAnimation delay={0.4}>
                    <Card className='bg-white hover:shadow-lg transition-all'>
                      <CardContent className='pt-6 pb-4'>
                        <div className='text-center'>
                          <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <UserCheck className='h-6 w-6 text-primary' />
                          </div>
                          <h3 className='font-semibold text-text-primary'>
                            {executiveCommitteeDisplay.secretary}
                          </h3>
                          <p className='text-sm text-primary font-medium mt-1'>
                            Secretary
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </InViewAnimation>

                  <InViewAnimation delay={0.5}>
                    <Card className='bg-white hover:shadow-lg transition-all'>
                      <CardContent className='pt-6 pb-4'>
                        <div className='text-center'>
                          <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <UserCheck className='h-6 w-6 text-primary' />
                          </div>
                          <h3 className='font-semibold text-text-primary'>
                            {executiveCommitteeDisplay.treasurer}
                          </h3>
                          <p className='text-sm text-primary font-medium mt-1'>
                            Treasurer
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </InViewAnimation>
                </div>

                {/* Assistant Positions */}
                <div className='grid md:grid-cols-2 gap-6'>
                  <InViewAnimation delay={0.6}>
                    <Card className='bg-white hover:shadow-lg transition-all'>
                      <CardContent className='pt-6 pb-4'>
                        <div className='text-center'>
                          <div className='w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <User className='h-6 w-6 text-secondary' />
                          </div>
                          <h3 className='font-semibold text-text-primary'>
                            {executiveCommitteeDisplay.assistantSecretary}
                          </h3>
                          <p className='text-sm text-secondary font-medium mt-1'>
                            Assistant Secretary
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </InViewAnimation>

                  <InViewAnimation delay={0.7}>
                    <Card className='bg-white hover:shadow-lg transition-all'>
                      <CardContent className='pt-6 pb-4'>
                        <div className='text-center'>
                          <div className='w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <User className='h-6 w-6 text-secondary' />
                          </div>
                          <h3 className='font-semibold text-text-primary'>
                            {executiveCommitteeDisplay.assistantTreasurer}
                          </h3>
                          <p className='text-sm text-secondary font-medium mt-1'>
                            Assistant Treasurer
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </InViewAnimation>
                </div>

                {/* Executive Members */}
                <InViewAnimation delay={0.8}>
                  <Card className='bg-white border-secondary/20 shadow-lg'>
                    <CardHeader className='pb-4'>
                      <CardTitle className='text-xl'>
                        Executive Committee Members
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {executiveCommitteeDisplay.members.map(name => (
                          <div
                            key={name}
                            className='flex items-center space-x-3 p-3 bg-accent/20 rounded-lg'
                          >
                            <div className='w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center'>
                              <User className='h-4 w-4 text-secondary' />
                            </div>
                            <div>
                              <p className='font-medium text-text-primary text-sm'>
                                {name}
                              </p>
                              <p className='text-xs text-secondary'>
                                Executive Member
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </InViewAnimation>
              </div>
            </div>
          </div>
        </section>

        {/* Subcommittees */}
        <section id='subcommittees' className='py-16 bg-accent/30'>
          <div className='container mx-auto px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <div className='text-center mb-12'>
                  <h2 className='font-display text-3xl font-light text-text-primary mb-4 flex items-center justify-center gap-3'>
                    <Users className='h-8 w-8 text-primary' />
                    Subcommittees
                  </h2>
                  <p className='text-lg text-secondary max-w-3xl mx-auto'>
                    Specialized committees working on specific areas of our
                    mission
                  </p>
                </div>
              </InViewAnimation>

              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {subcommittees.map((committee, index) => {
                  const IconComponent =
                    {
                      GraduationCap,
                      Heart,
                      Briefcase,
                      BookOpen,
                      Monitor,
                      HeartHandshake,
                    }[committee.icon] || Users;

                  return (
                    <InViewAnimation key={committee.name} delay={index * 0.1}>
                      <Card
                        className={`bg-white hover:shadow-lg transition-all duration-300 h-full border ${committee.borderColor}`}
                      >
                        <CardHeader
                          className={`${committee.bgColor} rounded-t-lg`}
                        >
                          <div className='flex items-center space-x-3'>
                            <IconComponent
                              className={`h-6 w-6 ${committee.color}`}
                            />
                            <CardTitle className='font-display text-lg font-light text-text-primary'>
                              {committee.name}
                            </CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className='p-6 flex-1 flex flex-col'>
                          <p className='text-secondary text-sm leading-relaxed mb-4'>
                            {committee.description}
                          </p>

                          {/* Leadership */}
                          <div className='space-y-3 mb-4'>
                            <div className='flex items-center space-x-2'>
                              <Crown className='h-4 w-4 text-primary' />
                              <div>
                                <p className='font-medium text-text-primary text-sm'>
                                  {committee.leader}
                                </p>
                                <p className='text-xs text-primary'>Leader</p>
                              </div>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <UserCheck className='h-4 w-4 text-secondary' />
                              <div>
                                <p className='font-medium text-text-primary text-sm'>
                                  {committee.assistantLeader}
                                </p>
                                <p className='text-xs text-secondary'>
                                  Assistant Leader
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Members */}
                          {committee.members.length > 0 && (
                            <div className='flex-1'>
                              <h4 className='text-sm font-medium text-text-primary mb-2'>
                                Members:
                              </h4>
                              <div className='space-y-1'>
                                {committee.members.map(member => (
                                  <div
                                    key={member}
                                    className='flex items-center space-x-2'
                                  >
                                    <User className='h-3 w-3 text-secondary' />
                                    <p className='text-xs text-secondary'>
                                      {member}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </InViewAnimation>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Land Donors */}
        <section id='land-donors' className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <div className='text-center mb-12'>
                  <h2 className='font-display text-3xl font-light text-text-primary mb-4 flex items-center justify-center gap-3'>
                    <MapPin className='h-8 w-8 text-primary' />
                    Land Donors
                  </h2>
                  <p className='text-lg text-secondary max-w-3xl mx-auto'>
                    Generous individuals who donated land for SEVAA&apos;s
                    community development projects
                  </p>
                </div>
              </InViewAnimation>

              <InViewAnimation delay={0.2}>
                <Card className='bg-white shadow-lg'>
                  <CardContent className='pt-6'>
                    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4'>
                      {landDonors.map(donor => (
                        <div
                          key={donor}
                          className='flex items-center space-x-3 p-3 hover:bg-accent/20 rounded-lg transition-colors'
                        >
                          <div className='w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center'>
                            <MapPin className='h-4 w-4 text-primary' />
                          </div>
                          <div>
                            <p className='font-medium text-text-primary text-sm'>
                              {donor}
                            </p>
                            <p className='text-xs text-secondary'>Land Donor</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* Sevaa Members */}
        <section id='sevaa-members' className='py-16 bg-accent/30'>
          <div className='container mx-auto px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <div className='text-center mb-12'>
                  <h2 className='font-display text-3xl font-light text-text-primary mb-4 flex items-center justify-center gap-3'>
                    <Users className='h-8 w-8 text-primary' />
                    Sevaa Members
                  </h2>
                  <p className='text-lg text-secondary max-w-3xl mx-auto'>
                    Active community members contributing to our mission and
                    participating in various programs
                  </p>
                </div>
              </InViewAnimation>

              <InViewAnimation delay={0.2}>
                <Card className='bg-white shadow-lg'>
                  <CardContent className='pt-6'>
                    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                      {sevaaMembers.map(name => (
                        <div
                          key={name}
                          className='flex items-center space-x-3 p-3 hover:bg-accent/20 rounded-lg transition-colors'
                        >
                          <div className='w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center'>
                            <User className='h-4 w-4 text-primary' />
                          </div>
                          <div>
                            <p className='font-medium text-text-primary text-sm'>
                              {name}
                            </p>
                            <p className='text-xs text-secondary'>
                              Sevaa Member
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* Sevaa Associate Members */}
        <section id='sevaa-assoc-members' className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <div className='text-center mb-12'>
                  <h2 className='font-display text-3xl font-light text-text-primary mb-4 flex items-center justify-center gap-3'>
                    <UserCheck className='h-8 w-8 text-primary' />
                    Sevaa Associate Members
                  </h2>
                  <p className='text-lg text-secondary max-w-3xl mx-auto'>
                    Associate members who support SEVAA&apos;s mission and
                    activities
                  </p>
                </div>
              </InViewAnimation>

              <InViewAnimation delay={0.2}>
                <Card className='bg-white shadow-lg'>
                  <CardContent className='pt-6'>
                    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                      {sevaaAssocMembers.map(name => (
                        <div
                          key={name}
                          className='flex items-center space-x-3 p-3 hover:bg-accent/20 rounded-lg transition-colors'
                        >
                          <div className='w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center'>
                            <User className='h-4 w-4 text-secondary' />
                          </div>
                          <div>
                            <p className='font-medium text-text-primary text-sm'>
                              {name}
                            </p>
                            <p className='text-xs text-secondary'>
                              Associate Member
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* Sevaa Friends */}
        <section id='sevaa-friends' className='py-16 bg-accent/30'>
          <div className='container mx-auto px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <div className='text-center mb-12'>
                  <h2 className='font-display text-3xl font-light text-text-primary mb-4 flex items-center justify-center gap-3'>
                    <Handshake className='h-8 w-8 text-primary' />
                    Sevaa Friends
                  </h2>
                  <p className='text-lg text-secondary max-w-3xl mx-auto'>
                    Friends and supporters who contribute to our community
                    initiatives
                  </p>
                </div>
              </InViewAnimation>

              <InViewAnimation delay={0.2}>
                <Card className='bg-white shadow-lg'>
                  <CardContent className='pt-6'>
                    {sevaaFriends.length > 0 ? (
                      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {sevaaFriends.map(name => (
                          <div
                            key={name}
                            className='flex items-center space-x-3 p-3 hover:bg-accent/20 rounded-lg transition-colors'
                          >
                            <div className='w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center'>
                              <Handshake className='h-4 w-4 text-primary' />
                            </div>
                            <div>
                              <p className='font-medium text-text-primary text-sm'>
                                {name}
                              </p>
                              <p className='text-xs text-secondary'>
                                Sevaa Friend
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className='text-center py-8'>
                        <Handshake className='h-12 w-12 text-secondary/50 mx-auto mb-4' />
                        <p className='text-secondary'>
                          This section will be updated as we welcome more
                          friends to our community
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* Sevaa Partners */}
        <section id='sevaa-partners' className='py-16'>
          <div className='container mx-auto px-4'>
            <div className='max-w-6xl mx-auto'>
              <InViewAnimation>
                <div className='text-center mb-12'>
                  <h2 className='font-display text-3xl font-light text-text-primary mb-4 flex items-center justify-center gap-3'>
                    <Building className='h-8 w-8 text-primary' />
                    Sevaa Partners
                  </h2>
                  <p className='text-lg text-secondary max-w-3xl mx-auto'>
                    Strategic partners and organizations collaborating with us
                    for greater impact
                  </p>
                </div>
              </InViewAnimation>

              <InViewAnimation delay={0.2}>
                <Card className='bg-white shadow-lg'>
                  <CardContent className='pt-6'>
                    {sevaaPartners.length > 0 ? (
                      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {sevaaPartners.map(name => (
                          <div
                            key={name}
                            className='flex items-center space-x-3 p-3 hover:bg-accent/20 rounded-lg transition-colors'
                          >
                            <div className='w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center'>
                              <Building className='h-4 w-4 text-primary' />
                            </div>
                            <div>
                              <p className='font-medium text-text-primary text-sm'>
                                {name}
                              </p>
                              <p className='text-xs text-secondary'>
                                Partner Organization
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className='text-center py-8'>
                        <Building className='h-12 w-12 text-secondary/50 mx-auto mb-4' />
                        <p className='text-secondary'>
                          This section will be updated as we establish new
                          partnerships
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </InViewAnimation>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className='py-16 bg-primary text-white'>
          <div className='container mx-auto px-4'>
            <InViewAnimation>
              <div className='text-center max-w-3xl mx-auto space-y-6'>
                <h2 className='font-display text-3xl font-light'>
                  Join Our Governance
                </h2>
                <p className='text-xl text-orange-100 leading-relaxed'>
                  Become part of our governance structure and contribute to
                  meaningful social change
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <a
                    href='/join-us'
                    className='px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors'
                  >
                    Join as Member
                  </a>
                  <a
                    href='/contact'
                    className='px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors'
                  >
                    Contact Us
                  </a>
                </div>
              </div>
            </InViewAnimation>
          </div>
        </section>
      </div>
    </>
  );
}
