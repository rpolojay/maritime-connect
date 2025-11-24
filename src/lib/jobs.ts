
export type Job = {
    id: string;
    title: string;
    company: string;
    type: string;
    description: string;
    email: string;
    status: 'Active' | 'On Hold';
};

export const jobs: Job[] = [
    { id: '1', title: 'Duty-Free Sales Associate', company: 'Starboard Retail Group', type: 'Cruise Ship', description: 'Seeking a Duty-Free Sales Associate. Previous experience in a similar role is a plus.', email: 'careers@selectivecrew.com', status: 'Active' },
    { id: '2', title: 'Dining Room Waiter/Waitress', company: 'Grand Circle Cruise Line', type: 'River Cruises', description: 'We are looking for a Dining Room Waiter/Waitress with 2 years of experience onboard in the role for River Cruises in Europe.', email: 'careers@selectivecrew.com', status: 'On Hold' },
    { id: '3', title: 'Cabin Attendant', company: 'Grand Circle Cruise Line', type: 'River Cruises', description: 'Join our team as a Cabin Attendant. You must have 2 years of experience onboard in the role for River Cruises in Europe.', email: 'careers@selectivecrew.com', status: 'On Hold' },
    { id: '4', title: 'Cook', company: 'Grand Circle Cruise Line', type: 'River Cruises', description: 'Pacific Carriers is hiring a Cook with 2 years of experience onboard in the role for River Cruises in Europe.', email: 'careers@selectivecrew.com', status: 'On Hold' },
    { id: '5', title: 'Cruise Ship Photographer', company: 'Norwegian Cruise Line', type: 'Cruise Ship', description: 'Capture memories for guests aboard our ships. Experience in portrait and event photography is required. Must be comfortable interacting with guests.', email: 'jobs@selectivecrew.com', status: 'Active' },
    { id: '11', title: 'Waiter/Waitress', company: 'P&O Cruises', type: 'Cruise Ship', description: 'Provide excellent service to guests in our main dining rooms. Experience in a high-volume restaurant is preferred.', email: 'jobs@selectivecrew.com', status: 'Active' },
    { id: '12', title: 'Assistant Waiter/Waitress', company: 'P&O Cruises', type: 'Cruise Ship', description: 'Support the dining room team by assisting waiters, clearing tables, and ensuring guest satisfaction.', email: 'jobs@selectivecrew.com', status: 'Active' },
    { id: '13', title: 'Bar Waiter', company: 'P&O Cruises', type: 'Cruise Ship', description: 'Serve beverages to guests in our various bars and lounges. Must have knowledge of cocktails and wine.', email: 'jobs@selectivecrew.com', status: 'Active' },
    { id: '14', title: 'Wine Waiter/Waitress', company: 'Cunard', type: 'Cruise Ship', description: 'Guide guests through our extensive wine list and provide expert recommendations and service. Sommelier certification is a plus.', email: 'jobs@selectivecrew.com', status: 'Active' },
    { id: '15', title: 'Commis de Cuisine', company: 'Cunard', type: 'Cruise Ship', description: 'An entry-level kitchen position to support the culinary team in food preparation and station management.', email: 'jobs@selectivecrew.com', status: 'Active' }
];
