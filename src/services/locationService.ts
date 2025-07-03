interface LocationData {
  town: string;
  township: string;
  district: string;
  state: string;
}

interface LocationHierarchy {
  states: string[];
  districts: Map<string, string[]>;
  townships: Map<string, string[]>;
  towns: Map<string, string[]>;
  locationMap: Map<string, LocationData>;
}

class LocationService {
  private static instance: LocationService;
  private locationHierarchy: LocationHierarchy | null = null;
  private loadingPromise: Promise<void> | null = null;

  private constructor() {}

  static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  async loadLocationData(): Promise<void> {
    if (this.locationHierarchy) return;
    
    if (this.loadingPromise) {
      await this.loadingPromise;
      return;
    }

    this.loadingPromise = this.fetchAndProcessData();
    await this.loadingPromise;
  }

  private async fetchAndProcessData(): Promise<void> {
    try {
      const response = await fetch('/locations.json');
      const data = await response.json();
      this.locationHierarchy = this.processLocationData(data.locations);
    } catch (error) {
      console.error('Failed to load location data:', error);
      throw error;
    }
  }

  private processLocationData(locations: LocationData[]): LocationHierarchy {
    const states = new Set<string>();
    const districts = new Map<string, Set<string>>();
    const townships = new Map<string, Set<string>>();
    const towns = new Map<string, Set<string>>();
    const locationMap = new Map<string, LocationData>();

    locations.forEach(location => {
      // Add to sets
      states.add(location.state);
      
      if (!districts.has(location.state)) {
        districts.set(location.state, new Set());
      }
      districts.get(location.state)!.add(location.district);

      const districtKey = `${location.state}|${location.district}`;
      if (!townships.has(districtKey)) {
        townships.set(districtKey, new Set());
      }
      townships.get(districtKey)!.add(location.township);

      const townshipKey = `${location.state}|${location.district}|${location.township}`;
      if (!towns.has(townshipKey)) {
        towns.set(townshipKey, new Set());
      }
      towns.get(townshipKey)!.add(location.town);

      // Add to location map for reverse lookup
      locationMap.set(location.town, location);
      locationMap.set(location.township, location);
      locationMap.set(location.district, location);
      locationMap.set(location.state, location);
    });

    return {
      states: Array.from(states).sort(),
      districts: new Map(Array.from(districts.entries()).map(([k, v]) => [k, Array.from(v).sort()])),
      townships: new Map(Array.from(townships.entries()).map(([k, v]) => [k, Array.from(v).sort()])),
      towns: new Map(Array.from(towns.entries()).map(([k, v]) => [k, Array.from(v).sort()])),
      locationMap
    };
  }

  getStates(): string[] {
    if (!this.locationHierarchy) return [];
    return this.locationHierarchy.states;
  }

  getDistricts(state: string): string[] {
    if (!this.locationHierarchy || !state) return [];
    return this.locationHierarchy.districts.get(state) || [];
  }

  getTownships(state: string, district: string): string[] {
    if (!this.locationHierarchy || !state || !district) return [];
    const key = `${state}|${district}`;
    return this.locationHierarchy.townships.get(key) || [];
  }

  getTowns(state: string, district: string, township: string): string[] {
    if (!this.locationHierarchy || !state || !district || !township) return [];
    const key = `${state}|${district}|${township}`;
    return this.locationHierarchy.towns.get(key) || [];
  }

  // Find location data by any level (town, township, district, state)
  findLocationByValue(value: string): LocationData | null {
    if (!this.locationHierarchy || !value) return null;
    return this.locationHierarchy.locationMap.get(value) || null;
  }

  // Get all unique values for each level (for search)
  getAllStates(): string[] {
    return this.getStates();
  }

  getAllDistricts(): string[] {
    if (!this.locationHierarchy) return [];
    const allDistricts = new Set<string>();
    this.locationHierarchy.districts.forEach(districts => {
      districts.forEach(district => allDistricts.add(district));
    });
    return Array.from(allDistricts).sort();
  }

  getAllTownships(): string[] {
    if (!this.locationHierarchy) return [];
    const allTownships = new Set<string>();
    this.locationHierarchy.townships.forEach(townships => {
      townships.forEach(township => allTownships.add(township));
    });
    return Array.from(allTownships).sort();
  }

  getAllTowns(): string[] {
    if (!this.locationHierarchy) return [];
    const allTowns = new Set<string>();
    this.locationHierarchy.towns.forEach(towns => {
      towns.forEach(town => allTowns.add(town));
    });
    return Array.from(allTowns).sort();
  }
}

export default LocationService; 