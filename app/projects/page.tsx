'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Building, ChevronRight } from 'lucide-react';
import { useServiceRequest } from '@/contexts/ServiceRequestContext';
import { Button } from '@/components/ui/button';

// Project categories
const categories = [
  'All Projects',
  'Industrial',
  'Medical',
  'Data Center',
  'Manufacturing'
];

// Project data
const projects = [
  {
    id: 1,
    title: 'Heavy Machinery Erection',
    description: 'Complete erection of industrial heavy machinery for a manufacturing plant, including precision alignment and calibration of equipment.',
    imageUrl: '/images/industrial-equipment.jpeg',
    category: 'Industrial',
    location: 'Hyderabad, Telangana',
    completedYear: '2023',
    client: 'Manufacturing Corporation'
  },
  {
    id: 2,
    title: 'Medical Equipment Setup',
    description: 'Specialized erection of sensitive diagnostic equipment for a major hospital, ensuring precise calibration and adherence to healthcare standards.',
    imageUrl: '/images/medical-equipment.jpeg',
    category: 'Medical',
    location: 'Chennai, Tamil Nadu',
    completedYear: '2023',
    client: 'City General Hospital'
  },
  {
    id: 3,
    title: 'Data Center Infrastructure',
    description: 'Complete data center equipment erection including server racks, cooling systems, and network infrastructure installation.',
    imageUrl: '/images/data-center.jpeg',
    category: 'Data Center',
    location: 'Bangalore, Karnataka',
    completedYear: '2023',
    client: 'Tech Solutions Inc.'
  },
  {
    id: 4,
    title: 'Production Line Setup',
    description: 'End-to-end erection of a production line for a manufacturing facility, including equipment integration and workflow optimization.',
    imageUrl: '/images/factory-setup.jpeg',
    category: 'Manufacturing',
    location: 'Pune, Maharashtra',
    completedYear: '2022',
    client: 'Industrial Manufacturing Ltd.'
  },
  {
    id: 5,
    title: 'Pharmaceutical Equipment',
    description: 'Precision erection of specialized pharmaceutical manufacturing equipment in a clean room environment.',
    imageUrl: '/images/equipment-erection.jpeg',
    category: 'Medical',
    location: 'Ahmedabad, Gujarat',
    completedYear: '2022',
    client: 'MediPharm Solutions'
  },
  {
    id: 6,
    title: 'Factory Automation Systems',
    description: 'Complete erection and integration of factory automation equipment and robotic systems for improved production efficiency.',
    imageUrl: '/images/industrial-equipment.jpeg',
    category: 'Manufacturing',
    location: 'Coimbatore, Tamil Nadu',
    completedYear: '2023',
    client: 'Automation Dynamics'
  }
];

export default function Projects() {
  const { openServiceRequest } = useServiceRequest();
  const [selectedCategory, setSelectedCategory] = useState('All Projects');
  
  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'All Projects'
    ? projects
    : projects.filter(project => project.category === selectedCategory);
  
  return (
    <>
      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-20 text-white">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold">Our Projects</h1>
          <p className="mt-4 max-w-xl text-blue-100">
            Explore our portfolio of successful equipment erection projects across various industries,
            demonstrating our expertise and commitment to excellence.
          </p>
        </div>
      </section>
      
      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Projects Grid */}
      <section className="py-16">
        <div className="container">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-600">No projects found in this category.</h3>
              <p className="mt-2 text-gray-500">Please try selecting a different category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  {/* Project Image */}
                  <div className="relative h-48 w-full">
                    <Image 
                      src={project.imageUrl}
                      alt={project.title} 
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                      {project.category}
                    </div>
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Building className="h-4 w-4 mr-2 text-blue-600" />
                        <span>{project.client}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-2 text-blue-600" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                        <span>Completed in {project.completedYear}</span>
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline"
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={() => {
                        // Map project categories to service IDs
                        const serviceMap: Record<string, string> = {
                          'Industrial': 'heavy-equipment-erection',
                          'Medical': 'medical-equipment-erection',
                          'Data Center': 'data-center-equipment-erection',
                          'Manufacturing': 'industrial-equipment-erection'
                        };
                        
                        // Open service request for this project's category
                        openServiceRequest(serviceMap[project.category] || 'heavy-equipment-erection');
                      }}
                    >
                      Request Similar Service
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Project Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '50+', label: 'Completed Projects' },
              { value: '40+', label: 'Satisfied Clients' },
              { value: '10+', label: 'Industries Served' },
              { value: '100%', label: 'Client Satisfaction' }
            ].map((stat, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Here's what our clients have to say about our equipment erection services 
              and project execution.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "SAI VINAYAKA ENTERPRISES delivered exceptional equipment erection services for our manufacturing facility. Their team's expertise and attention to detail ensured a smooth setup process.",
                name: "Ramesh Kumar",
                position: "Operations Director, Manufacturing Corporation"
              },
              {
                quote: "The precision and care taken during the medical equipment erection process was impressive. The team's understanding of healthcare standards made them an ideal partner for our hospital project.",
                name: "Dr. Sunita Patel",
                position: "Chief Medical Officer, City General Hospital"
              },
              {
                quote: "Our data center equipment erection project was completed on time and with exceptional quality. The team's technical knowledge and professional approach made all the difference.",
                name: "Vikram Singh",
                position: "IT Infrastructure Manager, Tech Solutions Inc."
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-blue-50 p-6 rounded-lg">
                <div className="mb-4">
                  {/* Quote SVG */}
                  <svg className="h-8 w-8 text-blue-600 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-4 italic">{testimonial.quote}</p>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Contact SAI VINAYAKA ENTERPRISES today to discuss your equipment erection needs. 
            Our team is ready to provide you with professional service and expert solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-900 hover:bg-blue-50"
              onClick={() => openServiceRequest()}
            >
              Request a Quote
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => window.location.href = '/contact'}
            >
              Contact Us <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}