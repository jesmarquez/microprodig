//file types/population.ts

export interface BasicPopulation {
    id: number,
  }
  
  export interface Population extends BasicPopulation {
    city: string,
    geoId: string,
    state: string,
    totalPopulation: number
  }