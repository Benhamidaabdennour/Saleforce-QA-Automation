import { faker } from '@faker-js/faker';
import ENV from '../../config/env';
    const now = new Date();
    const prefix = now.toISOString().replace(/[:.]/g, '-').slice(0, 19); // 2026-03-22T21-30-00
    const NEW_PROJECT_STAGES = ['Qualification', 'Needs Analysis', 'Value Proposition', 'Proposal/Price Quote', 'Closed Won', 'Closed Lost']

// Generate random contact data using faker and the defined picklist values
const opportunityDataset = () => ({
    opportunityName: `${prefix} ${faker.company.name()}`,
    accountName: 'GenePoint',
    closeDate: faker.date.between({ from: '1960-01-01', to: '1990-01-01' }).toISOString().split('T')[0], // Format as YYYY-MM-DD
    endDate: faker.date.between({ from: '1990-01-02', to: Date.now() }).toISOString().split('T')[0], // Format as YYYY-MM-DD
    amount: faker.number.int({ min: 1000, max: 100000 }).toString(),
    trackingNumber: faker.string.alphanumeric(10).toUpperCase(),
    stageName: faker.helpers.arrayElement(NEW_PROJECT_STAGES),
    description: faker.lorem.paragraph(),
});

const attributes = {
  en:{
    EXPECTED_PICKLIST_VALUES : {
      level:       ['Primary', 'Secondary', 'Tertiary'],
      leadSource:  ['Web', 'Phone Inquiry', 'Partner Referral', 'Purchased List', 'Other'],
      salutation:  ['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.', 'Mx.'],
    },
    NEW_PROJECT_FORM_LABELS: [
      'First Name', 'Phone', 'Home Phone', 'Account Name', 'Mobile',
      'Title', 'Other Phone', 'Department', 'Fax', 'Birthdate',
      'Email', 'Reports To', 'Assistant', 'Lead Source', 'Asst. Phone',
      'Mailing Address', 'Other Address', 'Languages', 'Level', 'Description'
    ],
    SIGNED_PROJECT_FORM_LABELS: [
      'First Name', 'Phone', 'Home Phone', 'Account Name', 'Mobile',
      'Title', 'Other Phone', 'Department', 'Fax', 'Birthdate',
      'Email', 'Reports To', 'Assistant', 'Lead Source', 'Asst. Phone',
      'Mailing Address', 'Other Address', 'Languages', 'Level', 'Description'
    ],
    NEW_PROJECT_DETAIL_LABELS: [
      'Phone', 'Name', 'Home Phone', 'Account Name',
      'Mobile', 'Title', 'Other Phone', 'Department', 'Fax',
      'Birthdate', 'Email', 'Reports To', 'Assistant', 'Lead Source',
      'Mailing Address', 'Other Address', 'Languages', 'Level', 'Description'
    ],
    SIGNED_PROJECT_DETAIL_LABELS: [
      'Phone', 'Name', 'Home Phone', 'Account Name',
      'Mobile', 'Title', 'Other Phone', 'Department', 'Fax',
      'Birthdate', 'Email', 'Reports To', 'Assistant', 'Lead Source',
      'Mailing Address', 'Other Address', 'Languages', 'Level', 'Description'
    ],
    OPPORTUNITY_RELATED_LISTS: [
      'Opportunities', 'Cases', 'Campaign History', 'Notes & Attachments'
    ]
},
  fr:{
    EXPECTED_PICKLIST_VALUES : {
      level:       ['Primary', 'Secondary', 'Tertiary'],
      leadSource:  ['Web', 'Phone Inquiry', 'Partner Referral', 'Purchased List', 'Other'],
      salutation:  ['Mr.', 'Ms.', 'Mrs.', 'Dr.', 'Prof.', 'Mx.'],
    },
    NEW_PROJECT_FORM_LABELS: [
      'First Name', 'Phone', 'Home Phone', 'Account Name', 'Mobile',
      'Title', 'Other Phone', 'Department', 'Fax', 'Birthdate',
      'Email', 'Reports To', 'Assistant', 'Lead Source', 'Asst. Phone',
      'Mailing Address', 'Other Address', 'Languages', 'Level', 'Description'
    ],
    SIGNED_PROJECT_FORM_LABELS: [
      'First Name', 'Phone', 'Home Phone', 'Account Name', 'Mobile',
      'Title', 'Other Phone', 'Department', 'Fax', 'Birthdate',
      'Email', 'Reports To', 'Assistant', 'Lead Source', 'Asst. Phone',
      'Mailing Address', 'Other Address', 'Languages', 'Level', 'Description'
    ],
    NEW_PROJECT_DETAIL_LABELS: [
      'Phone', 'Name', 'Home Phone', 'Account Name',
      'Mobile', 'Title', 'Other Phone', 'Department', 'Fax',
      'Birthdate', 'Email', 'Reports To', 'Assistant', 'Lead Source',
      'Mailing Address', 'Other Address', 'Languages', 'Level', 'Description'
    ],
    SIGNED_PROJECT_DETAIL_LABELS: [
      'Phone', 'Name', 'Home Phone', 'Account Name',
      'Mobile', 'Title', 'Other Phone', 'Department', 'Fax',
      'Birthdate', 'Email', 'Reports To', 'Assistant', 'Lead Source',
      'Mailing Address', 'Other Address', 'Languages', 'Level', 'Description'
    ],
    OPPORTUNITY_RELATED_LISTS: [
      'Opportunities', 'Cases', 'Campaign History', 'Notes & Attachments'
    ]
  }

  
}

const lang = attributes[ENV.lang] || attributes.en;

export const EXPECTED_PICKLIST_VALUES = lang.EXPECTED_PICKLIST_VALUES;
export const NEW_PROJECT_FORM_LABELS      = lang.NEW_PROJECT_FORM_LABELS;
export const SIGNED_PROJECT_FORM_LABELS    = lang.SIGNED_PROJECT_FORM_LABELS;
export const NEW_PROJECT_DETAIL_LABELS    = lang.NEW_PROJECT_DETAIL_LABELS;
export const SIGNED_PROJECT_DETAIL_LABELS  = lang.SIGNED_PROJECT_DETAIL_LABELS;
export const OPPORTUNITY_RELATED_LISTS     = lang.OPPORTUNITY_RELATED_LISTS;
// Exporting the contact data and picklist values for use in tests and actions
export { opportunityDataset };    