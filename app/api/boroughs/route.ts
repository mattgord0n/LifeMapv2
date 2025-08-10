import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface BoroughBoundary {
  id: string
  name: string
  coordinates: Array<[number, number]>
  center: [number, number]
  area: number
}

export async function GET(request: NextRequest) {
  try {
    // Return mock borough data instead of external API
    const boroughs: BoroughBoundary[] = [
      {
        id: 'kensington-chelsea',
        name: 'Kensington and Chelsea',
        coordinates: [
          [-0.2037, 51.4994],
          [-0.1837, 51.4994],
          [-0.1837, 51.5094],
          [-0.2037, 51.5094],
          [-0.2037, 51.4994]
        ],
        center: [-0.1937, 51.5044],
        area: 12.13
      },
      {
        id: 'westminster',
        name: 'Westminster',
        coordinates: [
          [-0.1537, 51.4975],
          [-0.1337, 51.4975],
          [-0.1337, 51.5175],
          [-0.1537, 51.5175],
          [-0.1537, 51.4975]
        ],
        center: [-0.1437, 51.5075],
        area: 21.48
      },
      {
        id: 'hammersmith-fulham',
        name: 'Hammersmith and Fulham',
        coordinates: [
          [-0.2337, 51.4875],
          [-0.2037, 51.4875],
          [-0.2037, 51.4994],
          [-0.2337, 51.4994],
          [-0.2337, 51.4875]
        ],
        center: [-0.2187, 51.4935],
        area: 16.40
      },
      {
        id: 'camden',
        name: 'Camden',
        coordinates: [
          [-0.1537, 51.5175],
          [-0.1337, 51.5175],
          [-0.1337, 51.5375],
          [-0.1537, 51.5375],
          [-0.1537, 51.5175]
        ],
        center: [-0.1437, 51.5275],
        area: 21.80
      },
      {
        id: 'islington',
        name: 'Islington',
        coordinates: [
          [-0.1337, 51.5175],
          [-0.1137, 51.5175],
          [-0.1137, 51.5375],
          [-0.1337, 51.5375],
          [-0.1337, 51.5175]
        ],
        center: [-0.1237, 51.5275],
        area: 14.86
      },
      {
        id: 'hackney',
        name: 'Hackney',
        coordinates: [
          [-0.1137, 51.5175],
          [-0.0937, 51.5175],
          [-0.0937, 51.5375],
          [-0.1137, 51.5375],
          [-0.1137, 51.5175]
        ],
        center: [-0.1037, 51.5275],
        area: 19.06
      },
      {
        id: 'tower-hamlets',
        name: 'Tower Hamlets',
        coordinates: [
          [-0.0937, 51.4975],
          [-0.0737, 51.4975],
          [-0.0737, 51.5175],
          [-0.0937, 51.5175],
          [-0.0937, 51.4975]
        ],
        center: [-0.0837, 51.5075],
        area: 19.77
      },
      {
        id: 'southwark',
        name: 'Southwark',
        coordinates: [
          [-0.1137, 51.4775],
          [-0.0937, 51.4775],
          [-0.0937, 51.4975],
          [-0.1137, 51.4975],
          [-0.1137, 51.4775]
        ],
        center: [-0.1037, 51.4875],
        area: 28.85
      },
      {
        id: 'lambeth',
        name: 'Lambeth',
        coordinates: [
          [-0.1337, 51.4575],
          [-0.1137, 51.4575],
          [-0.1137, 51.4775],
          [-0.1337, 51.4775],
          [-0.1337, 51.4575]
        ],
        center: [-0.1237, 51.4675],
        area: 26.82
      },
      {
        id: 'wandsworth',
        name: 'Wandsworth',
        coordinates: [
          [-0.2337, 51.4375],
          [-0.2137, 51.4375],
          [-0.2137, 51.4575],
          [-0.2337, 51.4575],
          [-0.2337, 51.4375]
        ],
        center: [-0.2237, 51.4475],
        area: 34.26
      }
    ]

    return NextResponse.json(boroughs)

  } catch (error) {
    console.error('Borough boundaries error:', error)
    
    // Return empty array if anything fails
    return NextResponse.json([])
  }
} 