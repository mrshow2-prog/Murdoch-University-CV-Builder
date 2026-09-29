import { ActionVerbCategory, DegreePathway, JobPortal, RecruitmentAgency, CVSection, TemplateType, CVData } from '../types';

export const accentColors = [
  { name: 'Executive Navy', hex: '#1B365D', bg: 'bg-[#1B365D]' },
  { name: 'Slate Teal', hex: '#134E4A', bg: 'bg-[#134E4A]' },
  { name: 'Deep Purple', hex: '#4C1D95', bg: 'bg-[#4C1D95]' },
  { name: 'Charcoal', hex: '#333333', bg: 'bg-[#333333]' },
  { name: 'Burgundy', hex: '#800020', bg: 'bg-[#800020]' },
  { name: 'Emerald', hex: '#065F46', bg: 'bg-[#065F46]' },
  { name: 'Royal Blue', hex: '#1E40AF', bg: 'bg-[#1E40AF]' },
  { name: 'Murdoch Red', hex: '#990000', bg: 'bg-[#990000]' },
];

export const actionVerbsData: ActionVerbCategory[] = [
  {
    category: "Executive Leadership, Governance & Authority",
    description: "Ideal for student leadership, committee chairing, team management, and strategic initiatives.",
    verbs: ["Led", "Headed", "Directed", "Chaired", "Presided", "Managed", "Oversaw", "Controlled", "Administered", "Regulated", "Authorized", "Approved", "Decided", "Enforced", "Governed"]
  },
  {
    category: "People Leadership, Talent & Team Management",
    description: "Great for coordinating team members, peer tutoring, onboarding, and group presentations.",
    verbs: ["Delegated", "Assigned", "Appointed", "Supervised", "Hired", "Selected", "Replaced", "Staffed", "Coordinated", "Handled", "Hosted", "Motivated", "Coached", "Mentored", "Trained"]
  },
  {
    category: "Strategy, Planning & Organizational Execution",
    description: "Effective for event management, project roadmaps, scheduling, and strategic goal setting.",
    verbs: ["Formulated", "Planned", "Structured", "Prioritized", "Navigated", "Organized", "Scheduled", "Prepared", "Arranged", "Implemented", "Executed", "Enacted", "Initiated"]
  },
  {
    category: "Process Optimization, Transformation & Turnaround",
    description: "Use to show operational efficiency, automation, cost reduction, and workflow revamp.",
    verbs: ["Streamlined", "Optimized", "Simplified", "Expedited", "Standardized", "Systematized", "Overhauled", "Reorganized", "Revamped", "Restored", "Remodeled", "Improved", "Enhanced", "Strengthened", "Fortified", "Upgraded", "Consolidated", "Merged", "Integrated", "Combined", "Condensed", "Adapted", "Customized", "Modified", "Adjusted", "Revised", "Corrected", "Eliminated"]
  },
  {
    category: "Finance, Quantitative Modeling & Resource Control",
    description: "Essential for accounting, budgeting, financial projections, and portfolio analytics.",
    verbs: ["Budgeted", "Allocated", "Balanced", "Reconciled", "Netted", "Calculated", "Computed", "Estimated", "Forecasted", "Projected", "Reduced", "Decreased", "Conserved"]
  },
  {
    category: "Research, Data Analysis & Quality Inspection",
    description: "Highlight capstone methodologies, survey data, audits, KPIs, and statistical findings.",
    verbs: ["Researched", "Investigated", "Surveyed", "Searched", "Interviewed", "Retrieved", "Located", "Analyzed", "Assessed", "Appraised", "Audited", "Inspected", "Reviewed", "Interpreted", "Diagnosed", "Identified", "Determined", "Summarized", "Qualified", "Tracked", "Monitored", "Reported"]
  },
  {
    category: "Business Development, Commercial Growth & Partnerships",
    description: "Highlight sales generation, corporate sponsorship, client onboarding, and brand reach.",
    verbs: ["Generated", "Increased", "Expanded", "Advanced", "Attained", "Accomplished", "Negotiated", "Secured", "Contracted", "Prospected", "Established", "Cultivated", "Partnered", "Marketed"]
  },
  {
    category: "Engineering, Technical Systems & Maintenance",
    description: "Demonstrate software coding, hardware diagnostics, architecture building, and bug fixing.",
    verbs: ["Engineered", "Built", "Constructed", "Fabricated", "Assembled", "Installed", "Programmed", "Applied", "Utilized", "Operated", "Converted", "Printed", "Debugged", "Solved", "Rectified", "Repaired", "Maintained"]
  },
  {
    category: "Creative Production, Design & Innovation",
    description: "Ideal for UI/UX prototypes, brand design, video production, copywriting, and campaigns.",
    verbs: ["Conceptualized", "Devised", "Invented", "Originated", "Founded", "Instituted", "Introduced", "Initiated", "Designed", "Created", "Developed", "Composed", "Fashioned", "Shaped", "Modeled", "Produced", "Illustrated", "Photographed", "Displayed", "Performed", "Entertained"]
  },
  {
    category: "Mentorship, Collaboration & Stakeholder Support",
    description: "Perfect for student ambassador roles, client consulting, mediation, and community outreach.",
    verbs: ["Mentored", "Coached", "Trained", "Educated", "Guided", "Advised", "Counseled", "Familiarized", "Collaborated", "Cooperated", "Facilitated", "Fostered", "Contributed", "Supported", "Assisted", "Aided", "Helped", "Provided", "Supplied", "Furthered", "Advocated", "Represented", "Intervened", "Resolved", "Clarified", "Answered", "Prevented", "Ensured", "Referred", "Rehabilitated"]
  }
];

export const degreePathways: DegreePathway[] = [
  {
    id: "bbus_mkt",
    name: "Bachelor of Business in Marketing & Communication",
    faculty: "School of Business",
    overview: "Equips students with brand strategy, omnichannel digital campaigns, consumer insights, public relations, and data-driven marketing analytics.",
    roles: [
      { domain: "Marketing", titles: ["Marketing Assistant / Coordinator", "Marketing Executive / Specialist", "Campaign Manager", "Product Marketing Manager", "Marketing Manager"] },
      { domain: "PR & Communication", titles: ["PR Assistant / Coordinator", "PR Executive / Specialist", "PR Manager", "Corporate Comms Manager", "Internal Comms Manager", "Marcom Manager"] },
      { domain: "Digital Marketing", titles: ["Digital Marketing Assistant / Coordinator", "Digital Marketing Executive / Specialist", "Digital Marketing Manager"] },
      { domain: "Advertising & Media", titles: ["Media/Advertising Coordinator", "Media/Advertising Executive", "Account Executive", "Media Planner", "Account Manager", "Media Manager"] },
      { domain: "Social Media & Content", titles: ["Content Creator", "Social Media Coordinator", "Content Marketing Executive", "Social Media Specialist", "Content Marketing Specialist", "Content Marketing Manager", "Social Media Manager"] },
      { domain: "Sales & Growth", titles: ["Sales Coordinator", "Sales / Account Executive", "Business Development Specialist", "Account Manager", "Sales Manager", "Growth Marketing Manager", "Marketing & Sales Manager"] },
      { domain: "Research & Analytics", titles: ["Research Assistant / Coordinator", "Marketing Analyst", "SEO Specialist / Executive", "SEO Manager", "Research/Insights Manager", "Marketing Analytics Manager"] },
      { domain: "CRM & Customer Experience", titles: ["Customer Experience Coordinator", "Customer Experience Executive / Specialist", "CRM Specialist / Executive", "CRM/Customer Experience Manager"] },
      { domain: "Events & Experiential", titles: ["Events Assistant / Coordinator", "Events Executive / Specialist", "Events Manager"] },
      { domain: "Brand Management", titles: ["Brand Assistant", "Brand Executive / Specialist", "Brand Manager"] }
    ],
    techSkills: [
      "Search Engine Optimization (SEO) & SEM",
      "Marketing Analytics & Attribution (GA4, Looker Studio)",
      "Social Media Marketing & Management (Meta Business Suite)",
      "Content Marketing & Marketing Strategy Planning",
      "Email Marketing & Automation (Mailchimp, Klaviyo)",
      "CRM Management (HubSpot, Salesforce)",
      "Pay-Per-Click (PPC) & Digital Advertising (Meta Ads, Google Ads)",
      "Marketing Automation & AI Workflow Integration",
      "Graphic Design & Visual Storytelling (Adobe CC, Canva)",
      "Conversion Rate Optimization (CRO)",
      "Market Research & Consumer Behavior Analysis",
      "Copywriting & Technical Writing",
      "Basic HTML/CSS & CMS Management (WordPress)",
      "Developing Brand Identity & Brand Positioning",
      "Community Management & Influencer Outreach"
    ],
    softSkills: [
      "Storytelling & Brand Messaging",
      "Professional Business Writing (Emails, Reports, Proposals)",
      "Public Speaking & High-Impact Presentations",
      "Interpersonal Communication & Active Listening",
      "Creative Problem-Solving",
      "Strategic & Commercial Acumen",
      "Cross-Functional Collaboration",
      "Stakeholder Management & Influencing",
      "Adaptability & Agility in Fast-Paced Campaigns",
      "Project Management & Prioritization"
    ]
  },
  {
    id: "bbus_acc",
    name: "Bachelor of Business in Accounting and Finance",
    faculty: "School of Business",
    overview: "Focuses on financial modeling, audit standards (IFRS/GAAP), corporate valuation, taxation, capital management, and enterprise financial analysis.",
    roles: [
      { domain: "Accounting", titles: ["Accounts Assistant", "Junior Accountant", "Financial Accountant", "Accounting Supervisor", "Accounts Payable / Receivable Supervisor", "Accounting Manager"] },
      { domain: "Corporate Finance & FP&A", titles: ["Finance Assistant", "Finance / Financial Analyst", "FP&A Analyst", "FP&A Manager", "Finance Manager"] },
      { domain: "Cost Control", titles: ["Cost Control Assistant", "Cost Controller / Cost Accountant", "Cost Control Supervisor", "Cost Control Manager"] },
      { domain: "Audit & Assurance", titles: ["Audit Associate", "Audit Analyst", "Audit Supervisor", "Internal Auditor", "Internal Audit Manager", "Audit Manager"] },
      { domain: "Credit & Risk", titles: ["Credit Assistant / Analyst", "Credit Risk Specialist / Supervisor", "Credit Manager"] },
      { domain: "Treasury", titles: ["Treasury Assistant", "Treasury Analyst", "Treasury Specialist", "Treasury Supervisor", "Treasury Manager"] },
      { domain: "Investment & Wealth", titles: ["Research Assistant / Analyst", "Investment Analyst", "Portfolio Manager", "Wealth Management Advisor"] },
      { domain: "Taxation & Compliance", titles: ["Tax Associate / Analyst", "Tax Consultant", "Corporate Tax Specialist", "Tax Manager"] },
      { domain: "Banking", titles: ["Banking Analyst", "Customer Service Officer", "Relationship Officer / Executive", "Relationship Manager", "Branch Operations Officer"] }
    ],
    techSkills: [
      "Financial Statement Preparation & Analysis",
      "Financial Modeling & Valuation (DCF, Multiples, Scenario Analysis)",
      "Budgeting, Forecasting, & Variance Analysis",
      "Accounting Standards & Regulations (IFRS and GAAP)",
      "Advanced MS Excel (VLOOKUP, XLOOKUP, INDEX/MATCH, Pivot Tables)",
      "Enterprise Resource Planning (ERP) Systems (SAP, Oracle NetSuite)",
      "Cloud Accounting Platforms (QuickBooks, Xero, Zoho Books)",
      "Auditing Principles, Internal Controls, & Discrepancy Detection",
      "Corporate Tax, UAE VAT Compliance, & Statutory Filings",
      "Cost Accounting & Profitability Optimization",
      "Investment Appraisal & Capital Budgeting (NPV, IRR)",
      "Financial Data Analytics & Visualization (Power BI, Tableau)",
      "Bookkeeping, General Ledger Management, & Bank Reconciliation",
      "Financial Risk Assessment & Cash Flow Management"
    ],
    softSkills: [
      "Meticulous Attention to Detail & Numerical Accuracy",
      "Ethical Judgment & Professional Integrity",
      "Commercial & Business Acumen",
      "Data-Driven Problem-Solving & Critical Thinking",
      "Financial Storytelling for Non-Finance Stakeholders",
      "Time Management under Tight Reporting & Tax Deadlines",
      "Stakeholder Management & Negotiation",
      "Cross-Functional Collaboration",
      "Adaptability to Evolving Regulatory Frameworks"
    ]
  },
  {
    id: "bbus_hr",
    name: "Bachelor of Business in Human Resources Management",
    faculty: "School of Business",
    overview: "Prepares future HR leaders with expertise in UAE labour laws, talent acquisition, total rewards, organizational design, HR analytics, and employee relations.",
    roles: [
      { domain: "Human Resources Operations", titles: ["HR Assistant / Coordinator / Administrator", "HR Executive / Officer / Specialist", "HR Supervisor", "HR Advisor", "HR Manager", "HR Business Partner (HRBP)", "HR Operations Specialist"] },
      { domain: "Total Rewards & HRIS", titles: ["HR Analyst", "Payroll Officer", "HRIS Administrator / Officer", "Payroll Manager", "Compensation & Benefits Specialist", "Organization Development Manager"] },
      { domain: "Talent Acquisition", titles: ["Recruitment Assistant / Coordinator", "Recruitment Specialist / Executive", "Recruitment Manager", "Talent Acquisition Partner", "Headhunter / Sourcer"] },
      { domain: "Employee Relations & Engagement", titles: ["Employee Relations Officer/Specialist", "Employee Engagement Officer", "Employee Relations Advisor", "People & Culture Lead"] },
      { domain: "Learning & Development (L&D)", titles: ["L&D Assistant / Coordinator", "L&D Executive / Specialist / Officer", "L&D Partner", "Corporate Trainer / Facilitator"] }
    ],
    techSkills: [
      "Labour Law & Statutory Regulations (UAE Labour Law, MOHRE, WPS)",
      "Talent Acquisition & End-to-End Recruitment Lifecycle",
      "Candidate Sourcing & Screening (LinkedIn Recruiter, Boolean Search)",
      "Applicant Tracking Systems (ATS) Management",
      "Competency-Based Interviewing (STAR Method)",
      "Employer Branding & Candidate Experience Management",
      "Job Architecture & Job Description Development",
      "Human Resource Information Systems (HRIS / HRMS: Workday, SAP SuccessFactors, BambooHR)",
      "Employee Lifecycle Administration (Onboarding, Offboarding, Visas)",
      "HR Policy Formulation & Employee Handbook Design",
      "Performance Management Systems & KPI/OKR Frameworks",
      "People Analytics & HR Reporting (Attrition, Turnover, Time-to-Hire)",
      "Workforce Planning & Headcount Budgeting",
      "Total Rewards, Compensation Benchmarking, & Benefits Administration",
      "Employee Grievance Handling & Disciplinary Procedures"
    ],
    softSkills: [
      "Discretion, Confidentiality, & High Ethical Standards",
      "Active Listening & Emotional Intelligence (EQ)",
      "Conflict Resolution, Mediation, & De-escalation",
      "Empathetic Communication & Employee Advocacy",
      "Stakeholder Management & Executive Influencing",
      "Cross-Cultural & Diversity Competence",
      "Coaching, Mentoring, & Feedback Delivery",
      "Change Management & Agility",
      "Sound Impartial Judgment & Decision-Making"
    ]
  },
  {
    id: "bbus_mgmt",
    name: "Bachelor of Business in Management",
    faculty: "School of Business",
    overview: "Builds versatile managers with capabilities in operational excellence, strategic leadership, change management, agile project management, and business intelligence.",
    roles: [
      { domain: "General Management", titles: ["Administrative Coordinator", "Business Coordinator / Assistant", "Management Trainee", "Operations Specialist", "Business Operations Manager"] },
      { domain: "Project Management", titles: ["Project Coordinator / Assistant", "Project Officer / Specialist", "Scrum Master", "Project Manager", "PMO Analyst"] },
      { domain: "Operations & Quality", titles: ["Operations Coordinator", "Operations Officer / Specialist", "Operations Supervisor", "Operations Manager", "Continuous Improvement Lead"] },
      { domain: "Customer Success", titles: ["Customer Service Coordinator", "Customer Success Specialist", "Customer Success Manager", "Client Relationship Manager"] },
      { domain: "Business Development", titles: ["Sales / Account Coordinator", "Business Development Coordinator", "Sales Executive", "Business Development Manager", "Partnership Manager"] },
      { domain: "Supply Chain & Logistics", titles: ["Supply Chain Analyst", "Logistics Coordinator", "Procurement Specialist", "Supply Chain Manager"] },
      { domain: "Business Intelligence & Strategy", titles: ["Business / Strategy Analyst", "Business Improvement Specialist", "Strategy Consultant", "Corporate Planning Associate"] }
    ],
    techSkills: [
      "Strategic Planning Frameworks (SWOT, PESTLE, Porter's Five Forces, OKRs)",
      "Business Process Modeling & Workflow Optimization",
      "Market, Competitor, & Industry Benchmarking",
      "Business Analytics & Performance Dashboards (Excel, Power BI, Tableau)",
      "Project Management Tools & Methodologies (Agile, Scrum, Waterfall, Jira, Asana, Trello)",
      "Project Scheduling, Milestone Tracking, & Resource Allocation",
      "Budgeting, Variance Analysis, & Cost Control",
      "Financial Acumen & P&L Performance Tracking",
      "Risk Management & Business Continuity Planning",
      "Change Management Frameworks (Kotter, ADKAR)",
      "Vendor Management, Procurement, & Contract Administration"
    ],
    softSkills: [
      "People Leadership, Team Building, & Motivation",
      "Strategic Thinking & Big-Picture Vision",
      "Complex Problem-Solving & Root Cause Analysis",
      "Decisiveness Under Ambiguity",
      "Effective Delegation & Accountability",
      "Persuasive Executive Communication & Pitching",
      "Cross-Functional Team Alignment",
      "Negotiation & Stakeholder Consensus Building",
      "Resilience, Time Management, & Agility"
    ]
  },
  {
    id: "bit_cs",
    name: "Bachelor of Information Technology in Computer Science",
    faculty: "School of Information Technology",
    overview: "Covers full-stack software development, cloud infrastructure, algorithms, database systems, cybersecurity hygiene, API integration, and distributed computing.",
    roles: [
      { domain: "Software Development", titles: ["Junior Software Developer", "Front-End / Back-End Developer", "Full Stack Developer", "Web Developer", "Mobile App Developer (iOS/Android)", "Software Engineer"] },
      { domain: "Cloud & Infrastructure", titles: ["Cloud Support Associate", "Cloud Engineer", "Infrastructure Engineer", "Systems Administrator", "Cloud Solutions Architect"] },
      { domain: "Quality Assurance & Testing", titles: ["Software QA Tester", "Automation QA Engineer", "Test Lead", "Quality Assurance Analyst"] },
      { domain: "Data Science & Analytics", titles: ["Data Analyst", "Junior Data Scientist", "BI Developer", "Database Developer", "Analytics Engineer"] },
      { domain: "DevOps & SRE", titles: ["DevOps Engineer", "Site Reliability Engineer (SRE)", "Build & Release Engineer", "Automation Specialist"] },
      { domain: "IT Support & Networks", titles: ["IT Support Specialist", "Network Administrator", "Systems Support Officer", "Technical Support Engineer"] },
      { domain: "Cybersecurity", titles: ["Junior SOC Analyst", "Cybersecurity Specialist", "Security Operations Analyst", "Information Security Officer"] }
    ],
    techSkills: [
      "Core Programming Languages (Python, Java, C++, TypeScript, JavaScript)",
      "Data Structures & Algorithms (Arrays, Trees, Graphs, Sorting, Big-O Analysis)",
      "Object-Oriented Programming (OOP) & Design Patterns",
      "Modern Front-End Frameworks (React, Next.js, Vue, Tailwind CSS)",
      "Back-End & API Frameworks (Node.js, Express, FastAPI, Django, Spring Boot)",
      "Database Systems & Querying (PostgreSQL, MySQL, MongoDB, Redis)",
      "RESTful APIs, GraphQL, & Microservices Architecture",
      "Version Control & Git Workflows (GitHub, GitLab, Branching Strategies)",
      "Cloud Platforms & Containerization (AWS, Azure, Google Cloud, Docker, Kubernetes)",
      "CI/CD Pipelines (GitHub Actions, GitLab CI, Jenkins)",
      "Unit & Integration Testing (Jest, PyTest, Cypress)",
      "Cybersecurity Fundamentals (OWASP Top 10, Auth0, JWT, Encryption)",
      "Diagnostic Profiling, Debugging, & Code Optimization"
    ],
    softSkills: [
      "Algorithmic Thinking & Logical Reasoning",
      "Complex Problem Decomposition & Troubleshooting",
      "Technical Communication with Non-Technical Stakeholders",
      "Collaborative Code Reviews & Team Spirit",
      "Continuous Self-Directed Learning & Adaptability",
      "Attention to Code Quality, Readability, & Architecture",
      "Patience & Tenacity in Bug Fixing",
      "Sprint Prioritization & Agile Estimation"
    ]
  },
  {
    id: "bit_ai",
    name: "Bachelor of Information Technology in AI & Autonomous Systems",
    faculty: "School of Information Technology",
    overview: "Specializes in machine learning models, deep learning, computer vision, natural language processing, LLM fine-tuning, robotics middleware, and autonomous control.",
    roles: [
      { domain: "AI & Machine Learning", titles: ["AI Research Assistant", "Machine Learning Engineer", "NLP Specialist", "Deep Learning Engineer", "AI Solutions Architect", "GenAI Developer"] },
      { domain: "Data Science & MLOps", titles: ["Data Scientist", "AI Infrastructure Engineer", "MLOps Engineer", "Data Pipeline Engineer", "Predictive Analytics Specialist"] },
      { domain: "Computer Vision", titles: ["Computer Vision Engineer", "Image Processing Specialist", "Vision Systems Developer", "Optical AI Engineer"] },
      { domain: "Robotics & Automation", titles: ["Robotics Programmer", "Autonomous Systems Engineer", "Control Systems Specialist", "RPA Developer (UiPath)"] },
      { domain: "AI Governance & Ethics", titles: ["AI Safety & Governance Analyst", "AI Risk Consultant", "AI Ethics Officer"] }
    ],
    techSkills: [
      "Machine Learning Algorithms (Supervised, Unsupervised, Reinforcement Learning)",
      "Deep Learning & Neural Architectures (CNNs, RNNs, Transformers, LLMs)",
      "Frameworks: TensorFlow, PyTorch, Scikit-Learn, Keras, HuggingFace",
      "Computer Vision & Image Processing (OpenCV, YOLO, Mediapipe)",
      "Natural Language Processing (NLP, NLTK, Spacy, LangChain, RAG Pipelines)",
      "Robotics Middleware & Simulation (ROS/ROS2, Gazebo, MATLAB/Simulink)",
      "Sensor Fusion & Hardware Telemetry (LiDAR, Radar, IMU, Camera, Ultrasonic)",
      "Python Data Stack (NumPy, Pandas, Matplotlib, Seaborn, Polars)",
      "MLOps & Deployment (Docker, FastAPI, ONNX, TensorRT, Triton, MLflow)",
      "Cloud AI Services (AWS SageMaker, Azure AI, Google Vertex AI)",
      "Vector Databases & Embeddings (Pinecone, ChromaDB, Weaviate)",
      "Statistical Modeling & Hypothesis Testing"
    ],
    softSkills: [
      "Systems-Level Thinking (Hardware + Software + Data)",
      "Experimental Rigor & Hypothesis Testing",
      "Ethical AI Consciousness (Bias Mitigation, Privacy, Safety)",
      "Translating AI Metrics into Business Value",
      "Cross-Disciplinary Collaboration",
      "Curiosity & Constant Exploration of Research Papers",
      "High Resilience in Model Debugging"
    ]
  },
  {
    id: "bit_games",
    name: "Bachelor of Information Technology in Games Design & Development",
    faculty: "School of Information Technology",
    overview: "Blends technical game engine programming, level design, 3D asset pipelines, gameplay mechanics scripting, physics simulation, and immersive AR/VR experiences.",
    roles: [
      { domain: "Game Development", titles: ["Gameplay Programmer", "Game Engine Developer", "Unity / Unreal Developer", "Tools Programmer", "Full Stack Game Developer"] },
      { domain: "Game & Level Design", titles: ["Game Designer", "Level Designer", "Systems Designer", "Combat / Economy Designer", "Narrative Designer"] },
      { domain: "3D Art & Technical Art", titles: ["Technical Artist", "3D Environment Artist", "Character Modeler", "Shader / Lighting Artist", "VFX Artist"] },
      { domain: "AR/VR & Extended Reality", titles: ["AR/VR Developer", "XR Interactive Designer", "Spatial Computing Specialist", "Virtual Production Artist"] },
      { domain: "UI/UX & Production", titles: ["Game UI/UX Designer", "Game QA Tester", "Associate Game Producer", "Release Coordinator"] }
    ],
    techSkills: [
      "Game Engines: Unity (C#) & Unreal Engine (C++, Blueprints)",
      "Gameplay Mechanics Scripting & Physics Simulation",
      "Level Design, Greyboxing, & Spatial Pacing",
      "3D Modeling, Topology, & UV Mapping (Blender, Autodesk Maya, ZBrush)",
      "Texturing & PBR Materials (Substance 3D Painter, Photoshop)",
      "Rigging, Skinning, & Keyframe / MoCap Animation",
      "Shader Programming (HLSL/GLSL, Shader Graph, Niagara VFX)",
      "UI/UX Design for Games (HUD, Inventory Systems, Figma)",
      "Audio Middleware Integration (FMOD, Wwise)",
      "Game Optimization (Draw Calls, LODs, Occlusion Culling, Frame Profiling)",
      "Version Control for Large Assets (Git LFS, Perforce)",
      "XR SDKs (Oculus SDK, OpenXR, ARKit, ARCore)"
    ],
    softSkills: [
      "Iterative Creativity & Player-Centric Empathy",
      "Cross-Disciplinary Teamwork (Art, Audio, Narrative, Code)",
      "Visual & Narrative Storytelling",
      "Openness to Playtester Feedback & Critique",
      "Patience with Physics & State Machine Debugging",
      "Agile Game Production & Milestone Delivery"
    ]
  },
  {
    id: "b_forensics",
    name: "Bachelor of Forensics and Criminology",
    faculty: "School of Science & Law",
    overview: "Combines forensic laboratory sciences, chain of custody protocol, digital forensics, crime scene reconstruction, forensic toxicology, and criminal justice policy.",
    roles: [
      { domain: "Forensic Science & Laboratory", titles: ["Forensic Laboratory Assistant", "Evidence Technician", "DNA / Serology Lab Analyst", "Forensic Toxicologist Assistant", "Fingerprint Examiner", "Crime Scene Investigator (CSI)"] },
      { domain: "Digital Forensics & Cybercrime", titles: ["Digital Forensics Analyst", "Incident Response Investigator", "Cybercrime Analyst", "eDiscovery Specialist", "Mobile Device Forensic Examiner"] },
      { domain: "Investigation & Law Enforcement", titles: ["Criminal Investigator", "Regulatory Enforcement Officer", "Customs & Border Protection Officer", "Police Officer / Detective Trainee"] },
      { domain: "Financial Crime & Fraud", titles: ["Fraud Investigator", "AML / KYC Compliance Analyst", "Anti-Bribery & Corruption Specialist", "Internal Investigations Officer"] },
      { domain: "Crime Analysis & Criminology", titles: ["Crime Analyst", "Criminal Intelligence Officer", "Policy & Crime Research Associate", "Victim Support Specialist", "Rehabilitation Officer"] }
    ],
    techSkills: [
      "Crime Scene Investigation (CSI) Protocol, Grid Search, & Evidence Mapping",
      "Strict Chain of Custody Maintenance & Evidence Preservation",
      "Latent Fingerprint Processing & AFIS Database Matching",
      "Biological Evidence Handling (Forensic Serology & DNA Profiling Prep)",
      "Forensic Chemistry & Substance Testing (Spectroscopy, Chromatography)",
      "Digital Forensics & Disk Imaging (FTK Imager, EnCase, Autopsy)",
      "Mobile Forensics & Telemetry Extraction (Cellebrite, Oxygen Forensic)",
      "Incident Response & Cyber Network Log Analysis",
      "Forensic Photography & 3D Spatial Scene Documentation",
      "Criminal Law, Evidentiary Standards, & Procedural Codes",
      "Forensic Expert Witness Report Preparation & Documentation"
    ],
    softSkills: [
      "Meticulous Attention to Detail & Observational Rigor",
      "Uncompromising Ethical Integrity & Objectivity",
      "Emotional Resilience in High-Pressure / Sensitive Contexts",
      "Clear, Fact-Based, Non-Biased Report Writing",
      "Strict Confidentiality & Information Security",
      "Deductive & Inductive Reasoning",
      "Multidisciplinary Team Collaboration"
    ]
  },
  {
    id: "b_psych",
    name: "Bachelor of Psychology",
    faculty: "School of Psychology",
    overview: "Grounds students in empirical behavioral research, psychometric assessment, cognitive psychology, counselling interventions, developmental health, and workplace wellbeing.",
    roles: [
      { domain: "Counselling & Mental Health", titles: ["Mental Health Support Worker", "Assistant Counsellor", "Behavioral Therapist Trainee", "Crisis Support Specialist", "Community Wellbeing Officer"] },
      { domain: "Clinical & Healthcare Support", titles: ["Assistant Psychologist", "Psychological Assessment Technician", "Clinical Intake Officer", "Patient Care Coordinator"] },
      { domain: "Organizational & HR Psychology", titles: ["People Operations Specialist", "Talent Assessment Coordinator", "Employee Wellbeing Specialist", "Organizational Development Analyst"] },
      { domain: "Educational & School Psychology", titles: ["Learning Support Assistant", "Student Wellbeing Coordinator", "Educational Support Worker", "Child Development Assistant"] },
      { domain: "Behavioral Research & Insights", titles: ["Research Assistant", "Consumer Insights Analyst", "Behavioral Data Specialist", "Market Research Executive"] },
      { domain: "Rehabilitation & Community", titles: ["Rehabilitation Case Worker", "Disability Support Specialist", "Youth Support Officer", "Social Services Coordinator"] }
    ],
    techSkills: [
      "Psychological Assessment Administration & Psychometric Tool Scoring",
      "Quantitative Research Methods & Statistical Software (SPSS, R, JASP)",
      "Experimental Design, Behavioral Surveys, & Data Collection",
      "Qualitative Inquiry, Interview Coding, & Thematic Analysis",
      "Evidence-Based Intervention Principles (CBT, Behavioral Modification, Mindfulness)",
      "Functional Behavioral Assessment (FBA) & ABA Fundamentals",
      "Clinical Intake Documentation & Psychosocial History Reporting",
      "Crisis De-escalation & Mental Health First Aid (MHFA) Protocols",
      "Healthcare Regulatory Standards & Ethics (UAE DHA, CDA, DOH Guidelines)",
      "Psychoeducation Workshop Design & Presentation"
    ],
    softSkills: [
      "Active Listening & Deep Empathic Attunement",
      "Unconditional Regard & Non-Judgmental Demeanor",
      "Rapport Building & Professional Boundary Setting",
      "Strict Confidentiality & Ethical Duty of Care",
      "Emotional Regulation & Self-Care Composure",
      "Cross-Cultural Sensitivity & Inclusivity",
      "Clear Communication of Complex Psychological Concepts"
    ]
  },
  {
    id: "med",
    name: "Master of Education (MEd)",
    faculty: "School of Education",
    overview: "Advanced postgraduate program covering instructional leadership, curriculum design, inclusive education, educational technology, learning analytics, and school accreditation.",
    roles: [
      { domain: "Instructional Leadership", titles: ["Head of Department / Subject", "Curriculum Coordinator", "Teaching and Learning Specialist", "Assistant Principal / Vice Principal", "Academic Director"] },
      { domain: "Curriculum & Learning Design", titles: ["Curriculum Developer", "Instructional Designer", "Learning Experience Designer (LXD)", "Corporate L&D Specialist"] },
      { domain: "Inclusive & Special Education", titles: ["Inclusion Lead / Specialist", "SEN Coordinator (SENCO)", "Learning Support Coordinator", "Differentiated Learning Coach"] },
      { domain: "Educational Technology & EdTech", titles: ["EdTech Coordinator", "Digital Learning Specialist", "LMS Administrator", "eLearning Developer"] },
      { domain: "Higher Education & Academic Support", titles: ["Academic Advisor", "Student Success Manager", "Adjunct Lecturer", "Program Coordinator"] },
      { domain: "Quality Assurance & Consulting", titles: ["Academic Quality Specialist", "Accreditation Officer", "School Improvement Consultant", "Educational Policy Researcher"] }
    ],
    techSkills: [
      "Curriculum Architecture & Backward Design (Understanding by Design)",
      "Accreditation & Standards (IB PYP/MYP/DP, UK National Curriculum, US Common Core)",
      "Differentiated Instruction & Universal Design for Learning (UDL)",
      "Formative & Summative Assessment Design, Moderation, & Rubric Construction",
      "Learning Analytics & Student Achievement Data Tracking",
      "Learning Management Systems (Canvas, Blackboard, Google Classroom, Brightspace)",
      "Instructional Coaching & Peer Observation Frameworks",
      "Educational Research Methods (Action Research, Mixed Methods)",
      "School Inspection Readiness & Regulatory Compliance (KHDA, ADEK, CIS)",
      "Educational Policy Analysis & School Improvement Planning (SIP)"
    ],
    softSkills: [
      "Transformational Instructional Leadership & Faculty Empowerment",
      "Student-Centered Advocacy & Inclusive Mindset",
      "Constructive Feedback & Developmental Coaching",
      "Parent, Board, & Community Stakeholder Engagement",
      "Professional Learning Community (PLC) Facilitation",
      "Conflict Resolution, Restorative Practices, & Mediation",
      "Visionary Strategic Academic Planning"
    ]
  },
  {
    id: "mba",
    name: "Master of Business Administration (MBA)",
    faculty: "Murdoch Business School",
    overview: "Executive graduate leadership program cultivating strategic vision, corporate financial valuation, global market entry, organizational transformation, and C-suite decision-making.",
    roles: [
      { domain: "Executive & General Management", titles: ["General Manager", "Managing Director", "Chief of Staff", "Business Unit Head", "Regional Operations Director"] },
      { domain: "Strategy & Management Consulting", titles: ["Management Consultant", "Engagement Manager", "Corporate Strategy Director", "Strategy & Operations Lead"] },
      { domain: "Commercial & Revenue Leadership", titles: ["Commercial Director", "Chief Commercial Officer (CCO)", "Head of Business Development", "VP of Sales & Growth"] },
      { domain: "Financial & Investment Management", titles: ["Finance Director", "Investment Director", "Private Equity Associate", "M&A Strategy Lead"] },
      { domain: "Supply Chain & Transformation", titles: ["Operations Director", "Transformation Director", "Supply Chain VP", "Chief Operating Officer (COO)"] }
    ],
    techSkills: [
      "Corporate Strategy Formulation & Execution (Balanced Scorecard, OKRs)",
      "Advanced Financial Statement Analysis, Corporate Valuation, & Capital Allocation",
      "P&L Ownership, Strategic Budgeting, & Financial Variance Modeling",
      "Quantitative Decision Modeling & Executive KPI Dashboards",
      "Operations Strategy, Lean Six Sigma, & Supply Chain Transformation",
      "Market Sizing, Competitive Intelligence, & Go-To-Market (GTM) Playbooks",
      "Mergers & Acquisitions (M&A) Due Diligence & Strategic Alliances",
      "Enterprise Risk Management & Crisis Continuity Planning",
      "Corporate Governance, Board Reporting, & ESG Integration"
    ],
    softSkills: [
      "Executive Presence & C-Suite Boardroom Presentation",
      "High-Stakes Negotiation & Deal-Making",
      "Transformational Leadership & Talent Coaching",
      "Change Leadership & Cultural Agility",
      "Sound Decisiveness Under High Ambiguity",
      "Cross-Functional Coalition Building & Political Acumen",
      "Commercial Instinct & Long-Term Value Creation"
    ]
  },
  {
    id: "gcba",
    name: "Graduate Certificate in Business Administration",
    faculty: "Murdoch Business School",
    overview: "Focused postgraduate bridge program sharpening business fundamentals, departmental budgeting, team supervision, project management, and process optimization.",
    roles: [
      { domain: "Business Administration", titles: ["Business Operations Officer", "Department Supervisor", "Account Manager", "Operations Coordinator", "Project Lead"] }
    ],
    techSkills: [
      "Business Strategy Execution & Milestone Tracking",
      "Financial Performance Analysis (P&L, Margins, ROI)",
      "Departmental Budgeting, Forecasting, & Cost Control",
      "Data Reporting & KPI Dashboards (Excel, Power BI)",
      "Enterprise Tools (ERP & CRM Workflows)",
      "Project Management Fundamentals (Agile, Waterfall, Asana)",
      "Operational Risk Assessment & Mitigation",
      "Process Mapping & Workflow Optimization"
    ],
    softSkills: [
      "Team Leadership, Coaching, & Accountability",
      "Clear Written & Executive Verbal Communication",
      "Pragmatic Problem-Solving & Analytical Reasoning",
      "Stakeholder Coordination & Alignment",
      "Time Management Under Deadlines",
      "Adaptability to Fast Organizational Change"
    ]
  }
];

export const uaeRecruitmentAgencies: RecruitmentAgency[] = [
  {
    name: "NADIA Global",
    specialty: "Executive Search, Secretarial, Finance & HR",
    location: "Dubai & Abu Dhabi",
    url: "https://www.nadiaglobal.com/",
    description: "One of the longest-established recruitment agencies in the UAE with broad cross-sector opportunities for graduates and professionals.",
    isPopular: true
  },
  {
    name: "Michael Page Middle East",
    specialty: "Banking, Tech, Finance, Marketing, Legal",
    location: "Dubai International Financial Centre (DIFC)",
    url: "https://www.michaelpage.ae/",
    description: "Leading multinational recruitment consultancy known for mid-to-senior corporate and specialist vacancies.",
    isPopular: true
  },
  {
    name: "Adecco Middle East",
    specialty: "Contracting, IT, Graduate Hiring, Engineering",
    location: "Dubai Internet City",
    url: "https://www.adecco.com/",
    description: "Global workforce solutions giant offering temporary, graduate internship, and permanent placements across the Gulf.",
    isPopular: true
  },
  {
    name: "Charterhouse Middle East",
    specialty: "Real Estate, Financial Services, Tech, Healthcare",
    location: "Dubai (Business Bay)",
    url: "https://www.charterhouseme.ae/",
    description: "Premier agency matching top talent to major UAE and international corporate institutions.",
    isPopular: true
  },
  {
    name: "Hays UAE",
    specialty: "Technology, Construction, Finance, HR",
    location: "Dubai & Abu Dhabi",
    url: "https://www.hays.ae/",
    description: "Worldwide recruiting firm providing industry salary guides and specialized professional vacancies.",
    isPopular: true
  },
  {
    name: "Robert Half UAE",
    specialty: "Accounting, Finance, Legal, Tech",
    location: "Dubai (DIFC)",
    url: "https://www.roberthalf.com/ae/en",
    description: "Specialized financial, legal, and technology placement with a strong multinational employer network.",
    isPopular: true
  },
  {
    name: "Guildhall Agency",
    specialty: "Executive Search & Construction",
    location: "Dubai",
    url: "https://guildhall.agency/",
    description: "Bespoke executive search firm focused on infrastructure, leadership, and commercial sectors."
  },
  {
    name: "ManpowerGroup Middle East",
    specialty: "Workforce Management & Technology",
    location: "Dubai Media City",
    url: "https://www.manpowergroup.ae/",
    description: "Full-service talent solutions provider with strong presence in multinational client accounts."
  },
  {
    name: "Ladwig Consulting",
    specialty: "Boutique Executive & Specialist Search",
    location: "Dubai",
    url: "https://ladwigconsulting.com/",
    description: "Targeted executive search consultancy serving regional enterprises."
  },
  {
    name: "Harries Group",
    specialty: "Specialized Corporate Placement",
    location: "Dubai",
    url: "https://harriesgroup.com/",
    description: "Professional talent advisory focusing on niche corporate disciplines."
  },
  {
    name: "Yalla Consulting",
    specialty: "Digital, Creative & Tech Recruitment",
    location: "Dubai",
    url: "https://yalla-consulting.com/",
    description: "Modern startup and digital agency placement for creative and technological candidates."
  },
  {
    name: "Sundus Global",
    specialty: "Government, Emiratisation & Engineering",
    location: "Abu Dhabi & Dubai",
    url: "https://sundusglobal.com/",
    description: "Specialized provider of staffing and outsourcing solutions in the UAE."
  },
  {
    name: "Connect Resources",
    specialty: "HR Outsourcing & Staffing",
    location: "Dubai",
    url: "https://connectresources.ae/",
    description: "Comprehensive HR consultancy and talent placement across commercial sectors."
  },
  {
    name: "Black & Grey HR",
    specialty: "Emerging Tech, Media, Healthcare",
    location: "Dubai & Abu Dhabi",
    url: "https://black-grey.com/",
    description: "Progressive recruitment consultancy with strong startup and scale-up partner network."
  },
  {
    name: "Parker Connect",
    specialty: "Executive Search & Mid-Level Hiring",
    location: "Dubai",
    url: "https://parkerconnect-me.com/",
    description: "Connecting verified talent to retail, finance, FMCG, and industrial firms in the GCC."
  },
  {
    name: "PACT Manpower",
    specialty: "Corporate Staffing & Outsourcing",
    location: "Dubai",
    url: "https://www.pactmanpowerservices.ae/",
    description: "End-to-end recruitment and human capital support across the Emirates."
  },
  {
    name: "Halian Agency",
    specialty: "IT Infrastructure, Cloud & Cybersecurity",
    location: "Dubai Internet City",
    url: "https://www.halian.com/",
    description: "Dedicated technology staffing partner for banks, government, and tech multinationals."
  }
];

export const uaeJobPortals: JobPortal[] = [
  {
    name: "LinkedIn Jobs UAE",
    type: "Professional Network",
    url: "https://www.linkedin.com/jobs/",
    tagline: "The #1 platform for direct recruiter outreach, employee referrals, and alumni networking in Dubai.",
    badge: "Essential"
  },
  {
    name: "Indeed UAE",
    type: "Job Aggregator",
    url: "https://ae.indeed.com/",
    tagline: "Comprehensive job aggregator indexing thousands of roles across all UAE emirates daily.",
    badge: "High Volume"
  },
  {
    name: "GulfTalent",
    type: "Regional Career Portal",
    url: "https://www.gulftalent.com/",
    tagline: "Middle East focused recruitment engine with direct listings from top UAE conglomerates and banks.",
    badge: "GCC Focused"
  },
  {
    name: "NaukriGulf",
    type: "Regional Job Board",
    url: "https://www.naukrigulf.com/",
    tagline: "Widely used across the Gulf with strong coverage in IT, Engineering, Accounting, and Operations.",
    badge: "Regional"
  },
  {
    name: "Bayt.com UAE",
    type: "Middle East Job Engine",
    url: "https://www.bayt.com/en/uae/",
    tagline: "Pioneer job site in the MENA region with bilingual Arabic/English job search capabilities.",
    badge: "MENA Wide"
  },
  {
    name: "Oliv (Youth Internships)",
    type: "Early Career & Internships",
    url: "https://oliv.com/ae-en/",
    tagline: "Specifically designed for university students and fresh graduates seeking internships and first jobs in UAE.",
    badge: "Best for Students"
  },
  {
    name: "Edarabia Careers",
    type: "Education & Public Sector",
    url: "https://www.edarabia.com/jobs/uae/",
    tagline: "Prime directory for teaching, academic administration, university, and school vacancies in UAE.",
    badge: "Education"
  },
  {
    name: "Glassdoor UAE",
    type: "Jobs & Company Reviews",
    url: "https://www.glassdoor.com/",
    tagline: "Discover vacancies along with verified employee salaries, interview questions, and company culture reviews.",
    badge: "Salary Insights"
  },
  {
    name: "Monster Gulf",
    type: "Job Search Portal",
    url: "https://www.monster.com/",
    tagline: "International job engine with a dedicated Gulf section for experienced hires.",
    badge: "Global"
  },
  {
    name: "CatererGlobal",
    type: "Hospitality & Events",
    url: "https://www.catererglobal.com/",
    tagline: "Specialized recruitment board for luxury hospitality, events, hotels, and luxury tourism in Dubai.",
    badge: "Hospitality"
  }
];

export const defaultPresets: Record<TemplateType, { fullName: string; headline: string; sections: CVSection[] }> = {
  entry: {
    fullName: "Sarah Ahmed",
    headline: "Marketing & Communications Graduate | Murdoch University Dubai",
    sections: [
      {
        id: "summary",
        type: "text",
        title: "Summary / Introduction",
        visible: true,
        collapsed: false,
        text: "High-performing Marketing & Communications graduate at Murdoch University Dubai with strong competencies in SEO, content strategy, campaign analytics, and social media advertising. Demonstrated track record delivering 25%+ engagement growth across student leadership initiatives and agency internship projects in Dubai."
      },
      {
        id: "education",
        type: "education",
        title: "Education",
        visible: true,
        collapsed: false,
        showModules: true,
        showAwards: true,
        items: [
          {
            id: "edu_1",
            degree: "Bachelor of Business in Marketing & Communication",
            uni: "Murdoch University Dubai",
            location: "Dubai, UAE",
            dates: "2022 – 2025",
            grade: "First Class Honours (GPA 3.85 / 4.0)",
            modules: "Digital Marketing Strategy, Consumer Behavior, PR & Crisis Campaigns, Marketing Analytics",
            awards: "Academic Excellence Scholarship (Murdoch Dubai, 2022–2025)"
          }
        ]
      },
      {
        id: "primary",
        type: "experience",
        title: "Professional & Internship Experience",
        visible: true,
        collapsed: false,
        items: [
          {
            id: "exp_1",
            title: "Digital Marketing Intern",
            company: "Ogilvy Middle East",
            country: "Dubai, UAE",
            dates: "Jan 2024 – Jun 2024",
            bullets: [
              "Spearheaded regional social media campaigns across Instagram & LinkedIn, increasing organic reach by 28% and driving 4,500+ link clicks.",
              "Authored weekly audience attribution reports using Google Analytics 4 & Meta Business Suite to optimize creative assets and reduce CAC by 14%.",
              "Collaborated with cross-functional creative teams to design 30+ bilingual social posts and email newsletters with a 99.4% on-time delivery rate."
            ]
          },
          {
            id: "exp_2",
            title: "Student Ambassador & Content Lead",
            company: "Murdoch University Dubai",
            country: "Dubai, UAE",
            dates: "Sep 2023 – Present",
            bullets: [
              "Organized and hosted campus open days and orientation webinars for 500+ prospective international students.",
              "Produced engaging student spotlight video series generating 40,000+ views across official university TikTok and Instagram channels."
            ]
          }
        ]
      },
      {
        id: "projects",
        type: "projects",
        title: "Academic & Capstone Projects",
        visible: true,
        collapsed: false,
        items: [
          {
            id: "proj_1",
            title: "Go-To-Market Brand Strategy Capstone",
            dates: "2024",
            bullets: [
              "Designed an end-to-end launch plan for an eco-friendly consumer goods brand in the UAE retail market.",
              "Conducted primary quantitative market research surveying 450+ consumers to validate pricing architecture and target personas."
            ]
          }
        ]
      },
      {
        id: "certs",
        type: "cert_list",
        title: "Certificates & Professional Training",
        visible: true,
        collapsed: false,
        items: [
          { id: "c_1", title: "Google Analytics Individual Qualification (GA4 Certification)", dates: "2024" },
          { id: "c_2", title: "HubSpot Inbound Marketing & Content Strategy Certified", dates: "2023" },
          { id: "c_3", title: "Meta Certified Digital Marketing Associate", dates: "2024" }
        ]
      },
      {
        id: "skills",
        type: "tags",
        title: "Skills (Technical & Core)",
        visible: true,
        collapsed: false,
        tags: [
          "Search Engine Optimization (SEO)",
          "Google Analytics 4 (GA4)",
          "Meta Ads Manager",
          "Content Strategy & Copywriting",
          "Adobe Creative Suite (Photoshop, Illustrator)",
          "Canva Pro",
          "Email Marketing (Mailchimp)",
          "HubSpot CRM",
          "Brand Storytelling",
          "Market Research"
        ]
      },
      {
        id: "languages",
        type: "tags",
        title: "Languages",
        visible: true,
        collapsed: false,
        tags: ["English (Native / Bilingual)", "Arabic (Fluent)", "French (Conversational)"]
      },
      {
        id: "custom",
        type: "bullets",
        title: "Extracurricular & Leadership",
        visible: false,
        collapsed: false,
        bullets: [
          "President of Murdoch Dubai Business & Marketing Society (2023 - 2024)",
          "Volunteer Mentor for Junior Undergraduates in academic writing and presentation skills"
        ]
      }
    ]
  },
  chronological: {
    fullName: "David Chen",
    headline: "Cybersecurity Specialist | SOC Operations & Incident Response",
    sections: [
      {
        id: "summary",
        type: "text",
        title: "Professional Summary",
        visible: true,
        collapsed: false,
        text: "Results-driven Cybersecurity Specialist with 4+ years of hands-on experience across SOC operations, threat hunting, SIEM log analysis, and incident remediation. Proven track record safeguarding enterprise networks, automating alert triage protocols with Python, and ensuring 100% compliance with ISO 27001 and UAE NESA frameworks."
      },
      {
        id: "primary",
        type: "experience",
        title: "Professional Experience",
        visible: true,
        collapsed: false,
        items: [
          {
            id: "exp_1",
            title: "Senior SOC Analyst (Tier II)",
            company: "Emirates NBD",
            country: "Dubai, UAE",
            dates: "Mar 2022 – Present",
            bullets: [
              "Monitored and triaged 150+ daily SIEM (Splunk ES) security events, identifying and containing 12 critical ransomware and phishing attempts with zero data exfiltration.",
              "Engineered Python and Bash automation scripts for threat intelligence ingestion, reducing mean time to detect (MTTD) by 38%.",
              "Authored comprehensive post-incident root-cause analysis reports for CISO and senior risk leadership."
            ]
          },
          {
            id: "exp_2",
            title: "Cybersecurity Engineer",
            company: "Help AG Middle East",
            country: "Dubai, UAE",
            dates: "Jun 2020 – Feb 2022",
            bullets: [
              "Conducted network vulnerability assessments and penetration test remediations across 20+ enterprise banking and government client environments.",
              "Configured Palo Alto Next-Generation Firewalls and CrowdStrike Falcon EDR agents across 1,200+ enterprise endpoints."
            ]
          }
        ]
      },
      {
        id: "projects",
        type: "projects",
        title: "Key Projects & Infrastructure Initiatives",
        visible: true,
        collapsed: false,
        items: [
          {
            id: "proj_1",
            title: "Enterprise Zero-Trust Architecture Migration",
            dates: "2023",
            bullets: [
              "Co-led the migration of legacy perimeter defense into a zero-trust network model incorporating multi-factor authentication (MFA) and micro-segmentation."
            ]
          }
        ]
      },
      {
        id: "education",
        type: "education",
        title: "Education",
        visible: true,
        collapsed: false,
        showModules: true,
        showAwards: true,
        items: [
          {
            id: "edu_1",
            degree: "Master of Information Technology (Cybersecurity)",
            uni: "Murdoch University Dubai",
            location: "Dubai, UAE",
            dates: "2019 – 2020",
            grade: "High Distinction Average",
            modules: "Advanced Cryptography, Digital Forensics, Network Penetration Testing, Cloud Security",
            awards: "Top IT Postgraduate Achiever Award"
          },
          {
            id: "edu_2",
            degree: "Bachelor of Science in Computer Science",
            uni: "Murdoch University",
            location: "Perth / Dubai",
            dates: "2015 – 2018",
            grade: "Distinction",
            modules: "Data Structures & Algorithms, Operating Systems, Database Management Systems",
            awards: ""
          }
        ]
      },
      {
        id: "certs",
        type: "cert_list",
        title: "Certifications & Credentials",
        visible: true,
        collapsed: false,
        items: [
          { id: "c_1", title: "Certified Information Systems Security Professional (CISSP)", dates: "2023" },
          { id: "c_2", title: "CompTIA Security+ (SY0-601)", dates: "2020" },
          { id: "c_3", title: "Splunk Certified Enterprise Security Administrator", dates: "2022" },
          { id: "c_4", title: "AWS Certified Security - Specialty", dates: "2024" }
        ]
      },
      {
        id: "competencies",
        type: "bullets",
        title: "Core Technical Competencies",
        visible: true,
        collapsed: false,
        bullets: [
          "Threat Hunting & IOC Detection: Expert utilization of Splunk, Wireshark, and VirusTotal",
          "Vulnerability Management: Automated scanning with Nessus, Qualys, and Rapid7 Nexpose",
          "Incident Response: MITRE ATT&CK Framework alignment and digital forensics triage"
        ]
      },
      {
        id: "skills",
        type: "tags",
        title: "Technical Skills",
        visible: true,
        collapsed: false,
        tags: ["Python", "Bash", "Splunk ES", "CrowdStrike Falcon", "Wireshark", "Nessus", "Docker", "Linux (Ubuntu/RHEL)", "AWS Security", "SQL"]
      },
      {
        id: "languages",
        type: "tags",
        title: "Languages",
        visible: true,
        collapsed: false,
        tags: ["English (Fluent)", "Mandarin (Native)", "Arabic (Elementary)"]
      }
    ]
  },
  skills: {
    fullName: "Fatima Al-Farsi",
    headline: "UX/UI Designer & Front-End Developer | Murdoch University Dubai",
    sections: [
      {
        id: "summary",
        type: "text",
        title: "Summary / Introduction",
        visible: true,
        collapsed: false,
        text: "Detail-oriented creative technologist transitioning from visual design to full-stack user experience development. Adept at bridging aesthetic design systems (Figma, Design Tokens) and modern front-end code (React, TypeScript, Tailwind) to engineer accessible, high-converting digital products."
      },
      {
        id: "education",
        type: "education",
        title: "Education & Academic Credentials",
        visible: true,
        collapsed: false,
        showModules: true,
        showAwards: true,
        items: [
          {
            id: "edu_1",
            degree: "Bachelor of Information Technology in Computer Science",
            uni: "Murdoch University Dubai",
            location: "Dubai, UAE",
            dates: "2021 – 2024",
            grade: "First Class Honours (GPA 3.9 / 4.0)",
            modules: "Human-Computer Interaction (HCI), Web Application Development, Database Architecture, Agile Methodologies",
            awards: "Dean's Commendation for Academic Excellence"
          }
        ]
      },
      {
        id: "rel_skills",
        type: "competency_blocks",
        title: "Relevant Skills & Core Competencies",
        visible: true,
        collapsed: false,
        items: [
          {
            id: "comp_1",
            title: "User Experience (UX) Research & Interface (UI) Design",
            dates: "2022 – Present",
            bullets: [
              "Constructed 25+ responsive design systems, UI component kits, and clickable high-fidelity prototypes in Figma according to WCAG 2.1 accessibility guidelines.",
              "Conducted moderated usability testing and user interview sessions with 60+ participants to iteratively refine checkout conversion funnels."
            ]
          },
          {
            id: "comp_2",
            title: "Front-End Engineering & Web Development",
            dates: "2023 – Present",
            bullets: [
              "Built modular, performant single-page applications utilizing React, TypeScript, Tailwind CSS, and REST API integration.",
              "Optimized Core Web Vitals across client portals, achieving 98+ Google PageSpeed performance scores and sub-second load times."
            ]
          }
        ]
      },
      {
        id: "primary",
        type: "experience",
        title: "Experience (Freelance & Internships)",
        visible: true,
        collapsed: false,
        items: [
          {
            id: "exp_1",
            title: "Freelance UI/UX Designer & Web Developer",
            company: "Self-Employed",
            country: "Dubai, UAE",
            dates: "2022 – Present",
            bullets: [
              "Delivered comprehensive digital branding packages, wireframes, and responsive web apps for 15+ SME and startup clients across the GCC.",
              "Maintained a 100% on-time milestone delivery rate and 5.0/5.0 client satisfaction rating."
            ]
          }
        ]
      },
      {
        id: "projects",
        type: "projects",
        title: "Key Digital Projects",
        visible: true,
        collapsed: false,
        items: [
          {
            id: "proj_1",
            title: "Fintech Mobile Wallet UX Redesign",
            dates: "2024",
            bullets: [
              "Re-engineered micro-interaction flow for peer-to-peer payments, decreasing multi-step task completion time by 32% in A/B testing."
            ]
          }
        ]
      },
      {
        id: "certs",
        type: "cert_list",
        title: "Courses & Professional Certifications",
        visible: true,
        collapsed: false,
        items: [
          { id: "c_1", title: "Google UX Design Professional Certificate", dates: "2023" },
          { id: "c_2", title: "Meta Front-End Developer Professional Certificate", dates: "2024" }
        ]
      },
      {
        id: "skills",
        type: "tags",
        title: "Technical & Tool Proficiency",
        visible: true,
        collapsed: false,
        tags: ["Figma", "React.js", "TypeScript", "Tailwind CSS", "HTML5/CSS3", "Git/GitHub", "Adobe XD", "Wireframing", "Usability Testing", "Design Systems"]
      },
      {
        id: "languages",
        type: "tags",
        title: "Languages",
        visible: true,
        collapsed: false,
        tags: ["Arabic (Native)", "English (Fluent Bilingual)"]
      }
    ]
  }
};
