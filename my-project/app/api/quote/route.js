export async function GET() {
    try {
      const res = await fetch("https://zenquotes.io/api/random");
      if (!res.ok) throw new Error("Failed to fetch quote");
      const data = await res.json();
      
      return Response.json({ quote: data[0].q, author: data[0].a });
    } catch (error) {
      return Response.json({ quote: "API is down, here's a fallback quote.", author: "Fallback Author" });
    }
  }
  