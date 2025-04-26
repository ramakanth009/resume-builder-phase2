// dummyResumeData.js
// This file contains dummy resume data to pre-fill the resume builder form

const dummyResumeData = {
  header: {
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    phone: "1234567890",
    github: "https://github.com/sarahchen",
    linkedin: "https://linkedin.com/in/sarahchen",
    portfolio: "https://sarahchen.dev",
  },
  summary: "Full-stack developer with 5+ years of experience specializing in cloud-native applications and microservices architecture. Strong background in Java, Python, and modern JavaScript frameworks. Proven track record of delivering scalable solutions and mentoring development teams.",
  education: {
    degree: "Master of Science",
    specialization: "Software Engineering",
    institution: "Stanford University",
    graduation_year: "2019",
  },
  skills: [
    "Java", 
    "Python", 
    "Spring Boot",
    "React",
    "Docker",
    "Kubernetes",
    "PostgreSQL",
    "GCP",
    "Jenkins",
    "Microservices",
    "System Design"
  ],
  Academic_projects: [
    {
      name: "Cloud-Native Health Platform",
      skills_used: "Java, Spring Boot, React, GCP, Kubernetes",
      description: "Architected and developed a scalable healthcare management system using microservices architecture. Implemented HIPAA-compliant data storage and real-time patient monitoring features."
    },
    {
      name: "AI-Powered Code Review Assistant",
      skills_used: "Python, TensorFlow, FastAPI, React",
      description: "Created an ML-powered tool that analyzes code repositories and suggests improvements. Integrated with GitHub API and implemented custom code analysis algorithms."
    }
  ],
  certifications: [
    "Google Cloud Professional Architect",
    "AWS Solutions Architect Associate",
    "Certified Kubernetes Administrator"
  ],
  work_experience: [
    {
      position: "Senior Software Engineer",
      company_name: "CloudScale Solutions",
      duration: "Mar 2021 - Present",
      description: "• Lead developer for cloud-native microservices platform serving 1M+ users\n• Architected and implemented scalable backend services using Java and Spring Boot\n• Reduced system latency by 40% through caching and optimization\n• Led team of 5 developers and established best practices for microservices development"
    },
    {
      position: "Full Stack Developer",
      company_name: "TechForward Inc.",
      duration: "Jan 2019 - Feb 2021",
      description: "• Developed full-stack applications using Python, Django, and React\n• Implemented CI/CD pipelines using Jenkins and Docker\n• Improved application performance by 50% through database optimization\n• Mentored junior developers and led technical design discussions"
    }
  ],
  target_role: "Lead Software Engineer",
  customSections: {
    "Technical Leadership": [
      "Led migration of monolithic application to microservices architecture",
      "Established coding standards and review processes for team of 15 developers"
    ],
    "Patents": [
      "Chen, S. (2023). 'Method for Distributed Cache Management in Microservices.' US Patent 123456",
      "Chen, S. (2022). 'System for Automated Code Quality Analysis.' US Patent 789012"
    ]
  }
};

export default dummyResumeData;