// dummyResumeData.js
// This file contains dummy resume data to pre-fill the resume builder form

const dummyResumeData = {
  header: {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "9998887776",
    github: "https://github.com/alexjohnson",
    linkedin: "https://linkedin.com/in/alexjohnson",
    portfolio: "https://alexjohnson.dev",
  },
  summary: "Dedicated software engineer with 4+ years of experience developing web applications using React, Node.js, and modern JavaScript frameworks. Passionate about creating accessible, responsive user interfaces and optimizing application performance.",
  education: {
    degree: "Bachelor of Science",
    specialization: "Computer Science",
    institution: "University of Technology",
    graduation_year: "2021",
  },
  skills: [
    "JavaScript (ES6+)", 
    "React", 
    "Node.js", 
    "TypeScript", 
    "HTML5/CSS3", 
    "GraphQL",
    "MongoDB",
    "AWS",
    "Git",
    "CI/CD",
    "Jest/React Testing Library"
  ],
  Academic_projects: [
    {
      name: "E-Commerce Platform",
      skills_used: "React, Node.js, Express, MongoDB, Stripe API",
      description: "Developed a full-stack e-commerce application with user authentication, product catalog, shopping cart, and payment processing using Stripe. Implemented responsive design principles and state management with Redux."
    },
    {
      name: "Real-time Chat Application",
      skills_used: "React, Socket.io, Express, MongoDB",
      description: "Built a real-time messaging application with features including user authentication, direct messaging, group chats, and message notifications. Used Socket.io for real-time communication and MongoDB for data persistence."
    },
    {
      name: "Task Management System",
      skills_used: "React, TypeScript, Redux, Node.js, PostgreSQL",
      description: "Created a task management system with drag-and-drop functionality, task prioritization, team collaboration features, and deadline tracking. Implemented JWT-based authentication and role-based access control."
    }
  ],
  certifications: [
    "AWS Certified Developer - Associate",
    "MongoDB Certified Developer",
    "React Certification - Meta Frontend Developer"
  ],
  work_experience: [
    {
      position: "Frontend Developer",
      company_name: "TechSolutions Inc.",
      duration: "Jan 2022 - Present",
      description: "• Developed and maintained client-facing web applications using React, Redux, and TypeScript\n• Collaborated with UX designers to implement responsive, accessible user interfaces\n• Reduced application bundle size by 30% through code splitting and lazy loading\n• Implemented CI/CD pipelines with GitHub Actions and AWS\n• Mentored junior developers and conducted code reviews"
    },
    {
      position: "Junior Web Developer",
      company_name: "Digital Innovations",
      duration: "Jun 2020 - Dec 2021",
      description: "• Assisted in developing web applications using React and JavaScript\n• Implemented responsive designs using CSS frameworks like Bootstrap and Tailwind CSS\n• Fixed bugs and improved application performance\n• Participated in agile development processes, including daily stand-ups and sprint planning\n• Contributed to documentation and technical specifications"
    },
    {
      position: "Software Engineering Intern",
      company_name: "InnovateTech",
      duration: "May 2019 - Aug 2019",
      description: "• Assisted in developing features for a customer-facing web application\n• Fixed UI bugs and implemented minor enhancements\n• Wrote unit tests using Jest\n• Participated in code reviews and team meetings"
    }
  ],
  target_role: "Senior Frontend Developer",
  customSections: {
    "Open Source Contributions": [
      "React-Component-Library: Contributed accessibility improvements to popular open-source React component library",
      "Data-Visualization-Tool: Fixed rendering issues and added new chart types to open-source data visualization package"
    ],
    "Publications": [
      "Johnson, A. (2023). 'Modern Approaches to State Management in React Applications.' Medium.",
      "Johnson, A. (2022). 'Optimizing Frontend Performance in JavaScript Applications.' Dev.to."
    ]
  }
};

export default dummyResumeData;