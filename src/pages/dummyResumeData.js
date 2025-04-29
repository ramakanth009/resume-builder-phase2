// dummyResumeData.js
// This file contains dummy resume data to pre-fill the resume builder form

const dummyResumeData = {
  header: {
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    phone: "1234567890",
    github: "https://github.com/sarahcodes",
    linkedin: "https://linkedin.com/in/sarahchen",
    portfolio: "https://sarahchen.dev",
  },
  summary: "Full Stack Developer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud services. Strong background in developing user-centric solutions and leading agile development teams.",
  education: {
    degree: "Master of Science",
    specialization: "Software Engineering",
    institution: "Stanford University",
    graduation_year: "2019",
  },
  skills: [
    "React.js",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "PostgreSQL",
    "AWS",
    "GraphQL",
    "Next.js",
    "Redux",
    "Jest",
    "CI/CD"
  ],
  projects: [
    {
      name: "E-commerce Platform",
      skills_used: "React, Node.js, MongoDB, AWS",
      description: "Developed a full-stack e-commerce platform handling 10k+ daily users. Implemented real-time inventory tracking and payment gateway integration."
    },
    {
      name: "Social Media Analytics Dashboard",
      skills_used: "Next.js, GraphQL, TypeScript, PostgreSQL",
      description: "Built a real-time analytics dashboard processing data from multiple social media platforms. Reduced data processing time by 80%."
    }
  ],
  certifications: [
    "AWS Certified Developer Associate",
    "MongoDB Certified Developer",
    "Google Cloud Professional Developer"
  ],
  work_experience: [
    {
      position: "Senior Full Stack Developer",
      company_name: "InnovateTech Solutions",
      duration: "Jan 2021 - Present",
      description: "Led development of microservices-based architecture\n Mentored junior developers and conducted code reviews\n Improved application performance by 70%\n Implemented automated testing achieving 90% coverage"
    },
    {
      position: "Full Stack Developer",
      company_name: "WebScale Systems",
      duration: "Mar 2019 - Dec 2020",
      description: "Developed and maintained multiple client-facing applications\n Implemented responsive designs and PWA features\n Reduced API response time by 60%\n Collaborated with UX team for optimal user experience"
    }
  ],
  target_role: "Lead Full Stack Developer",
  customSections: {
    "Technical Leadership": [
      "Led migration from monolithic to microservices architecture",
      "Established coding standards and best practices"
    ],
    "Open Source Contributions": [
      "Core contributor to React-Data-Grid library",
      "Created popular npm package for form validation"
    ]
  }
};

export default dummyResumeData;