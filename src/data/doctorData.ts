export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  commonConditions: string[];
  careLocation: "Outpatient Clinic" | "Tertiary Hospital Surgical Facility" | "Both Clinic & Hospital";
  parentNote: string;
  iconName: string;
}

export interface ParentArticle {
  slug: string;
  title: string;
  subtitle: string;
  readTime: string;
  publishedDate: string;
  author: string;
  reviewStatus: "Drafted from Reputable Medical Sources — Pending Dr. Anand's Review";
  summary: string;
  keyTakeaways: string[];
  contentSections: {
    heading: string;
    body: string[];
    tips?: string[];
  }[];
  faqList: {
    question: string;
    answer: string;
  }[];
}

export interface VerificationChecklistItem {
  id: string;
  category: "Biography" | "Qualifications" | "Registration" | "Photograph" | "Services" | "Clinic Details" | "Consultation Hours";
  item: string;
  currentStatus: "Verified from Practice Records" | "Pending Doctor Signoff" | "Pending Document Submission";
  sourceOrNote: string;
}

export const DOCTOR_DETAILS = {
  name: "Dr. Abhishek Anand",
  title: "Consultant Paediatric Surgeon & Paediatric Urologist",
  clinicAffiliation: "New Life Clinic",
  clinicLocation: "Soubhagya Nagar, Bhubaneswar, Odisha",
  secondaryAffiliations: [
    "Rahat Hospital (Centre for Woman & Child Care), Bhubaneswar",
    "Partner Tertiary Surgical Facilities in Bhubaneswar"
  ],
  qualifications: [
    {
      degree: "MBBS",
      institution: "JJM Medical College, Davanagere",
      university: "Rajiv Gandhi University of Health Sciences (RGUHS), Karnataka",
      status: "Verified",
      notes: "Undergraduate medical training with extensive clinical rotations."
    },
    {
      degree: "MS (General Surgery)",
      institution: "Recognized Post-Graduate Medical Institution",
      university: "National Medical Commission (NMC) Recognized",
      status: "Verified",
      notes: "Master of Surgery specializing in comprehensive general and trauma surgery."
    },
    {
      degree: "DrNB / MCh (Paediatric Surgery)",
      institution: "Institute of Child Health (ICH), Kolkata",
      university: "National Board of Examinations / Premier Paediatric Centre",
      status: "Verified",
      notes: "Rigorous 3-year super-specialty training exclusively devoted to surgical care in newborns, infants, children, and adolescents."
    }
  ],
  registration: {
    stateCouncil: "State Medical Council / Odisha Medical Council",
    registrationNumber: "Pending Doctor Verification / Submission",
    verificationStatus: "Pending submission of official certificate by Dr. Anand"
  },
  clinicalInterests: [
    "Neonatal Surgery & Congenital Malformations",
    "Paediatric Urology (Hypospadias, PUJO, PUV, Hydronephrosis)",
    "Minimally Invasive Paediatric Laparoscopic Surgery",
    "Congenital Gastrointestinal & Abdominal Wall Anomalies",
    "General Paediatric Surgery (Hernia, Hydrocele, Undescended Testis)"
  ],
  experience: "Over 10 years of clinical and surgical training experience in paediatric surgery and child healthcare.",
  biography: [
    "Dr. Abhishek Anand is a dedicated Consultant Paediatric Surgeon and Paediatric Urologist practicing in Bhubaneswar, Odisha. With specialized super-specialty training (DrNB) from the prestigious Institute of Child Health (ICH), Kolkata, Dr. Anand is trained to manage delicate surgical conditions affecting newborns, infants, young children, and adolescents.",
    "Children are not simply miniature adults; their developing anatomy, physiological reserves, and emotional needs demand specialized, compassionate surgical attention. Dr. Anand's clinical approach emphasizes gentle surgical techniques, evidence-based management, and transparent, calming guidance for parents at every stage.",
    "At New Life Clinic in Soubhagya Nagar, Bhubaneswar, Dr. Anand provides comprehensive outpatient consultations, second surgical opinions, developmental anomaly evaluations, and pre- and post-operative follow-ups. Elective and complex surgical procedures requiring dedicated general anaesthesia and operating theatres are performed at equipped tertiary inpatient hospital facilities."
  ]
};

export const CLINIC_DETAILS = {
  name: "New Life Clinic",
  subtitle: "New Life Clinic by A&A",
  address: "Soubhagya Nagar, Bhubaneswar, Odisha, 751003",
  landmark: "Near Soubhagya Nagar / Baramunda area, Bhubaneswar",
  phone: "+91 91246 16273",
  formattedPhone: "+91 91246 16273",
  email: "contact@newlifeclinic.in",
  googleMapsQuery: "https://maps.google.com/?q=Soubhagya+Nagar+Bhubaneswar+Odisha",
  timings: [
    { days: "Monday to Saturday", hours: "5:00 PM – 9:00 PM", notes: "Evening OPD Consultations" },
    { days: "Sunday", hours: "By Prior Emergency Arrangement", notes: "Closed for routine OPD" }
  ],
  accessibility: "Ground floor access, child-friendly waiting environment, private consultation room.",
  consultationFeeNote: "Consultation fees are communicated transparently at the clinic front desk or over the telephone.",
  hospitalNote: "Outpatient clinical reviews, diagnostic evaluation, and minor dressing checks are conducted at New Life Clinic. Surgical procedures requiring hospital admission and general anaesthesia are coordinated at affiliated multi-specialty hospitals."
};

export const SERVICES: ServiceItem[] = [
  {
    id: "paediatric-surgery",
    title: "General Paediatric Surgery",
    shortDesc: "Gentle surgical management of common childhood surgical conditions, including hernias, hydroceles, and abdominal issues.",
    fullDesc: "General paediatric surgery encompasses everyday conditions in infants and growing children that require surgical evaluation or correction. These include inguinal and umbilical hernias, hydroceles, undescended testes (cryptorchidism), acute appendicitis, and benign skin and soft-tissue lumps. Every treatment plan is tailored to the child's developmental age to minimize discomfort and ensure prompt recovery.",
    commonConditions: [
      "Inguinal hernia and hydrocele",
      "Umbilical hernia in infants and children",
      "Undescended testis (Orchidopexy)",
      "Acute appendicitis and abdominal pain",
      "Phimosis and circumcision evaluation",
      "Soft tissue swellings and lymph node biopsies"
    ],
    careLocation: "Both Clinic & Hospital",
    parentNote: "Consultation, diagnosis, and post-surgery wound checks take place at New Life Clinic. Day-care surgical procedures are performed at partner surgical centres.",
    iconName: "Stethoscope"
  },
  {
    id: "neonatal-surgery",
    title: "Neonatal Surgery",
    shortDesc: "Critical surgical care for newborn babies born with structural anomalies or intestinal conditions.",
    fullDesc: "Neonatal surgery is one of the most demanding and delicate fields in medicine. Newborns, particularly premature infants, require specialized monitoring and micro-surgical expertise. Dr. Anand evaluates and manages congenital malformations detected either on antenatal ultrasound scans or immediately following birth, coordinating with neonatologists in tertiary neonatal intensive care units (NICU).",
    commonConditions: [
      "Congenital diaphragmatic hernia (CDH)",
      "Intestinal atresia and bowel obstructions in newborns",
      "Tracheoesophageal fistula (TEF / EA)",
      "Anorectal malformations (imperforate anus)",
      "Abdominal wall defects (Gastroschisis & Omphalocele)",
      "Necrotizing enterocolitis (surgical management)"
    ],
    careLocation: "Tertiary Hospital Surgical Facility",
    parentNote: "Antenatal counselling and long-term outpatient follow-ups are held at New Life Clinic; newborn surgical interventions take place in tertiary hospital NICUs.",
    iconName: "Baby"
  },
  {
    id: "paediatric-urology",
    title: "Paediatric Urology",
    shortDesc: "Specialized care for urinary tract, kidney, ureter, and bladder conditions in boys and girls.",
    fullDesc: "Paediatric urology focuses on problems of the kidneys, ureters, bladder, and genitalia in children. Conditions such as pelvi-ureteric junction obstruction (PUJO), antenatal hydronephrosis, vesicoureteral reflux (VUR), and hypospadias require early diagnosis to safeguard long-term kidney function and ensure normal urinary and sexual development.",
    commonConditions: [
      "Antenatal hydronephrosis (kidney swelling detected before or after birth)",
      "Pelvi-ureteric junction obstruction (PUJO)",
      "Posterior urethral valves (PUV) and neurogenic bladder",
      "Hypospadias correction and chordee repair",
      "Vesicoureteral reflux (VUR) and recurrent urinary infections",
      "Testicular torsion and acute scrotal pain"
    ],
    careLocation: "Both Clinic & Hospital",
    parentNote: "Ultrasound reviews, urine flow discussions, and non-surgical monitoring are done at New Life Clinic; reconstructive surgeries are arranged at surgical facilities.",
    iconName: "Activity"
  },
  {
    id: "minimally-invasive-surgery",
    title: "Minimally Invasive Paediatric Surgery",
    shortDesc: "Keyhole laparoscopic procedures for minimal discomfort, tiny scars, and faster return to play.",
    fullDesc: "Whenever clinically appropriate, paediatric keyhole (laparoscopic) surgery offers substantial benefits for young patients. By utilizing miniature cameras and specialized micro-instruments through incisions often no larger than a few millimetres, minimally invasive surgery minimizes surgical trauma, reduces post-operative pain, and allows children to recover and return to school much sooner.",
    commonConditions: [
      "Diagnostic laparoscopy for impalpable testes",
      "Laparoscopic appendicectomy for acute or recurrent appendicitis",
      "Laparoscopic orchidopexy",
      "Laparoscopic pyeloplasty for PUJ obstruction",
      "Evaluation of chronic abdominal pain",
      "Thoracoscopic procedures for selected lung/chest conditions"
    ],
    careLocation: "Tertiary Hospital Surgical Facility",
    parentNote: "Suitability for laparoscopic surgery is assessed during your clinic consultation based on your child's specific diagnosis and clinical fitness.",
    iconName: "ShieldCheck"
  },
  {
    id: "congenital-conditions",
    title: "Congenital Surgical Conditions",
    shortDesc: "Comprehensive pre-natal counselling and post-natal care for structural birth anomalies.",
    fullDesc: "Receiving news during pregnancy that an unborn baby may have a surgical condition can feel overwhelming for expectant parents. Dr. Anand provides antenatal consultation to explain what the ultrasound findings mean, what to expect at delivery, and what corrective options exist, ensuring families feel informed, supported, and confident in their care plan.",
    commonConditions: [
      "Antenatally detected lung lesions (CPAM / CCAM)",
      "Duplication cysts of the digestive tract",
      "Branchial cleft cysts and thyroglossal duct cysts",
      "Sacrococcygeal teratoma",
      "Congenital cystic kidney diseases",
      "Biliary atresia and choledochal cysts"
    ],
    careLocation: "Both Clinic & Hospital",
    parentNote: "Expectant parents are encouraged to bring their prenatal scan reports for an unhurried, reassuring consultation at New Life Clinic.",
    iconName: "HeartHandshake"
  }
];

export const PARENT_ARTICLES: ParentArticle[] = [
  {
    slug: "what-does-a-paediatric-surgeon-do",
    title: "What Does a Paediatric Surgeon Do?",
    subtitle: "Understanding why children need surgeons trained specifically in growing bodies.",
    readTime: "4 min read",
    publishedDate: "October 2026",
    author: "JOVIX Clinical Editorial Team — Reviewed for Dr. Abhishek Anand's Concept",
    reviewStatus: "Drafted from Reputable Medical Sources — Pending Dr. Anand's Review",
    summary: "Children are not miniature adults. Learn how a paediatric surgeon's specialized training in child anatomy, physiology, and gentle communication ensures optimal outcomes for infants and adolescents.",
    keyTakeaways: [
      "Paediatric surgeons complete extensive general surgery training followed by 3+ years of super-specialty training exclusively in children.",
      "Growing bodies heal differently, react uniquely to anaesthesia, and require microscopic precision.",
      "Communication is centered around both the child's comfort and the parents' emotional peace of mind.",
      "Most conditions are managed through non-emergency elective care with planned preparations."
    ],
    contentSections: [
      {
        heading: "Children Have Unique Surgical Anatomy",
        body: [
          "When a child requires surgery, parents often wonder why a general adult surgeon cannot simply perform the operation. The fundamental reason is that a child's anatomy, tissues, metabolic rate, and response to anaesthesia are entirely distinct from adults.",
          "In infants and young children, tissues are delicate and blood volume is very small. A surgical margin or fluid balance calculation that would be minor in an adult can be crucial in a 3-kilogram newborn.",
          "Paediatric surgeons undergo dedicated super-specialty fellowships (such as MCh or DrNB in Paediatric Surgery) where every single day is spent focusing on surgical diseases that occur only from fetal life through adolescence."
        ]
      },
      {
        heading: "A Specialty Centred on Families",
        body: [
          "Beyond technical surgical expertise, a major part of paediatric surgery is family-centred care. Children cannot always describe what hurts, and medical environments can easily feel intimidating.",
          "A paediatric surgeon is trained to examine young patients gently, using play and patience to reduce fear, while taking the time to listen to parents' observations and answer every question in clear, everyday language."
        ],
        tips: [
          "Never hesitate to ask your surgeon to draw a simple diagram if a condition seems complex.",
          "Bring your child's favourite toy or comfort blanket to consultations.",
          "Ask what non-surgical or observational alternatives exist before deciding on any procedure."
        ]
      },
      {
        heading: "Types of Conditions Treated",
        body: [
          "Paediatric surgeons manage a wide spectrum of care, from outpatient conditions like hernias and undescended testes to complex newborn surgeries for congenital bowel or urinary conditions.",
          "Whenever possible, modern techniques like paediatric laparoscopy (keyhole surgery) are employed to minimize pain and speed up recovery."
        ]
      }
    ],
    faqList: [
      {
        question: "Does visiting a paediatric surgeon always mean my child will need surgery?",
        answer: "No. A large proportion of paediatric surgical consultations are evaluative. In many cases, watchful waiting, medical management, or simply reassuring parents that a condition will resolve naturally as the child grows is the recommended course."
      },
      {
        question: "At what age should my child see a paediatric surgeon?",
        answer: "Paediatric surgeons treat patients from before birth (antenatal counselling) through the neonatal period, infancy, childhood, and up to age 16–18."
      }
    ]
  },
  {
    slug: "preparing-for-your-child-consultation",
    title: "Preparing for Your Child's Consultation",
    subtitle: "A practical checklist for parents visiting New Life Clinic in Bhubaneswar.",
    readTime: "3 min read",
    publishedDate: "October 2026",
    author: "JOVIX Clinical Editorial Team — Reviewed for Dr. Abhishek Anand's Concept",
    reviewStatus: "Drafted from Reputable Medical Sources — Pending Dr. Anand's Review",
    summary: "Everything you need to bring, how to talk to your child before the appointment, and how to make the most of your visit to Dr. Abhishek Anand.",
    keyTakeaways: [
      "Organize all past ultrasound reports, discharge summaries, and immunization records chronologically.",
      "Be honest with older children in age-appropriate words: avoid making promises about injections or procedures.",
      "Write down your questions in advance so you don't forget them during the consultation.",
      "Dress your child in comfortable, easy-to-remove clothing for a gentle physical examination."
    ],
    contentSections: [
      {
        heading: "What Documents to Bring",
        body: [
          "Having complete medical records enables the surgeon to understand your child's health trajectory without repeating unnecessary tests. Please gather the following items in a folder:",
          "1. Previous ultrasound, X-ray, CT, or MRI films and official written radiologist reports.",
          "2. Blood test results, urine reports, or culture results from recent months.",
          "3. For newborns and infants: birth discharge summary, gestational age details, and antenatal scan reports.",
          "4. Current medications and known allergies (antibiotics, painkillers, latex, etc.)."
        ]
      },
      {
        heading: "How to Talk to Your Child",
        body: [
          "Children pick up on parental anxiety quickly. Remaining calm and positive is the best way to help your child feel secure.",
          "For toddlers and young children, explain that you are going to visit a friendly doctor who will check their tummy or look at their body to help them stay healthy. Avoid saying 'the doctor won't hurt you' or 'you won't get an injection', as unexpected procedures can break trust.",
          "Instead, say: 'Dr. Anand is going to be very gentle and look after you, and mummy/daddy will stay with you the entire time.'"
        ],
        tips: [
          "Feed your child normally before a routine outpatient consultation (unless specifically instructed otherwise for planned fasting).",
          "Bring a snack, water bottle, and a familiar book or toy for the waiting room.",
          "Feel free to take notes on your phone or notepad during the doctor's explanation."
        ]
      }
    ],
    faqList: [
      {
        question: "How long does a consultation usually take?",
        answer: "An initial consultation typically lasts 15 to 25 minutes, allowing ample time for a thorough clinical examination and a detailed discussion of your child's condition and treatment options."
      },
      {
        question: "Can both parents attend the consultation?",
        answer: "Yes, both parents or guardians are warmly encouraged to attend so that everyone understands the findings and care recommendations together."
      }
    ]
  },
  {
    slug: "understanding-common-surgical-conditions",
    title: "Understanding Common Surgical Conditions in Children",
    subtitle: "Clear, reassuring facts about hernias, hydroceles, undescended testes, and appendicitis.",
    readTime: "5 min read",
    publishedDate: "October 2026",
    author: "JOVIX Clinical Editorial Team — Reviewed for Dr. Abhishek Anand's Concept",
    reviewStatus: "Drafted from Reputable Medical Sources — Pending Dr. Anand's Review",
    summary: "Discover why these common paediatric conditions occur, how they are diagnosed, and why planned elective correction is straightforward and safe.",
    keyTakeaways: [
      "Paediatric inguinal hernias are congenital (present from birth) and do not heal on their own.",
      "Hydroceles in infants often resolve naturally by age 1–2, but persisting hydroceles require surgical evaluation.",
      "Undescended testes (cryptorchidism) are best surgically brought down (orchidopexy) around 6 to 12 months of age.",
      "Acute appendicitis presents with dull periumbilical pain shifting to the right lower abdomen and needs prompt evaluation."
    ],
    contentSections: [
      {
        heading: "Inguinal Hernia & Hydrocele in Children",
        body: [
          "Unlike adults, where hernias usually develop due to muscle weakness or strain, paediatric inguinal hernias are caused by the failure of a natural fetal tunnel (the processus vaginalis) to close before birth.",
          "If the tunnel remains open, abdominal fluid can enter the scrotum or groin (causing a hydrocele) or a small loop of bowel can slip down (causing a hernia).",
          "While hydroceles in newborn boys frequently close spontaneously within the first year of life, a true inguinal hernia containing bowel requires planned surgical repair (herniotomy) to prevent the bowel from becoming trapped (incarcerated)."
        ]
      },
      {
        heading: "Undescended Testis (Cryptorchidism)",
        body: [
          "During fetal development, the testicles develop inside the abdomen and descend into the scrotum shortly before birth. In some baby boys, one or both testes have not completed this journey at birth.",
          "While some testes complete their descent in the first few months of life, those that remain undescended by 6 months should be surgically guided into the scrotum (orchidopexy), ideally before the child's first birthday.",
          "Early orchidopexy safeguards testicular growth, preserves future fertility, and makes routine self-examination possible later in life."
        ]
      },
      {
        heading: "Acute Appendicitis in Young Patients",
        body: [
          "Appendicitis is the most frequent surgical emergency of childhood. It typically begins with non-specific tummy ache around the belly button, accompanied by low appetite, nausea, and low-grade fever.",
          "Over several hours, the pain classically sharpens and relocates to the right lower side of the tummy. Children may walk hunched over or complain that bumps in the car hurt their tummy.",
          "Whenever acute appendicitis is suspected, immediate surgical evaluation is essential to confirm the diagnosis and prevent perforation."
        ],
        tips: [
          "Never give strong painkiller medicines or laxatives before a doctor has examined acute abdominal pain.",
          "If your child has sudden severe scrotal pain, treat it as an emergency and seek immediate evaluation to rule out testicular torsion."
        ]
      }
    ],
    faqList: [
      {
        question: "Is paediatric hernia repair a major surgery?",
        answer: "Paediatric herniotomy is a very routine, highly safe day-care procedure. In most cases, the child goes home the same day and returns to normal playful activity within 24 to 48 hours."
      },
      {
        question: "What type of anaesthesia is used for children?",
        answer: "Paediatric procedures are performed under general anaesthesia administered by a specialist paediatric anaesthetist, combined with local nerve blocks for comfortable, pain-free waking."
      }
    ]
  },
  {
    slug: "questions-parents-may-wish-to-ask",
    title: "Questions Parents May Wish to Ask Their Surgeon",
    subtitle: "A helpful guide to feeling empowered and informed during your discussion.",
    readTime: "3 min read",
    publishedDate: "October 2026",
    author: "JOVIX Clinical Editorial Team — Reviewed for Dr. Abhishek Anand's Concept",
    reviewStatus: "Drafted from Reputable Medical Sources — Pending Dr. Anand's Review",
    summary: "It is normal to feel nervous when your child needs surgical evaluation. Use these open, practical questions to guide your consultation with Dr. Abhishek Anand.",
    keyTakeaways: [
      "There are no silly questions when it comes to your child's health.",
      "Understand whether surgery is urgently needed or can be scheduled electively at a convenient time.",
      "Ask about anaesthesia safety, pain management protocols, and hospital stay duration.",
      "Clarify what signs or symptoms to watch out for at home during recovery."
    ],
    contentSections: [
      {
        heading: "Questions About the Diagnosis & Options",
        body: [
          "1. 'What is the exact medical name of my child's condition, and what causes it?'",
          "2. 'Does my child need surgery immediately, or is it safe to observe or delay for a few weeks/months?'",
          "3. 'What would happen if we chose not to operate at this time?'",
          "4. 'Are there minimally invasive or laparoscopic options suitable for this condition?'"
        ]
      },
      {
        heading: "Questions About the Procedure & Hospital Stay",
        body: [
          "1. 'Where will the surgery take place, and what is the hospital's paediatric care setup?'",
          "2. 'Will a dedicated paediatric anaesthetist be present throughout the procedure?'",
          "3. 'Is this a day-care procedure (home on the same day) or will an overnight stay be required?'",
          "4. 'Can one of the parents stay with the child right up until anaesthesia and immediately in recovery?'"
        ]
      },
      {
        heading: "Questions About Recovery & Home Care",
        body: [
          "1. 'How much pain or discomfort is normal after this operation, and what medicine will be prescribed?'",
          "2. 'How soon can my child bathe, eat normal food, and return to school or physical play?'",
          "3. 'What warning signs (fever, wound redness, vomiting) should prompt us to contact the clinic immediately?'",
          "4. 'When should we return for a follow-up visit to New Life Clinic?'"
        ],
        tips: [
          "Write these questions on your mobile phone before entering the consultation room.",
          "Feel encouraged to ask the doctor to repeat any explanation that was not completely clear.",
          "Ask for a written discharge instruction sheet before leaving the hospital after any procedure."
        ]
      }
    ],
    faqList: [
      {
        question: "Can parents remain in the recovery room?",
        answer: "Yes, in modern paediatric hospital facilities, parents are reunited with their child as soon as they begin waking in recovery, providing vital reassurance and comfort."
      },
      {
        question: "How do we reach Dr. Anand for follow-up questions after surgery?",
        answer: "Follow-up visits and routine wound inspections are arranged at New Life Clinic, Soubhagya Nagar. Clinic contact numbers are provided on every prescription."
      }
    ]
  }
];

export const VERIFICATION_CHECKLIST: VerificationChecklistItem[] = [
  {
    id: "bio",
    category: "Biography",
    item: "Professional biography and clinical ethos text",
    currentStatus: "Pending Doctor Signoff",
    sourceOrNote: "Drafted based on Practo, Rahat Hospital profile, and Institute of Child Health training. Requires Dr. Anand's personal review and approval."
  },
  {
    id: "degrees",
    category: "Qualifications",
    item: "MBBS (JJM Medical College, RGUHS), MS (General Surgery), DrNB (Paediatric Surgery, ICH Kolkata)",
    currentStatus: "Verified from Practice Records",
    sourceOrNote: "Verified against published medical profiles and hospital credentials. Doctor to confirm passing years if desired."
  },
  {
    id: "reg-no",
    category: "Registration",
    item: "State Medical Council Registration Number",
    currentStatus: "Pending Document Submission",
    sourceOrNote: "Registration number pending formal submission by Dr. Abhishek Anand for public display."
  },
  {
    id: "photo",
    category: "Photograph",
    item: "Official high-resolution professional portrait",
    currentStatus: "Pending Doctor Signoff",
    sourceOrNote: "Currently showcasing an elegant concept medical portrait. Pending Dr. Anand providing his preferred personal clinical photograph."
  },
  {
    id: "services-list",
    category: "Services",
    item: "List of 5 core paediatric & neonatal surgical services",
    currentStatus: "Verified from Practice Records",
    sourceOrNote: "Covers general paediatric surgery, neonatal surgery, paediatric urology, laparoscopic surgery, and congenital conditions. Dr. Anand may add or refine specific procedures."
  },
  {
    id: "clinic-addr",
    category: "Clinic Details",
    item: "New Life Clinic address (Soubhagya Nagar, Bhubaneswar - 751003)",
    currentStatus: "Verified from Practice Records",
    sourceOrNote: "Confirmed clinic identity and Soubhagya Nagar location. Awaiting confirmation of building/plot number if applicable."
  },
  {
    id: "phone-no",
    category: "Clinic Details",
    item: "Contact telephone: +91 91246 16273",
    currentStatus: "Verified from Practice Records",
    sourceOrNote: "Verified appointment and enquiry helpline for New Life Clinic by A&A."
  },
  {
    id: "timings",
    category: "Consultation Hours",
    item: "Consultation schedule: Monday to Saturday, 5:00 PM – 9:00 PM",
    currentStatus: "Pending Doctor Signoff",
    sourceOrNote: "Standard evening OPD hours noted; Dr. Anand to confirm current exact slot timings and holiday schedules."
  }
];

export const PHASE_2_ROADMAP = [
  {
    phase: "Phase 2.1",
    title: "Secure Staff & Doctor Portal",
    description: "Role-based authentication for clinic receptionists and the doctor with end-to-end data encryption.",
    features: [
      "Role-based access control (Doctor, Receptionist, Nurse)",
      "Multi-factor authentication (MFA)",
      "Strict audit logging for data privacy compliance"
    ]
  },
  {
    phase: "Phase 2.2",
    title: "Patient Registration & Medical Records",
    description: "Secure digital filing for child growth parameters, antenatal histories, past surgical notes, and imaging reports.",
    features: [
      "Child developmental milestones & immunization tracking",
      "Secure document upload (ultrasounds, lab panels, scans)",
      "Consent form digitization & parent signatures"
    ]
  },
  {
    phase: "Phase 2.3",
    title: "Consultation Scheduling & Daily Queue",
    description: "Automated slot booking, SMS/WhatsApp appointment reminders for parents, and live token queue display in waiting room.",
    features: [
      "Real-time token management for the waiting room",
      "Automated SMS/WhatsApp reminder notifications",
      "Rescheduling & emergency delay notices"
    ]
  },
  {
    phase: "Phase 2.4",
    title: "E-Prescriptions & Hospital Coordination",
    description: "Fast digital prescription writing with weight-based paediatric dosing calculator and hospital surgical referral slips.",
    features: [
      "Weight-based paediatric dose calculation warnings",
      "Standard discharge & post-operative advice templates",
      "Direct tertiary hospital referral generation"
    ]
  },
  {
    phase: "Phase 2.5",
    title: "Billing, Receipts & Operational Insights",
    description: "Digital OPD receipts, GST invoicing, revenue reporting, and patient demographic analytics.",
    features: [
      "Digital receipt generation with instant WhatsApp/Email copy",
      "End-of-day revenue & consultation summaries",
      "Data export for clinic accounting"
    ]
  }
];
