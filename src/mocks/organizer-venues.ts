export interface OrganizerVenue {
  id: string
  name: string
  address: string
  region: string
  mapCaption: string
  capacity: string
  eventsHeld: string
  facilities: string[]
  canDelete: boolean
  deleteBlockedReason?: string
}

export const organizerVenuesSub =
  "Saved places you host events at — pick one while creating an event instead of retyping the address."

export const organizerVenuesAddTile = {
  title: "Add a venue",
  body: "Name, address, map position, capacity and facilities — saved once, reused in every event.",
}

export const organizerVenues: OrganizerVenue[] = [
  {
    id: "boulevard-city",
    name: "Boulevard City Amphitheatre",
    address: "Hittin, King Salman Rd, Riyadh 13512",
    region: "Central",
    mapCaption: "map position · Riyadh",
    capacity: "8,000",
    eventsHeld: "6 events held",
    facilities: ["Parking", "Prayer rooms", "Accessible", "Food court"],
    canDelete: false,
    deleteBlockedReason:
      "In use by an active event — can't be deleted while an active event uses it",
  },
  {
    id: "city-walk",
    name: "City Walk Arena",
    address: "Corniche District, Jeddah 23511",
    region: "Western",
    mapCaption: "map position · Jeddah",
    capacity: "1,600",
    eventsHeld: "4 events held",
    facilities: ["Parking", "Indoor", "VIP lounge"],
    canDelete: false,
    deleteBlockedReason:
      "In use by an active event — can't be deleted while an active event uses it",
  },
  {
    id: "ritz-ballroom",
    name: "The Ritz Ballroom",
    address: "Al Hada, Mekkah Rd, Riyadh 11493",
    region: "Central",
    mapCaption: "map position · Riyadh",
    capacity: "900",
    eventsHeld: "2 events held",
    facilities: ["Valet", "Indoor", "Catering kitchen"],
    canDelete: true,
  },
]
