import { faker } from '@faker-js/faker';
// Helper function to get a random value from an array
const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Setting up picklist values
const SALUTATIONS = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Mx."];
const LEAD_SOURCES = ["Web", "Phone Inquiry", "Partner Referral", "Purchased List", "Other"];
const LEVELS = ["Secondary", "Tertiary", "Primary"];


// Generate random contact data using faker and the defined picklist values
const contactDataset = () => ({
    salutation: randomFrom(SALUTATIONS),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    account: 'Roaa',
    reportsTo: 'Abdennour Benhamida',
    mobilePhone: faker.phone.number({ style: 'national' }),
    otherPhone: faker.phone.number({ style: 'national' }),
    title: faker.person.jobTitle(),
    email: faker.internet.email(),
    fax: faker.phone.number({ style: 'national' }),
    birthday: faker.date.between({ from: '1960-01-01', to: Date.now() }).toISOString().split('T')[0], // Format as YYYY-MM-DD
    assistant: faker.person.fullName(),
    AssistantPhone: faker.phone.number({ style: 'national' }),
    leadSource: randomFrom(LEAD_SOURCES),
    mailingCountry: " ", // This will need to be set within the test where the page context is available
    mailingStreet: faker.location.streetAddress(),
    mailingCity: faker.location.city(),
    mailingProvince: faker.location.state(),
    mailingPostalCode: faker.location.zipCode(),
    otherCountry: " ", // This will need to be set within the test where the page context is available
    otherStreet: faker.location.streetAddress(),
    otherCity: faker.location.city(),
    otherProvince: faker.location.state(),
    otherPostalCode: faker.location.zipCode(),
    languages: 'English, French',
    level: randomFrom(LEVELS),
    description: faker.person.bio()
});

// Exporting the contact data and picklist values for use in tests and actions
export { contactDataset, LEVELS, LEAD_SOURCES, SALUTATIONS }    