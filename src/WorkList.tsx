import React, { useEffect, useState } from "react";

interface Work {
  id: number;
  title: string;
  authorId: number;
}

interface Author {
  id: number;
  name: string;
}

export const WorkList: React.FC = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [worksResponse, authorsResponse] = await Promise.all([
          fetch("api/works"),
          fetch("api/authors"),
        ]);

        if (!worksResponse.ok || !authorsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const [worksData, authorsData] = await Promise.all([
          worksResponse.json(),
          authorsResponse.json(),
        ]);

        setWorks(worksData);
        setAuthors(authorsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };

    fetchData();
  }, []);

  if (error) return <div>{error}</div>;
  if (works.length === 0) return <div>No works available</div>;

  return (
    <div>
      {works.map((work) => (
        <div key={work.id}>
          <h3>{work.title}</h3>
          <p>
            By: {authors.find((author) => author.id === work.authorId)?.name}
          </p>
        </div>
      ))}
    </div>
  );
};
