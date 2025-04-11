export interface SingleIDModel {
  id: string
  createdAt: string
  updatedAt: string
}

export interface NewEntrances {
  entrances?: Entrance[] | null
}

export interface Entrance extends SingleIDModel {
  name: string
  floors: number
  premises: number
  address: string | null
  firstApartmentNumber: number
  lastApartmentNumber: number
}
