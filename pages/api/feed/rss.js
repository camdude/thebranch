import buildPodcast from "./buildPodcast";

export default async function rss(req, res) {
  const feed = await buildPodcast();

  res.statusCode = 200;
  res.setHeader("content-type", "application/rss+xml");
  res.end(feed);
}
