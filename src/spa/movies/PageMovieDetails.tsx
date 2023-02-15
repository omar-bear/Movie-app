import { Badge, HStack, Heading, Image, Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import { BiTime } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';

import { Icon } from '@/components/Icons';
import { Page, PageContent, PageTopBar } from '@/spa/layout';
import { IMAGE_PATH } from '@/spa/movies/PageMovies';
import { useMovie } from '@/spa/movies/movies.service';

const PageMovieDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: movie } = useMovie(id);

  return (
    <Page isFocusMode>
      <PageTopBar showBack onBack={() => navigate(-1)}>
        <HStack>
          <Heading size="md">{movie?.title}</Heading>
          <HStack>
            {movie?.genres?.map((item) => (
              <Badge
                colorScheme="blue"
                key={item.id}
                borderRadius="full"
                color="brand.700"
                bg="brand.100"
                size="sm"
                fontWeight="500"
              >
                {item.name}
              </Badge>
            ))}
          </HStack>
        </HStack>
      </PageTopBar>
      <PageContent>
        <Stack spacing={8} direction={{ base: 'column', md: 'row' }}>
          <Image
            src={`${IMAGE_PATH}${movie?.poster_path}`}
            alt={movie?.title}
            borderRadius="8px"
            maxW={{ base: '300px', md: '50%' }}
            alignSelf={{ base: 'center', md: 'flex-start' }}
          />
          <Stack
            h="full"
            spacing={4}
            justifyContent="flex-start"
            maxW={{ base: 'full', md: '50%' }}
          >
            <HStack>
              <Icon icon={BiTime} />
              <Text color="gray.900">
                {dayjs
                  .duration(movie?.runtime ?? 0, 'minutes')
                  .format('H[h]m[m]')}
              </Text>
            </HStack>
            <Stack spacing={2}>
              <Text color="gray.600" fontSize="sm" fontWeight="bold">
                Release date
              </Text>
              <Text color="gray.900">
                {dayjs(movie?.release_date).format('DD/MM/YYYY')}
              </Text>
            </Stack>
            <Stack spacing={2}>
              <Text color="gray.600" fontSize="sm" fontWeight="bold">
                Synopsis
              </Text>
              <Text color="gray.900">{movie?.overview}</Text>
            </Stack>
          </Stack>
        </Stack>
      </PageContent>
    </Page>
  );
};

export default PageMovieDetails;
