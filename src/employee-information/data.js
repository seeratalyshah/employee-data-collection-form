export const radioOptions = [
  {
    label: "1",
    value: "1",
  },
  {
    label: "2",
    value: "2",
  },
  {
    label: "3",
    value: "3",
  },
  {
    label: "4",
    value: "4",
  },
  {
    label: "5",
    value: "5",
  },
];

export const skillCategories = [
  {
    id: 1,
    category: "Digital & IT Skills",
    skills: [
      { name: "Data Analysis (Excel, Power BI, etc.)", value: "1" },
      { name: "GIS Mapping", value: "2" },
      { name: "Software Development", value: "3" },
      { name: "Website & App Development", value: "4" },
      { name: "AI & Machine Learning", value: "5" },
    ],
  },
  {
    id: 2,
    category: "Research & Writing",
    skills: [
      { name: "Proposal Writing", value: "6" },
      { name: "Policy Analysis", value: "7" },
      { name: "Survey & Report Writing", value: "8" },
    ],
  },
  {
    id: 3,
    category: "Leadership & Management",
    skills: [
      { name: "People Management", value: "9" },
      { name: "Public Speaking & Training", value: "10" },
    ],
  },
  {
    id: 4,
    category: "Financial & Business",
    skills: [{ name: "Budgeting & Financial Modelling", value: "11" }],
  },
];

export const documents = [
  { id: 1, label: "Updated CV" },
  { id: 2, label: "Passport / National ID Copy" },
  { id: 3, label: "DBS / Police Clearance Certificate" },
  { id: 4, label: "Work Permit / Visa (if applicable)" },
  { id: 5, label: "Education Certificates & Degrees" },
  { id: 6, label: "Signed Employment Contract" },
  { id: 7, label: "Professional Certifications (if any)" },
];

export const areasOfExperties = [
  {
    id: 1,
    label: "Livelihood & Economic Development",
  },
  {
    id: 2,
    label: "Education & Training",
  },
  {
    id: 3,
    label: "IT & Digital Solutions",
  },
  {
    id: 4,
    label: "Research & Data Analysis",
  },
  {
    id: 5,
    label: "Climate Change & Environmental Management",
  },
  {
    id: 6,
    label: "Renewable Energy (Solar, Wind, etc.)",
  },
  {
    id: 7,
    label: "Water, Sanitation & Hygiene (WASH)",
  },
  {
    id: 8,
    label: "Disaster Management & Emergency Response",
  },
  {
    id: 9,
    label: "Gender & Social Inclusion",
  },
  {
    id: 10,
    label: "Monitoring, Evaluation, Accountability & Learning (MEAL)",
  },
  {
    id: 11,
    label: "Supply Chain & Logistics",
  },
  {
    id: 12,
    label: "Policy Development & Advocacy",
  },
  {
    id: 13,
    label: "Project Management & Fundraising",
  },
  {
    id: 14,
    label: "Finance & Auditing",
  },
  {
    id: 15,
    label: "Healthcare & Nutrition",
  },
  {
    id: 16,
    label: "Agricultural Development",
  },
  {
    id: 17,
    label: "Microfinance & Entrepreneurship",
  },
  {
    id: 18,
    label: "Mental Health & Psychosocial Support",
  },
];

export const countries = [
  { value: 1, label: "Afghanistan", code: "AF", status: "1" },
  { value: 2, label: "Bangladesh", code: "BD", status: "1" },
  { value: 3, label: "Gambia", code: "GM", status: "1" },
  { value: 4, label: "Gaza Palestine", code: "GZ", status: "1" },
  { value: 5, label: "Indonesia", code: "ID", status: "1" },
  { value: 6, label: "Malawi", code: "MW", status: "1" },
  { value: 7, label: "Mauritania", code: "MR", status: "1" },
  { value: 8, label: "Albania", code: "AL", status: "1" },
  { value: 9, label: "Niger", code: "NE", status: "1" },
  { value: 10, label: "Pakistan", code: "PK", status: "1" },
  { value: 11, label: "Senegal", code: "SN", status: "1" },
  { value: 12, label: "Somalia", code: "SO", status: "1" },
  { value: 13, label: "Sri Lanka", code: "LK", status: "1" },
  { value: 14, label: "Sudan", code: "SD", status: "1" },
  { value: 15, label: "Turkey/Syria", code: "TR", status: "1" },
  { value: 16, label: "Yemen", code: "YE", status: "1" },
  { value: 17, label: "Mali", code: "ML", status: "1" },
  { value: 18, label: "Mexico", code: "MX", status: "1" },
  { value: 19, label: "Haiti", code: "HT", status: "1" },
  { value: 20, label: "United Kingdom", code: "GB", status: "1" },
  { value: 21, label: "South Africa", code: "ZA", status: "0" },
  { value: 22, label: "India", code: "IN", status: "1" },
  { value: 23, label: "Nigeria", code: "NG", status: "1" },
  { value: 24, label: "Tanzania", code: "TZ", status: "1" },
  { value: 25, label: "Uganda", code: "UG", status: "1" },
  { value: 26, label: "France", code: "FR", status: "0" },
  { value: 27, label: "Canada", code: "CA", status: "0" },
  { value: 28, label: "Morocco", code: "MA", status: "1" },
  { value: 29, label: "Jerusalem", code: "IL", status: "1" },
  { value: 30, label: "Lebanon", code: "LB", status: "1" },
  { value: 31, label: "Syria", code: "SY", status: "1" },
  { value: 32, label: "Rwanda", code: "RW", status: "1" },
  { value: 33, label: "Kashmir India", code: "JK", status: "1" },
  { value: 34, label: "Mirpur Pakistan", code: "AJK", status: "1" },
];

export const years = Array.from({ length: 25 }, (_, i) => {
  const year = 1900 + i;
  return { value: year, label: `${year}` };
});

export const stepFields = [
    [
    "profilePic",
    "fullName",
    "preferedName",
    "dateOfBirth",
    "gender",
    "nationalID",
    "IDExpiryDate",
    "passportNumber",
    "passportExpiryDate",
    "nationality",
    "maritalStatus",
    "countryofIssue",
    "currentAddress",
    "permanentAddress",
    "mobileNumber",
    "whatsAppNumber",
    "personalEmail",
    "officialEmail",
    ],
    [
    "jobTitle",
    "departmentName",
    "dateOfJoining",
    "employeeType",
    "workCountry",
    "workOffice",
    "employeeID",
    "contractExpiryDate",
    "superVisorsName",
    "supervisorsDesignation",
    ],
    ["qualifications"],
    ["workExperiences"],
    ["skills", "anyResearchProjects", "anyArticles", "researchAreas", "links"],
    ["contactName", "relationship", "emergencyMobileNumber", "alternateNumber", "emailAddress", "emergencyPermanentAddress"],
    ["bankName", "branch", "accountTitle", "accountNumber", "bankAddress"],
    ["langaugeSpoken", "specialSkills", "anyMedicalConditions"],
    ["documents", "attachments"],
    ["signature"],
  ];

  export const labels = [
    "Personal",
    "Employment",
    "Qualifications",
    "Experience",
    "Skills",
    "Emergency",
    "Banking",
    "Additional",
    "Documents",
    "Declaration",
  ];
