import React from "react";

import Header from "../components/Header";
import BeerCard from "../components/BeerCard";

function Home() {
  return (
    <div>
      <Header />
      <main className="container mt-4">
        <section className="row mb-2">
          <div className="col">
            <div className="d-flex align-items-center">
              <h1 className="h3 m-0">Punk API</h1>
            </div>
            <hr />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
