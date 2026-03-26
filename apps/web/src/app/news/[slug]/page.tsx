
import { Layout } from '@/components/layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { NewsArticleContent } from '@/components/news/news-article-content';
import { Calendar, ArrowLeft, Share2, ExternalLink, Clock, User } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// This would typically come from a database or CMS
const newsArticles = {
  'tilka-murmu-school': {
    id: 'tilka-murmu-school',
    title: 'Inauguration of Tilka Murmu SEVAA Vano Vidyalay',
    excerpt: 'A historic moment as we inaugurate our forest school with allied facilities and centers at Saparambera, Ajodhya Hills, Purulia.',
    content: `
      <div class="prose prose-lg max-w-none">
        <p>We are proud to announce the inauguration of the Tilka Murmu SEVAA Vano Vidyalay (Forest School) on 9th & 10th March 2025 at Saparambera, Ajodhya Hills, Purulia.</p>
        
        <p>This groundbreaking initiative represents our commitment to providing quality education in harmony with nature. The school features:</p>
        
        <ul>
          <li>Eco-friendly classrooms designed to blend with the natural environment</li>
          <li>Allied facilities including library, computer lab, and health center</li>
          <li>Community centers for local engagement and development</li>
          <li>Sustainable infrastructure using local materials and renewable energy</li>
        </ul>
        
        <p>The forest school will serve the tribal and rural communities of the Ajodhya Hills region, providing education that respects and incorporates traditional knowledge while preparing students for the modern world.</p>
        
        <h3>Key Features of the School</h3>
        <p>The Tilka Murmu SEVAA Vano Vidyalay is designed with several innovative features:</p>
        
        <ul>
          <li><strong>Eco-friendly Infrastructure:</strong> Buildings constructed using local materials and sustainable practices</li>
          <li><strong>Renewable Energy:</strong> Solar panels and biogas systems for clean energy</li>
          <li><strong>Nature-integrated Learning:</strong> Outdoor classrooms and forest-based education</li>
          <li><strong>Community Integration:</strong> Spaces for local cultural activities and community meetings</li>
        </ul>
        
        <h3>Impact on Local Community</h3>
        <p>This initiative will directly benefit over 500 children from the tribal communities in the region, providing them with access to quality education while preserving their cultural heritage.</p>
      </div>
    `,
    images: [
      '/images/userfiles/image/Sevaa Booklet 2024_001.jpg',
      '/images/userfiles/image/Sevaa Booklet 2024_002.jpg',
      '/images/userfiles/image/Sevaa Booklet 2024_003.jpg'
    ],
    date: 'March 9-10, 2025',
    category: 'Education',
    tags: ['Forest School', 'Education', 'Community Development', 'Sustainability'],
    author: 'SEVAA Team',
    readTime: '5 min read',
    pdfLink: '/userfiles/Tilka Murmu Forest School.pdf'
  },
  'sevaa-booklet-2024': {
    id: 'sevaa-booklet-2024',
    title: 'SEVAA Annual Booklet 2024 Released',
    excerpt: 'Our comprehensive annual booklet showcasing all activities, achievements, and impact of SEVAA throughout 2024.',
    content: `
      <div class="prose prose-lg max-w-none">
        <p>We are pleased to release our Annual Booklet for 2024, a comprehensive document that showcases the remarkable journey of SEVAA throughout the year.</p>
        
        <p>The booklet includes:</p>
        
        <ul>
          <li>Detailed reports on all our educational initiatives</li>
          <li>Healthcare and livelihood programs impact assessment</li>
          <li>Financial transparency and accountability reports</li>
          <li>Stories from beneficiaries and community members</li>
          <li>Future plans and vision for upcoming projects</li>
        </ul>
        
        <p>This publication reflects our commitment to transparency and community engagement, providing stakeholders with insights into how their support translates into meaningful change.</p>
        
        <h3>Highlights from 2024</h3>
        <p>The year 2024 has been transformative for SEVAA:</p>
        
        <ul>
          <li><strong>Education:</strong> Established 3 new learning centers</li>
          <li><strong>Healthcare:</strong> Conducted 12 medical camps serving 2,000+ patients</li>
          <li><strong>Livelihood:</strong> Trained 150 individuals in various skills</li>
          <li><strong>Environment:</strong> Planted 5,000 trees in collaboration with local communities</li>
        </ul>
      </div>
    `,
    images: [
      '/images/userfiles/image/Sevaa Booklet 2024_002.jpg',
      '/images/userfiles/image/Sevaa Booklet 2024_003.jpg',
      '/images/userfiles/image/Sevaa Booklet 2024_004.jpg'
    ],
    date: '2024',
    category: 'Publication',
    tags: ['Annual Report', 'Transparency', 'Impact Assessment'],
    author: 'SEVAA Publications Team',
    readTime: '8 min read'
  },
  'lac-training-program': {
    id: 'lac-training-program',
    title: 'LAC Training Program Successfully Completed',
    excerpt: 'Successful completion of Local Area Coordinator training program for community development and capacity building.',
    content: `
      <div class="prose prose-lg max-w-none">
        <p>Our Local Area Coordinator (LAC) Training Program has been successfully completed, marking a significant milestone in our community development efforts.</p>
        
        <p>The training program focused on:</p>
        
        <ul>
          <li>Community mobilization and engagement strategies</li>
          <li>Project management and monitoring techniques</li>
          <li>Local resource mapping and utilization</li>
          <li>Sustainable development practices</li>
          <li>Leadership and communication skills</li>
        </ul>
        
        <p>The newly trained coordinators will play a crucial role in implementing our grassroots programs and ensuring community ownership of development initiatives.</p>
        
        <h3>Training Methodology</h3>
        <p>Our comprehensive training approach included:</p>
        
        <ul>
          <li><strong>Interactive Workshops:</strong> Hands-on learning sessions</li>
          <li><strong>Field Practice:</strong> Real-world application of concepts</li>
          <li><strong>Peer Learning:</strong> Knowledge sharing among participants</li>
          <li><strong>Mentorship:</strong> Guidance from experienced coordinators</li>
        </ul>
      </div>
    `,
    images: [
      '/images/news_image/org/lac training program-1721231943.jpg'
    ],
    date: 'July 2024',
    category: 'Training',
    tags: ['Capacity Building', 'Community Development', 'Leadership'],
    author: 'Training Department',
    readTime: '6 min read'
  },
  'media-coverage-telegraph': {
    id: 'media-coverage-telegraph',
    title: 'SEVAA Featured in The Telegraph',
    excerpt: 'Our organization and impactful work has been featured in The Telegraph newspaper, highlighting our community development initiatives.',
    content: `
      <div class="prose prose-lg max-w-none">
        <p>We are honored to be featured in The Telegraph newspaper, which has highlighted our ongoing community development initiatives and their impact on rural communities.</p>
        
        <p>The coverage includes:</p>
        
        <ul>
          <li>Our educational programs in remote areas</li>
          <li>Healthcare initiatives and medical camps</li>
          <li>Livelihood generation projects</li>
          <li>Environmental conservation efforts</li>
          <li>Community testimonials and success stories</li>
        </ul>
        
        <p>This media recognition helps us reach a wider audience and attract more supporters to our cause of serving the underprivileged communities.</p>
        
        <h3>Media Impact</h3>
        <p>The newspaper coverage has brought significant attention to our work:</p>
        
        <ul>
          <li><strong>Increased Awareness:</strong> Greater visibility for our cause</li>
          <li><strong>New Partnerships:</strong> Interest from potential collaborators</li>
          <li><strong>Volunteer Engagement:</strong> More people wanting to contribute</li>
          <li><strong>Donor Support:</strong> Enhanced trust and credibility</li>
        </ul>
      </div>
    `,
    images: [
      '/images/userfiles/image/the telegraph_001.jpg',
      '/images/userfiles/image/the telegraph_002.jpg',
      '/images/userfiles/image/the telegraph_003.jpg'
    ],
    date: '2024',
    category: 'Media Coverage',
    tags: ['Media', 'Recognition', 'Community Impact'],
    author: 'Media Relations Team',
    readTime: '4 min read'
  }
};

interface NewsArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsArticlePage({ params }: NewsArticlePageProps) {
  const { slug } = await params;
  const article = newsArticles[slug as keyof typeof newsArticles];

  if (!article) {
    notFound();
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <NewsArticleContent delay={0}>
            <div className="max-w-4xl mx-auto">
            <Link href="/news">
              <Button variant="ghost" className="mb-6 text-orange-600 hover:text-orange-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to News
              </Button>
            </Link>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  {article.category}
                </Badge>
                <div className="flex items-center text-gray-500 text-sm space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {article.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {article.readTime}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {article.author}
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                {article.title}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                {article.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            </div>
          </NewsArticleContent>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <NewsArticleContent delay={0.2}>
            <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden">
              <div className="relative h-96">
                <Image
                  src={article.images[0]}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Card>
            </div>
          </NewsArticleContent>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <NewsArticleContent delay={0.3}>
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </NewsArticleContent>
            
            {/* Additional Images */}
            {article.images.length > 1 && (
              <NewsArticleContent delay={0.4}>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                {article.images.slice(1).map((image, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative h-64">
                      <Image
                        src={image}
                        alt={`${article.title} - Image ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Card>
                ))}
                </div>
              </NewsArticleContent>
            )}
            
            {/* Action Buttons */}
            <NewsArticleContent delay={0.5}>
              <div className="mt-12 flex flex-col sm:flex-row gap-4">
              {('pdfLink' in article) && article.pdfLink && (
                <Link href={article.pdfLink} target="_blank">
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </Link>
              )}
              <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50">
                <Share2 className="h-4 w-4 mr-2" />
                Share Article
              </Button>
              </div>
            </NewsArticleContent>
          </div>
        </div>
      </section>
    </Layout>
  );
}