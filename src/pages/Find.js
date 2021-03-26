import React, { useState } from "react";

function Find() {
const [date, setDate] = useState('01/2000')
  return (
    <div>
      <main className="container mt-4">
        <section className="row mb-2">
          <div className="col">
            <div className="d-flex align-items-center">
              <h1 className="h3 m-0">Punk API Finder</h1>
            </div>
            <input onChange={(e) => setDate(e.target.value)} type='text' placeholder={`date format: ${date}`}></input>
            <button>fetch beers brewed before {date}</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Find;
