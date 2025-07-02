export interface LocationInfo {
  state: string | null;
  district: string | null;
  township: string | null;
  town: string | null;
  quarter: string | null;
  village: string | null;
  locationDetail: string | null;
  mgrs: string | null;
}

interface LocationData {
  town: string;
  township: string;
  district: string;
  state: string;
}

interface LocationsResponse {
  locations: LocationData[];
}

export class LocationExtractor {
  private static locations: LocationData[] = [];
  private static readonly townships: Set<string> = new Set();
  private static readonly districts: Set<string> = new Set();
  private static readonly states: Set<string> = new Set();
  private static readonly townshipToState: Map<string, string> = new Map();
  private static readonly townshipToDistrict: Map<string, string> = new Map();
  private static readonly districtToState: Map<string, string> = new Map();
  private static initialized = false;

  static async initialize(): Promise<void> {
    if (this.initialized) return;
    
    try {
      const response = await fetch('/locations.json');
      if (!response.ok) {
        throw new Error(`Failed to load locations.json: ${response.status}`);
      }
      const data: LocationsResponse = await response.json();
      this.locations = data.locations;
      
      // Build lookup maps and sets
      this.locations.forEach(location => {
        if (location.township) {
          this.townships.add(location.township);
          this.townshipToState.set(location.township, location.state);
          this.townshipToDistrict.set(location.township, location.district);
        }
        if (location.district) {
          this.districts.add(location.district);
          this.districtToState.set(location.district, location.state);
        }
        if (location.state) {
          this.states.add(location.state);
        }
      });
      
      this.initialized = true;
    } catch (error) {
      console.error('Error loading locations data:', error);
      this.initialized = true; // Prevent infinite retries
    }
  }

  static async extractLocations(text: string): Promise<LocationInfo> {
    // Initialize if not already done
    if (!this.initialized) {
      await this.initialize();
    }

    const locations: LocationInfo = {
      state: null,
      district: null,
      township: null,
      town: null,
      quarter: null,
      village: null,
      locationDetail: null,
      mgrs: null
    };

    // Find township first (highest priority)
    for (const township of this.townships) {
      if (text.includes(township)) {
        locations.township = township;
        locations.state = this.townshipToState.get(township) || null;
        locations.district = this.townshipToDistrict.get(township) || null;
        break;
      }
    }

    // If township not found, try district
    if (!locations.township) {
      for (const district of this.districts) {
        if (text.includes(district)) {
          locations.district = district;
          locations.state = this.districtToState.get(district) || null;
          break;
        }
      }
    }

    // If district not found, try state
    if (!locations.district) {
      for (const state of this.states) {
        if (text.includes(state)) {
          locations.state = state;
          break;
        }
      }
    }

    // Extract MGRS coordinate
    const mgrsPattern = /\b\d{1,2}[A-Z]{1,3}\s?\d{1,5}\s?\d{1,5}\b/;
    const mgrsMatch = text.match(mgrsPattern);
    if (mgrsMatch) {
      locations.mgrs = mgrsMatch[0];
    }

    return locations;
  }
} 