import { Heading, Image, SimpleGrid, Stack } from '@chakra-ui/react';

import { SearchInput } from '@/components/SearchInput';
import { Page, PageContent } from '@/spa/layout';
import { useMovieList } from '@/spa/movies/movies.service';

const IMAGE_PATH = 'http://image.tmdb.org/t/p/w500/';

const PageMovies = () => {
  const { data } = useMovieList();
  return (
    <Page containerSize="xl">
      <PageContent>
        <Stack spacing={4}>
          <SearchInput />
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4, lg: 6 }} spacing={4}>
            {data?.results?.map((item) => (
              <Stack key={item.id}>
                <Image
                  src={`${IMAGE_PATH}${item.poster_path}`}
                  alt={item.title}
                  maxW="200px"
                  borderRadius="8px"
                />
                <Heading fontSize="md" textAlign="center">
                  {item.title}
                </Heading>
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </PageContent>
    </Page>
  );
};

export default PageMovies;
