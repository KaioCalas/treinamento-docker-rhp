import { useEffect, useState } from "react";

function App() {
  const API_URL = "http://localhost:3001/api";

  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");

  async function loadUsers() {
    try {
      const res = await fetch(`${API_URL}/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Erro ao carregar usuários:", err);
    }
  }

  async function handleCreateUser(event) {
    event.preventDefault();
    if (!name.trim()) return;

    try {
      await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      setName("");
      loadUsers();
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Treinamento Docker RHP</h1>

      <div style={styles.card}>
        <h2 style={styles.subtitle}>Adicionar Usuário</h2>
        <form onSubmit={handleCreateUser} style={styles.form}>
          <input
            type="text"
            placeholder="Nome..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Adicionar
          </button>
        </form>
      </div>

      <div style={styles.card}>
        <h2 style={styles.subtitle}>Usuários</h2>

        {users.length === 0 && <p>Nenhum usuário encontrado.</p>}

        <ul style={styles.list}>
          {Array.isArray(users) &&
            users.map((user) => (
              <li key={user.id} style={styles.listItem}>
                {user.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    padding: "2rem",
    maxWidth: "600px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1.5rem",
  },
  subtitle: {
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    gap: "0.5rem",
  },
  input: {
    flex: 1,
    padding: "0.5rem",
  },
  button: {
    padding: "0.5rem 1rem",
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    padding: "0.25rem 0",
    borderBottom: "1px solid #eee",
  },
};

export default App;
