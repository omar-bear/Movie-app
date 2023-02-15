import { useState } from 'react';

import {
  Heading,
  Image,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { SearchInput } from '@/components/SearchInput';
import { Page, PageContent } from '@/spa/layout';
import { useMovieList } from '@/spa/movies/movies.service';

export const IMAGE_PATH = 'http://image.tmdb.org/t/p/w500/';

const PageMovies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading } = useMovieList({ searchTerm });
  const listMovies = data?.results?.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm)
  );

  return (
    <Page containerSize="xl">
      <PageContent>
        <Stack spacing={4}>
          <SearchInput
            value={searchTerm}
            onChange={(val) => setSearchTerm(val || '')}
          />
          {!isLoading && !listMovies?.length && (
            <Text color="gray.400" textAlign="center">
              no movies
            </Text>
          )}
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4, lg: 6 }} spacing={4}>
            {!isLoading &&
              !!listMovies?.length &&
              listMovies?.map((item) => (
                <Stack key={item.id} as={LinkBox}>
                  <Image
                    src={`${IMAGE_PATH}${item.poster_path}`}
                    alt={item.title}
                    borderRadius="8px"
                  />
                  <LinkOverlay as={Link} to={item.id.toString()}>
                    <Heading fontSize="md" textAlign="center">
                      {item.title}
                    </Heading>
                  </LinkOverlay>
                </Stack>
              ))}
          </SimpleGrid>
        </Stack>
      </PageContent>
    </Page>
  );
};

export default PageMovies;
