import React, { useEffect, useState } from "react";

interface Work {
  id: string;
  title: string;
  author: string;
  description: string;
  publishedDate: string;
  tagList: string[];
}

const WorkList = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [authors, setAuthors] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [worksResponse, authorsResponse] = await Promise.all([
          fetch("https://json-server-blog.vercel.app/api/posts"),
          fetch("https://json-server-blog.vercel.app/api/authors"),
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div data-testid="loading">Loading...</div>;
  if (error) return <div data-testid="error">{error}</div>;

  return (
    <div className="work-list">
      <h2>Works</h2>
      {works.map((work) => (
        <article key={work.id} className="work-item" data-testid="work-item">
          <h3>{work.title}</h3>
          <p>Author: {work.author}</p>
          <p>{work.description}</p>
          <div className="tags">
            {work.tagList.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <time>{new Date(work.publishedDate).toLocaleDateString()}</time>
        </article>
      ))}
      <h2>Authors</h2>
      {authors.map((author) => (
        <div key={author.id} data-testid="author-item">
          <p>{author.name}</p>
        </div>
      ))}
    </div>
  );
};

export default WorkList;
