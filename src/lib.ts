/**
 * @param dom http://animetick.net/users/{username}[?page=\d+]
 * @returns [anime-title, animetick-url]
 */
const getAnimeList = (dom: Document): [title: string, url: string][] => {
  const animationElms = [...dom.querySelectorAll('ul.animations > li.animation > a')] as HTMLAnchorElement[];
  return animationElms.map(({ innerText, href }) => [innerText, href]);
};

/**
 * @param dom http://animetick.net/anime/{anime_id}
 * @returns [anime-subtitle, watched]
 */
const getAnimeEpisodes = (dom: Document): [subtitle: string, watched: boolean | null][] => {
  const episodeElms = [...dom.querySelectorAll('ul.episodes > li.episode-block > div.episode')] as HTMLDivElement[];
  return episodeElms.map((elm) => {
    const subtitleElm = elm.querySelector('div.sub_title > a') as HTMLAnchorElement;
    const watchedElm = elm.querySelector('button.episode_watch') as HTMLButtonElement;
    return [subtitleElm.innerText, watchedElm != null ? [...watchedElm.classList].includes('enable') : null];
  });
};

/**
 * download json file
 * @param file file name
 * @param json json text
 */
const download = (file: string, json: string) => {
  const anchor = document.createElement('a') as HTMLAnchorElement;
  anchor.download = file;
  anchor.href = 'data:application/json,' + encodeURIComponent(json);
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
};

export const run = async () => {
  const animeList = getAnimeList(document);
  const animeListWithEpisodes = await Promise.all(animeList.map(async ([name, url]) => {
    const res = await fetch(url);
    const text = await res.text();
    const parser = new DOMParser();
    const dom = parser.parseFromString(text, 'text/html');
    const episodes = getAnimeEpisodes(dom);
    return { name, episodes };
  }));
  const url = new URL(document.location.href);
  const page = url.searchParams.get('page') ?? '0';
  const json = JSON.stringify(animeListWithEpisodes);
  download(`animetick_${page}.json`, json);
};
