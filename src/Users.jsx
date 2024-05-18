import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

export default function Users() {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState("online");

  useEffect(() => {
    const url = "https://jsonplaceholder.typicode.com/users";
    fetch(url)
      .then((response) => {
        response.json().then((result) => {
          console.warn(result);
          setData(result);
          localStorage.setItem("users", JSON.stringify(result));
        });
      })
      .catch((err) => {
        setMode("offline");
        let collection = localStorage.getItem("users");
        if (collection) {
          setData(JSON.parse(collection));
        }
      });
  }, []);

  return (
    <div>
      <div>
        {mode === "offline" ? (
          <div
            class="alert alert-danger"
            role="alert"
          >
            You are in offline mode
          </div>
        ) : null}
      </div>
      <Table
        striped
        bordered
        hover
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.name}</td>
              <td>{data.username}</td>
              <td>{data.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
