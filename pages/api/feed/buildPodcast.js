import { Podcast } from "podcast";
import { getSermons, urlForAsset } from "../../../lib/api";

export default async function buildPodcast() {
  const baseUrl = "https://thebranch.org.au";

  const feed = new Podcast({
    title: "The Branch Christian Church Podcast",
    description:
      "Our vision is to be a grateful community of people rescued by Jesus Christ and filled with his Spirit, growing in love for God and one another, and calling everyone everywhere to Jesus.",
    feedUrl: `${baseUrl}/rss.xml`,
    siteUrl: baseUrl,
    imageUrl: `${baseUrl}/icon.png`,
    docs: `${baseUrl}/rss/docs.html`,
    author: "The Branch Christian Church",
    webMaster: "Cameron Clifford",
    copyright: "2022 The Branch Christian Church",
    language: "en",
    categories: ["Christianity", "Church", "Sermon"],
    pubDate: new Date(Date.now()),
    ttl: 60,
    itunesAuthor: "The Branch Christian Church",
    itunesSubtitle: "Sermon Podcast",
    itunesSummary:
      "Our vision is to be a grateful community of people rescued by Jesus Christ and filled with his Spirit, growing in love for God and one another, and calling everyone everywhere to Jesus.",
    itunesOwner: {
      name: "The Branch Christian Church",
      email: "admin@thebranch.org.au",
    },
    itunesExplicit: false,
    itunesCategory: [
      {
        text: "Religion & Spirituality",
        subcats: [
          {
            text: "Christianity",
          },
        ],
      },
    ],
    itunesImage: `${baseUrl}/image.png`,
  });

  const data = await getSermons();

  data.forEach((sermon) => {
    const preacher = sermon.preacher.firstname + " " + sermon.preacher.surname;

    feed.addItem({
      title: sermon.title,
      description: sermon.description,
      url: sermon.audio.asset.url, // link to the item
      guid: sermon.audio.asset.assetId, // optional - defaults to url
      categories: ["Christianity", "Church", "Sermon"], // optional - array of item categories
      author: preacher, // optional - defaults to feed author property
      date: sermon.date, // any format that js Date can parse.
      enclosure: {
        url: sermon.audio.asset.url,
        size: sermon.audio.asset.size,
        file: sermon.audio.asset.extension,
      }, // optional enclosure
      itunesAuthor: preacher,
      itunesExplicit: false,
      itunesSubtitle: sermon.subtitle,
      itunesSummary: sermon.description,
      //   itunesDuration: 12345,
      itunesNewFeedUrl: "https://newlocation.com/example.rss",
    });
  });

  return feed.buildXml("\t");
}
