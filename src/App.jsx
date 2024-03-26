import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./components/Header";
import ListView from "./pages/ListView";
import MapView from "./pages/MapView";
import { getFlights } from "./redux/actions/flightAction.js";
import Modal from "./components/Modal.jsx";

function App() {
  const [isMapView, setIsMapView] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const dispatch = useDispatch();
  
  // Modalı açar
  const openModal = (id) => {
    setDetailId(id); 
    setIsOpen(true); 
  };
  
  const closeModal = () => {
    setDetailId(null);
    setIsOpen(false);
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getFlights());
    }, 5000);

    // Component unmount olduğunda interval'ı temizle
    return () => clearInterval(interval);
  }, [dispatch]); // useEffect bağımlılıklarına dispatch'i ekleyin
  
  return (
    <>
      <Header />
    
      <div className="view-buttons">
        <button
          className={isMapView ? 'active' : ''}
          onClick={() => setIsMapView(true)}
        >
          Harita Görünümü
        </button>
        <button
          className={!isMapView ? 'active' : ''}
          onClick={() => setIsMapView(false)}
        >
          Liste Görünümü
        </button>
      </div>
    
      {/* Hangi bileşenin ekrana geleceğini belirleme */}
      {isMapView ? (
        <MapView openModal={openModal} />
      ) : (
        <ListView openModal={openModal} />
      )}
    
      {/* Modal bileşeni */}
      {isOpen && (
        <Modal detailId={detailId} closeModal={closeModal} />
      )}
    </>
  );
}
  
export default App;