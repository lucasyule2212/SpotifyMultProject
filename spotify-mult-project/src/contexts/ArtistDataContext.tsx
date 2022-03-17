import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ArtistObjectType = {
  name: string;
  links: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
  id: string;
  albums: {
    link: string;
    release_date: string;
    name: string;
    image: {
      url: string;
      width: number;
      height: number;
    };
  }[];
};

type ArtistDataContextData = {
  artistData: ArtistObjectType | undefined;
  isLoading: boolean;
  setIsLoading: any;
  setArtistData: any;
};

type ArtistDataProviderProps = {
  children: ReactNode;
};

const ArtistDataContext = createContext({} as ArtistDataContextData);

export function ArtistDataProvider({
  children,
}: ArtistDataProviderProps): JSX.Element {
  const [artistData, setArtistData] = useState<ArtistObjectType | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <ArtistDataContext.Provider
      value={{
        artistData,
        setArtistData,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </ArtistDataContext.Provider>
  );
}

export const useArtistDataContext = (): ArtistDataContextData =>
  useContext(ArtistDataContext);
