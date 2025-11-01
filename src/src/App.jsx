import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA548RIeriZ6jCy7jooBbROCD2G3xZ49b8",
  authDomain: "eagles-bmx-tracker.firebaseapp.com",
  projectId: "eagles-bmx-tracker",
  storageBucket: "eagles-bmx-tracker.firebasestorage.app",
  messagingSenderId: "512824391069",
  appId: "1:512824391069:web:29cb6b8a1ba2884cdb6b74",
  measurementId: "G-4MP7KBFDWD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const [language, setLanguage] = useState("es");
  const [athletes, setAthletes] = useState([]);
  const [newAthlete, setNewAthlete] = useState("");

  const addAthlete = async () => {
    if (!newAthlete.trim()) return;
    await addDoc(collection(db, "athletes"), { name: newAthlete });
    setNewAthlete("");
    loadAthletes();
  };

  const loadAthletes = async () => {
    const querySnapshot = await getDocs(collection(db, "athletes"));
    const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAthletes(list);
  };

  React.useEffect(() => {
    loadAthletes();
  }, []);

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h1>
        {language === "es" ? "Eagles BMX Tracker" : "Eagles BMX Tracker"}
      </h1>

      <div style={{ marginBottom: 10 }}>
        <label>
          {language === "es" ? "Idioma: " : "Language: "}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </label>
      </div>

      <div>
        <input
          value={newAthlete}
          onChange={(e) => setNewAthlete(e.target.value)}
          placeholder={
            language === "es" ? "Nombre del atleta" : "Athlete name"
          }
        />
        <button onClick={addAthlete}>
          {language === "es" ? "Agregar" : "Add"}
        </button>
      </div>

      <ul>
        {athletes.map((a) => (
          <li key={a.id}>{a.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
