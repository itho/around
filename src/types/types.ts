declare namespace Around {
  // 
  export interface Event {
    description: string
    icon: string
    image: string
    location: google.maps.LatLngLiteral
    locationName: string
    theme: string
    timestamps: {
      created: number
      start: number
      end: number
    }
    users: {
      created: string
      liked: UserTimestampItem[]
      reported: UserTimestampItem[]
    }
  }

  //
  export interface User {
    id: string
    name: string
    photoUrl: string
  }

  //
  export interface UserEvents {
    created: EventTimestampItem[]
    liked: EventTimestampItem[]
    reported: EventTimestampItem[]
  }

  // eventId paired with a timestamp or boolean
  export interface EventTimestampItem {
    (event: string): number | boolean
  }

  // userId paired with a timestamp or boolean
  export interface UserTimestampItem {
    (user: string): number | boolean
  }
}
