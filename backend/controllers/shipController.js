
export const getShips = async (req, res) => {
  try {
    const ships = [
      {
        id: '1',
        name: 'Pacific Voyager',
        imo: '9876543',
        type: 'Container Ship',
        flag: 'Panama',
        yearBuilt: 2015,
        grossTonnage: 85600,
        status: 'Underway',
        destination: 'Singapore',
        eta: '2023-06-15',
      },
      {
        id: '2',
        name: 'Atlantic Explorer',
        imo: '8765432',
        type: 'Bulk Carrier',
        flag: 'Liberia',
        yearBuilt: 2018,
        grossTonnage: 92450,
        status: 'At Anchor',
        destination: 'Rotterdam',
        eta: '2023-06-20',
      },
      {
        id: '3',
        name: 'Indian Ocean Queen',
        imo: '7654321',
        type: 'Crude Oil Tanker',
        flag: 'Marshall Islands',
        yearBuilt: 2016,
        grossTonnage: 156000,
        status: 'Underway',
        destination: 'Shanghai',
        eta: '2023-06-25',
      },
      {
        id: '4',
        name: 'Arctic Trader',
        imo: '6543210',
        type: 'LNG Carrier',
        flag: 'Bahamas',
        yearBuilt: 2020,
        grossTonnage: 112000,
        status: 'In Port',
        destination: 'Oslo',
        eta: '2023-06-18',
      },
      {
        id: '5',
        name: 'Mediterranean Star',
        imo: '5432109',
        type: 'Passenger Ship',
        flag: 'Italy',
        yearBuilt: 2019,
        grossTonnage: 185000,
        status: 'Underway',
        destination: 'Barcelona',
        eta: '2023-06-22',
      },
      {
        id: '6',
        name: 'Caribbean Princess',
        imo: '4321098',
        type: 'Cruise Ship',
        flag: 'Bermuda',
        yearBuilt: 2021,
        grossTonnage: 143700,
        status: 'Underway',
        destination: 'Miami',
        eta: '2023-07-01',
      },
      {
        id: '7',
        name: 'Baltic Trader',
        imo: '3210987',
        type: 'Ro-Ro Vessel',
        flag: 'Malta',
        yearBuilt: 2017,
        grossTonnage: 75800,
        status: 'At Anchor',
        destination: 'Hamburg',
        eta: '2023-06-28',
      },
      {
        id: '8',
        name: 'Red Sea Mariner',
        imo: '2109876',
        type: 'Chemical Tanker',
        flag: 'Singapore',
        yearBuilt: 2019,
        grossTonnage: 82300,
        status: 'Underway',
        destination: 'Jeddah',
        eta: '2023-07-05',
      },
      {
        id: '9',
        name: 'Black Pearl',
        imo: '1098765',
        type: 'Offshore Vessel',
        flag: 'Norway',
        yearBuilt: 2022,
        grossTonnage: 45600,
        status: 'In Port',
        destination: 'Stavanger',
        eta: '2023-06-30',
      },
      {
        id: '10',
        name: 'Golden Horizon',
        imo: '9876543',
        type: 'Sailing Vessel',
        flag: 'Portugal',
        yearBuilt: 2021,
        grossTonnage: 8500,
        status: 'Underway',
        destination: 'Lisbon',
        eta: '2023-07-10',
      },
      {
        id: '11',
        name: 'Pacific Dawn',
        imo: '8765432',
        type: 'Container Ship',
        flag: 'USA',
        yearBuilt: 2018,
        grossTonnage: 142000,
        status: 'Underway',
        destination: 'Los Angeles',
        eta: '2023-07-12',
      },
      {
        id: '12',
        name: 'Atlantic Pioneer',
        imo: '7654321',
        type: 'Bulk Carrier',
        flag: 'Greece',
        yearBuilt: 2016,
        grossTonnage: 92800,
        status: 'At Anchor',
        destination: 'Piraeus',
        eta: '2023-07-08',
      },
      {
        id: '13',
        name: 'Arctic Explorer',
        imo: '6543210',
        type: 'Icebreaker',
        flag: 'Russia',
        yearBuilt: 2020,
        grossTonnage: 33500,
        status: 'Underway',
        destination: 'Murmansk',
        eta: '2023-07-15',
      },
      {
        id: '14',
        name: 'Southern Cross',
        imo: '5432109',
        type: 'Research Vessel',
        flag: 'Australia',
        yearBuilt: 2019,
        grossTonnage: 12500,
        status: 'In Port',
        destination: 'Hobart',
        eta: '2023-07-05',
      },
      {
        id: '15',
        name: 'Pacific Pearl',
        imo: '4321098',
        type: 'Cruise Ship',
        flag: 'Bahamas',
        yearBuilt: 2021,
        grossTonnage: 138000,
        status: 'Underway',
        destination: 'Sydney',
        eta: '2023-07-18',
      }
    ];

    let filteredShips = [...ships];
    
    if (req.query.type) {
      filteredShips = filteredShips.filter(ship => 
        ship.type.toLowerCase() === req.query.type.toLowerCase()
      );
    }
    
    if (req.query.flag) {
      filteredShips = filteredShips.filter(ship => 
        ship.flag.toLowerCase() === req.query.flag.toLowerCase()
      );
    }
    
    if (req.query.status) {
      filteredShips = filteredShips.filter(ship => 
        ship.status.toLowerCase() === req.query.status.toLowerCase()
      );
    }

    if (req.query.sort) {
      const [field, order] = req.query.sort.split(':');
      filteredShips.sort((a, b) => {
        if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
        if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    const paginatedShips = filteredShips.slice(startIndex, endIndex);
    
    const response = {
      total: filteredShips.length,
      page,
      totalPages: Math.ceil(filteredShips.length / limit),
      limit,
      data: paginatedShips
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching ships:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const searchShips = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const ships = [
      {
        id: '1',
        name: 'Pacific Voyager',
        imo: '9876543',
        type: 'Container Ship',
        flag: 'Panama',
        yearBuilt: 2015,
        grossTonnage: 85600,
        status: 'Underway',
        destination: 'Singapore',
        eta: '2023-06-15',
      },
      {
        id: '2',
        name: 'Atlantic Explorer',
        imo: '8765432',
        type: 'Bulk Carrier',
        flag: 'Liberia',
        yearBuilt: 2018,
        grossTonnage: 92450,
        status: 'At Anchor',
        destination: 'Rotterdam',
        eta: '2023-06-20',
      },
      {
        id: '3',
        name: 'Indian Ocean Queen',
        imo: '7654321',
        type: 'Crude Oil Tanker',
        flag: 'Marshall Islands',
        yearBuilt: 2016,
        grossTonnage: 156000,
        status: 'Underway',
        destination: 'Shanghai',
        eta: '2023-06-25',
      },
      {
        id: '4',
        name: 'Arctic Trader',
        imo: '6543210',
        type: 'LNG Carrier',
        flag: 'Bahamas',
        yearBuilt: 2020,
        grossTonnage: 112000,
        status: 'In Port',
        destination: 'Oslo',
        eta: '2023-06-18',
      },
      {
        id: '5',
        name: 'Mediterranean Star',
        imo: '5432109',
        type: 'Passenger Ship',
        flag: 'Italy',
        yearBuilt: 2019,
        grossTonnage: 185000,
        status: 'Underway',
        destination: 'Barcelona',
        eta: '2023-06-22',
      },
      {
        id: '6',
        name: 'Caribbean Princess',
        imo: '4321098',
        type: 'Cruise Ship',
        flag: 'Bermuda',
        yearBuilt: 2021,
        grossTonnage: 143700,
        status: 'Underway',
        destination: 'Miami',
        eta: '2023-07-01',
      },
      {
        id: '7',
        name: 'Baltic Trader',
        imo: '3210987',
        type: 'Ro-Ro Vessel',
        flag: 'Malta',
        yearBuilt: 2017,
        grossTonnage: 75800,
        status: 'At Anchor',
        destination: 'Hamburg',
        eta: '2023-06-28',
      },
      {
        id: '8',
        name: 'Red Sea Mariner',
        imo: '2109876',
        type: 'Chemical Tanker',
        flag: 'Singapore',
        yearBuilt: 2019,
        grossTonnage: 82300,
        status: 'Underway',
        destination: 'Jeddah',
        eta: '2023-07-05',
      },
      {
        id: '9',
        name: 'Black Pearl',
        imo: '1098765',
        type: 'Offshore Vessel',
        flag: 'Norway',
        yearBuilt: 2022,
        grossTonnage: 45600,
        status: 'In Port',
        destination: 'Stavanger',
        eta: '2023-06-30',
      },
      {
        id: '10',
        name: 'Golden Horizon',
        imo: '9876543',
        type: 'Sailing Vessel',
        flag: 'Portugal',
        yearBuilt: 2021,
        grossTonnage: 8500,
        status: 'Underway',
        destination: 'Lisbon',
        eta: '2023-07-10',
      },
      {
        id: '11',
        name: 'Pacific Dawn',
        imo: '8765432',
        type: 'Container Ship',
        flag: 'USA',
        yearBuilt: 2018,
        grossTonnage: 142000,
        status: 'Underway',
        destination: 'Los Angeles',
        eta: '2023-07-12',
      },
      {
        id: '12',
        name: 'Atlantic Pioneer',
        imo: '7654321',
        type: 'Bulk Carrier',
        flag: 'Greece',
        yearBuilt: 2016,
        grossTonnage: 92800,
        status: 'At Anchor',
        destination: 'Piraeus',
        eta: '2023-07-08',
      },
      {
        id: '13',
        name: 'Arctic Explorer',
        imo: '6543210',
        type: 'Icebreaker',
        flag: 'Russia',
        yearBuilt: 2020,
        grossTonnage: 33500,
        status: 'Underway',
        destination: 'Murmansk',
        eta: '2023-07-15',
      },
      {
        id: '14',
        name: 'Southern Cross',
        imo: '5432109',
        type: 'Research Vessel',
        flag: 'Australia',
        yearBuilt: 2019,
        grossTonnage: 12500,
        status: 'In Port',
        destination: 'Hobart',
        eta: '2023-07-05',
      },
      {
        id: '15',
        name: 'Pacific Pearl',
        imo: '4321098',
        type: 'Cruise Ship',
        flag: 'Bahamas',
        yearBuilt: 2021,
        grossTonnage: 138000,
        status: 'Underway',
        destination: 'Sydney',
        eta: '2023-07-18',
      }
    ];

    const searchTerm = query.toLowerCase();
    
    const results = ships.filter(ship => 
      ship.name.toLowerCase().includes(searchTerm) ||
      ship.imo.toLowerCase().includes(searchTerm) ||
      ship.type.toLowerCase().includes(searchTerm) ||
      ship.flag.toLowerCase().includes(searchTerm) ||
      ship.destination.toLowerCase().includes(searchTerm)
    );

    res.json(results);
  } catch (error) {
    console.error('Error searching ships:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const getShipDetails = async (req, res) => {
  try {
    const { id } = req.params;
    
    const ships = [
      {
        id: '1',
        name: 'Pacific Voyager',
        imo: '9876543',
        type: 'Container Ship',
        flag: 'Panama',
        yearBuilt: 2015,
        grossTonnage: 85600,
        status: 'Underway',
        destination: 'Singapore',
        eta: '2023-06-15',
      },
      {
        id: '2',
        name: 'Atlantic Explorer',
        imo: '8765432',
        type: 'Bulk Carrier',
        flag: 'Liberia',
        yearBuilt: 2018,
        grossTonnage: 92450,
        status: 'At Anchor',
        destination: 'Rotterdam',
        eta: '2023-06-20',
      },
      {
        id: '3',
        name: 'Indian Ocean Queen',
        imo: '7654321',
        type: 'Crude Oil Tanker',
        flag: 'Marshall Islands',
        yearBuilt: 2016,
        grossTonnage: 156000,
        status: 'Underway',
        destination: 'Shanghai',
        eta: '2023-06-25',
      },
      {
        id: '4',
        name: 'Arctic Trader',
        imo: '6543210',
        type: 'LNG Carrier',
        flag: 'Bahamas',
        yearBuilt: 2020,
        grossTonnage: 112000,
        status: 'In Port',
        destination: 'Oslo',
        eta: '2023-06-18',
      },
      {
        id: '5',
        name: 'Mediterranean Star',
        imo: '5432109',
        type: 'Passenger Ship',
        flag: 'Italy',
        yearBuilt: 2019,
        grossTonnage: 185000,
        status: 'Underway',
        destination: 'Barcelona',
        eta: '2023-06-22',
      },
      {
        id: '6',
        name: 'Caribbean Princess',
        imo: '4321098',
        type: 'Cruise Ship',
        flag: 'Bermuda',
        yearBuilt: 2021,
        grossTonnage: 143700,
        status: 'Underway',
        destination: 'Miami',
        eta: '2023-07-01',
      },
      {
        id: '7',
        name: 'Baltic Trader',
        imo: '3210987',
        type: 'Ro-Ro Vessel',
        flag: 'Malta',
        yearBuilt: 2017,
        grossTonnage: 75800,
        status: 'At Anchor',
        destination: 'Hamburg',
        eta: '2023-06-28',
      },
      {
        id: '8',
        name: 'Red Sea Mariner',
        imo: '2109876',
        type: 'Chemical Tanker',
        flag: 'Singapore',
        yearBuilt: 2019,
        grossTonnage: 82300,
        status: 'Underway',
        destination: 'Jeddah',
        eta: '2023-07-05',
      },
      {
        id: '9',
        name: 'Black Pearl',
        imo: '1098765',
        type: 'Offshore Vessel',
        flag: 'Norway',
        yearBuilt: 2022,
        grossTonnage: 45600,
        status: 'In Port',
        destination: 'Stavanger',
        eta: '2023-06-30',
      },
      {
        id: '10',
        name: 'Golden Horizon',
        imo: '9876543',
        type: 'Sailing Vessel',
        flag: 'Portugal',
        yearBuilt: 2021,
        grossTonnage: 8500,
        status: 'Underway',
        destination: 'Lisbon',
        eta: '2023-07-10',
      },
      {
        id: '11',
        name: 'Pacific Dawn',
        imo: '8765432',
        type: 'Container Ship',
        flag: 'USA',
        yearBuilt: 2018,
        grossTonnage: 142000,
        status: 'Underway',
        destination: 'Los Angeles',
        eta: '2023-07-12',
      },
      {
        id: '12',
        name: 'Atlantic Pioneer',
        imo: '7654321',
        type: 'Bulk Carrier',
        flag: 'Greece',
        yearBuilt: 2016,
        grossTonnage: 92800,
        status: 'At Anchor',
        destination: 'Piraeus',
        eta: '2023-07-08',
      },
      {
        id: '13',
        name: 'Arctic Explorer',
        imo: '6543210',
        type: 'Icebreaker',
        flag: 'Russia',
        yearBuilt: 2020,
        grossTonnage: 33500,
        status: 'Underway',
        destination: 'Murmansk',
        eta: '2023-07-15',
      },
      {
        id: '14',
        name: 'Southern Cross',
        imo: '5432109',
        type: 'Research Vessel',
        flag: 'Australia',
        yearBuilt: 2019,
        grossTonnage: 12500,
        status: 'In Port',
        destination: 'Hobart',
        eta: '2023-07-05',
      },
      {
        id: '15',
        name: 'Pacific Pearl',
        imo: '4321098',
        type: 'Cruise Ship',
        flag: 'Bahamas',
        yearBuilt: 2021,
        grossTonnage: 138000,
        status: 'Underway',
        destination: 'Sydney',
        eta: '2023-07-18',
      }
    ];
    
    const ship = ships.find(s => s.id === id);
    
    if (!ship) {
      return res.status(404).json({ message: 'Ship not found' });
    }
    
    const shipDetails = {
      ...ship,
      owner: 'Ocean Transport Ltd.',
      manager: 'Global Maritime Management',
      classification: 'Lloyd\'s Register',
      dimensions: {
        length: 299.8,
        beam: 48.2,
        draft: 14.5
      },
      engine: {
        type: 'MAN B&W 11G90ME-C10',
        power: '55,000 kW'
      },
      certificates: [
        { type: 'Safety Management Certificate', expiry: '2024-06-30' },
        { type: 'International Ship Security Certificate', expiry: '2025-03-15' },
        { type: 'International Oil Pollution Prevention Certificate', expiry: '2024-11-22' }
      ],
      voyageHistory: [
        { from: 'Singapore', to: 'Shanghai', departure: '2023-04-10', arrival: '2023-04-15' },
        { from: 'Shanghai', to: 'Busan', departure: '2023-04-18', arrival: '2023-04-20' },
        { from: 'Busan', to: 'Tokyo', departure: '2023-04-23', arrival: '2023-04-25' }
      ]
    };
    
    res.json(shipDetails);
  } catch (error) {
    console.error('Error fetching ship details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getRecentShips = async (req, res) => {
  try {
    const ships = [
      {
        id: '1',
        name: 'Pacific Voyager',
        imo: '9876543',
        type: 'Container Ship',
        flag: 'Panama',
        yearBuilt: 2015,
        grossTonnage: 85600,
        status: 'Underway',
        destination: 'Singapore',
        eta: '2023-06-15',
      },
      {
        id: '2',
        name: 'Atlantic Explorer',
        imo: '8765432',
        type: 'Bulk Carrier',
        flag: 'Liberia',
        yearBuilt: 2018,
        grossTonnage: 92450,
        status: 'At Anchor',
        destination: 'Rotterdam',
        eta: '2023-06-20',
      },
      {
        id: '3',
        name: 'Indian Ocean Queen',
        imo: '7654321',
        type: 'Crude Oil Tanker',
        flag: 'Marshall Islands',
        yearBuilt: 2016,
        grossTonnage: 156000,
        status: 'Underway',
        destination: 'Shanghai',
        eta: '2023-06-25',
      },
      {
        id: '4',
        name: 'Arctic Trader',
        imo: '6543210',
        type: 'LNG Carrier',
        flag: 'Bahamas',
        yearBuilt: 2020,
        grossTonnage: 112000,
        status: 'In Port',
        destination: 'Oslo',
        eta: '2023-06-18',
      },
      {
        id: '5',
        name: 'Mediterranean Star',
        imo: '5432109',
        type: 'Passenger Ship',
        flag: 'Italy',
        yearBuilt: 2019,
        grossTonnage: 185000,
        status: 'Underway',
        destination: 'Barcelona',
        eta: '2023-06-22',
      },
      {
        id: '6',
        name: 'Caribbean Princess',
        imo: '4321098',
        type: 'Cruise Ship',
        flag: 'Bermuda',
        yearBuilt: 2021,
        grossTonnage: 143700,
        status: 'Underway',
        destination: 'Miami',
        eta: '2023-07-01',
      },
      {
        id: '7',
        name: 'Baltic Trader',
        imo: '3210987',
        type: 'Ro-Ro Vessel',
        flag: 'Malta',
        yearBuilt: 2017,
        grossTonnage: 75800,
        status: 'At Anchor',
        destination: 'Hamburg',
        eta: '2023-06-28',
      },
      {
        id: '8',
        name: 'Red Sea Mariner',
        imo: '2109876',
        type: 'Chemical Tanker',
        flag: 'Singapore',
        yearBuilt: 2019,
        grossTonnage: 82300,
        status: 'Underway',
        destination: 'Jeddah',
        eta: '2023-07-05',
      },
      {
        id: '9',
        name: 'Black Pearl',
        imo: '1098765',
        type: 'Offshore Vessel',
        flag: 'Norway',
        yearBuilt: 2022,
        grossTonnage: 45600,
        status: 'In Port',
        destination: 'Stavanger',
        eta: '2023-06-30',
      },
      {
        id: '10',
        name: 'Golden Horizon',
        imo: '9876543',
        type: 'Sailing Vessel',
        flag: 'Portugal',
        yearBuilt: 2021,
        grossTonnage: 8500,
        status: 'Underway',
        destination: 'Lisbon',
        eta: '2023-07-10',
      },
      {
        id: '11',
        name: 'Pacific Dawn',
        imo: '8765432',
        type: 'Container Ship',
        flag: 'USA',
        yearBuilt: 2018,
        grossTonnage: 142000,
        status: 'Underway',
        destination: 'Los Angeles',
        eta: '2023-07-12',
      },
      {
        id: '12',
        name: 'Atlantic Pioneer',
        imo: '7654321',
        type: 'Bulk Carrier',
        flag: 'Greece',
        yearBuilt: 2016,
        grossTonnage: 92800,
        status: 'At Anchor',
        destination: 'Piraeus',
        eta: '2023-07-08',
      },
      {
        id: '13',
        name: 'Arctic Explorer',
        imo: '6543210',
        type: 'Icebreaker',
        flag: 'Russia',
        yearBuilt: 2020,
        grossTonnage: 33500,
        status: 'Underway',
        destination: 'Murmansk',
        eta: '2023-07-15',
      },
      {
        id: '14',
        name: 'Southern Cross',
        imo: '5432109',
        type: 'Research Vessel',
        flag: 'Australia',
        yearBuilt: 2019,
        grossTonnage: 12500,
        status: 'In Port',
        destination: 'Hobart',
        eta: '2023-07-05',
      },
      {
        id: '15',
        name: 'Pacific Pearl',
        imo: '4321098',
        type: 'Cruise Ship',
        flag: 'Bahamas',
        yearBuilt: 2021,
        grossTonnage: 138000,
        status: 'Underway',
        destination: 'Sydney',
        eta: '2023-07-18',
      }
    ];
    
    const recentShips = ships.slice(0, 5);
    
    res.json(recentShips);
  } catch (error) {
    console.error('Error fetching recent ships:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
