import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { PageLayout } from '@/components/layout';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { Grid, Flex } from '@/components/ui/Grid';
import { DogCard } from '@/components/features';
import { useDogs } from '@/hooks/useDogs';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants';

const Dogs: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { dogs, isLoading, error } = useDogs();

  // Show error message if there's an error
  React.useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  if (isLoading) {
    return (
      <PageLayout>
        <Loading text="Loading our beautiful dogs..." />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {isAuthenticated && (
        <Flex justify="flex-end" style={{ marginBottom: '24px' }}>
          <Button
            variant="primary"
            onClick={() => navigate(ROUTES.DOGS_ADD)}
          >
            <PlusOutlined style={{ marginRight: '8px' }} />
            New Dog
          </Button>
        </Flex>
      )}
      
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {dogs.length === 0 ? (
          <Flex 
            justify="center" 
            align="center" 
            direction="column" 
            style={{ minHeight: '300px' }}
          >
            <p>No dogs found.</p>
            {isAuthenticated && (
              <Button
                variant="accent"
                onClick={() => navigate(ROUTES.DOGS_ADD)}
                style={{ marginTop: '16px' }}
              >
                Add the first dog
              </Button>
            )}
          </Flex>
        ) : (
          <Grid minItemWidth="300px" gap="lg">
            {dogs.map((dog) => (
              <DogCard key={dog.id} dog={dog} />
            ))}
          </Grid>
        )}
      </div>
    </PageLayout>
  );
};

export default Dogs;

