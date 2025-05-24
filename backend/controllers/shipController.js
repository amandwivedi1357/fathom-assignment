
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
        ship.type.toLowerCase().includes(req.query.type.toLowerCase())
      );
    }
    
    if (req.query.status) {
      filteredShips = filteredShips.filter(ship => 
        ship.status.toLowerCase() === req.query.status.toLowerCase()
      );
    }
    
    if (req.query.flag) {
      filteredShips = filteredShips.filter(ship => 
        ship.flag.toLowerCase().includes(req.query.flag.toLowerCase())
      );
    }

    if (req.query.search) {
      const searchTerm = req.query.search.toLowerCase();
      filteredShips = filteredShips.filter(ship => 
        ship.name.toLowerCase().includes(searchTerm) ||
        ship.imo.includes(searchTerm)
      );
    }

    if (req.query.sortBy) {
      const sortKey = req.query.sortBy;
      const sortOrder = req.query.order || 'asc';
      
      filteredShips.sort((a, b) => {
        if (a[sortKey] < b[sortKey]) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (a[sortKey] > b[sortKey]) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    res.json(filteredShips);
  } catch (error) {
    console.error('Error fetching ships:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
