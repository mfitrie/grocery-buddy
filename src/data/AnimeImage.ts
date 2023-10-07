interface AnimeImage {
    data: Data;
}

interface Data {
    mal_id: number;
    url: string;
    images: Images;
    approved: boolean;
    titles: Title[];
    title: string;
    title_english: string;
    title_japanese: string;
    type: string;
    chapters: number;
    volumes: number;
    status: string;
    publishing: boolean;
    published: Published;
    score: number;
    scored_by: number;
    rank: number;
    popularity: number;
    members: number;
    favorites: number;
    synopsis: string;
    background: string;
    authors: Author[];
    serializations: Author[];
    genres: Author[];
    explicit_genres: Author[];
    themes: Author[];
    demographics: Author[];
}

interface Author {
    mal_id: number;
    type: string;
    name: string;
    url: string;
}

interface Published {
    from: string;
    to: string;
    prop: Prop;
}

interface Prop {
    from: From;
    to: From;
    string: string;
}

interface From {
    day: number;
    month: number;
    year: number;
}

interface Title {
    type: string;
    title: string;
}

interface Images {
    jpg: Jpg;
    webp: Jpg;
}

interface Jpg {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
}

export { AnimeImage }