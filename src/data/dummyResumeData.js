export const dummyResumes = [
  {
    header: {
      name: 'Aditi Krishnamurthy',
      email: 'aditi.krishna@example.com', 
      phone: '9876543210',
      github: 'https://github.com/aditikrishna',
      linkedin: 'https://linkedin.com/in/aditikrishnamurthy',
      portfolio: 'https://aditikrishna.dev'
    },
    summary: 'Innovative Computer Science graduate specializing in AI/ML and full-stack development. Experienced in leveraging cutting-edge AI tools to accelerate development workflows and build intelligent applications. Passionate about creating scalable solutions that solve real-world problems using modern technologies.',
    target_role: 'AI/ML Engineer',
    education: {
      degree: 'Bachelor of Technology',
      specialization: 'Computer Science and Engineering',
      institution: 'Indian Institute of Technology, Mumbai',
      graduation_year: '2024',
      graduationYear: '2024'
    },
    skills: [
      'Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'JavaScript', 'React', 
      'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker', 'Kubernetes', 
      'AWS', 'GCP', 'Git', 'CI/CD', 'RESTful APIs', 'GraphQL', 'FastAPI',
      'Computer Vision', 'Natural Language Processing', 'Deep Learning'
    ],
    

    // Enhanced GenAI tools with usage descriptions
    genai_tools: [
      {
        tool_id: 1,
        name: 'GitHub Copilot',
        description: 'AI-powered code completion and pair programming assistant',
        usage_descriptions: [
          'Accelerated React component development with intelligent code completion',
          'Generated comprehensive unit tests for machine learning models',
          'Enhanced CSS styling workflows with responsive design suggestions',
          'Automated API endpoint creation with proper error handling'
        ]
      },
      {
        tool_id: 5,
        name: 'ChatGPT',
        description: 'Advanced AI assistant for code generation and problem-solving',
        usage_descriptions: [
          'Advanced machine learning algorithm design and optimization',
          'Complex data structure implementation and performance tuning',
          'API documentation generation and technical writing assistance'
        ]
      },
      // {
      //   tool_id: 8,
      //   name: 'Claude AI',
      //   description: 'AI assistant for complex reasoning and technical analysis',
      //   usage_descriptions: [
      //     'Deep technical analysis and research paper summarization',
      //     'Complex system architecture planning and documentation',
      //     'Data preprocessing pipeline optimization strategies'
      //   ]
      // }
    ],
    
    projects: [
      {
        name: 'Smart Resume Analyzer using NLP',
        skills_used: 'Python, TensorFlow, NLTK, spaCy, Flask, React, MongoDB',
        description: 'Developed an AI-powered resume analysis platform with real-time feedback\nImplemented natural language processing for skill extraction and matching\nBuilt machine learning models for ATS compatibility scoring\nCreated interactive dashboard for resume optimization recommendations\nIntegrated with multiple ATS systems for comprehensive testing',
        technologies: ['Python', 'TensorFlow', 'NLTK', 'spaCy', 'Flask', 'React', 'MongoDB'],
        responsibilities: [
          'Developed NLP models for automatic skill extraction from resumes using TensorFlow and spaCy',
          'Implemented ATS compatibility scoring algorithm with 85% accuracy',
          // 'Built real-time resume analysis API using Flask and MongoDB',
          'Created responsive React dashboard for resume optimization feedback',
          // 'Integrated with 5+ major ATS systems for comprehensive compatibility testing',
          // 'Deployed on AWS with Docker containerization and CI/CD pipeline'
        ],
        link: 'https://github.com/aditikrishna/smart-resume-analyzer'
      },
      {
        name: 'AI-Powered E-Commerce Recommendation System',
        skills_used: 'Python, Scikit-learn, Pandas, FastAPI, PostgreSQL, Redis',
        description: 'Built a collaborative filtering recommendation engine for e-commerce platform\nImplemented real-time product recommendations using machine learning\nDeveloped user behavior tracking and analysis system\nCreated A/B testing framework for recommendation algorithms\nOptimized system performance to handle 10K+ concurrent users',
        technologies: ['Python', 'Scikit-learn', 'Pandas', 'FastAPI', 'PostgreSQL', 'Redis'],
        responsibilities: [
          'Designed and implemented collaborative filtering algorithms using Scikit-learn',
          'Built real-time recommendation API with FastAPI achieving <100ms response time',
          // 'Developed user behavior tracking system with PostgreSQL and Redis caching',
          // 'Created A/B testing framework for algorithm performance comparison',
          // 'Optimized system to handle 10,000+ concurrent users with 99.9% uptime',
          'Increased user engagement by 35% and conversion rates by 22%'
        ],
        link: 'https://github.com/aditikrishna/ai-ecommerce-recommender'
      },
      // {
      //   name: 'Computer Vision Medical Diagnostic Tool',
      //   skills_used: 'Python, PyTorch, OpenCV, Streamlit, Docker, AWS S3',
      //   description: 'Developed CNN-based medical image analysis tool for diagnostic assistance\nImplemented transfer learning for X-ray and MRI image classification\nBuilt secure web application for healthcare professionals\nCreated data pipeline for medical image preprocessing\nEnsured HIPAA compliance and data security standards',
      //   technologies: ['Python', 'PyTorch', 'OpenCV', 'Streamlit', 'Docker', 'AWS S3'],
      //   responsibilities: [
      //     'Developed CNN models using PyTorch for medical image classification with 92% accuracy',
      //     'Implemented transfer learning techniques for X-ray and MRI analysis',
      //     // 'Built secure Streamlit web application with role-based access control',
      //     // 'Created automated data pipeline for medical image preprocessing and augmentation',
      //     // 'Ensured HIPAA compliance with encrypted data storage and transmission',
      //     'Deployed on AWS with Docker containerization and S3 for secure image storage'
      //   ],
      //   link: 'https://github.com/aditikrishna/medical-cv-diagnostic'
      // }
    ],
    
    work_experience: [
      {
        position: 'Machine Learning Engineering Intern',
        company_name: 'Microsoft Research India',
        companyName: 'Microsoft Research India',
        duration: 'May 2023 - August 2023',
        start_date: 'May 2023',
        end_date: 'August 2023',
        description: 'Developed machine learning models for natural language understanding in conversational AI\nImplemented transformer architectures for improved dialogue systems\nCollaborated with senior researchers on cutting-edge NLP projects\nOptimized model performance reducing inference time by 30%\nContributed to research paper published in NeurIPS 2023',
        responsibilities: [
          'Developed transformer-based models for conversational AI with 15% improvement in BLEU scores',
          'Implemented advanced NLP preprocessing pipelines using Python and TensorFlow',
          'Collaborated with senior researchers on dialogue system optimization projects',
          // 'Optimized model inference time by 30% through quantization and pruning techniques',
          // 'Contributed to research paper accepted at NeurIPS 2023 conference',
          // 'Mentored 2 junior interns on machine learning best practices'
        ]
      },
      {
        position: 'Full Stack Developer Intern',
        company_name: 'Flipkart Labs',
        companyName: 'Flipkart Labs',
        duration: 'December 2022 - April 2023',
        start_date: 'December 2022',
        end_date: 'April 2023',
        description: 'Built scalable microservices for e-commerce recommendation system\nDeveloped React-based admin dashboard for data analytics\nImplemented real-time data processing pipelines using Apache Kafka\nOptimized database queries resulting in 40% performance improvement\nParticipated in agile development processes and code reviews',
        responsibilities: [
          'Built microservices architecture using Node.js and Express for recommendation engine',
          'Developed responsive React dashboard for real-time analytics and data visualization',
          'Implemented Apache Kafka data streaming for processing 1M+ daily transactions',
          // 'Optimized PostgreSQL database queries achieving 40% performance improvement',
          // 'Participated in agile development with daily standups and sprint planning',
          // 'Wrote comprehensive unit tests achieving 85% code coverage'
        ]
      },
      // {
      //   position: 'Research Assistant',
      //   company_name: 'AI Research Lab, IIT Mumbai',
      //   companyName: 'AI Research Lab, IIT Mumbai',
      //   duration: 'August 2022 - November 2022',
      //   start_date: 'August 2022',
      //   end_date: 'November 2022',
      //   description: 'Assisted in developing deep learning models for computer vision applications\nConducted literature review on state-of-the-art CNN architectures\nImplemented various neural network architectures using PyTorch\nCollected and annotated large-scale image datasets\nPresented research findings at weekly lab seminars',
      //   responsibilities: [
      //     'Conducted comprehensive literature review on state-of-the-art computer vision models',
      //     'Implemented and trained CNN architectures including ResNet, EfficientNet, and Vision Transformers',
      //     'Collected and annotated 10,000+ images for custom computer vision datasets',
      //     // 'Developed data augmentation techniques improving model generalization by 12%',
      //     // 'Presented weekly research updates to faculty and graduate students',
      //     // 'Collaborated on grant proposal that secured ₹15 lakhs in research funding'
      //   ]
      // }
    ],
    
    // Enhanced certifications with mixed formats
    certifications: [
      {
        name: 'AWS Certified Machine Learning - Specialty',
        issuer: 'Amazon Web Services',
        url: 'https://aws.amazon.com/certification/certified-machine-learning-specialty/'
      },
      {
        name: 'Google Professional Machine Learning Engineer',
        issuer: 'Google Cloud',
        url: 'https://cloud.google.com/certification/machine-learning-engineer'
      },
      // 'TensorFlow Developer Certificate',
      // 'Microsoft Azure AI Engineer Associate',
      {
        name: 'Deep Learning Specialization',
        issuer: 'Coursera - Andrew Ng',
        url: 'https://coursera.org/specializations/deep-learning'
      },
      // 'PyTorch Certified Developer',
      // {
      //   name: 'Certified Kubernetes Application Developer (CKAD)',
      //   issuer: 'Cloud Native Computing Foundation',
      //   url: 'https://www.cncf.io/certification/ckad/'
      // },
      // 'NVIDIA Deep Learning Institute - Computer Vision',
      // {
      //   name: 'MongoDB Certified Developer',
      //   issuer: 'MongoDB University',
      //   url: 'https://university.mongodb.com/certification'
      // }
    ],
    
    customSections: {
      Languages: [
        'English (Professional)',
        'Hindi (Native)',
        'Marathi (Native)',
        // 'Sanskrit (Intermediate)',
        // 'German (Basic)'
      ],
      Technical_Strengths: [
        'Machine Learning algorithm design and optimization',
        'Computer Vision and Image Processing',
        'Natural Language Processing and NLP',
        // 'Full-stack web development with modern frameworks',
        // 'Cloud architecture and containerization',
        // 'Data pipeline design and ETL processes',
        // 'AI model deployment and MLOps practices'
      ],
      Research_Publications: [
        'Krishnamurthy, A. et al. "Advanced Dialogue Systems using Transformer Architecture" - NeurIPS 2023',
        'Co-authored "Optimizing Computer Vision Models for Medical Diagnostics" - ICML Workshop 2023',
        'Contributing author to "AI in E-commerce: Recommendation Systems" - IEEE Transactions on AI 2023'
      ],
      // Awards_and_Achievements: [
      //   'Winner - Microsoft AI Challenge 2023 (National Level)',
      //   'Best Innovation Award - IIT Mumbai Tech Fest 2023',
      //   'Google Summer of Code 2022 - TensorFlow Project',
      //   'Dean\'s List for Academic Excellence (2021-2024)',
      //   'Secured AIR 156 in JEE Advanced 2020',
      //   'KVPY Scholar (2019-2020)',
      //   'Published 3 research papers in top-tier AI conferences'
      // ],
      Leadership_Experience: [
        'Technical Lead - IIT Mumbai AI Society (2022-2024)',
        'Organized National Machine Learning Workshop with 500+ participants',
        'Mentored 15+ junior students in competitive programming and AI research',
        // 'Founded and led "Women in AI" chapter at IIT Mumbai',
        // 'Event coordinator for Inter-IIT Tech Meet 2023'
      ],
      // Open_Source_Contributions: [
      //   'Core contributor to TensorFlow Model Garden (500+ commits)',
      //   'Maintainer of popular PyTorch computer vision library (2K+ GitHub stars)',
      //   'Created open-source medical image analysis toolkit used by 50+ hospitals',
      //   'Regular contributor to Hugging Face Transformers library',
      //   'Published 5+ machine learning tutorials with 100K+ combined views'
      // ],
      // Volunteer_Work: [
      //   'AI/ML instructor at rural coding bootcamp (2022-2024)',
      //   'Technical mentor for underprivileged students through NGO partnership',
      //   'Volunteer data scientist for environmental conservation projects',
      //   'STEM educator at local government schools',
      //   'Organized free AI literacy workshops for senior citizens'
      // ],
      // Interests_and_Hobbies: [
      //   'Artificial Intelligence research and applications',
      //   'Competitive Programming (CodeChef 5-star, Codeforces Expert)',
      //   'Photography and Digital Art using AI tools',
      //   'Classical Indian dance (Bharatanatyam) - Grade 8 certified',
      //   'Sustainable technology and green computing initiatives',
      //   'Chess (State-level player, rated 1800+ FIDE)'
      // ]
    }
  },
  
];