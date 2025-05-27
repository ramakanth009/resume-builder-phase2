export const dummyResumes = [
  {
    header: {
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '9845321678',
      github: 'https://github.com/priyasharma',
      linkedin: 'https://linkedin.com/in/priyasharma',
      portfolio: 'https://priyasharma.dev'
    },
    summary: 'Detail-oriented Computer Science graduate with strong foundation in web development and machine learning. Passionate about building accessible, user-friendly applications that solve real-world problems using cutting-edge AI technologies.',
    target_role: 'Full Stack Developer',
    education: {
      degree: 'Bachelor of Technology',
      specialization: 'Computer Science and Engineering',
      institution: 'Indian Institute of Technology, Hyderabad',
      graduation_year: '2023',
      graduationYear: '2023'
    },
    skills: [
      'JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 
      'MongoDB', 'Python', 'Django', 'Flask', 'PostgreSQL', 
      'Docker', 'AWS', 'Git', 'CI/CD', 'RESTful APIs', 'GraphQL',
      'Machine Learning', 'TensorFlow', 'PyTorch'
    ],
    // NEW: AI Tools section with proficiency levels
    genai_tools: [
      {
        tool_id: 'chatgpt',
        name: 'ChatGPT',
        description: 'Advanced AI assistant for code generation and problem-solving',
        proficiency: 'expert'
      },
      {
        tool_id: 'github-copilot',
        name: 'GitHub Copilot',
        description: 'AI-powered code completion and pair programming',
        proficiency: 'intermediate'
      },
      {
        tool_id: 'claude',
        name: 'Claude AI',
        description: 'AI assistant for complex reasoning and analysis',
        proficiency: 'intermediate'
      },
      {
        tool_id: 'cursor',
        name: 'Cursor IDE',
        description: 'AI-powered code editor with intelligent suggestions',
        proficiency: 'beginner'
      }
    ],
    projects: [
      {
        name: 'AI-Powered E-Learning Platform',
        skills_used: 'React, Node.js, MongoDB, AWS S3, OpenAI API',
        description: 'Built a full-featured online learning platform with AI-powered content recommendations\nImplemented video streaming functionality with adaptive quality\nCreated interactive quiz system with real-time feedback\nDeveloped user authentication and progress tracking\nIntegrated ChatGPT API for personalized learning assistance',
        technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'AWS S3', 'OpenAI API'],
        responsibilities: [
          'Developed a responsive front-end using React and Material-UI',
          'Built RESTful API with Node.js and Express',
          'Implemented video streaming functionality using AWS S3',
          'Created interactive quiz system with instant feedback',
          'Designed MongoDB schema for content and user management',
          'Integrated OpenAI API for AI-powered learning recommendations'
        ],
        link: 'https://github.com/priyasharma/ai-elearning'
      },
      {
        name: 'Smart Healthcare Management System',
        skills_used: 'Python, Django, PostgreSQL, Docker, TensorFlow',
        description: 'Designed and implemented a hospital management system with AI diagnostics\nCreated appointment scheduling with conflict resolution\nBuilt patient records database with HIPAA compliance\nImplemented role-based access control\nDeveloped ML model for symptom analysis',
        technologies: ['Python', 'Django', 'PostgreSQL', 'Docker', 'Bootstrap', 'TensorFlow'],
        responsibilities: [
          'Designed database schema for patient and doctor information',
          'Implemented appointment scheduling system with conflict resolution',
          'Created secure patient records management with HIPAA compliance',
          'Built authentication system with role-based access control',
          'Containerized application with Docker for easy deployment',
          'Developed machine learning model for preliminary symptom analysis'
        ],
        link: 'https://github.com/priyasharma/smart-healthcare'
      },
      {
        name: 'Real-time Chat Application',
        skills_used: 'React, Socket.io, Node.js, Redis, JWT',
        description: 'Built a real-time messaging application with advanced features\nImplemented end-to-end encryption for secure communication\nAdded file sharing and media upload capabilities\nCreated group chat functionality with admin controls',
        technologies: ['React', 'Socket.io', 'Node.js', 'Redis', 'JWT', 'Multer'],
        responsibilities: [
          'Developed real-time messaging using Socket.io',
          'Implemented end-to-end encryption for secure communication',
          'Built file sharing and media upload system',
          'Created group chat with admin controls and permissions',
          'Used Redis for session management and caching'
        ],
        link: 'https://chatapp-priya.netlify.app'
      }
    ],
    work_experience: [
      {
        position: 'Full Stack Developer Intern',
        company_name: 'TechSolutions India',
        companyName: 'TechSolutions India',
        duration: 'May 2022 - August 2022',
        start_date: 'May 2022',
        end_date: 'August 2022',
        description: 'Developed and maintained web applications using modern technologies\nImplemented new features based on user feedback and business requirements\nCollaborated with senior developers on architecture decisions\nFixed critical bugs in production environment\nParticipated in agile development processes and code reviews',
        responsibilities: [
          'Developed and maintained web applications using React and Node.js',
          'Implemented new features based on user feedback and requirements',
          'Collaborated with senior developers on architecture decisions',
          'Fixed critical bugs in production environment',
          'Participated in code reviews and testing',
          'Contributed to API documentation and technical specifications'
        ]
      },
      {
        position: 'AI Research Assistant',
        company_name: 'AI Research Lab, IIT Hyderabad',
        companyName: 'AI Research Lab, IIT Hyderabad',
        duration: 'January 2022 - April 2022',
        start_date: 'January 2022',
        end_date: 'April 2022',
        description: 'Assisted in developing machine learning models for natural language processing\nCollected and preprocessed large-scale dataset for NLP research\nImplemented various neural network architectures using PyTorch\nContributed to research paper published in EMNLP 2022\nPresented findings at weekly research seminars',
        responsibilities: [
          'Assisted in developing and testing machine learning models',
          'Collected and preprocessed large-scale dataset for NLP research',
          'Implemented various neural network architectures using PyTorch',
          'Contributed to research paper published in EMNLP 2022',
          'Presented weekly updates to the research team',
          'Collaborated on data visualization and analysis tasks'
        ]
      },
      {
        position: 'Teaching Assistant',
        company_name: 'IIT Hyderabad - Computer Science Department',
        companyName: 'IIT Hyderabad - Computer Science Department',
        duration: 'August 2021 - December 2021',
        start_date: 'August 2021',
        end_date: 'December 2021',
        description: 'Assisted professor in Data Structures and Algorithms course\nConducted tutorial sessions for 50+ students\nGraded assignments and provided detailed feedback\nHelped students with programming concepts and debugging',
        responsibilities: [
          'Conducted tutorial sessions for Data Structures and Algorithms',
          'Graded assignments and provided detailed feedback to students',
          'Helped students with programming concepts and debugging',
          'Assisted in creating course materials and practice problems',
          'Maintained office hours for student consultations'
        ]
      }
    ],
    // Enhanced certifications with mixed formats
    certifications: [
      {
        name: 'AWS Certified Developer - Associate',
        issuer: 'Amazon Web Services',
        url: 'https://aws.amazon.com/certification/certified-developer-associate/'
      },
      {
        name: 'Google Professional Machine Learning Engineer',
        issuer: 'Google Cloud',
        url: 'https://cloud.google.com/certification/machine-learning-engineer'
      },
      'Microsoft Certified: Azure AI Engineer Associate',
      'IBM Data Science Professional Certificate',
      {
        name: 'Deep Learning Specialization',
        issuer: 'Coursera - Andrew Ng',
        url: 'https://coursera.org/specializations/deep-learning'
      },
      'GitHub Advanced Security Certification',
      {
        name: 'Certified Kubernetes Application Developer (CKAD)',
        issuer: 'Cloud Native Computing Foundation',
        url: 'https://www.cncf.io/certification/ckad/'
      }
    ],
    customSections: {
      Languages: [
        'English (Professional)',
        'Hindi (Native)',
        'Telugu (Conversational)',
        'Spanish (Basic)'
      ],
      Strengths: [
        'Problem-solving and analytical thinking',
        'Team collaboration and leadership',
        'Quick learner and adaptable',
        'Attention to detail and quality-focused',
        'Time management and project organization',
        'Cross-functional communication'
      ],
      Volunteer_Experience: [
        'Coding mentor at local high school (2021-2023)',
        'Open source contributor to Django documentation',
        'Technical writer for DEV Community',
        'Women in Tech mentor program participant',
        'Organized coding bootcamp for underprivileged students'
      ],
      Achievements: [
        'Winner - Smart India Hackathon 2022 (Healthcare Category)',
        'Best Project Award - IIT Hyderabad Tech Fest 2023',
        'Google Summer of Code participant 2022',
        'Published research paper in EMNLP 2022 conference',
        'Dean\'s List for academic excellence (2021-2023)'
      ],
      Technical_Projects: [
        'Contributing to open-source React libraries',
        'Building AI-powered developer tools',
        'Creating educational content on YouTube (5K+ subscribers)',
        'Developing mobile apps using React Native'
      ],
      Interests: [
        'Artificial Intelligence and Machine Learning',
        'Open Source Development',
        'Technical Writing and Blogging',
        'Photography and Digital Art',
        'Sustainable Technology Solutions'
      ]
    }
  },
  
  // Additional dummy resume for variety
  {
    header: {
      name: 'Arjun Patel',
      email: 'arjun.dev@example.com',
      phone: '9876543210',
      github: 'https://github.com/arjunpatel',
      linkedin: 'https://linkedin.com/in/arjunpatel',
      portfolio: 'https://arjunpatel.tech'
    },
    summary: 'Innovative software engineer specializing in mobile app development and cloud architecture. Experienced in building scalable applications with modern frameworks and AI integration.',
    target_role: 'Mobile App Developer',
    education: {
      degree: 'Bachelor of Engineering',
      specialization: 'Information Technology',
      institution: 'Delhi Technological University',
      graduation_year: '2024',
      graduationYear: '2024'
    },
    skills: [
      'React Native', 'Flutter', 'Swift', 'Kotlin', 'Java',
      'Firebase', 'AWS', 'Node.js', 'MongoDB', 'PostgreSQL',
      'RESTful APIs', 'GraphQL', 'Git', 'CI/CD', 'Jest'
    ],
    genai_tools: [
      {
        tool_id: 'github-copilot',
        name: 'GitHub Copilot',
        description: 'AI pair programming assistant',
        proficiency: 'expert'
      },
      {
        tool_id: 'tabnine',
        name: 'Tabnine',
        description: 'AI code completion tool',
        proficiency: 'intermediate'
      }
    ],
    projects: [
      {
        name: 'FitTrack - Fitness Mobile App',
        skills_used: 'React Native, Firebase, Google Fit API',
        description: 'Developed a comprehensive fitness tracking mobile application\nIntegrated with wearable devices and health APIs\nImplemented social features for workout sharing\nBuilt custom workout planner with AI recommendations',
        technologies: ['React Native', 'Firebase', 'Google Fit API', 'Redux'],
        responsibilities: [
          'Designed and developed cross-platform mobile app',
          'Integrated with Google Fit and Apple Health APIs',
          'Implemented real-time data synchronization',
          'Built social networking features for fitness enthusiasts'
        ],
        link: 'https://github.com/arjunpatel/fittrack'
      }
    ],
    work_experience: [
      {
        position: 'Mobile Developer Intern',
        company_name: 'StartupXYZ',
        companyName: 'StartupXYZ',
        duration: 'June 2023 - Present',
        start_date: 'June 2023',
        end_date: 'Present',
        description: 'Currently working on mobile app development using React Native\nBuilding features for e-commerce mobile application\nCollaborating with design team on UI/UX improvements',
        responsibilities: [
          'Developing mobile features using React Native',
          'Collaborating with cross-functional teams',
          'Implementing responsive UI components',
          'Writing unit tests and ensuring code quality'
        ]
      }
    ],
    certifications: [
      'Google Associate Android Developer',
      {
        name: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        url: 'https://aws.amazon.com/certification/certified-cloud-practitioner/'
      },
      'Firebase Certified Developer'
    ],
    customSections: {
      Languages: [
        'English (Fluent)',
        'Hindi (Native)',
        'Gujarati (Native)'
      ],
      Strengths: [
        'Mobile-first development approach',
        'User experience focused design',
        'Performance optimization',
        'Cross-platform development expertise'
      ]
    }
  }
];