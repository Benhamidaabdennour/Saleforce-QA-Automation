import { faker } from '@faker-js/faker';
import ENV from '../../config/env';
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

const attributes = {
  en:{
    EXPECTED_PICKLIST_VALUES : {
      level:       ['Primary', 'Secondary', 'Tertiary'],
      leadSource:  ['Web', 'Phone Inquiry', 'Partner Referral', 'Purchased List', 'Other'],
      salutation:  ['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.', 'Mx.'],
    },
    CONTACT_FORM_LABELS: [
      'First Name', 'Phone', 'Home Phone', 'Account Name', 'Mobile',
      'Title', 'Other Phone', 'Department', 'Fax', 'Birthdate',
      'Email', 'Reports To', 'Assistant', 'Lead Source', 'Asst. Phone',
      'Mailing Address', 'Other Address', 'Languages', 'Level', 'Description'
    ],
    CONTACT_DETAIL_LABELS: [
      'Phone', 'Name', 'Home Phone', 'Account Name',
      'Mobile', 'Title', 'Other Phone', 'Department', 'Fax',
      'Birthdate', 'Email', 'Reports To', 'Assistant', 'Lead Source',
      'Mailing Address', 'Other Address', 'Languages', 'Level', 'Description'
    ],
    CONTACT_RELATED_LISTS: [
      'Opportunities', 'Cases', 'Campaign History', 'Notes & Attachments'
    ]
},
  fr:{
    EXPECTED_PICKLIST_VALUES : {
      level:       ['Primary', 'Secondary', 'Tertiary'],
      leadSource:  ['Web', 'Phone Inquiry', 'Partner Referral', 'Purchased List', 'Other'],
      salutation:  ['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.', 'Mx.'],
    },
    CONTACT_FORM_LABELS: [
      'Prénom','Nom', 'Téléphone', 'Téléphone (domicile)', 'Nom du compte', 'Téléphone mobile', 'Autre téléphone',
      'Fonction', 'Service', 'Télécopie', 'Date de naissance', 'Civilité',
      'Adresse e-mail', 'Responsable hiérarchique', 'Assistant', 'Origine de la piste','Asst. Téléphone',
      'Adresse postale', 'Autre adresse', 'Languages', 'Level', 'Description'
    ],
    CONTACT_DETAIL_LABELS: [
      'Nom complet', 'Téléphone', 'Téléphone (domicile)', 'Nom du compte', 'Téléphone mobile', 'Autre téléphone',
      'Fonction', 'Service', 'Télécopie', 'Date de naissance',
      'Adresse e-mail', 'Responsable hiérarchique', 'Assistant', 'Origine de la piste','Asst. Téléphone',
      'Adresse postale', 'Autre adresse', 'Languages', 'Level', 'Description'
    ],
    CONTACT_RELATED_LISTS: [
      'Opportunités', 'Requêtes', 'Historique de la campagne', 'Notes et pièces jointes'
    ],
  }

  
}

const TECH_PARTNER_DATASET = {
  valid: [
    'LookupFilter TechPartner 1',
    'LookupFilter TechPartner 2',
    'LookupFilter TechPartner 3',
    'LookupFilter TechPartner 4',
    'LookupFilter TechPartner 5'
  ],
  invalid: [
    'LookupFilter Not TechPartner 1',
    'LookupFilter Not TechPartner 2',
    'LookupFilter Not TechPartner 3',
    'LookupFilter Not TechPartner 4',
    'LookupFilter Not TechPartner 5'
  ]
};
const lang = attributes[ENV.lang] || attributes.en;

export const EXPECTED_PICKLIST_VALUES = lang.EXPECTED_PICKLIST_VALUES;
export const CONTACT_FORM_LABELS      = lang.CONTACT_FORM_LABELS;
export const CONTACT_DETAIL_LABELS    = lang.CONTACT_DETAIL_LABELS;
export const CONTACT_RELATED_LISTS    = lang.CONTACT_RELATED_LISTS;
export const VALID_TECH_PARTNERS      = TECH_PARTNER_DATASET.valid;
export const INVALID_TECH_PARTNERS    = TECH_PARTNER_DATASET.invalid;

// Exporting the contact data and picklist values for use in tests and actions
export { contactDataset }    