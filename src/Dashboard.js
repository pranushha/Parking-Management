import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // State management
  const [userType, setUserType] = useState('user'); // 'user' or 'owner'
  const [activeTab, setActiveTab] = useState('bookings'); // Default tab for users
  const [bookings, setBookings] = useState([]);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [earnings, setEarnings] = useState([]);
  const [userProfile, setUserProfile] = useState({});
  const [newSpot, setNewSpot] = useState({ name: '', address: '', rate: '', availability: '' });
  const [isLoading, setIsLoading] = useState(true);

  // Mock API calls - replace with real API calls
  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      fetchUserData();
      fetchBookings();
      if (userType === 'owner') {
        fetchParkingSpots();
        fetchEarnings();
      }
      setIsLoading(false);
    }, 1000);
  }, [userType]);

  const fetchUserData = () => {
    // Mock user data
    setUserProfile({
      name: ' Pranusha Shinde',
      email: ': pranusha@gmail.com',
      phone: ': 7499836604',
      joinDate: ': 10/01/2023',
      paymentMethods: ['Visa ending in 4242', ' PayPal']
    });
  };

  const fetchBookings = () => {
    // Mock bookings data
    setBookings([
      {
        id: 'B001',
        spotName: 'Amanora Mall',
        date: '2025-03-15',
        startTime: '09:00',
        endTime: '17:00',
        status: 'upcoming',
        price: 25.00
      },
      {
        id: 'B002',
        spotName: 'Central Mall',
        date: '2025-03-10',
        startTime: '10:00',
        endTime: '14:00',
        status: 'completed',
        price: 20.00
      },
      {
        id: 'B003',
        spotName: 'City Pride',
        date: '2025-03-05',
        startTime: '08:00',
        endTime: '18:00',
        status: 'completed',
        price: 12.00
      }
    ]);
  };

  const fetchParkingSpots = () => {
    // Mock parking spots data
    setParkingSpots([
      {
        id: 'PS001',
        name: 'Amanora Mall',
        address: 'Hadapsar',
        rate: 25.00,
        availability: 'Weekdays 8AM-8PM',
        isAvailable: true
      },
      {
        id: 'PS002',
        name: 'Metro Station',
        address: 'District Court',
        rate: 15.00,
        availability: 'Everyday 9AM-9PM',
        isAvailable: true
      },
      {
        id: 'PS003',
        name: 'City Pride',
        address: 'Satara Road',
        rate: 10.00,
        availability: 'Weekends 7AM-10PM',
        isAvailable: false
      }
    ]);
  };

  const fetchEarnings = () => {
    // Mock earnings data
    setEarnings([
      { date: '2025-03', amount: 750.25 },
      { date: '2025-02', amount: 680.50 },
      { date: '2025-01', amount: 520.75 }
    ]);
  };

  // Handle spot availability toggle
  const toggleSpotAvailability = (spotId) => {
    setParkingSpots(parkingSpots.map(spot => 
      spot.id === spotId ? { ...spot, isAvailable: !spot.isAvailable } : spot
    ));
  };

  // Handle new spot form submission
  const handleAddSpot = (e) => {
    e.preventDefault();
    const newSpotWithId = {
      ...newSpot,
      id: `PS₹{Math.floor(Math.random() * 1000)}`,
      isAvailable: true
    };
    setParkingSpots([...parkingSpots, newSpotWithId]);
    setNewSpot({ name: '', address: '', rate: '', availability: '' });
  };

  // Handle booking cancellation
  const cancelBooking = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
    ));
  };

  // Calculate total earnings
  const totalEarnings = earnings.reduce((sum, entry) => sum + entry.amount, 0);

  // Render the user dashboard
  const renderUserDashboard = () => {
    switch(activeTab) {
      case 'bookings':
        return (
          <div className="tab-content">
            <h2>My Bookings</h2>
            <div className="booking-filters">
              <button className="filter-btn active">All</button>
              <button className="filter-btn">Upcoming</button>
              <button className="filter-btn">Completed</button>
              <button className="filter-btn">Cancelled</button>
            </div>
            <div className="bookings-list">
              {bookings.length > 0 ? (
                bookings.map(booking => (
                  <div className={`booking-card ₹{booking.status}`} key={booking.id}>
                    <div className="booking-header">
                      <h3>{booking.spotName}</h3>
                      <span className={`status-badge ₹{booking.status}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>
                    <div className="booking-details">
                      <p><strong>Date:</strong> {booking.date}</p>
                      <p><strong>Time:</strong> {booking.startTime} - {booking.endTime}</p>
                      <p><strong>Price:</strong> ₹{booking.price.toFixed(2)}</p>
                    </div>
                    {booking.status === 'upcoming' && (
                      <div className="booking-actions">
                        <button className="btn-modify">Modify</button>
                        <button className="btn-cancel" onClick={() => cancelBooking(booking.id)}>Cancel</button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="no-data">No bookings found</p>
              )}
            </div>
          </div>
        );
      case 'payments':
        return (
          <div className="tab-content">
            <h2>Payment History</h2>
            <div className="payment-list">
              {bookings.filter(b => b.status === 'completed').map(booking => (
                <div className="payment-item" key={booking.id}>
                  <div className="payment-info">
                    <h3>{booking.spotName}</h3>
                    <p className="payment-date">{booking.date}</p>
                  </div>
                  <div className="payment-amount">
                    <span>₹{booking.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="tab-content">
            <h2>My Profile</h2>
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  <span>{userProfile.name?.charAt(0) || 'U'}</span>
                </div>
                <div className="profile-name">
                  <h3>{userProfile.name}</h3>
                  <p>Member since {userProfile.joinDate}</p>
                </div>
              </div>
              <div className="profile-details">
                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{userProfile.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">{userProfile.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Payment Methods</span>
                  <div className="payment-methods">
                    {userProfile.paymentMethods?.map((method, idx) => (
                      <div key={idx} className="payment-method">{method}</div>
                    ))}
                    <button className="btn-add-payment">+ Add New</button>
                  </div>
                </div>
              </div>
              <div className="profile-actions">
                <button className="btn-edit">Edit Profile</button>
                <button className="btn-change-pass">Change Password</button>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Tab content not found</div>;
    }
  };

  // Render the owner dashboard
  const renderOwnerDashboard = () => {
    switch(activeTab) {
      case 'spots':
        return (
          <div className="tab-content">
            <h2>My Parking Spots</h2>
            <div className="spot-controls">
              <button className="btn-add">+ Add New Spot</button>
            </div>
            
            <form className="add-spot-form" onSubmit={handleAddSpot}>
              <h3>Add New Parking Spot</h3>
              <div className="form-group">
                <label>Spot Name</label>
                <input 
                  type="text" 
                  value={newSpot.name} 
                  onChange={(e) => setNewSpot({...newSpot, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input 
                  type="text" 
                  value={newSpot.address} 
                  onChange={(e) => setNewSpot({...newSpot, address: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group half">
                  <label>Hourly Rate (₹)</label>
                  <input 
                    type="number" 
                    value={newSpot.rate} 
                    onChange={(e) => setNewSpot({...newSpot, rate: e.target.value})}
                    required
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="form-group half">
                  <label>Availability</label>
                  <input 
                    type="text" 
                    value={newSpot.availability} 
                    onChange={(e) => setNewSpot({...newSpot, availability: e.target.value})}
                    placeholder="e.g. Weekdays 9AM-5PM"
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn-submit">Add Spot</button>
            </form>
            
            <div className="spots-list">
              {parkingSpots.map(spot => (
                <div className="spot-card" key={spot.id}>
                  <div className="spot-header">
                    <h3>{spot.name}</h3>
                    <label className="switch">
                      <input 
                        type="checkbox" 
                        checked={spot.isAvailable} 
                        onChange={() => toggleSpotAvailability(spot.id)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                  <div className="spot-details">
                    <p><strong>Address:</strong> {spot.address}</p>
                    <p><strong>Rate:</strong> ₹{spot.rate.toFixed(2)}/hour</p>
                    <p><strong>Availability:</strong> {spot.availability}</p>
                  </div>
                  <div className="spot-actions">
                    <button className="btn-edit">Edit Details</button>
                    <button className="btn-view-bookings">View Bookings</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'earnings':
        return (
          <div className="tab-content">
            <h2>Earnings</h2>
            <div className="earnings-summary">
              <div className="earnings-total">
                <h3>Total Earnings</h3>
                <div className="amount">₹{totalEarnings.toFixed(2)}</div>
                <button className="btn-withdraw">Withdraw Funds</button>
              </div>
              <div className="earnings-chart">
                <h3>Monthly Earnings</h3>
                <div className="chart-placeholder">
                  {/* This would be replaced with an actual chart component */}
                  {earnings.map(entry => (
                    <div className="chart-bar" key={entry.date} style={{ height: `₹ {(entry.amount / 1000) * 200}px` }}>
                      <div className="chart-amount">₹{entry.amount.toFixed(2)}</div>
                      <div className="chart-month">{entry.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="earnings-history">
              <h3>Earnings History</h3>
              <table className="earnings-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Bookings</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {earnings.map((entry, idx) => (
                    <tr key={entry.date}>
                      <td>{entry.date}</td>
                      <td>{15 - idx * 2}</td>
                      <td>₹{entry.amount.toFixed(2)}</td>
                      <td><span className="status-paid">Paid</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="tab-content">
            <h2>Owner Profile</h2>
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  <span>{userProfile.name?.charAt(0) || 'O'}</span>
                </div>
                <div className="profile-name">
                  <h3>{userProfile.name} - Parking Owner</h3>
                  <p>Member since {userProfile.joinDate}</p>
                </div>
              </div>
              <div className="profile-details">
                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{userProfile.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone</span>
                  <span className="detail-value">{userProfile.phone}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Payment Methods</span>
                  <div className="payment-methods">
                    {userProfile.paymentMethods?.map((method, idx) => (
                      <div key={idx} className="payment-method">{method}</div>
                    ))}
                  </div>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Bank Account</span>
                  <span className="detail-value">•••• 4567</span>
                </div>
              </div>
              <div className="profile-actions">
                <button className="btn-edit">Edit Profile</button>
                <button className="btn-change-pass">Change Password</button>
                <button className="btn-update-bank">Update Bank Details</button>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Tab content not found</div>;
    }
  };

  // Toggle between user and owner view
  const toggleUserType = (type) => {
    setUserType(type);
    // Set default active tab based on user type
    setActiveTab(type === 'user' ? 'bookings' : 'spots');
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="dashboard loading">
        <div className="loader"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="logo">
          <h1>SmartPark</h1>
        </div>
        <div className="user-controls">
          <div className="user-info">
            <span className="user-name">{userProfile.name}</span>
            <div className="user-avatar">
              <span>{userProfile.name?.charAt(0) || 'U'}</span>
            </div>
          </div>
          <button className="btn-logout">Logout</button>
        </div>
      </div>
      
      <div className="user-type-selector">
        <button 
          className={`btn-user-type ₹{userType === 'user' ? 'active' : ''}`}
          onClick={() => toggleUserType('user')}
        >
          User Dashboard
        </button>
        <button 
          className={`btn-user-type ₹{userType === 'owner' ? 'active' : ''}`}
          onClick={() => toggleUserType('owner')}
        >
          Owner Dashboard
        </button>
      </div>
      
      <div className="dashboard-main">
        <div className="dashboard-sidebar">
          <div className="tabs">
            {userType === 'user' ? (
              <>
                <button 
                  className={`tab ₹{activeTab === 'bookings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('bookings')}
                >
                  <span className="icon">🗓️</span>
                  Bookings
                </button>
                <button 
                  className={`tab ₹{activeTab === 'payments' ? 'active' : ''}`}
                  onClick={() => setActiveTab('payments')}
                >
                  <span className="icon">💳</span>
                  Payments
                </button>
                <button 
                  className={`tab ₹{activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <span className="icon">👤</span>
                  Profile
                </button>
              </>
            ) : (
              <>
                <button 
                  className={`tab ₹{activeTab === 'spots' ? 'active' : ''}`}
                  onClick={() => setActiveTab('spots')}
                >
                  <span className="icon">🅿️</span>
                  Parking Spots
                </button>
                <button 
                  className={`tab ₹{activeTab === 'earnings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('earnings')}
                >
                  <span className="icon">💰</span>
                  Earnings
                </button>
                <button 
                  className={`tab ₹{activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <span className="icon">👤</span>
                  Profile
                </button>
              </>
            )}
          </div>
          <div className="real-time-status">
            <h3>Real-Time Status</h3>
            <div className="status-item">
              <span className="status-label">Available Spots</span>
              <span className="status-value">42</span>
            </div>
            <div className="status-item">
              <span className="status-label">Active Bookings</span>
              <span className="status-value">18</span>
            </div>
            <div className="status-item">
              <span className="status-label">System Status</span>
              <span className="status-value online">Online</span>
            </div>
          </div>
        </div>
        
        <div className="dashboard-content">
          {userType === 'user' ? renderUserDashboard() : renderOwnerDashboard()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;