import { faker } from '@faker-js/faker';
    const now = new Date();
    const prefix = now.toISOString().replace(/[:.]/g, '-').slice(0, 19); // 2026-03-22T21-30-00

// Generate random contact data using faker and the defined picklist values
const contactDataset = () => ({
    firstName: `${prefix} ${faker.person.firstName()}`,// faker.person.firstName()
    lastName: faker.person.lastName(),
    account: 'GenePoint',
    reportsTo: 'Abdennour Benhamida',
    phone: faker.phone.number({ style: 'national' }),
    mobilePhone: faker.phone.number({ style: 'national' }),
    otherPhone: faker.phone.number({ style: 'national' }),
    homePhone: faker.phone.number({ style: 'national' }),
    title: faker.person.jobTitle(),
    email: faker.internet.email(),
    fax: faker.phone.number({ style: 'national' }),
    birthday: faker.date.between({ from: '1960-01-01', to: Date.now() }).toISOString().split('T')[0], // Format as YYYY-MM-DD
    assistant: faker.person.fullName(),
    assistantPhone: faker.phone.number({ style: 'national' }),
    leadSource: "",
    mailingCountry: " ", // This will need to be set within the test where the page context is available
    mailingStreet: faker.location.streetAddress(),
    mailingCity: faker.location.city(),
    mailingProvince: "",
    mailingPostalCode: faker.location.zipCode(),
    otherCountry: " ", // This will need to be set within the test where the page context is available
    otherStreet: faker.location.streetAddress(),
    otherCity: faker.location.city(),
    otherProvince: "",
    otherPostalCode: faker.location.zipCode(),
    languages: 'English, French',
    level: "",
    description: faker.lorem.paragraph(),
    department: faker.company.name()
});

const EXPECTED_PICKLIST_VALUES = {
  level:       ['Primary', 'Secondary', 'Tertiary'],
  leadSource:  ['Web', 'Phone Inquiry', 'Partner Referral', 'Purchased List', 'Other'],
  salutation:  ['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.', 'Mx.'],
};

const CONTACT_FORM_LABELS = [
  'First Name', 'Phone', 'Home Phone', 'Account Name', 'Mobile',
  'Title', 'Other Phone', 'Department', 'Fax', 'Birthdate',
  'Email', 'Reports To', 'Assistant', 'Lead Source', 'Asst. Phone',
  'Mailing Address', 'Other Address', 'Languages', 'Level', 'Description'
];

const CONTACT_DETAIL_LABELS = [
  'Phone', 'Name', 'Home Phone', 'Account Name',
  'Mobile', 'Title', 'Other Phone', 'Department', 'Fax',
  'Birthdate', 'Email', 'Reports To', 'Assistant', 'Lead Source',
  'Mailing Address', 'Other Address', 'Languages',
  'Level', 'Description'
];

const CONTACT_RELATED_LISTS = [
    "Opportunities",
    "Cases",
    "Campaign History",
    "Notes & Attachments",
]

// Exporting the contact data and picklist values for use in tests and actions
export { contactDataset, EXPECTED_PICKLIST_VALUES, CONTACT_DETAIL_LABELS, CONTACT_FORM_LABELS, CONTACT_RELATED_LISTS}    