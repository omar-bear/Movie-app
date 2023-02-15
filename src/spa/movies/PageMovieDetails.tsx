import { Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { Page, PageContent, PageTopBar } from '@/spa/layout';
import { useMovie } from '@/spa/movies/movies.service';

const PageMovieDetails = () => {
  const { data } = useMovie('505642');
  const navigate = useNavigate();
  console.log(data);
  return (
    <Page isFocusMode>
      <PageTopBar showBack onBack={() => navigate(-1)}>
        <Heading size="md">Movie details</Heading>
      </PageTopBar>
      <PageContent>Page movie detail</PageContent>
    </Page>
  );
};

export default PageMovieDetails;
