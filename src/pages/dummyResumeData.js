// dummyResumeData.js
// This file contains dummy resume data to pre-fill the resume builder form

const dummyResumeData = {
  header: {
    name: "Alex Rodriguez",
    email: "alex.rodriguez@example.com",
    phone: "9876543210",
    github: "https://github.com/alexdev",
    linkedin: "https://linkedin.com/in/alexrodriguez",
    portfolio: "https://alexrod.dev",
  },
  summary: "DevOps engineer with 4+ years of experience in automation, CI/CD, and cloud infrastructure. Expert in AWS, Terraform, and container orchestration. Passionate about implementing DevSecOps practices and optimizing deployment pipelines.",
  education: {
    degree: "Bachelor of Science",
    specialization: "Computer Science",
    institution: "University of California, Berkeley",
    graduation_year: "2020",
  },
  skills: [
    "AWS", 
    "Terraform",
    "Docker",
    "Kubernetes",
    "Python",
    "Node.js",
    "Jenkins",
    "GitLab CI",
    "Ansible",
    "Linux",
    "Shell Scripting"
  ],
  projects: [
    {
      name: "Infrastructure as Code Framework",
      skills_used: "Terraform, AWS, Python, GitLab CI",
      description: "Developed a reusable IaC framework that reduced infrastructure deployment time by 70%. Implemented multi-environment support and automated security compliance checks."
    },
    {
      name: "Container Orchestration Platform",
      skills_used: "Kubernetes, Docker, Helm, Go",
      description: "Built a custom container orchestration platform serving 50+ microservices. Implemented auto-scaling and monitoring solutions using Prometheus and Grafana."
    }
  ],
  certifications: [
    "AWS Solutions Architect Professional",
    "Certified Kubernetes Administrator",
    "HashiCorp Certified Terraform Associate"
  ],
  work_experience: [
    {
      position: "Senior DevOps Engineer",
      company_name: "TechCloud Solutions",
      duration: "Jun 2022 - Present",
      description: "• Managed cloud infrastructure for 100+ applications on AWS\n• Reduced deployment time by 60% through pipeline optimization\n• Implemented zero-downtime deployment strategies\n• Led migration from legacy systems to containerized architecture"
    },
    {
      position: "Cloud Engineer",
      company_name: "DataSys Corp",
      duration: "Aug 2020 - May 2022",
      description: "• Developed and maintained CI/CD pipelines using Jenkins\n• Automated infrastructure provisioning with Terraform\n• Reduced cloud costs by 40% through resource optimization\n• Implemented monitoring and alerting solutions"
    }
  ],
  target_role: "DevOps Team Lead",
  customSections: {
    "Infrastructure Achievements": [
      "Designed and implemented multi-region disaster recovery solution",
      "Created automated security compliance scanning framework"
    ],
    "Publications": [
      "Rodriguez, A. (2023). 'Modern DevOps Practices.' Tech Journal Vol. 45",
      "Rodriguez, A. (2022). 'Cloud-Native Architecture Patterns.' AWS Community Blog"
    ]
  }
};

export default dummyResumeData;