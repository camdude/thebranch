import client from "./sanity";
import imageUrlBuilder from "@sanity/image-url";

export function urlFor(source) {
  const builder = imageUrlBuilder(client);

  return builder.image(source);
}

export function urlForAsset(ref) {
  const [_file, id, extension] = ref.split("-");
  return `https://cdn.sanity.io/files/${process.env.SANITY_PROJECT_ID}/${process.env.SANITY_DATASET_NAME}/${id}.${extension}`;
}

export async function getNavigation() {
  const results = await client.fetch(
    `*[_type == 'navigation'][0] {
        ...,
        sections[]{
          ...,
          target->{title, slug, _id},
          links[]{
            ...,
            target->{title, slug, _id},
            children[]{
              ...,
              target->{title, slug, _id}
            }
          }
        }
      }`
  );

  return results;
}

const pageFields = `
    title,
    coverImage,
    'slug': slug.current,
    pageBuilder[] {
      ...,
      _type == "textBlock" => {
        ...,
        content[]{
          ...,
          markDefs[]{
            ...,
            _type == "internalLink" => {
              reference->{slug}
            }
          }
        }
      },
      _type == "imageGrid" => {
        ...,
        images[]{
          ...,
          link->{slug}
        }
      },
      _type == "textBlockWithImage" => {
        ...,
        cta{
          ...,
          btnLink->{slug}
        }
      }
    }
`;

export async function getPagebySlug(slug) {
  const result = await client.fetch(
    `*[_type == "page" && slug.current == $slug] {
        ${pageFields}
      }`,
    { slug }
  );

  return result;
}

export async function getHomepage() {
  const result = await client.fetch(
    `*[_type == 'navigation'] {homepage->{${pageFields}}
    }`
  );

  return result;
}

export async function getFooter() {
  const result = await client.fetch(`*[_type == 'contact'][0]`);

  return result;
}

export async function getSermonList() {
  const result = await client.fetch(`*[_type == 'sermon'] | order(date desc){
    ...,
    preacher->,
    series->{title, thumbnail},
    audio {
      asset->
    },
  }`);

  return result;
}

export async function getSermonByDate(date) {
  const result = await client.fetch(
    `*[_type == 'sermon' && date == $date] {
    ...,
    preacher->,
    series->{title, thumbnail},
    audio {
      asset->
    },
  }`,
    { date }
  );

  return result;
}

export async function getSermonByTitle(title) {
  const result = await client.fetch(
    `*[_type == 'sermon' && title == $title]{
    ...,
    preacher->,
    series->{title, thumbnail},
    audio {
      asset->
    },
  }`,
    { title }
  );

  return result;
}

export async function getSermonsBySeries(series) {
  const result = await client.fetch(
    `*[_type == 'sermon' && series->.title == $series] | order(date desc) {
      ...,
      preacher->,
      series->{title, thumbnail},
      audio {
        asset->
      },
  }`,
    { series }
  );

  return result;
}

export async function getSeriesByTitle(title) {
  const result = await client.fetch(
    `*[_type == 'sermonSeries' && title == $title]{
    title,
    thumbnail,
    description,
  }`,
    { title }
  );

  return result;
}
