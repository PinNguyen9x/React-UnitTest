import React, { useState, useEffect } from "react";

interface UserProps {
  userId: number;
}

const User = ({ userId }: UserProps) => {
  const [user, setUser] = useState<{ name: string; email: string }>();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        const data = await response.json();
        setUser(data);
      } catch (error) {
        // setError(error?.message);
        console.log(error);
      }
    };

    fetchUser();
  }, [userId]);

  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>{user.name || ""}</h1>
      <p>Email: {user.email || ""}</p>
    </div>
  );
};
export default User;
