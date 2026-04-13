import { faker } from '@faker-js/faker';
import ENV from '../../config/env';
    const now = new Date();
    const prefix = now.toISOString().replace(/[:.]/g, '-').slice(0, 19); // 2026-03-22T21-30-00

// Generate random contact data using faker and the defined picklist values
const webToLeadDataset  = () => ({
    fullName: `${prefix} ${faker.person.fullName()}`,
    company: faker.company.name(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: 'national' })
});

export { webToLeadDataset }    