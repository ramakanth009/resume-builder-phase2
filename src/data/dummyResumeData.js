// Comprehensive dummy data with AI skills properly formatted
const dummyResumes = [
  {
    header: {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      phone: "9993337772",
      github: "https://github.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
      portfolio: "https://alexjohnson.dev"
    },
    target_role: "Full-stack Developer",
    summary: "Innovative Full Stack Developer with 3+ years of experience building scalable web applications with modern technologies. Passionate about clean code and user-centric design. looking to contribute to growing teams & challenging projects.",
    education: {
      degree: "Bachelor of Science",
      specialization: "computer science",
      institution: "Tech University",
      graduation_year: "2021",
      graduationYear: "2021"
    },
    skills: [
      "JavaScript", "typescript", "React", "Node.js", "Express", 
      "MongoDB", "PostgreSQL", "AWS", "docker", "CI/CD"
    ],
    projects: [
      {
        name: "E-commerce Platform",
        skills_used: "React, Node.js, Express, MongoDB, Redux",
        description: "Built a full-stack e-commerce platform with user authentication, product catalog, and payment processing\nImplemented responsive design and mobile optimization\nIntegrated with payment gateway API",
        link: "github.com/alexjohnson/ecommerce",
        responsibilities: [
          "Built a full-stack e-commerce platform with user authentication, product catalog, and payment processing",
          "Implemented responsive design and mobile optimization",
          "Integrated with payment gateway API"
        ]
      },
      {
        name: "Real-time Chat app",
        skills_used: "React, Socket.io, Express, PostgreSQL",
        description: "Developed a real-time messaging application with private channels and file sharing capabilities\nImplemented WebSocket connections for instant message delivery\ncreated an intuitive UI with material design",
        link: "github.com/alexjohnson/chat-app",
        responsibilities: [
          "Developed a real-time messaging application with private channels and file sharing capabilities",
          "Implemented WebSocket connections for instant message delivery",
          "created an intuitive UI with material design"
        ]
      }
    ],
    work_experience: [
      {
        position: "Full Stack Developer",
        company_name: "Tech Solutions Inc.",
        companyName: "Tech Solutions Inc.",
        duration: "June 2021 - Present",
        description: "Develop and maintain web applications using React and Node.js\nImplement RESTful APIs and optimize database performance\nCollaborate with cross-functional teams to deliver features on time",
        responsibilities: [
          "Develop and maintain web applications using React and Node.js",
          "Implement RESTful APIs and optimize database performance",
          "Collaborate with cross-functional teams to deliver features on time"
        ]
      },
      {
        position: "Frontend Developer Intern",
        company_name: "WebDev Agency",
        companyName: "WebDev Agency",
        duration: "January 2021 - May 2021",
        description: "Assisted in developing responsive user interfaces using React\nCollaborated with the design team to implement UI/UX improvements\nParticipated in code reviews and team meetings",
        responsibilities: [
          "Assisted in developing responsive user interfaces using React",
          "Collaborated with the design team to implement UI/UX improvements",
          "Participated in code reviews and team meetings"
        ]
      }
    ],
    certifications: [
      {
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        url: "aws.amazon.com/certification/certified-developer-associate/"
      },
      {
        name: "MongoDB Database Administrator",
        issuer: "MongoDB University",
        url: "university.mongodb.com/certification"
      }
    ],
    // AI Experience data format
    aiExperience: [
      {
        toolName: "GitHub Copilot",
        impact: "Reduced development time by 30% and improved code quality",
        usageCases: [
          "Generated complex database queries with proper error handling",
          "Automated repetitive code patterns for React components",
          "Created comprehensive unit test suites for API endpoints"
        ]
      },
      {
        toolName: "ChatGPT",
        impact: "Enhanced problem-solving and technical documentation",
        usageCases: [
          "Debugged complex asynchronous workflows in Node.js applications",
          "Generated comprehensive API documentation based on code structures",
          "Optimized database schema designs for better performance"
        ]
      }
    ],
    // GenAI tools data format
    genai_tools: [
      {
        tool_id: "github_copilot",
        name: "GitHub Copilot",
        description: "Reduced development time by 30% and improved code quality",
        usage_descriptions: [
          "Generated complex database queries with proper error handling",
          "Automated repetitive code patterns for React components",
          "Created comprehensive unit test suites for API endpoints"
        ]
      },
      {
        tool_id: "chatgpt",
        name: "ChatGPT",
        description: "Enhanced problem-solving and technical documentation",
        usage_descriptions: [
          "Debugged complex asynchronous workflows in Node.js applications",
          "Generated comprehensive API documentation based on code structures",
          "Optimized database schema designs for better performance"
        ]
      }
    ],
    customSections: {
      "Languages": ["English (Native)", "Spanish (Intermediate)"],
      "Achievements": [
        "Reduced application load time by 40% through code optimization",
        "Contributed to open-source projects with 500+ GitHub stars"
      ]
    }
  }
];

export { dummyResumes };