import logo from './assets/logo.png'
import './App.css'

function App() {
  const items = [
    { id: 1, title: "Item One", desc: "Description here" },
    { id: 2, title: "Item Two", desc: "Description here" },
    { id: 3, title: "Item Three", desc: "Description here" },
    { id: 4, title: "Item Four", desc: "Description here" },
    { id: 5, title: "Item Five", desc: "Description here" },
    { id: 6, title: "Item Six", desc: "Description here" },
  ]

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">
          <img src={logo} alt="logo" className="nav-logo" />
          <ul className="nav-links">
            <li>Home</li>
            <li>Products</li>
            <li>Contact</li>
          </ul>
        </div>
      </nav>

      {/* GRID SECTION */}
      <main className="container">
        <h1>Our Items</h1>

        <div className="grid">
          {items.map(item => (
            <div key={item.id} className="card">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <button>View</button>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default App