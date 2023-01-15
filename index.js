import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { useState, useEffect } from "react";

export default function Home() {
  //
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  //
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/users&quot;")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  //
  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No user data</p>;

  // render
  return (
    <div>
      <h1>hi</h1>
      {data.map((value) => (
        <p>
          {value.name} - {value.age}
        </p>
      ))}
    </div>
  );
}