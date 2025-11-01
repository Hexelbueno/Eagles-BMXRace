import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AQUI_COPIA_TU_API_KEY",
  authDomain: "AQUI.firebaseapp.com",
  projectId: "AQUI_TU_PROJECT_ID",
  storageBucket: "AQUI.appspot.com",
  messagingSenderId: "AQUI_TU_SENDER_ID",
  appId: "AQUI_TU_APP_ID"
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
