import React from 'react';
import { Link } from 'react-router-dom';
import Heading from '../ui/Heading';
import { MdWeb, MdRateReview, MdOutlineImage, MdDraw } from 'react-icons/md';

const Dashboard = () => {
  const adminLinks = [
    {
      title: 'Web Dev Projects',
      description: 'Manage your portfolio of web development projects.',
      icon: <MdWeb className="text-4xl mb-4 text-secondary" />,
      path: '/admin/add-project'
    },
    {
      title: 'Graphic Designs',
      description: 'Upload new graphic design assets and banners.',
      icon: <MdOutlineImage className="text-4xl mb-4 text-secondary" />,
      path: '/admin/add-design'
    },
    {
      title: 'Logo Designs',
      description: 'Add new brand marks and logos to your portfolio.',
      icon: <MdDraw className="text-4xl mb-4 text-secondary" />,
      path: '/admin/add-logo'
    },
    {
      title: 'Client Reviews',
      description: 'Manage testimonials and client success stories.',
      icon: <MdRateReview className="text-4xl mb-4 text-secondary" />,
      path: '/admin/add-reviews'
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <Heading className="text-4xl sm:text-6xl mb-4">Admin Dashboard</Heading>
          <p className="text-zinc-400 text-lg">Select a category below to manage your content.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminLinks.map((link, index) => (
            <Link 
              key={index} 
              to={link.path}
              className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl hover:bg-zinc-800 hover:border-secondary/50 transition-all duration-300 group shadow-lg"
            >
              <div className="flex flex-col">
                {link.icon}
                <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-secondary transition-colors">{link.title}</h2>
                <p className="text-zinc-400 leading-relaxed">{link.description}</p>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link to="/" className="text-zinc-500 hover:text-white transition-colors border border-zinc-800 rounded-full px-6 py-2 inline-block hover:bg-zinc-900">
            &larr; Back to Live Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
