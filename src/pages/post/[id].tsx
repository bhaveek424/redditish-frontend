import { Box, Heading } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import React from 'react'
import { EditDeletePostButtons } from '../../components/EditDeletePostButtons';
import { Layout } from '../../components/Layout';
import { createUrqlCleint } from '../../utlis/createUrqlClient';
import { useGetPostFromUrl } from '../../utlis/useGetPostFromUrl';


const Post= ({}) => {
    const [{data, fetching}] = useGetPostFromUrl();

    if (fetching) {
        return(
            <Layout>
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                    />
            </Layout>
        )
    }
    
    if (!data?.post) {
        return (
        <Layout>
            <Box>could not find the post</Box>
        </Layout>
        )
    }
        return (
            <Layout>
                <Heading mb={4}>{data.post.title}</Heading>
                <Box mb={4}>
                    {data.post.text}
                </Box>
                <EditDeletePostButtons 
                    id={data.post.id} 
                    creatorId={data.post.creator.id} 
                />
            </Layout>
        );
}

export default withUrqlClient(createUrqlCleint, {ssr: true}) (Post);