import axios from 'axios';

export default async function handler(req, res) {
  const { id } = req.query; 

  const apiKey = process.env.NEXT_PUBLIC_NEWSAPI_KEY;

  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(id)}&apiKey=${apiKey}`
    );

    if (response.data.articles.length === 0) {
      return res.status(404).json({ message: "No articles found" });
    }

    res.status(200).json(response.data.articles[0]);
  } catch (error) {
    console.error("Error fetching blog data:", error.message);
    res.status(500).json({ error: "Failed to fetch blog data" });
  }
}
