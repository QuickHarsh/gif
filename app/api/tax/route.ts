import { NextRequest, NextResponse } from 'next/server';

// Mock tax rates by region
const TAX_RATES = {
  // US tax rates by state
  US: {
    AL: 0.04, // Alabama
    AK: 0.00, // Alaska
    AZ: 0.056, // Arizona
    AR: 0.065, // Arkansas
    CA: 0.0725, // California
    CO: 0.029, // Colorado
    CT: 0.0635, // Connecticut
    DE: 0.00, // Delaware
    FL: 0.06, // Florida
    GA: 0.04, // Georgia
    HI: 0.04, // Hawaii
    ID: 0.06, // Idaho
    IL: 0.0625, // Illinois
    IN: 0.07, // Indiana
    IA: 0.06, // Iowa
    KS: 0.065, // Kansas
    KY: 0.06, // Kentucky
    LA: 0.0445, // Louisiana
    ME: 0.055, // Maine
    MD: 0.06, // Maryland
    MA: 0.0625, // Massachusetts
    MI: 0.06, // Michigan
    MN: 0.06875, // Minnesota
    MS: 0.07, // Mississippi
    MO: 0.04225, // Missouri
    MT: 0.00, // Montana
    NE: 0.055, // Nebraska
    NV: 0.0685, // Nevada
    NH: 0.00, // New Hampshire
    NJ: 0.06625, // New Jersey
    NM: 0.05125, // New Mexico
    NY: 0.04, // New York
    NC: 0.0475, // North Carolina
    ND: 0.05, // North Dakota
    OH: 0.0575, // Ohio
    OK: 0.045, // Oklahoma
    OR: 0.00, // Oregon
    PA: 0.06, // Pennsylvania
    RI: 0.07, // Rhode Island
    SC: 0.06, // South Carolina
    SD: 0.045, // South Dakota
    TN: 0.07, // Tennessee
    TX: 0.0625, // Texas
    UT: 0.0485, // Utah
    VT: 0.06, // Vermont
    VA: 0.053, // Virginia
    WA: 0.065, // Washington
    WV: 0.06, // West Virginia
    WI: 0.05, // Wisconsin
    WY: 0.04, // Wyoming
    DC: 0.06, // District of Columbia
  },
  // Canada tax rates by province
  CA: {
    AB: 0.05, // Alberta (GST only)
    BC: 0.12, // British Columbia (GST + PST)
    MB: 0.12, // Manitoba (GST + PST)
    NB: 0.15, // New Brunswick (HST)
    NL: 0.15, // Newfoundland and Labrador (HST)
    NT: 0.05, // Northwest Territories (GST only)
    NS: 0.15, // Nova Scotia (HST)
    NU: 0.05, // Nunavut (GST only)
    ON: 0.13, // Ontario (HST)
    PE: 0.15, // Prince Edward Island (HST)
    QC: 0.14975, // Quebec (GST + QST)
    SK: 0.11, // Saskatchewan (GST + PST)
    YT: 0.05, // Yukon (GST only)
  },
  // Default tax rate for other countries
  DEFAULT: 0.00
};

// Calculate tax
export async function POST(request: NextRequest) {
  try {
    const { 
      subtotal, 
      countryCode = 'US', 
      stateCode,
      postalCode,
      taxExempt = false
    } = await request.json();
    
    // Validate required fields
    if (subtotal === undefined || subtotal < 0) {
      return NextResponse.json(
        { error: 'Valid subtotal is required' },
        { status: 400 }
      );
    }
    
    // No tax for tax-exempt orders
    if (taxExempt) {
      return NextResponse.json(
        { 
          taxRate: 0,
          taxAmount: 0,
          subtotal,
          total: subtotal
        },
        { status: 200 }
      );
    }
    
    // Get tax rate based on location
    let taxRate = TAX_RATES.DEFAULT;
    
    if (countryCode === 'US' && stateCode) {
      taxRate = TAX_RATES.US[stateCode as keyof typeof TAX_RATES.US] || TAX_RATES.DEFAULT;
    } else if (countryCode === 'CA' && stateCode) {
      taxRate = TAX_RATES.CA[stateCode as keyof typeof TAX_RATES.CA] || TAX_RATES.DEFAULT;
    }
    
    // Calculate tax amount
    const taxAmount = parseFloat((subtotal * taxRate).toFixed(2));
    const total = parseFloat((subtotal + taxAmount).toFixed(2));
    
    return NextResponse.json(
      { 
        taxRate,
        taxAmount,
        subtotal,
        total
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Tax calculation error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while calculating tax' },
      { status: 500 }
    );
  }
}